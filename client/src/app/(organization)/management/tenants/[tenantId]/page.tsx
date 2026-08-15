"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Mail,
  Phone,
  Building2,
  FileText,
  MessageSquare,
  ShieldCheck,
  Calendar,
  Send,
  MoreHorizontal,
  KeyRound,
} from "lucide-react";
import TenantStatusBadge from "@/modules/tenant/components/tenant-status-badge";
import useFetch from "@/hooks/useFetch";
import { useParams } from "next/navigation";
import { ComponentLoader } from "@/components/ui/loader";
import { ErrorState } from "@/components/ui/error";
import TenantDetailsPropertyTab from "@/modules/tenant/components/tenant-details-property-tab";
import TenantDetailsLeaseTab from "@/modules/tenant/components/tenant-details-lease-tab";
import TenantDetailsCommunicationTab from "@/modules/tenant/components/tenant-details-communication-tab";
import TenantDetailsManageScopes from "@/modules/tenant/components/tenant-details-manage-scopes";
import { useTabsContentNavigation } from "@/hooks/useTabsContentNavigation";
import UpdateTenant from "@/modules/tenant/components/update-tenant";
import DeleteTenant from "@/modules/tenant/components/delete-tenant";

export default function TenantDetailsPage() {
  const { tenantId } = useParams();
  const { isLoading, data, error, mutate } = useFetch(`/api/v1/lease/tenants/${tenantId}`);

  if (isLoading) {
    return (
      <div className="border grow bg-card/50 p-12 flex items-center justify-center min-h-[450px]">
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

  const tenant = data.data

  const fullName = `${tenant.firstName} ${tenant.lastName}`;
  const initials = `${tenant.firstName?.[0] || ""}${tenant.lastName?.[0] || ""}`;

  const formatDate = (dateString: string) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <div className="space-y-0">
      <div className="border bg-card/50 overflow-hidden relative">
        <div className="h-36 w-full bg-gradient-to-r from-neutral-900 via-neutral-800 to-zinc-900 border-b relative">
          <div className="absolute inset-0 bg-grid-white/5 [mask-image:linear-gradient(0deg,white,transparent)]" />
        </div>

        <div className="px-6 pb-6 pt-0 relative">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 -mt-12 sm:-mt-14 mb-4">
            <div className="flex items-end gap-4">
              <Avatar className="h-24 w-24 sm:h-28 sm:w-28 border-4 border-background bg-muted">
                <AvatarImage src={tenant.avatar} alt={fullName} />
                <AvatarFallback className="font-bold text-xl bg-muted">
                  {initials}
                </AvatarFallback>
              </Avatar>

              <div className="space-y-1 mb-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <h1 className="text-xl sm:text-2xl font-bold tracking-tight">
                    {fullName}
                  </h1>
                  <TenantStatusBadge status={tenant.status} />
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {/* <Button
                size="sm"
                className="rounded-none text-xs gap-1.5 h-8"
                onClick={() => (window.location.href = `mailto:${tenant.email}`)}
              >
                <Send className="h-3.5 w-3.5" /> Direct Email
              </Button> */}
              <UpdateTenant
                tenant={{
                  ...tenant,
                  currentResidence: {
                    unit: tenant?.currentResidence?.unit?._id,
                    property: tenant?.currentResidence?.property?._id,
                    activeLease: tenant?.currentResidence?.activeLease?._id,
                    moveInDate: tenant?.currentResidence?.moveInDate
                  },
                }}
              />
              <DeleteTenant tenantId={tenant._id} tenantName={tenant.name}>
                <Button variant="destructive">Delete</Button>
              </DeleteTenant>
              {/* <Button variant="ghost" size="icon" className="h-8 w-8 rounded-none border">
                <MoreHorizontal className="h-4 w-4" />
              </Button> */}
            </div>
          </div>

          <div className="pt-3 border-t grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-muted-foreground">
            <div className="flex items-center gap-2">
              <Mail className="h-3.5 w-3.5 text-foreground/70" />
              <span className="truncate">{tenant.email}</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="h-3.5 w-3.5 text-foreground/70" />
              <span className="font-mono">
                +{tenant.countryCode} {tenant.mobileNumber}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="h-3.5 w-3.5 text-foreground/70" />
              <span>
                Move-in Target: {formatDate(tenant.currentResidence.moveInDate)}
              </span>
            </div>
          </div>
        </div>
      </div>

      <Container tenant={tenant} />
    </div>
  );
}

function Container({ tenant }: { tenant: any }) {
  const { selectedTab, tabChange } = useTabsContentNavigation("property", [
    "property", "lease", "communication", "scopes"
  ])
  return (
    <Tabs value={selectedTab} onValueChange={tabChange} className="gap-0">
      <TabsList className="bg-card/50 border-x p-0 rounded-none w-full justify-start h-auto gap-1 overflow-x-auto overflow-y-hidden">
        <TabsTrigger
          value="property"
          className="rounded-none text-xs gap-2 data-[state=active]:bg-foreground data-[state=active]:text-background"
        >
          <Building2 strokeWidth={1.5} className="h-3.5 w-3.5" /> Occupied Property & Unit
        </TabsTrigger>

        <TabsTrigger
          value="lease"
          className="rounded-none text-xs gap-2 data-[state=active]:bg-foreground data-[state=active]:text-background"
        >
          <FileText strokeWidth={1.5} className="h-3.5 w-3.5" /> Lease Details
        </TabsTrigger>

        <TabsTrigger
          value="communication"
          className="rounded-none text-xs gap-2 data-[state=active]:bg-foreground data-[state=active]:text-background"
        >
          <MessageSquare strokeWidth={1.5} className="h-3.5 w-3.5" /> Communication Channels
        </TabsTrigger>

        <TabsTrigger
          value="scopes"
          className="rounded-none text-xs gap-2 data-[state=active]:bg-foreground data-[state=active]:text-background"
        >
          <ShieldCheck strokeWidth={1.5} className="h-3.5 w-3.5" /> Scopes & Permissions
        </TabsTrigger>
      </TabsList>
      <TenantDetailsPropertyTab currentResidence={tenant.currentResidence} />
      <TenantDetailsLeaseTab activeLease={tenant.currentResidence.activeLease} />
      <TenantDetailsCommunicationTab communicationPreferences={tenant.communicationPreferences} />
      <TabsContent value="scopes" className="m-0 focus-visible:outline-none border-t-1">
        <TenantDetailsManageScopes tenantId={tenant._id} />
      </TabsContent>
    </Tabs>
  )
}