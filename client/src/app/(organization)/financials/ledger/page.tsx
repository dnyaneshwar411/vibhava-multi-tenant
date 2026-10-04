"use client";

import Link from "next/link";
import { useState } from "react";

import AdvancedPagination from "@/components/common/advanced-pagination";
import { ErrorState } from "@/components/ui/error";
import { ComponentLoader } from "@/components/ui/loader";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyTitle,
} from "@/components/ui/empty";
import useFetch from "@/hooks/useFetch";
import AddLedger from "@/modules/ledger/components/add-ledger";

type LedgerLine = {
  _id?: string;
  accountId?: string;
  accountName?: string;
  type?: "DEBIT" | "CREDIT";
  amount?: number;
  description?: string;
};

type LedgerEntry = {
  _id?: string;
  property?: { _id?: string; name?: string };
  unit?: { _id?: string; unitNumber?: string };
  entryType?: string;
  status?: string;
  finance?: {
    currency?: string;
    totalAmount?: number;
    paymentGateway?: string;
  };
  period?: {
    startDate?: string;
    endDate?: string;
    billingCycle?: string;
  };
  lines?: LedgerLine[];
  memo?: string;
  isDeleted?: boolean;
};

type LedgerResponse = {
  code?: number;
  message?: string;
  data?: LedgerEntry[];
  pagination?: {
    pageNumber?: number;
    limitNumber?: number;
    skip?: number;
    total?: number;
  };
};

const formatCurrency = (amount?: number, currency?: string) => {
  if (amount === undefined || amount === null) return "—";
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: currency ?? "INR",
    maximumFractionDigits: 0,
  }).format(amount);
};

const formatDate = (iso?: string) => {
  if (!iso) return "—";
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return "—";
  return date.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

const statusVariant = (status?: string) => {
  switch (status) {
    case "Reconciled":
      return "default" as const;
    case "Posted":
      return "secondary" as const;
    case "Cleared":
      return "outline" as const;
    default:
      return "secondary" as const;
  }
};

export default function Page() {
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
  });

  const { isLoading, data, error, mutate } = useFetch(
    "/api/v1/ledger/entries",
    {
      page: pagination.page.toString(),
      limit: pagination.limit.toString(),
    }
  );

  if (isLoading) {
    return (
      <div className="flex items-center justify-center">
        <ComponentLoader />
      </div>
    );
  }

  if (error || data?.code !== 200) {
    return (
      <div className="flex items-center justify-center">
        <ErrorState
          title={data?.message ?? "Dashboard Sync Error"}
          description="The database cluster returned an invalid schema or network failure."
          reset={() => mutate()}
        />
      </div>
    );
  }

  const entries = data?.data ?? [];
  const total = data?.pagination?.total ?? 0;

  return (
    <div className="mx-auto w-full max-w-7xl space-y-6 p-4 sm:p-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-xl font-semibold">Ledger Entries</h1>
          <p className="text-sm text-muted-foreground">{total} total entries</p>
        </div>

        <div className="flex items-center gap-2">
          {/* <Button>Create Ledger</Button> */}
          <AddLedger />
        </div>
      </div>

      {entries.length === 0 ? (
        <Card>
          <CardContent className="py-4">
            <Empty>
              <EmptyHeader>
                <EmptyTitle>No entries found</EmptyTitle>
                <EmptyDescription>
                  There are no ledger entries to display yet.
                </EmptyDescription>
              </EmptyHeader>
            </Empty>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle className="text-base">All Entries</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="hidden overflow-x-auto md:block">
              <table className="min-w-full text-sm">
                <thead className="text-left text-xs font-medium uppercase text-muted-foreground">
                  <tr className="border-b">
                    <th className="px-4 py-3">Property / Unit</th>
                    <th className="px-4 py-3">Entry Type</th>
                    <th className="px-4 py-3">Status</th>
                    <th className="px-4 py-3">Period</th>
                    <th className="px-4 py-3 text-right">Amount</th>
                    <th className="px-4 py-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {entries.map((entry: any) => (
                    <tr
                      key={entry?._id}
                      className="border-b last:border-0 hover:bg-muted/50"
                    >
                      <td className="px-4 py-3">
                        <div className="font-medium">
                          {entry?.property?.name ?? "—"}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          Unit {entry?.unit?.unitNumber ?? "—"}
                        </div>
                      </td>
                      <td className="px-4 py-3 text-muted-foreground">
                        {entry?.entryType ?? "—"}
                      </td>
                      <td className="px-4 py-3">
                        <Badge variant={statusVariant(entry?.status)}>
                          {entry?.status ?? "—"}
                        </Badge>
                      </td>
                      <td className="px-4 py-3 text-xs text-muted-foreground">
                        {formatDate(entry?.period?.startDate)} –{" "}
                        {formatDate(entry?.period?.endDate)}
                        <div>{entry?.period?.billingCycle ?? "—"}</div>
                      </td>
                      <td className="px-4 py-3 text-right font-medium">
                        {formatCurrency(
                          entry?.finance?.totalAmount,
                          entry?.finance?.currency
                        )}
                      </td>
                      <td className="px-4 py-3 text-right">
                        <Button variant="ghost" size="sm">
                          <Link href={`/financials/ledger/${entry?._id}`}>View</Link>
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <ul className="divide-y md:hidden">
              {entries.map((entry: any) => (
                <li key={entry?._id} className="space-y-2 p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="font-medium">
                        {entry?.property?.name ?? "—"}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        Unit {entry?.unit?.unitNumber ?? "—"} ·{" "}
                        {entry?.entryType ?? "—"}
                      </div>
                    </div>
                    <Badge variant={statusVariant(entry?.status)}>
                      {entry?.status ?? "—"}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-xs text-muted-foreground">
                      {formatDate(entry?.period?.startDate)} –{" "}
                      {formatDate(entry?.period?.endDate)}
                    </span>
                    <span className="font-medium">
                      {formatCurrency(
                        entry?.finance?.totalAmount,
                        entry?.finance?.currency
                      )}
                    </span>
                  </div>
                  <Button variant="outline" size="sm" className="w-full">
                    <Link href={`/ledger/${entry?._id}`}>View details</Link>
                  </Button>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}

      <AdvancedPagination
        page={pagination.page}
        limit={pagination.limit}
        total={total}
        onPageChange={(page) => setPagination((prev) => ({ ...prev, page }))}
        onLimitChange={(limit) =>
          setPagination((prev) => ({ ...prev, limit, page: 1 }))
        }
      />
    </div>
  );
}