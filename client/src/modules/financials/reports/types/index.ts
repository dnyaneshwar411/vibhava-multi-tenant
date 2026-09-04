export type ProfitLossSummary = {
  totalRevenue: number;
  totalExpenses: number;
  netIncome: number;
  operatingMargin: number;
}

export type RevenueBreakdown = {
  rentPayments: number;
  lateFees: number;
  securityDepositsIn: number;
  otherIncome: number;
}

export type ExpenseBreakdown = {
  maintenanceExpenses: number;
  securityDepositRefunds: number;
  ownerDistributions: number;
  otherExpenses: number;
}

export type MonthlyTrendItem = {
  month: string;
  revenue: number;
  expenses: number;
  net: number;
}

export type LedgerEntryItem = {
  id: string;
  property: string;
  unit: string;
  partyName: string;
  entryType: string;
  amount: number;
  status: string;
  date: string | Date;
  memo?: string;
}

export type ProfitLossReportData = {
  role: string;
  summary: ProfitLossSummary;
  revenueBreakdown: RevenueBreakdown;
  expenseBreakdown: ExpenseBreakdown;
  monthlyTrend: MonthlyTrendItem[];
  entries: LedgerEntryItem[];
}

export type RentRollSummary = {
  totalUnits: number;
  occupiedUnits: number;
  vacantUnits: number;
  occupancyRate: number;
  totalScheduledRent: number;
  totalCollectedRent: number;
  totalOutstanding: number;
  totalSecurityDeposits: number;
}

export type RentRollUnitItem = {
  unitId: string;
  propertyId: string | null;
  propertyName: string;
  unitNumber: string;
  unitType: string;
  furnishingStatus: string;
  status: string;
  tenantName: string;
  tenantEmail: string;
  tenantPhone: string;
  leaseStart: string | Date | null;
  leaseEnd: string | Date | null;
  monthlyRent: number;
  totalDue: number;
  amountPaid: number;
  outstandingBalance: number;
  paymentStatus: string;
  securityDepositPaid: number;
  securityDepositStatus: string;
}

export type RentRollReportData = {
  role: string;
  summary: RentRollSummary;
  units: RentRollUnitItem[];
}

export type ReportFilterOptions = {
  unit?: string;
  paymentStatus?: string;
  rentAfter?: string;
  rentBefore?: string;
  startDate?: string;
  endDate?: string;
  propertyId?: string;
}
