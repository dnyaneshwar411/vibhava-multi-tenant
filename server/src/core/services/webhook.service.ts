import { GATEWAY_OPTIONS } from "../../common/types/payment.js";
import { EventOrchestrator } from "../events/eventBus.js";
import { EventTypes } from "../events/types.js";
import { validateWebhookSignature } from "razorpay/dist/utils/razorpay-utils.js";
import { env } from "../../config/envVars.js";
import { ObjectIdQueryTypeCasting } from "mongoose";

export default class WebhookService {
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

  static async razorpayPaymentWebhook(payload: any, webhookSignature: string) {
    // validate the webhook only if the notes.resource = ORGANIZATION_MEMBERSHIP else validate it in the payment service. 
    const {
      payment: { entity: payment },
      order: { entity: order }
    } = payload.payload;
    
    if (order.entity.resource === "ORGANIZATION_MEMBERSHIP") {
      const success = this.validatePaymentWebhookSignature(payload, webhookSignature);
      if (!success) return;
    }

    // save the webhook request to the database and that ensures fault tolerance.
    const body = {
      type: "WEBHOOK_PAYMENTS" as any,
      gateway: "RAZORPAY" as GATEWAY_OPTIONS,
      organizationId: order.notes?.organizationId,
      transactionId: payment.id,
      webhookId: order.id,

      orderId: order.id,
      paymentId: payment.id,
      currency: order.currency,
      amount: order.amount_paid,
      createdAt: order.created_at,
      notes: order.notes,
      webhookSignature,
      stringifiedPayload: JSON.stringify(payload)
    }
    EventOrchestrator.publish("WEBHOOK_PAYMENTS", body);
  }

  static async stripePaymentWebhook(payload: any, webhookSignature: string, organizationId: ObjectIdQueryTypeCasting) {
    // validate the webhook only if the notes.resource = ORGANIZATION_MEMBERSHIP else validate it in the payment service.

    // save the webhook request to the database and that ensures fault tolerance.

    // need extra configuration so leave it for now.
    const body = {
      type: "WEBHOOK_PAYMENTS" as EventTypes,
      gateway: "STRIPE" as GATEWAY_OPTIONS,
      organizationId,
      stringifiedPayload: JSON.stringify(payload)
    }
    EventOrchestrator.publish("WEBHOOK_PAYMENTS", body as any);
  }
}