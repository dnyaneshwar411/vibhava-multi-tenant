import { Worker } from "bullmq";
import { redisConnection } from "../infrastructure/queue/queue.js";
import PaymentService from "../core/services/payment.service.js";
import AuditLogService from "../core/services/auditLog.service.js";
import EmailService from "../infrastructure/providers/email/email.service.js";
import ISRService from "../core/services/isr.service.js";

const rateLimitOptions = {
  max: 2,
  duration: 1000,
};

new Worker(
  "PAYMENT_WEBHOOK",
  async function (payload: any) {
    // implement the functionality to validate the request with the signature sent in the
    // header against the webhook secret of vibhava or the respective organization
    const notes = payload.data.notes || {}
    switch (notes.resource) {
      case "ORGANIZATION_MEMBERSHIP": {
        await PaymentService.handleManagePayment(payload.data)
        break;
      }
      case "ORGANIZATION_FINANCE": {
        // need to pass in the secret here the signature is in the payload.data.webhookSignature
        await PaymentService.handleOrganizationFinance(payload.data)
        break;
      }
    }
  },
  { connection: redisConnection, limiter: rateLimitOptions }
)

new Worker(
  "AUDIT_LOGS",
  async function (payload: any) {
    if (payload.data.logs && payload.data.logs.length > 0) {
      await AuditLogService.save(payload.data.logs)
    }
  },
  { connection: redisConnection, limiter: rateLimitOptions }
)

new Worker("EMAILS", async function (payload) {
  await EmailService.process(payload.data)
}, {
  connection: redisConnection,
  limiter: rateLimitOptions
})

new Worker(
  "ISR",
  async function (payload: any) {
    if (payload.data) {
      await ISRService.processRevalidationWebhook(payload.data)
    }
  },
  { connection: redisConnection, limiter: rateLimitOptions }
)