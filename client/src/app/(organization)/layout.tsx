"use client"
import { ErrorState } from "@/components/ui/error";
import { ComponentLoader } from "@/components/ui/loader";
import { SidebarProvider, useSidebar } from "@/components/ui/sidebar";
import useFetch from "@/hooks/useFetch";
import { cn } from "@/lib/utils";
import OrganizationNavbar from "@/modules/navbar/components/organization-navbar";
import OrganizationSidebar from "@/modules/sidebar/components/organization-sidebar";
import { GlobalStoreProvider } from "@/providers/store-provider";

export default function Layout({ children }: { children: React.ReactNode }) {
  const { isLoading, data, error, mutate } = useFetch("/api/v1/auth/profile")

  if (isLoading) return <div className="flex items-center justify-center h-screen">
    <ComponentLoader />
  </div>

  if (error || data?.code !== 200) {
    return (
      <div className="flex items-center justify-center h-screen">
        <ErrorState
          title={data?.message || "Dashboard Sync Error"}
          description="The database cluster returned an invalid schema or network failure."
          reset={() => mutate()}
        />
      </div>
    )
  }
  return (
    <GlobalStoreProvider payload={data.data}>
      <SidebarProvider className="gap-0 max-w-screen">
        <OrganizationSidebar />
        <OrganizationContents>
          {children}
        </OrganizationContents>
      </SidebarProvider>
    </GlobalStoreProvider>
  )
}

function OrganizationContents({ children }: { children: React.ReactNode }) {
  const { open, isMobile } = useSidebar()
  const sidebarWidth = isMobile ? "w-[calc(100vw-32px)]" : (open ? "w-[calc(100vw-290px)]" : "w-[calc(100vw-32px)]")
  return (
    <div className="grow">
      <OrganizationNavbar />
      <div className={cn(`min-h-[calc(100vh-var(--header-height)-32px)] m-4 bg-sidebar/50 flex flex-col border`, sidebarWidth)}>
        {children}
      </div>
    </div>
  )
}