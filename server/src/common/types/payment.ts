import { Orders } from "razorpay/dist/types/orders.js";
import { CONSTANTS } from "../../config/constants.js";
import Stripe from "stripe";

export type GATEWAY_OPTIONS = typeof CONSTANTS.PAYMENT_GATEWAY[number];

export type CURRENCY_OPTIONS = typeof CONSTANTS.AVAILABLE_CURRENCY[number];

export type MEMBERSHIP_TIER = typeof CONSTANTS.MEMBERSHIP_TIER[number];

export type MEMBERSHIP_TIER_CHANGE_TYPE = typeof CONSTANTS.MEMBERSHIP_TYPE[number]

export type MEMBERSHIP_BILLING_CYCLES = typeof CONSTANTS.MEMBERSHIP_BILLING_CYCLES[number]

export type MEMBERSHIP_TIER_CONFIG = {
  pricing: Record<
    "Monthly" | "Annually",
    Record<
      "INR" | "USD", {
        amount: number,
        discount: {
          available: boolean,
          quantity: number
        }
      }>
  >
}

export type MEMBERSHIP_DURATION = "Monthly" | "Annually"

export type PaymentOrderSession = Orders.RazorpayOrder | Stripe.Response<Stripe.Checkout.Session>

export type CREATE_PAYMENT_SESSION = {
  success: true,
  message?: string
  order: Orders.RazorpayOrder | Stripe.Response<Stripe.Checkout.Session>,
  credentials?: any
} | {
  success: false,
  message: string,
  order?: Orders.RazorpayOrder | Stripe.Response<Stripe.Checkout.Session>,
  credentials?: any
}

export type OrganizationFinanceRentRollNotes = {
  entity: "RENT_ROLL",
  leaseId: string,
  startDate: string
}

export type OrganizationFinanceNotes =
  {
    resource: "ORGANIZATION_FINANCE",
    organizationId: string,
    actor: string
  } &
  OrganizationFinanceRentRollNotes

export type OrganizationOrderArgs = {
  organizationId: string;
} & (
  | { gateway: "RAZORPAY"; options: Orders.RazorpayOrderCreateRequestBody }
  | { gateway: "STRIPE"; options: Stripe.Checkout.SessionCreateParams }
);