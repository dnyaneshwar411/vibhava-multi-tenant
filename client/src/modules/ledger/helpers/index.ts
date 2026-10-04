import { LedgerCreationInput } from "../schemas/create";

export function buildLedgerRequestBody(data: LedgerCreationInput) {
  return {
    property: data.property,
    unit: data.unit || undefined,
    tenant: data.tenant || undefined,
    lease: data.lease || undefined,
    vendor: data.vendor || undefined,
    entryType: data.entryType,
    status: data.status,
    finance: data.finance,
    lines: data.lines,
    reference: data.reference,
    memo: data.memo || undefined,
  };
}

export const badgeStatusVariant = (status?: string) => {
  switch (status) {
    case "Cleared":
    case "Active":
    case "Occupied":
      return "default" as const;
    case "Reconciled":
    case "Posted":
      return "secondary" as const;
    case "Deleted":
      return "destructive" as const;
    default:
      return "outline" as const;
  }
};

export const formatCurrency = (amount?: number, currency = "INR") =>
  amount === undefined || amount === null
    ? "—"
    : new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency,
      maximumFractionDigits: 0,
    }).format(amount);