import { GATEWAY_OPTIONS } from "../../common/types/payment.js";
import { EventOrchestrator } from "../events/eventBus.js";
import { EventTypes } from "../events/types.js";
import { validateWebhookSignature } from "razorpay/dist/utils/razorpay-utils.js";
import { env } from "../../config/envVars.js";

export default class WebhookService {
  static resolvePaymentGateway(payment: any, order: any) {
    return {
      type: "WEBHOOK_PAYMENTS" as EventTypes,
      gateway: "RAZORPAY" as GATEWAY_OPTIONS,
      organizationId: order.notes?.organizationId, //
      transactionId: payment.id,
      webhookId: order.id,

      orderId: order.id,
      paymentId: payment.id,
      currency: order.currency,
      amount: order.amount_paid,
      createdAt: order.created_at,
      notes: order.notes
    }
  }

  private static validatePaymentWebhookSignature(payload: any, signature: string) {
    const gateway: string = "RAZORPAY";
    if (!signature) return false;
    switch (gateway) {
      case "RAZORPAY": {
        return validateWebhookSignature(JSON.stringify(payload), signature, env.COMPANY_DEFAULT_RAZORPAY_SIGNATURE)
      }
      default:
        return false;
    }
  }

  static async paymentWebhook(payload: any, webhookSignature: string) {
    const success = this.validatePaymentWebhookSignature(payload, webhookSignature);
    if (!success) return;

    // save the webhook request to the database and that ensures fault tolerance.
    const { payment, order } = payload.payload;
    const body = this.resolvePaymentGateway(payment.entity, order.entity);
    EventOrchestrator.publish("WEBHOOK_PAYMENTS", body);
  }
}