import z from "zod";
import { CONSTANTS } from "../../config/constants.js";
import { objectIdSchema } from "./common.schema.js";

const transactionLineSchema = z.object({
  accountId: z.string().trim().min(1, "Account ID is required"),
  accountName: z.string().trim().min(1, "Account name is required"),
  type: z.enum(["DEBIT", "CREDIT"]),
  amount: z.number().positive("Amount must be greater than zero"),
  description: z.string().trim().optional(),
});

export default class LedgerSchema {
  static create = z.object({
    body: z.object({
      property: objectIdSchema,
      unit: objectIdSchema.optional(),
      tenant: objectIdSchema.optional(),
      lease: objectIdSchema.optional(),
      vendor: objectIdSchema.optional(),
      entryType: z.enum(CONSTANTS.LEDGER_ENTRY_TYPE),
      status: z.enum(CONSTANTS.LEDGER_ENTRY_STATUS).default("Posted"),
      finance: z.object({
        currency: z.enum(CONSTANTS.AVAILABLE_CURRENCY).default("INR"),
        totalAmount: z.number().min(0),
        paymentGateway: z.enum(CONSTANTS.PAYMENT_GATEWAY).default("RAZORPAY"),
      }),
      lines: z.array(transactionLineSchema).min(1),
      reference: z.record(z.string(), z.any()).optional(),
      memo: z.string().trim().max(500).optional(),
    }),
  });

  static update = z.object({
    params: z.object({
      entryId: objectIdSchema,
    }),
    body: z.object({
      status: z.enum(CONSTANTS.LEDGER_ENTRY_STATUS).optional(),
      memo: z.string().trim().max(500).optional(),
    }),
  });
}

export type CreateLedgerInput = z.infer<typeof LedgerSchema.create>;
export type UpdateLedgerInput = z.infer<typeof LedgerSchema.update>;
