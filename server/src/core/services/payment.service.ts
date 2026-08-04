import { Orders } from "razorpay/dist/types/orders.js";
import { CREATE_PAYMENT_SESSION, GATEWAY_OPTIONS, MEMBERSHIP_BILLING_CYCLES, MEMBERSHIP_DURATION, MEMBERSHIP_TIER, MEMBERSHIP_TIER_CHANGE_TYPE } from "../../common/types/payment.js";
import RazorpayPaymentGateway from "../../infrastructure/providers/razorpay/index.js";
import StripePaymentGateway from "../../infrastructure/providers/stripe/index.js";
import { EventPaymentsType } from "../events/types.js";
import MembershipRepository from "../../infrastructure/database/repositories/membership.repository.js";
import MembershipInvoiceRepository from "./membershipInvoice.repository.js";
import { addMonths, endOfDay, startOfDay } from "date-fns";
import { MEMBERSHIP_ENTITLEMENTS } from "../../config/payment.js";

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

  private static resolveMembershipPeriodEnd(date: Date, duration: MEMBERSHIP_DURATION) {
    const months = duration === "monthly" ? 1 : 12
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
    return duration === "monthly"
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
    await MembershipInvoiceRepository.create({
      organization: payload.notes.organizationId,
      membership: organizationMembership._id,
      type: tierChangeType,
      amount: payload.amount,
      transactionReference: payload.transactionId,
      paymentDetails: payload,
      entitlements: this.resolveEntitlements(payload.notes.tier) // tbd move this to the scopes map.
    })

    // if the membership has expired
    // create a new invoice and update the membership periodStart, periodEnd and add an invoice
    const updatePayload: Record<string, any> = {}
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

    if (Object.keys(updatePayload).length > 0) {
      await MembershipRepository.update({ _id: organizationMembership._id }, updatePayload)
    }

    // if the membership is Active and the tiers and not similar just add the invoice
  }
}