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
  Building,
  Home,
  DollarSign,
  AlertCircle,
  Printer,
  Download,
  ShieldCheck,
} from "lucide-react";
import { DEFAULT_RENT_ROLL_SUMMARY } from "../config/constants";
import { formatCurrency, formatDate, exportToCSV } from "../helpers/formatters";
import RentRollFilterOptions from "./rent-roll-filter-options";

export default function RentRollStatement() {
  const [filters, setFilters] = useState<Record<string, any>>({
    paymentStatus: "",
    rentAfter: "",
    rentBefore: "",
  });

  const { isLoading, data, error, mutate } = useFetch("/api/v1/reports/rent-roll", filters);

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
          title={data?.message || "Rent Roll Report Error"}
          description="Failed to retrieve the Rent Roll report data from the database cluster."
          reset={() => mutate()}
        />
      </div>
    );
  }

  const report = data?.data || {};
  const summary = report.summary || DEFAULT_RENT_ROLL_SUMMARY;
  const units = report.units || [];

  const handlePrint = () => {
    try {
      window.print();
    } catch (err) {
      console.error("Print failed", err);
    }
  };

  const handleExportCSV = () => {
    if (!units || units.length === 0) return;
    const headers = [
      "Property",
      "Unit #",
      "Type",
      "Status",
      "Tenant Name",
      "Monthly Rent",
      "Amount Paid",
      "Outstanding Balance",
      "Payment Status",
      "Deposit Paid",
    ];
    const rows = units.map((u: any) => [
      u.propertyName || "Unassigned Property",
      u.unitNumber || "N/A",
      u.unitType || "Standard",
      u.status || "Vacant",
      u.tenantName || "N/A",
      u.monthlyRent ?? 0,
      u.amountPaid ?? 0,
      u.outstandingBalance ?? 0,
      u.paymentStatus || "Vacant",
      u.securityDepositPaid ?? 0,
    ]);
    exportToCSV(`Rent_Roll_Report_${new Date().toISOString().slice(0, 10)}.csv`, headers, rows);
  };

  return (
    <div className="space-y-6 p-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-gray-100">
              Rent Roll Report
            </h1>
            <Badge variant="outline" className="border-teal-600 text-teal-700 dark:text-teal-400 font-semibold">
              Actor: {report.role || "User"}
            </Badge>
          </div>
          <p className="mt-1 text-sm text-gray-500">
            Real-time occupancy status, lease terms, rent collection balances, and security deposit summary.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <RentRollFilterOptions pagination={filters} setPagination={setFilters} />

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
        <Card className="border-l-4 border-l-teal-600 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Occupancy Rate</CardTitle>
            <div className="rounded-full bg-teal-100 p-2 text-teal-600 dark:bg-teal-950 dark:text-teal-400">
              <Home className="h-4 w-4" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">
              {summary.occupancyRate ?? 0}%
            </div>
            <p className="mt-1 text-xs text-gray-500">
              {summary.occupiedUnits ?? 0} Occupied / {summary.vacantUnits ?? 0} Vacant (Total {summary.totalUnits ?? 0})
            </p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-emerald-600 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Scheduled Monthly Rent</CardTitle>
            <div className="rounded-full bg-emerald-100 p-2 text-emerald-600 dark:bg-emerald-950 dark:text-emerald-400">
              <DollarSign className="h-4 w-4" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">
              {formatCurrency(summary.totalScheduledRent)}
            </div>
            <p className="mt-1 text-xs text-emerald-600 dark:text-emerald-400">
              Collected: {formatCurrency(summary.totalCollectedRent)}
            </p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-rose-600 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Outstanding Delinquency</CardTitle>
            <div className="rounded-full bg-rose-100 p-2 text-rose-600 dark:bg-rose-950 dark:text-rose-400">
              <AlertCircle className="h-4 w-4" />
            </div>
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold ${(summary.totalOutstanding ?? 0) > 0 ? "text-rose-600 dark:text-rose-400" : "text-gray-900 dark:text-gray-100"}`}>
              {formatCurrency(summary.totalOutstanding)}
            </div>
            <p className="mt-1 text-xs text-gray-500">Uncollected tenant rent balance</p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-amber-500 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Deposits Held in Trust</CardTitle>
            <div className="rounded-full bg-amber-100 p-2 text-amber-600 dark:bg-amber-950 dark:text-amber-400">
              <ShieldCheck className="h-4 w-4" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">
              {formatCurrency(summary.totalSecurityDeposits)}
            </div>
            <p className="mt-1 text-xs text-gray-500">Total active security deposits</p>
          </CardContent>
        </Card>
      </div>

      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle className="text-base font-semibold">Unit Rent Roll Details</CardTitle>
          <CardDescription>Detailed inventory of properties, unit leases, monthly rent amounts, and current payment balances</CardDescription>
        </CardHeader>
        <CardContent>
          {units.length === 0 ? (
            <div className="py-8 text-center text-sm text-gray-500">
              No unit rent roll records found for this organization matching the selected filters.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Property & Unit</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Tenant</TableHead>
                    <TableHead>Lease Dates</TableHead>
                    <TableHead>Monthly Rent</TableHead>
                    <TableHead>Paid / Due</TableHead>
                    <TableHead>Outstanding</TableHead>
                    <TableHead>Payment Status</TableHead>
                    <TableHead>Security Deposit</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {units.map((u: any, idx: number) => {
                    const statusColors: Record<string, string> = {
                      Paid: "bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300",
                      Partial: "bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300",
                      Overdue: "bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300",
                      Vacant: "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300",
                    };

                    return (
                      <TableRow key={u.unitId || `unit-${idx}`}>
                        <TableCell className="font-medium">
                          <div className="flex items-center gap-2">
                            <Building className="h-4 w-4 text-gray-400" />
                            <div>
                              <div>{u.propertyName || "Property"}</div>
                              <div className="text-xs text-gray-500">Unit: {u.unitNumber || "N/A"}</div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell className="text-sm">
                          <div>{u.unitType || "Standard"}</div>
                          <div className="text-xs text-gray-400">{u.furnishingStatus || "Unfurnished"}</div>
                        </TableCell>
                        <TableCell className="text-sm">
                          <div className="font-medium text-gray-900 dark:text-gray-100">{u.tenantName || "N/A"}</div>
                          {u.tenantEmail && u.tenantEmail !== "N/A" && (
                            <div className="text-xs text-gray-500">{u.tenantEmail}</div>
                          )}
                        </TableCell>
                        <TableCell className="text-xs text-gray-500">
                          {u.leaseStart && u.leaseEnd ? (
                            <div>
                              <div>{formatDate(u.leaseStart)}</div>
                              <div>to {formatDate(u.leaseEnd)}</div>
                            </div>
                          ) : (
                            "No Active Lease"
                          )}
                        </TableCell>
                        <TableCell className="font-semibold text-gray-900 dark:text-gray-100">
                          {formatCurrency(u.monthlyRent)}
                        </TableCell>
                        <TableCell className="text-sm">
                          <span className="text-emerald-600 font-medium">{formatCurrency(u.amountPaid)}</span>
                          <span className="text-xs text-gray-400"> / {formatCurrency(u.totalDue)}</span>
                        </TableCell>
                        <TableCell className={`font-semibold ${(u.outstandingBalance ?? 0) > 0 ? "text-rose-600 dark:text-rose-400" : "text-gray-500"}`}>
                          {formatCurrency(u.outstandingBalance)}
                        </TableCell>
                        <TableCell>
                          <Badge className={`border-none ${statusColors[u.paymentStatus] || statusColors.Vacant}`}>
                            {u.paymentStatus || "Vacant"}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-xs text-gray-600 dark:text-gray-400">
                          <div>{formatCurrency(u.securityDepositPaid)}</div>
                          <div className="text-xs text-gray-400">{u.securityDepositStatus || "Unpaid"}</div>
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
