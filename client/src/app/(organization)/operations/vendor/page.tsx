"use client";

import { useMemo, useState } from "react";
import {
  BadgeCheck,
  Building2,
  Mail,
  Search,
  ArrowUpRight,
  Trash2,
  Truck,
  Wrench,
} from "lucide-react";
import Link from "next/link";

import useFetch from "@/hooks/useFetch";
import { useDebounce } from "@/hooks/useDebounce";
import { ErrorState } from "@/components/ui/error";
import { ComponentLoader } from "@/components/ui/loader";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import AdvancedPagination from "@/components/common/advanced-pagination";
import CreateVendor from "@/modules/vendor/components/create-vendor";
import { DeleteVendor } from "@/modules/vendor/components/delete-vendor";
import { buttonVariants } from "@/components/ui/button";

type VendorRow = {
  _id: string;
  name?: string;
  email?: string;
  status?: string;
  tradeCategory?: string;
  createdBy?: string;
  isDeleted?: boolean;
};

export default function Page() {
  const [pagination, setPagination] = useState({
    query: "",
    page: 1,
    limit: 10,
  });

  const debouncedQuery = useDebounce(pagination.query);

  const { isLoading, data, error, mutate } = useFetch("/api/v1/vendor", {
    query: debouncedQuery,
    page: pagination.page.toString(),
    limit: pagination.limit.toString(),
  });

  const vendors: VendorRow[] = useMemo(() => data?.data ?? [], [data]);
  const paginationData = data?.pagination;

  const activeCount = vendors.filter((vendor) => vendor.status === "Active").length;
  const inactiveCount = vendors.filter((vendor) => vendor.status !== "Active").length;
  const tradeCategories = new Set(vendors.map((vendor) => vendor.tradeCategory).filter(Boolean));

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
          title={data?.message || "Vendor Sync Error"}
          description="The backend returned an invalid response or the request failed."
          reset={() => mutate()}
        />
      </div>
    );
  }

  return (
    <div className="flex w-full flex-col gap-6 p-4 md:p-6">
      <div className="rounded-lg border bg-card p-5">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-semibold tracking-tight">Vendors</h1>
              <Badge variant="secondary" className="font-normal">
                {paginationData?.total ?? 0} total
              </Badge>
            </div>
            <p className="max-w-2xl text-sm text-muted-foreground">
              Track service vendors, their trade categories, and operational status.
            </p>
          </div>

          <div className="relative w-full lg:w-80">
            <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search vendors"
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

          <CreateVendor>
            <span className={buttonVariants({ variant: "default" })}>
              Create Vendor
            </span>
          </CreateVendor>
        </div>

        <div className="mt-5 grid gap-3 sm:grid-cols-3">
          <div className="rounded-md border bg-background p-3">
            <p className="text-xs uppercase tracking-wide text-muted-foreground">Active</p>
            <div className="mt-2 flex items-center gap-2">
              <BadgeCheck className="size-4 text-muted-foreground" />
              <span className="text-lg font-semibold">{activeCount}</span>
            </div>
          </div>
          <div className="rounded-md border bg-background p-3">
            <p className="text-xs uppercase tracking-wide text-muted-foreground">Inactive</p>
            <div className="mt-2 flex items-center gap-2">
              <Truck className="size-4 text-muted-foreground" />
              <span className="text-lg font-semibold">{inactiveCount}</span>
            </div>
          </div>
          <div className="rounded-md border bg-background p-3">
            <p className="text-xs uppercase tracking-wide text-muted-foreground">Categories</p>
            <div className="mt-2 flex items-center gap-2">
              <Wrench className="size-4 text-muted-foreground" />
              <span className="text-lg font-semibold">{tradeCategories.size}</span>
            </div>
          </div>
        </div>
      </div>

      {vendors.length === 0 ? (
        <div className="flex min-h-[55vh] items-center justify-center">
          <Empty>
            <EmptyHeader>
              <EmptyMedia variant="icon">
                <Building2 />
              </EmptyMedia>
              <EmptyTitle>No vendors found</EmptyTitle>
              <EmptyDescription>
                Create vendors through the backend flow and they will show up here.
              </EmptyDescription>
            </EmptyHeader>
          </Empty>
        </div>
      ) : (
        <div className="overflow-hidden rounded-lg border bg-card">
          <Table className="min-w-max">
            <TableHeader className="sticky top-0 z-10 bg-background">
              <TableRow>
                <TableHead className="w-[280px]">Vendor</TableHead>
                <TableHead>Trade</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Created by</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {vendors.map((vendor) => (
                <TableRow key={vendor._id}>
                  <TableCell>
                    <div className="space-y-1">
                      <div className="font-medium text-foreground">{vendor.name || "Unnamed vendor"}</div>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <Mail className="size-3.5" />
                        <span className="truncate">{vendor.email || "—"}</span>
                      </div>
                    </div>
                  </TableCell>

                  <TableCell>
                    <Badge variant="outline" className="font-normal">
                      {vendor.tradeCategory || "—"}
                    </Badge>
                  </TableCell>

                  <TableCell>
                    <Badge
                      variant={vendor.status === "Active" ? "secondary" : "outline"}
                      className="capitalize font-normal"
                    >
                      {vendor.status || "Unknown"}
                    </Badge>
                  </TableCell>

                  <TableCell>
                    <div className="text-sm text-muted-foreground">
                      {vendor.createdBy || "—"}
                    </div>
                  </TableCell>

                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Link
                        href={`/operations/vendor/${vendor._id}`}
                        className={buttonVariants({ variant: "outline", size: "sm" })}
                      >
                        View <ArrowUpRight className="ml-1 size-4" />
                      </Link>
                      <DeleteVendor vendorId={vendor._id} vendorName={vendor.name}>
                        <span
                          className={buttonVariants({
                            variant: "destructive",
                            size: "sm",
                          })}
                        >
                          <Trash2 className="mr-1 size-4" />
                          Delete
                        </span>
                      </DeleteVendor>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
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
