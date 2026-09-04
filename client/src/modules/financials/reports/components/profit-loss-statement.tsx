"use client";

import { useState } from "react";
import { ErrorState } from "@/components/ui/error";
import { ComponentLoader } from "@/components/ui/loader";
import useFetch from "@/hooks/useFetch";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  Printer,
  Download,
  Receipt,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
} from "recharts";
import { ROLE_TITLE_CONFIG, DEFAULT_PROFIT_LOSS_SUMMARY } from "../config/constants";
import { formatCurrency, formatDate, exportToCSV } from "../helpers/formatters";
import ProfitLossFilterOptions from "./profit-loss-filter-options";

export default function ProfitLossStatement() {
  const [filters, setFilters] = useState<Record<string, any>>({
    startDate: "",
    endDate: "",
  });

  const { isLoading, data, error, mutate } = useFetch("/api/v1/reports/profit-loss", filters);

  if (isLoading) {
    return (
      <div className="flex h-96 items-center justify-center">
        <ComponentLoader />
      </div>
    );
  }

  if (error || data?.code !== 200) {
    return (
      <div className="flex h-96 items-center justify-center">
        <ErrorState
          title={data?.message || "Report Generation Error"}
          description="Failed to load the Profit & Loss statement from the server."
          reset={() => mutate()}
        />
      </div>
    );
  }

  const report = data?.data || {};
  const role = report.role || "User";
  const summary = report.summary || DEFAULT_PROFIT_LOSS_SUMMARY;
  const revBreakdown = report.revenueBreakdown || {};
  const expBreakdown = report.expenseBreakdown || {};
  const monthlyTrend = report.monthlyTrend || [];
  const entries = report.entries || [];

  const currentConfig = ROLE_TITLE_CONFIG[role] || ROLE_TITLE_CONFIG.User;

  const handlePrint = () => {
    try {
      window.print();
    } catch (err) {
      console.error("Print action failed", err);
    }
  };

  const handleExportCSV = () => {
    if (!entries || entries.length === 0) return;
    const headers = ["ID", "Property", "Unit", "Party", "Type", "Amount", "Status", "Date"];
    const rows = entries.map((e: any) => [
      e.id || "N/A",
      e.property || "N/A",
      e.unit || "N/A",
      e.partyName || "N/A",
      e.entryType || "N/A",
      e.amount ?? 0,
      e.status || "Posted",
      formatDate(e.date),
    ]);
    exportToCSV(`Profit_Loss_Report_${role}_${new Date().toISOString().slice(0, 10)}.csv`, headers, rows);
  };

  return (
    <div className="space-y-6 p-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold tracking-tight text-foreground">
              {currentConfig.title}
            </h1>
            <Badge variant="outline">
              Role: {role}
            </Badge>
          </div>
          <p className="mt-1 text-sm text-muted-foreground">{currentConfig.subtitle}</p>
        </div>

        <div className="flex items-center gap-2">
          <ProfitLossFilterOptions pagination={filters} setPagination={setFilters} />
          <Button variant="outline" size="sm" onClick={handlePrint} className="gap-2">
            <Printer className="h-4 w-4" />
            Print
          </Button>
          <Button variant="default" size="sm" onClick={handleExportCSV} className="gap-2">
            <Download className="h-4 w-4" />
            Export CSV
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card className="border">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">{currentConfig.card1}</CardTitle>
            <div className="bg-muted p-2 text-foreground">
              <TrendingUp className="h-4 w-4" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">
              {formatCurrency(summary.totalRevenue)}
            </div>
            <p className="mt-1 text-xs text-muted-foreground flex items-center gap-1">
              <ArrowUpRight className="h-3 w-3" /> Income inflow
            </p>
          </CardContent>
        </Card>

        <Card className="border">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">{currentConfig.card2}</CardTitle>
            <div className="bg-muted p-2 text-foreground">
              <TrendingDown className="h-4 w-4" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">
              {formatCurrency(summary.totalExpenses)}
            </div>
            <p className="mt-1 text-xs text-muted-foreground flex items-center gap-1">
              <ArrowDownRight className="h-3 w-3" /> Expenditure outflow
            </p>
          </CardContent>
        </Card>

        <Card className="border">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">{currentConfig.card3}</CardTitle>
            <div className="bg-muted p-2 text-foreground">
              <DollarSign className="h-4 w-4" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">
              {formatCurrency(summary.netIncome)}
            </div>
            <p className="mt-1 text-xs text-muted-foreground">Net balance after deductions</p>
          </CardContent>
        </Card>

        <Card className="border">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">{currentConfig.card4}</CardTitle>
            <div className="bg-muted p-2 text-foreground">
              <Receipt className="h-4 w-4" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">
              {summary.operatingMargin ?? 0}%
            </div>
            <p className="mt-1 text-xs text-muted-foreground">Performance ratio</p>
          </CardContent>
        </Card>
      </div>

      {monthlyTrend.length > 0 && (
        <Card className="border">
          <CardHeader>
            <CardTitle className="text-base font-semibold">Monthly Financial Flow Trend</CardTitle>
            <CardDescription>Visual comparison of revenue, expenses, and net profit over time</CardDescription>
          </CardHeader>
          <CardContent className="h-72 w-full pt-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthlyTrend} margin={{ top: 10, right: 30, left: 10, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="month" fontSize={12} tickLine={false} />
                <YAxis fontSize={12} tickLine={false} tickFormatter={(val) => `₹${val}`} />
                <Tooltip formatter={(value: any) => [formatCurrency(Number(value || 0)), ""]} />
                <Legend />
                <Bar dataKey="revenue" name={role === "Vendor" ? "Earnings" : role === "Tenant" ? "Payments" : "Revenue"} fill="var(--primary, #000)" />
                <Bar dataKey="expenses" name={role === "Vendor" ? "Pending" : role === "Tenant" ? "Charges" : "Expenses"} fill="var(--muted-foreground, #666)" />
                <Bar dataKey="net" name="Net Amount" fill="var(--accent-foreground, #333)" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      )}

      {role === "User" && (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <Card className="border">
            <CardHeader>
              <CardTitle className="text-base font-semibold flex items-center gap-2">
                <TrendingUp className="h-5 w-5" /> Revenue & Income Breakdown
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between border-b pb-2 text-sm">
                <span className="text-muted-foreground">Rent Payments</span>
                <span className="font-semibold text-foreground">{formatCurrency(revBreakdown.rentPayments)}</span>
              </div>
              <div className="flex items-center justify-between border-b pb-2 text-sm">
                <span className="text-muted-foreground">Late Fees Collected</span>
                <span className="font-semibold text-foreground">{formatCurrency(revBreakdown.lateFees)}</span>
              </div>
              <div className="flex items-center justify-between border-b pb-2 text-sm">
                <span className="text-muted-foreground">Security Deposits Received</span>
                <span className="font-semibold text-foreground">{formatCurrency(revBreakdown.securityDepositsIn)}</span>
              </div>
              <div className="flex items-center justify-between pb-2 text-sm">
                <span className="text-muted-foreground">Other Income</span>
                <span className="font-semibold text-foreground">{formatCurrency(revBreakdown.otherIncome)}</span>
              </div>
            </CardContent>
          </Card>

          <Card className="border">
            <CardHeader>
              <CardTitle className="text-base font-semibold flex items-center gap-2">
                <TrendingDown className="h-5 w-5" /> Operating Expense Breakdown
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between border-b pb-2 text-sm">
                <span className="text-muted-foreground">Maintenance & Repairs</span>
                <span className="font-semibold text-foreground">{formatCurrency(expBreakdown.maintenanceExpenses)}</span>
              </div>
              <div className="flex items-center justify-between border-b pb-2 text-sm">
                <span className="text-muted-foreground">Security Deposit Refunds</span>
                <span className="font-semibold text-foreground">{formatCurrency(expBreakdown.securityDepositRefunds)}</span>
              </div>
              <div className="flex items-center justify-between border-b pb-2 text-sm">
                <span className="text-muted-foreground">Owner Distributions</span>
                <span className="font-semibold text-foreground">{formatCurrency(expBreakdown.ownerDistributions)}</span>
              </div>
              <div className="flex items-center justify-between pb-2 text-sm">
                <span className="text-muted-foreground">Other Expenses</span>
                <span className="font-semibold text-foreground">{formatCurrency(expBreakdown.otherExpenses)}</span>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      <Card className="border">
        <CardHeader>
          <CardTitle className="text-base font-semibold">Ledger Transaction History</CardTitle>
          <CardDescription>Itemized transaction logs associated with your profile</CardDescription>
        </CardHeader>
        <CardContent>
          {entries.length === 0 ? (
            <div className="py-8 text-center text-sm text-muted-foreground">
              No financial ledger transactions found for this account.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Property / Unit</TableHead>
                    <TableHead>Party Name</TableHead>
                    <TableHead>Entry Type</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Amount</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {entries.map((entry: any, idx: number) => {
                    const isPositive =
                      ["Rent Payment", "Late Fee Charge", "Security Deposit In"].includes(entry.entryType) ||
                      (role === "Vendor" && (entry.status === "Cleared" || entry.status === "Posted"));

                    return (
                      <TableRow key={entry.id || `entry-${idx}`}>
                        <TableCell className="font-medium">
                          <div>{entry.property || "N/A"}</div>
                          <div className="text-xs text-muted-foreground">Unit: {entry.unit || "N/A"}</div>
                        </TableCell>
                        <TableCell className="text-sm">{entry.partyName || "N/A"}</TableCell>
                        <TableCell>
                          <Badge variant="outline" className="text-xs font-normal">
                            {entry.entryType || "General"}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-sm text-muted-foreground">
                          {formatDate(entry.date)}
                        </TableCell>
                        <TableCell>
                          <Badge variant="secondary">
                            {entry.status || "Posted"}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right font-semibold">
                          {isPositive ? "+" : "-"}{formatCurrency(entry.amount)}
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
