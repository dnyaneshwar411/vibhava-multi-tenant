import { Orders } from "razorpay/dist/types/orders.js";
import {
  CREATE_PAYMENT_SESSION, GATEWAY_OPTIONS, MEMBERSHIP_BILLING_CYCLES,
  MEMBERSHIP_DURATION, MEMBERSHIP_TIER, MEMBERSHIP_TIER_CHANGE_TYPE,
  OrganizationOrderArgs
} from "../../common/types/payment.js";
import RazorpayPaymentGateway from "../../infrastructure/providers/razorpay/index.js";
import StripePaymentGateway from "../../infrastructure/providers/stripe/index.js";
import { EventPaymentsType } from "../events/types.js";
import MembershipRepository from "../../infrastructure/database/repositories/membership.repository.js";
import MembershipInvoiceRepository from "./membershipInvoice.repository.js";
import { addMonths, endOfDay, startOfDay } from "date-fns";
import { MEMBERSHIP_ENTITLEMENTS } from "../../config/payment.js";
import { ObjectIdQueryTypeCasting } from "mongoose";
import PaymentGatewayRepository from "../../infrastructure/database/repositories/paymentGateway.repository.js";
import { validateWebhookSignature } from "razorpay/dist/utils/razorpay-utils.js";
import Stripe from "stripe";
import OrganizationRepository from "../../infrastructure/database/repositories/organization.repository.js";
import AuditLogService from "./auditLog.service.js";

export default class PaymentService {
  private static membershipWeight: Record<MEMBERSHIP_TIER, number> = {
    "Custom": 4,
    "Enterprise": 3,
    "Professional": 2,
    "Starter": 1,
  }

  static async createVibhavaOrder(
    gateway: GATEWAY_OPTIONS,
    options: Orders.RazorpayOrderCreateRequestBody
  ): Promise<CREATE_PAYMENT_SESSION> {
    switch (gateway) {
      case "RAZORPAY": {
        return await RazorpayPaymentGateway.createOrder({ isVibhava: true }, options)
      }
      case "STRIPE": {
        return await StripePaymentGateway.createOrder({ isVibhava: true }, options)
      }
    }
  }

  static async createOrganizationOrder(
    { gateway, organizationId, options }: OrganizationOrderArgs
  ): Promise<CREATE_PAYMENT_SESSION> {
    const paymentGateway = await PaymentGatewayRepository.findOne({
      organization: organizationId,
      type: gateway,
      // isDeleted: false
    })
    if (!paymentGateway) return {
      success: false,
      message: `Payment Gateway - [${gateway}] is Not configured`
    }

    switch (gateway) {
      case "RAZORPAY": {
        return await RazorpayPaymentGateway.createOrder({
          isVibhava: false,
          credentials: {
            key_id: paymentGateway.credentials.razorpayKeyId,
            key_secret: paymentGateway.credentials.razorpayKeySecret,
          }
        }, options)
      }
      case "STRIPE": {
        return await StripePaymentGateway.createOrder({
          isVibhava: false,
          credentials: paymentGateway.credentials
        }, options)
      }
    }
  }

  private static resolveMembershipPeriodEnd(date: Date, duration: MEMBERSHIP_DURATION) {
    const months = duration === "Monthly" ? 1 : 12
    return endOfDay(addMonths(date, months));
  }

  private static resolveTierChangeType(
    currentTier: MEMBERSHIP_TIER,
    targetTier: MEMBERSHIP_TIER
  ): MEMBERSHIP_TIER_CHANGE_TYPE {
    const currentWeight = this.membershipWeight[currentTier];
    const targetWeight = this.membershipWeight[targetTier];
    if (targetWeight > currentWeight) {
      return "Tier Upgrade";
    }
    if (targetWeight < currentWeight) {
      return "Tier Downgrade";
    }
    return "Subscription Renewal";
  }

  private static resolveBillingCycle(duration: MEMBERSHIP_DURATION): MEMBERSHIP_BILLING_CYCLES {
    return duration === "Monthly"
      ? "Monthly"
      : "Annually"
  }

