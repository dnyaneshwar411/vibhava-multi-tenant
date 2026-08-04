import { GATEWAY_OPTIONS } from "../../common/types/payment.js"

export type EventTypes = "WEBHOOK_PAYMENTS" | "PAYMENTS" | "AUDIT_LOGS"

export type EventPaymentsType = {
  type: "WEBHOOK_PAYMENTS"
  gateway: GATEWAY_OPTIONS,
  organizationId: string,
  transactionId: string,
  webhookId: string,
  orderId: string,
  paymentId: string,
  currency: string,
  amount: number,
  createdAt: number,
  notes: Record<string, any>
}

export type EventPayload =
  | EventPaymentsType
  | { type: "PAYMENTS" }
  | { type: "AUDIT_LOGS" }