"use client";
import { ErrorState } from "@/components/ui/error";
import { ComponentLoader } from "@/components/ui/loader";
import useFetch from "@/hooks/useFetch";
import { StaffDashboard } from "@/modules/dashboard/components/StaffDashboard";
import { VendorDashboard } from "@/modules/dashboard/components/VendorDashboard";
import { TenantDashboard } from "@/modules/dashboard/components/TenantDashboard";

export default function Page() {
  const { isLoading, data, error, mutate } = useFetch("/api/v1/dashboard")

  if (isLoading) return <div className="flex items-center justify-center">
    <ComponentLoader />
  </div>

  if (error || data?.code !== 200) {
    return (
      <div className="flex items-center justify-center">
        <ErrorState
          title={data?.message || "Dashboard Sync Error"}
          description="The database cluster returned an invalid schema or network failure."
          reset={() => mutate()}
        />
      </div>
    )
  }

  const dashboardPayload = data.data;
console.log(data)
  if (dashboardPayload.role === "User" || dashboardPayload.role === "Operator") {
    return <StaffDashboard metrics={dashboardPayload.metrics || {}} />
  }
  if (dashboardPayload.role === "Vendor") {
    return <VendorDashboard metrics={dashboardPayload.metrics || {}} />
  }
  if (dashboardPayload.role === "Tenant") {
    return <TenantDashboard metrics={dashboardPayload.metrics || {}} />
  }

  return <div className="p-6">Unknown dashboard role</div>;
}