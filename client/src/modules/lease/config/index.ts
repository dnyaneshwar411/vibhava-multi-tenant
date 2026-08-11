export const LEASE_TYPES = [
  "Fixed Term",
  "Month-to-Month",
  "Commercial",
  "Short Term",
] as const;

export const LEASE_STATUSES = [
  "Draft",
  "Pending Signature",
  "Active",
  "Expiring Soon",
  "Renewed",
  "Terminated",
  "Expired",
] as const;

export const LEASE_BILLING_CYCLES = [
  "Monthly",
  "Bi-Weekly",
  "Quarterly",
  "Annually",
] as const;

export const LEASE_SECURITY_DEPOSIT_STATUSES = [
  "Unpaid",
  "Partially Paid",
  "Paid in Full",
  "Refunded",
  "Forfeited",
] as const;
