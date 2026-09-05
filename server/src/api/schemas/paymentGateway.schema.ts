import z from "zod";
import { CONSTANTS } from "../../config/constants.js";
import { objectIdSchema } from "./common.schema.js";
import Cipher from "../../core/services/cipher.service.js";

const transformAndEncryptCredential = (val: string, ctx: z.RefinementCtx) => {
  try {
    return Cipher.encrypt(val);
  } catch (err: any) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: err.message || "Failed to encrypt credential value",
    });
    return z.NEVER;
  }
};

const encryptedString = z.string().trim().min(1).transform(transformAndEncryptCredential);

export default class PaymentGatewaySchema {
  static rawStripeCredentialsSchema = z.object({
    publishableKey: z.string().trim().min(1),
    stripeKeyId: z.string().trim().min(1),
    stripeSignature: z.string().trim().min(1),
  }).strict();

  static rawRazorpayCredentialsSchema = z.object({
    razorpayKeyId: z.string().trim().min(1),
    razorpayKeySecret: z.string().trim().min(1),
    razorpaySignature: z.string().trim().min(1),
  }).strict();

  static stripeCredentialsSchema = z.object({
    publishableKey: encryptedString,
    stripeKeyId: encryptedString,
    stripeSignature: encryptedString,
  }).strict();

  static razorpayCredentialsSchema = z.object({
    razorpayKeyId: encryptedString,
    razorpayKeySecret: encryptedString,
    razorpaySignature: encryptedString,
  }).strict();

  static create = z.object({
    body: z
      .discriminatedUnion("type", [
        z.object({
          type: z.literal("STRIPE"),
          credentials: this.stripeCredentialsSchema,
        }),
        z.object({
          type: z.literal("RAZORPAY"),
          credentials: this.razorpayCredentialsSchema,
        }),
      ]),
  });

  static update = z.object({
    body: z.discriminatedUnion("type", [
      z.object({
        type: z.literal("STRIPE"),
        credentials: this.stripeCredentialsSchema
      }),
      z.object({
        type: z.literal("RAZORPAY"),
        credentials: this.razorpayCredentialsSchema
      }),
    ]),
  });

  static delete = z.object({
    params: z.object({
      gatewayType: z.enum(CONSTANTS.PAYMENT_GATEWAY),
    })
  });
}

export type CreatePaymentGatewayInput = z.infer<typeof PaymentGatewaySchema.create>;
export type UpdatePaymentGatewayInput = z.infer<typeof PaymentGatewaySchema.update>;
export type DeletePaymentGatewayInput = z.infer<typeof PaymentGatewaySchema.delete>;