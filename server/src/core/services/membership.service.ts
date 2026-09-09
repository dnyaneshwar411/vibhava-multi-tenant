import { ObjectIdQueryTypeCasting } from "mongoose";
import MembershipRepository from "../../infrastructure/database/repositories/membership.repository.js";
import { CREATE_PAYMENT_SESSION, MEMBERSHIP_DURATION, MEMBERSHIP_TIER } from "../../common/types/payment.js";
import { MEMBERSHIPS } from "../../config/payment.js";
import { CURRENCY_OPTIONS } from "../../common/types/payment.js";
import PaymentService from "./payment.service.js";
import { endOfDay, startOfDay } from "date-fns";
import Logger from "../../common/logger/index.js";
import { EventOrchestrator } from "../events/eventBus.js";
import { normalizeMongooseDoc } from "../../common/utils/formatter.js";
import OrganizationRepository from "../../infrastructure/database/repositories/organization.repository.js";

export default class MembershipService {
  private static pricing(
    tier: MEMBERSHIP_TIER,
    duration: MEMBERSHIP_DURATION,
    currency: CURRENCY_OPTIONS
  ) {
    const config = MEMBERSHIPS[tier];
    const pricing = config.pricing[duration][currency];
    if (pricing.discount.available) {
      const discountPrice = (pricing.amount) / (pricing.discount.quantity * 100)
      return Math.ceil(pricing.amount - discountPrice) * 100
    }
    return Math.ceil(pricing.amount) * 100;
  }

  static async createMembership(
    organizationId: ObjectIdQueryTypeCasting,
    userId: ObjectIdQueryTypeCasting,
    options: {
      duration: MEMBERSHIP_DURATION,
      tier: MEMBERSHIP_TIER,
      currency: CURRENCY_OPTIONS
    }
  ): Promise<CREATE_PAYMENT_SESSION> {
    const organization = await MembershipRepository.find({ organization: organizationId })

    const pricing = this.pricing(options.tier, options.duration, options.currency);

    if (organization?.tier && organization?.tier !== options.tier) {
      return {
        success: false,
        message: "Please wait untill your current plan expires."
      }
    }

    const config = {
      amount: pricing,
      currency: options.currency,
      notes: {
        resource: "ORGANIZATION_MEMBERSHIP",
        duration: options.duration,
        tier: options.tier,
        actor: String(userId),
        organizationId: String(organization?.organization)
      }
    }

    return await PaymentService.createVibhavaOrder("RAZORPAY", config)
  }

  static async processExpiringMemberships() {
    const now = new Date();
    const cursor: any = MembershipRepository.processExpiringMembershipCursor({
      status: "Active",
      currentPeriodEnd: {
        $gte: startOfDay(now),
        $lte: endOfDay(now),
      }
    })

    const updates = []

    const organizationUpdates = []

    for await (const membership of cursor) {
      updates.push({
        updateOne: {
          filter: { _id: membership._id },
          update: { $set: { status: "In Active" } }
        }
      })

      organizationUpdates.push({
        updateOne: {
          filter: { _id: membership.organization?._id },
          update: { $set: { status: "In Active" } }
        }
      })

      EventOrchestrator.publish("EMAILS", {
        type: "EMAILS",
        entity: "ORGANIZATION_MEMBERSHIP_EXPIRATION",
        payload: {
          ...normalizeMongooseDoc(membership),
          subject: `Action Required: Membership Expiry for ${membership.organization.name}`,
          to: membership.organization?.owner?.email,
        }
      })
    }

    await Promise.all([
      MembershipRepository.batchUpdates(updates),
      OrganizationRepository.batchUpdates(organizationUpdates),
    ])


    Logger.info("Scheduler executed successfully")
  }
}