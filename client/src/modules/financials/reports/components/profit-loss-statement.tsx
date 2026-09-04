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
            <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-gray-100">
              {currentConfig.title}
            </h1>
            <Badge variant="outline" className="border-teal-600 text-teal-700 dark:text-teal-400 font-semibold">
              Role: {role}
            </Badge>
          </div>
          <p className="mt-1 text-sm text-gray-500">{currentConfig.subtitle}</p>
        </div>

        <div className="flex items-center gap-2">
          <ProfitLossFilterOptions pagination={filters} setPagination={setFilters} />
          <Button variant="outline" size="sm" onClick={handlePrint} className="gap-2">
            <Printer className="h-4 w-4" />
            Print
          </Button>
          <Button variant="default" size="sm" onClick={handleExportCSV} className="gap-2 bg-teal-700 hover:bg-teal-800 text-white">
            <Download className="h-4 w-4" />
            Export CSV
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card className="border-l-4 border-l-emerald-600 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">{currentConfig.card1}</CardTitle>
            <div className="rounded-full bg-emerald-100 p-2 text-emerald-600 dark:bg-emerald-950 dark:text-emerald-400">
              <TrendingUp className="h-4 w-4" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">
              {formatCurrency(summary.totalRevenue)}
            </div>
            <p className="mt-1 text-xs text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
              <ArrowUpRight className="h-3 w-3" /> Income inflow
            </p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-rose-600 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">{currentConfig.card2}</CardTitle>
            <div className="rounded-full bg-rose-100 p-2 text-rose-600 dark:bg-rose-950 dark:text-rose-400">
              <TrendingDown className="h-4 w-4" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">
              {formatCurrency(summary.totalExpenses)}
            </div>
            <p className="mt-1 text-xs text-rose-600 dark:text-rose-400 flex items-center gap-1">
              <ArrowDownRight className="h-3 w-3" /> Expenditure outflow
            </p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-amber-500 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">{currentConfig.card3}</CardTitle>
            <div className="rounded-full bg-amber-100 p-2 text-amber-600 dark:bg-amber-950 dark:text-amber-400">
              <DollarSign className="h-4 w-4" />
            </div>
          </CardHeader>
          <CardContent>
            <div
              className={`text-2xl font-bold ${
                (summary.netIncome ?? 0) >= 0
                  ? "text-emerald-700 dark:text-emerald-400"
                  : "text-rose-700 dark:text-rose-400"
              }`}
            >
              {formatCurrency(summary.netIncome)}
            </div>
            <p className="mt-1 text-xs text-gray-500">Net balance after deductions</p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-teal-600 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">{currentConfig.card4}</CardTitle>
            <div className="rounded-full bg-teal-100 p-2 text-teal-600 dark:bg-teal-950 dark:text-teal-400">
              <Receipt className="h-4 w-4" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">
              {summary.operatingMargin ?? 0}%
            </div>
            <p className="mt-1 text-xs text-gray-500">Performance ratio</p>
          </CardContent>
        </Card>
      </div>

      {monthlyTrend.length > 0 && (
        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle className="text-base font-semibold">Monthly Financial Flow Trend</CardTitle>
            <CardDescription>Visual comparison of revenue, expenses, and net profit over time</CardDescription>
          </CardHeader>
          <CardContent className="h-72 w-full pt-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthlyTrend} margin={{ top: 10, right: 30, left: 10, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                <XAxis dataKey="month" stroke="#6B7280" fontSize={12} tickLine={false} />
                <YAxis stroke="#6B7280" fontSize={12} tickLine={false} tickFormatter={(val) => `₹${val}`} />
                <Tooltip formatter={(value: any) => [formatCurrency(Number(value || 0)), ""]} />
                <Legend />
                <Bar dataKey="revenue" name={role === "Vendor" ? "Earnings" : role === "Tenant" ? "Payments" : "Revenue"} fill="#059669" radius={[4, 4, 0, 0]} />
                <Bar dataKey="expenses" name={role === "Vendor" ? "Pending" : role === "Tenant" ? "Charges" : "Expenses"} fill="#E11D48" radius={[4, 4, 0, 0]} />
                <Bar dataKey="net" name="Net Amount" fill="#D97706" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      )}

      {role === "User" && (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle className="text-base font-semibold text-emerald-700 dark:text-emerald-400 flex items-center gap-2">
                <TrendingUp className="h-5 w-5" /> Revenue & Income Breakdown
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between border-b pb-2 text-sm">
                <span className="text-gray-600 dark:text-gray-400">Rent Payments</span>
                <span className="font-semibold text-gray-900 dark:text-gray-100">{formatCurrency(revBreakdown.rentPayments)}</span>
              </div>
              <div className="flex items-center justify-between border-b pb-2 text-sm">
                <span className="text-gray-600 dark:text-gray-400">Late Fees Collected</span>
                <span className="font-semibold text-gray-900 dark:text-gray-100">{formatCurrency(revBreakdown.lateFees)}</span>
              </div>
              <div className="flex items-center justify-between border-b pb-2 text-sm">
                <span className="text-gray-600 dark:text-gray-400">Security Deposits Received</span>
                <span className="font-semibold text-gray-900 dark:text-gray-100">{formatCurrency(revBreakdown.securityDepositsIn)}</span>
              </div>
              <div className="flex items-center justify-between pb-2 text-sm">
                <span className="text-gray-600 dark:text-gray-400">Other Income</span>
                <span className="font-semibold text-gray-900 dark:text-gray-100">{formatCurrency(revBreakdown.otherIncome)}</span>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle className="text-base font-semibold text-rose-700 dark:text-rose-400 flex items-center gap-2">
                <TrendingDown className="h-5 w-5" /> Operating Expense Breakdown
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between border-b pb-2 text-sm">
                <span className="text-gray-600 dark:text-gray-400">Maintenance & Repairs</span>
                <span className="font-semibold text-gray-900 dark:text-gray-100">{formatCurrency(expBreakdown.maintenanceExpenses)}</span>
              </div>
              <div className="flex items-center justify-between border-b pb-2 text-sm">
                <span className="text-gray-600 dark:text-gray-400">Security Deposit Refunds</span>
                <span className="font-semibold text-gray-900 dark:text-gray-100">{formatCurrency(expBreakdown.securityDepositRefunds)}</span>
              </div>
              <div className="flex items-center justify-between border-b pb-2 text-sm">
                <span className="text-gray-600 dark:text-gray-400">Owner Distributions</span>
                <span className="font-semibold text-gray-900 dark:text-gray-100">{formatCurrency(expBreakdown.ownerDistributions)}</span>
              </div>
              <div className="flex items-center justify-between pb-2 text-sm">
                <span className="text-gray-600 dark:text-gray-400">Other Expenses</span>
                <span className="font-semibold text-gray-900 dark:text-gray-100">{formatCurrency(expBreakdown.otherExpenses)}</span>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle className="text-base font-semibold">Ledger Transaction History</CardTitle>
          <CardDescription>Itemized transaction logs associated with your profile</CardDescription>
        </CardHeader>
        <CardContent>
          {entries.length === 0 ? (
            <div className="py-8 text-center text-sm text-gray-500">
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
                          <div className="text-xs text-gray-500">Unit: {entry.unit || "N/A"}</div>
                        </TableCell>
                        <TableCell className="text-sm">{entry.partyName || "N/A"}</TableCell>
                        <TableCell>
                          <Badge variant="outline" className="text-xs font-normal">
                            {entry.entryType || "General"}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-sm text-gray-500">
                          {formatDate(entry.date)}
                        </TableCell>
                        <TableCell>
                          <Badge
                            className={
                              entry.status === "Posted" || entry.status === "Cleared"
                                ? "bg-emerald-100 text-emerald-800 border-none dark:bg-emerald-950 dark:text-emerald-300"
                                : "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300"
                            }
                          >
                            {entry.status || "Posted"}
                          </Badge>
                        </TableCell>
                        <TableCell
                          className={`text-right font-semibold ${
                            isPositive ? "text-emerald-600 dark:text-emerald-400" : "text-rose-600 dark:text-rose-400"
                          }`}
                        >
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
