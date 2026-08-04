import Stripe from "stripe"
import { StripeConfig } from "./config.js";
import { StripeClientArgs } from "./type.js";

export default class StripePaymentGateway {
  private static client = StripeConfig;
  private static cache = new Map<string, Stripe>();

  private static buildConfig(options: StripeClientArgs) {
    if (options.isVibhava) {
      return this.client;
    }
    if (this.cache.has(options.credentials)) {
      return this.cache.get(options.credentials)!;
    }
    const client = new Stripe(options.credentials);
    this.cache.set(options.credentials, client)
    return client;
  }

  static async createOrder(
    gatewayOptions: StripeClientArgs,
    orderOptions: Stripe.Checkout.SessionCreateParams
  ): Promise<{
    success: false,
    message: string
  } | {
    success: true,
    order: Stripe.Response<Stripe.Checkout.Session>
  }> {
    try {
      const client = this.buildConfig(gatewayOptions);
      const order = await client.checkout.sessions.create(orderOptions);
      return { success: true, order }
    } catch (error) {
      let message = "An unexpected error occurred while processing the payment.";
      if (error instanceof Error) {
        if (error.name === 'StripeAuthenticationError' || error.name === 'RazorpayAuthError') {
          message = "Payment gateway configuration issue. Please contact support.";
        } else if (error.name === 'StripeRateLimitError') {
          message = "We are experiencing high traffic. Please try again in a few moments.";
        } else {
          message = error.message;
        }
      }
      return { success: false, message };
    }
  }
}