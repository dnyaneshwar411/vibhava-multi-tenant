import { Option } from "@/components/ui/multi-select";

export const PAYMENT_STATUS_OPTIONS: Option<{ _id: string }>[] = [
  { _id: "Paid", label: "Paid", value: "Paid" },
  { _id: "Partial", label: "Partial", value: "Partial" },
  { _id: "Overdue", label: "Overdue", value: "Overdue" },
  { _id: "Vacant", label: "Vacant", value: "Vacant" },
];

export const ROLE_TITLE_CONFIG: Record<
  string,
  {
    title: string;
    subtitle: string;
    card1: string;
    card2: string;
    card3: string;
    card4: string;
  }
> = {
  User: {
    title: "Profit & Loss Statement",
    subtitle: "Comprehensive financial overview of revenues, operating expenses, and Net Operating Income (NOI).",
    card1: "Total Gross Revenue",
    card2: "Operating Expenses",
    card3: "Net Operating Income (NOI)",
    card4: "Operating Margin Ratio",
  },
  Tenant: {
    title: "Tenant Financial Statement",
    subtitle: "Personal rent payments, billing charges, deposit summary, and payment history ledger.",
    card1: "Total Payments Made",
    card2: "Total Charges Billed",
    card3: "Net Payment Balance",
    card4: "Payment Clearance Rate",
  },
  Vendor: {
    title: "Vendor Earnings & Payout Statement",
    subtitle: "Overview of work order earnings, cleared payouts, and pending service compensation.",
    card1: "Total Earnings Cleared",
    card2: "Pending Payouts",
    card3: "Net Payout Income",
    card4: "Payout Clearance Rate",
  },
};

export const DEFAULT_PROFIT_LOSS_SUMMARY = {
  totalRevenue: 0,
  totalExpenses: 0,
  netIncome: 0,
  operatingMargin: 0,
};

export const DEFAULT_RENT_ROLL_SUMMARY = {
  totalUnits: 0,
  occupiedUnits: 0,
  vacantUnits: 0,
  occupancyRate: 0,
  totalScheduledRent: 0,
  totalCollectedRent: 0,
  totalOutstanding: 0,
  totalSecurityDeposits: 0,
};
