import { ObjectIdQueryTypeCasting } from "mongoose";
import MembershipRepository from "../../infrastructure/database/repositories/membership.repository.js";
import { CREATE_PAYMENT_SESSION, MEMBERSHIP_DURATION, MEMBERSHIP_TIER } from "../../common/types/payment.js";
import { MEMBERSHIPS } from "../../config/payment.js";
import { CURRENCY_OPTIONS } from "../../common/types/payment.js";
import PaymentService from "./payment.service.js";

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
}