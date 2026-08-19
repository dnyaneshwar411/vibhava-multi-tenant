"use client";
import { SetStateAction, useState } from "react";
import { ErrorState } from "@/components/ui/error";
import { ComponentLoader } from "@/components/ui/loader";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import useFetch from "@/hooks/useFetch";
import {
  Phone,
  User,
  Search,
  Filter,
  Plus,
  ExternalLink,
} from "lucide-react";
import AdvancedPagination from "@/components/common/advanced-pagination";
import { useDebounce } from "@/hooks/useDebounce";
import { wordInitials } from "@/lib/helpers";
import Link from "next/link";
import TenantStatusBadge from "@/modules/tenant/components/tenant-status-badge";
import TenantFilterOptions from "@/modules/tenant/components/tenant-filter-options";
import AddTenant from "@/modules/tenant/components/add-tenant";
interface Tenant {
  _id: string;
  name: string;
  email: string;
  mobileNumber: number;
  status: "Active" | "Applicant" | "Vacated" | string;
  countryCode: number;
  avatar?: {
    key?: string;
  };
}

export default function Page() {
  const [query, setQuery] = useState("");
  const debouncedQuery = useDebounce(query, 300);
  const [pagination, setPagination] = useState({
    query: debouncedQuery,
    page: 1,
    limit: 10,
    status: ""
  });
  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between flex-wrap gap-4 border bg-card/50 p-5">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-lg font-bold tracking-tight">Tenants Directory</h1>
          </div>
          <p className="text-xs text-muted-foreground mt-0.5">
            Manage applicant profiles, active lease occupants, and contact records.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <div className="relative w-full md:w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
            <Input
              placeholder="Search name, email, or phone..."
              value={query}
              onChange={(e) =>
                setQuery(e.target.value)
              }
              className="pl-9 h-8 text-xs rounded-none border-muted focus-visible:ring-0 focus-visible:border-foreground"
            />
          </div>
          {/* <Button size="sm" className="rounded-none text-xs gap-1.5 h-8">
            <Plus className="h-3.5 w-3.5" /> Add Tenant
          </Button> */}
          <AddTenant />
          <TenantFilterOptions
            pagination={pagination}
            setPagination={setPagination}
          />
        </div>
      </div>
      <Container
        pagination={pagination}
        setPagination={setPagination}
      />
    </div>
  );
}

function Container({ pagination, setPagination }: {
  pagination: Record<string, any>;
  setPagination: SetStateAction<any>
}) {
  const { isLoading, data, error, mutate } = useFetch("/api/v1/tenant", pagination);

  const tenants: Tenant[] = data?.data
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
          title={data?.message || "Tenant Directory Sync Failure"}
          description="Failed to pull live record state from cluster."
          reset={() => mutate()}
        />
      </div>
    );
  }
  return (
    <div className="border bg-card/50 overflow-hidden">
      {tenants.length === 0 ? (
        <div className="p-12 text-center space-y-3">
          <div className="mx-auto w-10 h-10 border flex items-center justify-center bg-muted/50">
            <User className="h-5 w-5 text-muted-foreground" />
          </div>
          <p className="text-sm font-medium">No matching tenant records</p>
          <p className="text-xs text-muted-foreground">
            Try modifying your search criteria or resetting filters.
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b bg-muted/30 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                <th className="py-3 px-4">Tenant Info</th>
                <th className="py-3 px-4">Contact Details</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {tenants.map((tenant) => (
                <tr
                  key={tenant._id}
                  className="hover:bg-muted/20 transition-colors group"
                >
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-9 w-9 border">
                        {tenant.avatar?.key && (
                          <AvatarImage
                            src={`/api/v1/files/${tenant.avatar.key}`}
                            alt={tenant.name}
                          />
                        )}
                        <AvatarFallback className="text-xs font-semibold bg-muted">
                          {wordInitials(tenant.name)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-semibold text-sm leading-none">
                          {tenant.name}
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">
                          {tenant.email}
                        </p>
                      </div>
                    </div>
                  </td>

                  <td className="py-3 px-4 space-y-1">
                    <div className="flex items-center gap-1.5 text-xs font-mono">
                      <Phone className="h-3.5 w-3.5 text-muted-foreground" />
                      <span>
                        +{tenant.countryCode} {tenant.mobileNumber}
                      </span>
                    </div>
                  </td>

                  <td className="py-3 px-4">
                    <TenantStatusBadge status={tenant.status} />
                  </td>

                  <td className="py-3 px-4 text-right">
                    <Link className={buttonVariants({ variant: "outline" })} href={`/management/tenants/${tenant._id}`}>
                      <ExternalLink className="h-3.5 w-3.5" /> View Full Profile
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

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
  )
}