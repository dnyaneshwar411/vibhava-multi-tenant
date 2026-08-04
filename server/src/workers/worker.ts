import { Worker } from "bullmq";
import { redisConnection } from "../infrastructure/queue/queue.js";
import PaymentService from "../core/services/payment.service.js";

const rateLimitOptions = {
  max: 2,
  duration: 1000,
};

new Worker(
  "PAYMENT_WEBHOOK",
  async function (payload: any) {
    const notes = payload.data.notes || {}
    switch (notes.resource) {
      case "ORGANIZATION_MEMBERSHIP": {
        await PaymentService.handleManagePayment(payload.data)
        break;
      }
    }
  },
  { connection: redisConnection, limiter: rateLimitOptions }
)