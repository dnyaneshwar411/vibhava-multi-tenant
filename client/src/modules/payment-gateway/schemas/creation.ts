import { z } from "zod";

export const stripeCredentialsSchema = z.object({
  stripeKeyId: z.string().min(1, "Stripe Key ID is required"),
  stripeSignature: z.string().min(1, "Stripe Signature is required"),
});

export const razorpayCredentialsSchema = z.object({
  razorpayKeyId: z.string().min(1, "Razorpay Key ID is required"),
  razorpayKeySecret: z.string().min(1, "Razorpay Key Secret is required"),
  razorpaySignature: z.string().min(1, "Razorpay Signature is required"),
});

export const typeStepSchema = z.object({
  type: z.enum(["RAZORPAY", "STRIPE"], {
    message: "Please select a payment gateway provider.",
  }),
})


export const paymentGatewaySchema = z.discriminatedUnion("type", [
  z.object({
    type: z.literal("STRIPE"),
    credentials: stripeCredentialsSchema,
  }),
  z.object({
    type: z.literal("RAZORPAY"),
    credentials: razorpayCredentialsSchema,
  }),
]);

export type PaymentGatewayInput = z.infer<typeof paymentGatewaySchema>;
export type TypeStepInput = z.infer<typeof typeStepSchema>