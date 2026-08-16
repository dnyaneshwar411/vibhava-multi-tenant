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
import { Button, buttonVariants } from "@/components/ui/button";
import { copyText } from "@/lib/helpers";
import LeaseCard from "@/modules/lease/components/lease-card";
import LeaseFilterOptions from "@/modules/lease/components/lease-filter-options";

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
    status: "",
    leaseType: "",
  });

  const debouncedQuery = useDebounce(pagination.query);

  const { isLoading, data, error, mutate } = useFetch("/api/v1/lease", {
    ...pagination,
    query: debouncedQuery
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
          {/* <button onClick={copyText(data.data)}>copy</button> */}
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
          <CreateLease>
            <span className={buttonVariants({ variant: "default" })}>
              Create Lease
            </span>
          </CreateLease>
          <LeaseFilterOptions
            pagination={pagination}
            setPagination={setPagination}
          />
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
          {leases.map(lease => <LeaseCard
            key={lease._id}
            lease={lease as any}
          />)}
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