  private static resolveEntitlements = function (tier: MEMBERSHIP_TIER) {
    return MEMBERSHIP_ENTITLEMENTS[tier];
  }

  static async handleManagePayment(payload: EventPaymentsType) {
    const organizationMembership = await MembershipRepository.find({ organization: payload.notes.organizationId });
    if (!organizationMembership) return;
    const tierChangeType = this.resolveTierChangeType(organizationMembership.tier, payload.notes.tier);

    // create a membership invoice in whichever case.
    const invoice = await MembershipInvoiceRepository.create({
      organization: payload.notes.organizationId,
      membership: organizationMembership._id,
      type: tierChangeType,
      tier: payload.notes.tier,
      billingCycle: payload.notes.duration,
      amount: payload.amount,
      transactionReference: payload.transactionId,
      paymentDetails: payload,
      entitlements: this.resolveEntitlements(payload.notes.tier) // tbd move this to the scopes map.
    })

    // if the membership has expired
    // create a new invoice and update the membership periodStart, periodEnd and add an invoice
    const updatePayload: Record<string, any> = {
      status: "Active"
    }
    if (organizationMembership.status !== "Active") {
      updatePayload.currentPeriodStart = startOfDay(new Date());
    } else if (tierChangeType !== "Subscription Renewal") {
      updatePayload.currentPeriodStart = startOfDay(new Date());
      updatePayload.currentPeriodEnd = this.resolveMembershipPeriodEnd(new Date(), payload.notes.duration)
      updatePayload.tier = payload.notes.tier
      updatePayload.billingCycle = this.resolveBillingCycle(payload.notes.duration)

    }

    // if the membership is Active and the tiers are the same extend the periodEnd and add an invoice
    if (tierChangeType === "Subscription Renewal") {
      updatePayload.currentPeriodEnd = this.resolveMembershipPeriodEnd(
        organizationMembership.currentPeriodEnd,
        payload.notes.duration
      )
    }

    const promises = []

    promises.push(
      OrganizationRepository.updateById(organizationMembership.organization, {
        status: "Active"
      })
    )

    if (Object.keys(updatePayload).length > 0) {
      promises.push(
        MembershipRepository.update({ _id: organizationMembership._id }, updatePayload)
      )
    }

    await Promise.all(promises)

    AuditLogService.addScratch({
      action: "PURCHASE",
      resource: "Subscription",
      resourceId: invoice._id,
      organization: payload.notes.organization,
      actorId: payload.notes.actor,
      actorModel: "User",
      actorSnapshot: {
        fullName: "",
        email: ""
      },
      createdAt: new Date()
    })
    // if the membership is Active and the tiers and not similar just add the invoice
  }

  private static async validateOrganizationWebhookSignature(
    gateway: string,
    webhookSignature: string,
    credentials: Record<string, string>,
    stringifiedPayload: string
  ) {
    if (!webhookSignature) return false;
    switch (gateway) {
      case "RAZORPAY": {
        return validateWebhookSignature(
          JSON.stringify(stringifiedPayload),
          webhookSignature,
          credentials.razorpaySignature!
        )
      }
      case "STRIPE": {
        try {
          Stripe.webhooks.constructEvent(
            stringifiedPayload,
            webhookSignature,
            credentials.stripeSignature!
          );
        } finally { return false }
      }
      default:
        return false;
    }
  }

  static async handleOrganizationFinance(payload: EventPaymentsType) {
    const gateway = await PaymentGatewayRepository.findOne({
      gateway: payload.gateway,
      organization: payload.organizationId
    })

    // handle the cases when the gateway is deleted.
    if (!gateway) return

    const success = await this.validateOrganizationWebhookSignature(
      payload.gateway,
      payload.webhookSignature,
      gateway.credentials,
      payload.stringifiedPayload
    );
    if (!success) return;

    switch (payload.notes.entity) {
      case "RENT_ROLL": {
        // implement the rent roll logic here.
        break;
      }
      case "LEDGER": {
        // implement the ledger logic here.
        break;
      }
    }
  }
}