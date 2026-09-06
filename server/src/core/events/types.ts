import { ObjectIdQueryTypeCasting } from "mongoose"
import { GATEWAY_OPTIONS } from "../../common/types/payment.js"
import { CONSTANTS_TYPE } from "../../common/types/index.js"
import { MailOptions } from "nodemailer/lib/sendmail-transport/index.js"

export type EventTypes = "WEBHOOK_PAYMENTS" | "PAYMENTS" | "AUDIT_LOGS" | "EMAILS"

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
  notes: Record<string, any>,
  webhookSignature: string
  stringifiedPayload: string
}

export type EventAuditLog = {
  organization: ObjectIdQueryTypeCasting,
  actorId: ObjectIdQueryTypeCasting,
  actorModel: ObjectIdQueryTypeCasting,
  actorSnapshot: {
    fullName: string,
    email: string
  },
  context?: {
    ipAddress: string,
    userAgent: string,
    requestUrl: string,
    httpMethod: string
  },
  action: CONSTANTS_TYPE["AUDIT_LOG_ACTION"],
  resource: CONSTANTS_TYPE["AUDIT_LOG_RESOURCE"],
  resourceId: ObjectIdQueryTypeCasting,
  description?: string,
  createdAt?: Date
}

export type EventEmailType = {
  type: "EMAILS"
  entity: CONSTANTS_TYPE["EMAIL_ENTITIES"]
  payload: MailOptions & (
    any
  )
}

type EventsAuditLogs = {
  type: "AUDIT_LOGS",
  bacthSize: number,
  logs: EventAuditLog[]
}

export type EventPayload =
  | EventPaymentsType
  | EventEmailType
  | EventsAuditLogs
  | { type: "PAYMENTS" }