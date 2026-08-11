"use client";

import { useMemo, useState } from "react";
import {
  Search,
  FileText,
  CalendarDays,
  Building2,
  Layers3,
  ArrowUpRight,
  Trash2,
} from "lucide-react";
import Link from "next/link";

import useFetch from "@/hooks/useFetch";
import { useDebounce } from "@/hooks/useDebounce";
import { ErrorState } from "@/components/ui/error";
import { ComponentLoader } from "@/components/ui/loader";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import AdvancedPagination from "@/components/common/advanced-pagination";
import CreateLease from "@/modules/lease/components/create-lease";
import { DeleteLease } from "@/modules/lease/components/delete-lease";
import { buttonVariants } from "@/components/ui/button";

type LeaseRow = {
  _id: string;
  property?: { _id?: string; name?: string } | null;
  unit?: { _id?: string; unitNumber?: string } | null;
  leaseType?: string;
  status?: string;
  createdAt?: string;
};

export default function Page() {
  const [pagination, setPagination] = useState({
    query: "",
    page: 1,
    limit: 10,
  });

  const debouncedQuery = useDebounce(pagination.query);

  const { isLoading, data, error, mutate } = useFetch("/api/v1/lease", {
    query: debouncedQuery,
    page: pagination.page.toString(),
    limit: pagination.limit.toString(),
  });

  const leases: LeaseRow[] = useMemo(() => data?.data ?? [], [data]);
  const paginationData = data?.pagination;

  if (isLoading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <ComponentLoader />
      </div>
    );
  }

  if (error || data?.code !== 200) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <ErrorState
          title={data?.message || "Lease Sync Error"}
          description="The backend returned an invalid response or the request failed."
          reset={() => mutate()}
        />
      </div>
    );
  }

  return (
    <div className="flex w-full flex-col gap-6 p-4 md:p-6">
      <div className="flex flex-col gap-4 border-b pb-5 sm:flex-row sm:items-end sm:justify-between">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-semibold tracking-tight">Leases</h1>
            <Badge variant="secondary" className="font-normal">
              {paginationData?.total ?? 0} total
            </Badge>
          </div>
          <p className="text-sm text-muted-foreground">
            Track active and draft lease records across properties and units.
          </p>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="relative w-full sm:w-72">
            <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search leases"
              value={pagination.query}
              onChange={(e) =>
                setPagination((prev) => ({
                  ...prev,
                  query: e.target.value,
                  page: 1,
                }))
              }
              className="pl-9"
            />
          </div>

          <CreateLease>
            <span className={buttonVariants({ variant: "default" })}>
              Create Lease
            </span>
          </CreateLease>
        </div>
      </div>

      {leases.length === 0 ? (
        <div className="flex min-h-[55vh] items-center justify-center">
          <Empty>
            <EmptyHeader>
              <EmptyMedia variant="icon">
                <FileText />
              </EmptyMedia>
              <EmptyTitle>No leases found</EmptyTitle>
              <EmptyDescription>
                Create a lease to start tracking occupancy and rent cycles.
              </EmptyDescription>
            </EmptyHeader>
          </Empty>
        </div>
      ) : (
        <div className="grid gap-4 xl:grid-cols-2">
          {leases.map((lease) => {
            const createdAt = lease.createdAt
              ? new Date(lease.createdAt).toLocaleDateString()
              : "—";

            return (
              <Card key={lease._id}>
                <CardHeader className="space-y-3">
                  <div className="flex items-start justify-between gap-3">
                    <div className="space-y-1">
                      <CardTitle className="text-base">Lease #{lease._id.slice(-6)}</CardTitle>
                      <CardDescription className="flex items-center gap-2">
                        <CalendarDays className="size-4" />
                        Created {createdAt}
                      </CardDescription>
                    </div>
                    <div className="flex flex-wrap items-center gap-2">
                      <Badge variant="secondary" className="capitalize">
                        {lease.status || "Unknown"}
                      </Badge>
                      <Badge variant="outline" className="capitalize">
                        {lease.leaseType || "Lease"}
                      </Badge>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="grid gap-3 sm:grid-cols-2">
                  <div className="rounded-lg border bg-background p-3">
                    <div className="flex items-center gap-2 text-xs uppercase tracking-wide text-muted-foreground">
                      <Building2 className="size-4" />
                      Property
                    </div>
                    <p className="mt-1 text-sm font-medium">
                      {lease.property?.name || "Unassigned"}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {lease.property?._id || "No property linked"}
                    </p>
                  </div>

                  <div className="rounded-lg border bg-background p-3">
                    <div className="flex items-center gap-2 text-xs uppercase tracking-wide text-muted-foreground">
                      <Layers3 className="size-4" />
                      Unit
                    </div>
                    <p className="mt-1 text-sm font-medium">
                      {lease.unit?.unitNumber || "Unassigned"}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {lease.unit?._id || "No unit linked"}
                    </p>
                  </div>
                </CardContent>

                <div className="flex items-center justify-between gap-2 border-t px-6 py-4">
                  <DeleteLease
                    leaseId={lease._id}
                    leaseLabel={`Lease #${lease._id.slice(-6)}`}
                  >
                    <span
                      className={buttonVariants({
                        variant: "destructive",
                        size: "sm",
                      })}
                    >
                      <Trash2 className="mr-1 size-4" />
                      Delete
                    </span>
                  </DeleteLease>

                  <Link
                    href={`/management/leases/${lease._id}`}
                    className={buttonVariants({ variant: "outline", size: "sm" })}
                  >
                    View details
                    <ArrowUpRight className="ml-1 size-4" />
                  </Link>
                </div>
              </Card>
            );
          })}
        </div>
      )}

      <AdvancedPagination
        page={pagination.page}
        limit={pagination.limit}
        total={paginationData?.total ?? 0}
        onPageChange={(page) => setPagination((prev) => ({ ...prev, page }))}
        onLimitChange={(limit) =>
          setPagination((prev) => ({ ...prev, limit, page: 1 }))
        }
      />
    </div>
  );
}
