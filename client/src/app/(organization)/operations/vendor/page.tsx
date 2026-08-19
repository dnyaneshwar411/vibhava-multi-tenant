"use client";

import { SetStateAction, useState } from "react";
import { ErrorState } from "@/components/ui/error";
import { ComponentLoader } from "@/components/ui/loader";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import useFetch from "@/hooks/useFetch";
import {
  Search,
  ExternalLink,
  Wrench,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";
import AdvancedPagination from "@/components/common/advanced-pagination";
import { useDebounce } from "@/hooks/useDebounce";
import { wordInitials } from "@/lib/helpers";
import Link from "next/link";
import VendorFilterOptions from "@/modules/vendor/components/vendor-filter-options";
import EmptyState from "@/components/common/empty-state";
import AddVendor from "@/modules/vendor/components/add-vendor";
// import VendorFilterOptions from "@/modules/vendor/components/vendor-filter-options";
// import AddVendor from "@/modules/vendor/components/add-vendor";

interface Address {
  street1: string;
  street2?: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

interface Vendor {
  _id: string;
  organization: string;
  name: string;
  countryCode: number;
  mobileNumber: number;
  email: string;
  status: "Active" | "Pending Approval" | "Suspended" | "Archived" | string;
  tradeCategory: string;
  address: Address;
  createdBy: string;
  avatar?: string;
}

export default function Page() {
  const [query, setQuery] = useState("");
  const debouncedQuery = useDebounce(query, 300);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    status: "",
  });
console.log(query, debouncedQuery, pagination)
  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between flex-wrap gap-4 border bg-card/50 p-5">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-lg font-bold tracking-tight">Vendors Directory</h1>
          </div>
          <p className="text-xs text-muted-foreground mt-0.5">
            Manage service providers, trade categories, and contractor contact records.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <div className="relative w-full md:w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
            <Input
              placeholder="Search vendor name, email, phone, or trade..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="pl-9 h-8 text-xs rounded-none border-muted focus-visible:ring-0 focus-visible:border-foreground"
            />
          </div>
          <AddVendor />
          <VendorFilterOptions
            pagination={pagination}
            setPagination={setPagination}
          />
        </div>
      </div>
      <Container
        pagination={{
          ...pagination,
          query: debouncedQuery
        }}
        setPagination={setPagination}
      />
    </div>
  );
}

function Container({
  pagination,
  setPagination,
}: {
  pagination: Record<string, any>;
  setPagination: SetStateAction<any>;
}) {
  const { isLoading, data, error, mutate } = useFetch("/api/v1/vendor", pagination);

  const vendors: Vendor[] = data?.data;
  const paginationData = data?.pagination;

  if (isLoading) {
    return (
      <div className="border bg-card/50 p-12 flex items-center justify-center min-h-[450px]">
        <ComponentLoader />
      </div>
    );
  }

  if (error || data?.code !== 200) {
    return (
      <div className="border bg-card/50 p-6 flex items-center justify-center min-h-[450px]">
        <ErrorState
          title={data?.message || "Vendor Directory Sync Failure"}
          description="Failed to pull live record state from cluster."
          reset={() => mutate()}
        />
      </div>
    );
  }

  return (
    <div className="border border-t-0 bg-card/50">
      {vendors.length === 0 && <EmptyState />}
      {vendors.length > 0 && <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
        {vendors?.map((vendor) => (
          <div
            key={vendor._id}
            className="border bg-background p-4 flex flex-col justify-between gap-3 text-xs"
          >
            <div className="flex items-start justify-between gap-2">
              <div className="flex items-center gap-3">
                <Avatar className="h-9 w-9 rounded-none border">
                  <AvatarImage src={vendor.avatar} alt={vendor.name} />
                  <AvatarFallback className="rounded-none text-xs">
                    {wordInitials(vendor.name)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-semibold text-foreground">{vendor.name}</h3>
                  <div className="flex items-center gap-1 text-muted-foreground mt-0.5">
                    <Mail className="h-3 w-3 shrink-0" />
                    <span className="truncate max-w-[160px]">{vendor.email}</span>
                  </div>
                </div>
              </div>
              {/* <VendorStatusBadge status={vendor.status} /> */}
            </div>

            <div className="space-y-1.5 text-muted-foreground pt-1">
              <div className="flex items-center gap-1.5">
                <Phone className="h-3 w-3 shrink-0" />
                <span>
                  +{vendor.countryCode} {vendor.mobileNumber}
                </span>
              </div>
              {vendor.address && (
                <div className="flex items-center gap-1.5 truncate">
                  <MapPin className="h-3 w-3 shrink-0" />
                  <span className="truncate">
                    {vendor.address.city}, {vendor.address.state}
                  </span>
                </div>
              )}
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-border/60 text-muted-foreground">
              <div className="flex items-center gap-1.5">
                <Wrench className="h-3 w-3" />
                <span className="font-medium text-foreground">{vendor.tradeCategory}</span>
              </div>
              <Link
                href={`/operations/vendor/${vendor._id}`}
                className={buttonVariants({
                  variant: "ghost",
                  size: "icon",
                  className: "h-6 w-6 rounded-none",
                })}
              >
                <ExternalLink className="h-3 w-3" />
              </Link>
            </div>
          </div>
        ))}
      </div>}

      {paginationData && paginationData.total > 0 && (
        <div className="p-3 border-t bg-card/30">
          <AdvancedPagination
            page={pagination.page}
            limit={pagination.limit}
            total={paginationData.total}
            onPageChange={(page) =>
              setPagination((prev: any) => ({ ...prev, page }))
            }
            onLimitChange={(limit) =>
              setPagination((prev: any) => ({ ...prev, limit, page: 1 }))
            }
          />
        </div>
      )}
    </div>
  );
}