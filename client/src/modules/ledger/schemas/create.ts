import z from "zod";
import { AVAILABLE_CURRENCY, LEDGER_ENTRY_STATUS, LEDGER_ENTRY_TYPE, PAYMENT_GATEWAY } from "../config/index";

const transactionLineSchema = z.object({
  accountId: z.string().trim().min(1, "Account ID is required"),
  accountName: z.string().trim().min(1, "Account name is required"),
  type: z.enum(["DEBIT", "CREDIT"]),
  amount: z.string(),
  description: z.string().trim().optional(),
});

export const ledgerCreationOverview = z.object({
  property: z.string(), 
  unit: z.string().optional(),
  tenant: z.string().optional(),
  lease: z.string().optional(),
  vendor: z.string().optional(),
  entryType: z.enum(LEDGER_ENTRY_TYPE),
  memo: z.string().trim().max(500).optional(),
});

export const ledgerCreationFinance = z.object({
  finance: z.object({
    currency: z.enum(AVAILABLE_CURRENCY).default("INR"),
    totalAmount: z.string(),
    paymentGateway: z.enum(PAYMENT_GATEWAY).default("RAZORPAY"),
  }),
});

export const ledgerCreationLines = z.object({
  lines: z.array(transactionLineSchema).min(1),
  reference: z.record(z.string(), z.any()).optional(),
});

export const ledgerCreationMeta = z.object({
  status: z.enum(LEDGER_ENTRY_STATUS).default("Posted"),
});

export const ledgerCreation = ledgerCreationOverview
  .merge(ledgerCreationFinance)
  .merge(ledgerCreationLines)
  .merge(ledgerCreationMeta);

export const ledgerUpdate = z.object({
  status: z.enum(LEDGER_ENTRY_STATUS).optional(),
  memo: z.string().trim().max(500).optional(),
});

export type LedgerCreationInput = z.infer<typeof ledgerCreation>;
export type LedgerUpdateInput = z.infer<typeof ledgerUpdate>;
export type LedgerCreationOverviewInput = z.infer<typeof ledgerCreationOverview>;
export type LedgerCreationFinanceInput = z.infer<typeof ledgerCreationFinance>;
export type LedgerCreationLinesInput = z.infer<typeof ledgerCreationLines>;
export type LedgerCreationMetaInput = z.infer<typeof ledgerCreationMeta>;