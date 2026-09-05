import Razorpay from "razorpay";
import { Orders } from "razorpay/dist/types/orders.js";
import { RazorpayConfig } from "./config.js";
import { RazorpayGatewayArgs } from "./type.js";

export default class RazorpayPaymentGateway {
  private static client = RazorpayConfig;
  private static cache = new Map<string, Razorpay>();

  private static buildConfig(options: RazorpayGatewayArgs): Razorpay {
    if (options.isVibhava) {
      return this.client;
    }
    if (this.cache.has(options.credentials.key_id)) {
      return this.cache.get(options.credentials.key_id)!;
    }
    const client = new Razorpay(options.credentials);
    this.cache.set(options.credentials.key_id, client);
    return client;
  }

  static async createOrder(
    gatewayOptions: RazorpayGatewayArgs,
    orderOptions: Orders.RazorpayOrderCreateRequestBody,
  ): Promise<{
    success: false,
    message: string,
    credentials?: any
  } | {
    success: true,
    order: Orders.RazorpayOrder
    credentials?: any
  }> {
    try {
      const client = this.buildConfig(gatewayOptions);
      const order = await client.orders.create(orderOptions);
      return {
        success: true,
        order,
        ...(!gatewayOptions.isVibhava && {
          credentials: gatewayOptions.credentials
        })
      };
    } catch (error: any) {
      let message = "Payment processing failed. Please try again later.";
      if (error.error) {
        switch (error.error.code) {
          case 'BAD_REQUEST_ERROR':
            message = "Invalid payment request details. Please check the information provided.";
            break;
          case 'GATEWAY_ERROR':
            message = "The payment gateway is currently unavailable. Please try again later.";
            break;
          case 'AUTHORIZATION_ERROR':
            message = "Payment gateway configuration issue. Please contact support.";
            break;
          default:
            message = error.error.description || message;
        }
      }
      return { success: false, message };
    }
  }
}
