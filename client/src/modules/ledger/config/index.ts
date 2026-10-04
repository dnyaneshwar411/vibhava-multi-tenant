import { LedgerCreationInput } from "../schemas/create";

export const AVAILABLE_CURRENCY = ["INR"];
export const PAYMENT_GATEWAY = ["RAZORPAY"]; // "STRIPE"
export const LEDGER_ENTRY_STATUS = ["Posted", "Cleared", "Reconciled", "Voided"];
export const LEDGER_ENTRY_TYPE = [
  "Rent Charge", "Rent Payment", "Late Fee Charge", "Security Deposit In",
  "Security Deposit Refund", "Maintenance Expense", "Owner Distribution",
  "Adjustment / Reversal"
]

export const LEDGER_STAGE_FIELDS: (keyof LedgerCreationInput)[][] = [
  ["property", "unit", "tenant", "lease", "vendor", "entryType", "memo"],
  ["finance"],
  ["lines", "reference"],
  ["status"],
];