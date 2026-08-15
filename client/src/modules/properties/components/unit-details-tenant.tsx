"use client";

import { TabsContent } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ErrorState } from "@/components/ui/error";
import { ComponentLoader } from "@/components/ui/loader";
import useFetch from "@/hooks/useFetch";
import {
  Mail,
  Phone,
  UserCheck,
  UserX,
  Clock,
  MoreVertical,
  User,
  Crown,
  Users,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button, buttonVariants } from "@/components/ui/button";
import Link from "next/link";

interface Tenant {
  _id: string;
  name?: string;
  email: string;
  mobileNumber: number;
  status: "Active" | "Applicant" | "Vacated" | string;
  countryCode: number;
  avatar?: {
    private?: boolean;
    key?: string;
  };
}

interface TenantDataResponse {
  primaryTenant?: Tenant | null;
  coTenants?: Tenant[];
}

export default function UnitDetailsTenants({ unitId }: { unitId: string }) {
  const { isLoading, error, data } = useFetch(`/api/v1/tenant/unit/${unitId}`);

  if (isLoading) {
    return (
      <TabsContent value="tenants" className="m-0 focus-visible:outline-none">
        <div className="border bg-card/50 p-12 flex justify-center items-center">
          <ComponentLoader />
        </div>
      </TabsContent>
    );
  }

  if (error || data?.code !== 200) {
    return (
      <TabsContent value="tenants" className="m-0 focus-visible:outline-none">
        <div className="border bg-card/50 p-6">
          <ErrorState />
        </div>
      </TabsContent>
    );
  }

  const tenantPayload: TenantDataResponse = data?.data ?? {};
  const primaryTenant = tenantPayload.primaryTenant;
  const coTenants = tenantPayload.coTenants ?? [];

  const hasTenants = primaryTenant || coTenants.length > 0;

  const getStatusBadge = (status: string) => {
    switch (status?.toLowerCase()) {
      case "active":
        return (
          <Badge
            variant="secondary"
            className="gap-1 text-[11px] font-medium text-emerald-600 bg-emerald-500/10 rounded-none border-0"
          >
            <UserCheck className="h-3 w-3" /> Active
          </Badge>
        );
      case "applicant":
        return (
          <Badge
            variant="secondary"
            className="gap-1 text-[11px] font-medium text-amber-600 bg-amber-500/10 rounded-none border-0"
          >
            <Clock className="h-3 w-3" /> Applicant
          </Badge>
        );
      case "vacated":
        return (
          <Badge
            variant="secondary"
            className="gap-1 text-[11px] font-medium text-muted-foreground bg-muted rounded-none border-0"
          >
            <UserX className="h-3 w-3" /> Vacated
          </Badge>
        );
      default:
        return (
          <Badge variant="secondary" className="text-[11px] rounded-none border-0">
            {status}
          </Badge>
        );
    }
  };

  const getInitials = (email: string, name?: string) => {
    if (name) {
      return name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2);
    }
    return email.slice(0, 2).toUpperCase();
  };

  const renderTenantRow = (tenant: Tenant, isPrimary: boolean = false) => (
    <tr key={tenant._id} className="hover:bg-muted/20 transition-colors">
      <td className="py-3 px-4">
        <div className="flex items-center gap-3">
          <Avatar className="h-8 w-8 rounded-none border">
            {tenant.avatar?.key && (
              <AvatarImage
                src={`/api/v1/files/${tenant.avatar.key}`}
                alt={tenant.name || tenant.email}
              />
            )}
            <AvatarFallback className="rounded-none text-xs font-semibold bg-muted">
              {getInitials(tenant.email, tenant.name)}
            </AvatarFallback>
          </Avatar>
          <div>
            <div className="flex items-center gap-2">
              <p className="font-medium text-sm leading-none">
                {tenant.name || tenant.email.split("@")[0]}
              </p>
              {isPrimary && (
                <Badge
                  variant="outline"
                  className="gap-1 text-[10px] font-mono rounded-none py-0 h-4 border-amber-500/40 text-amber-600 bg-amber-500/5"
                >
                  <Crown className="h-2.5 w-2.5" /> Primary
                </Badge>
              )}
            </div>
            <p className="font-mono text-[11px] text-muted-foreground mt-1">
              ID: {tenant._id.slice(-6)}
            </p>
          </div>
        </div>
      </td>

      <td className="py-3 px-4 space-y-1">
        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <Mail className="h-3.5 w-3.5" />
          <span>{tenant.email}</span>
        </div>
        <div className="flex items-center gap-1.5 text-xs font-mono text-muted-foreground">
          <Phone className="h-3.5 w-3.5" />
          <span>
            +{tenant.countryCode} {tenant.mobileNumber}
          </span>
        </div>
      </td>

      <td className="py-3 px-4">{getStatusBadge(tenant.status)}</td>

      <td className="py-3 px-4 text-right">
        <Link href={`/management/tenants/${tenant._id}`} className={buttonVariants({ variant: "secondary" })}>
          View Profile
        </Link>
      </td>
    </tr>
  );

  return (
    <TabsContent value="tenants" className="m-0 focus-visible:outline-none">
      <div className="border bg-card/50 overflow-hidden">
        {!hasTenants ? (
          <div className="p-12 text-center space-y-3">
            <div className="mx-auto w-10 h-10 border flex items-center justify-center bg-muted/50">
              <User className="h-5 w-5 text-muted-foreground" />
            </div>
            <p className="text-sm font-medium">No tenants linked to this unit</p>
            <p className="text-xs text-muted-foreground">
              Tenants assigned to this property will appear here.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b bg-muted/30 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  <th className="py-3 px-4">Tenant</th>
                  <th className="py-3 px-4">Contact Info</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {primaryTenant && renderTenantRow(primaryTenant, true)}

                {coTenants.length > 0 && (
                  <>
                    <tr className="bg-muted/10">
                      <td
                        colSpan={4}
                        className="py-1.5 px-4 text-[11px] font-semibold text-muted-foreground uppercase tracking-wider border-y"
                      >
                        <div className="flex items-center gap-1.5">
                          <Users className="h-3 w-3" /> Co-Tenants ({coTenants.length})
                        </div>
                      </td>
                    </tr>
                    {coTenants.map((coTenant) =>
                      renderTenantRow(coTenant, false)
                    )}
                  </>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </TabsContent>
  );
}