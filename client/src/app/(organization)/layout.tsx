"use client"
import { ErrorState } from "@/components/ui/error";
import { ComponentLoader } from "@/components/ui/loader";
import { SidebarProvider, useSidebar } from "@/components/ui/sidebar";
import useFetch from "@/hooks/useFetch";
import { cn } from "@/lib/utils";
import OrganizationNavbar from "@/modules/navbar/components/organization-navbar";
import OrganizationSidebar from "@/modules/sidebar/components/organization-sidebar";
import { GlobalStoreProvider } from "@/providers/store-provider";
import { useEffect, useMemo } from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
  const { isLoading, data, error, mutate } = useFetch("/api/v1/auth/profile")
  const meta = useMemo(() => data?.data?.organization?.meta, [data])
  const orgName = useMemo(() => data?.data?.organization?.name, [data])
  const faviconUrl = useMemo(() => data?.data?.organization?.branding?.favicon, [data])

  useEffect(() => {
    if (meta?.title || orgName) {
      document.title = meta?.title || orgName;
    }

    if (meta?.description) {
      let metaDesc = document.querySelector("meta[name='description']");
      if (!metaDesc) {
        metaDesc = document.createElement("meta");
        metaDesc.setAttribute("name", "description");
        document.head.appendChild(metaDesc);
      }
      metaDesc.setAttribute("content", meta.description);
    }

    // if (faviconUrl) {
    //   let favicon = document.querySelector("link[rel='icon']") as HTMLLinkElement | null;
    //   if (!favicon) {
    //     favicon = document.createElement("link");
    //     favicon.setAttribute("rel", "icon");
    //     document.head.appendChild(favicon);
    //   }
    //   favicon.setAttribute("href", faviconUrl);
    // }
  }, [data]);

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

  const colors = data?.data?.organization?.branding?.colors || {};

  // const colorVars = colors ? {
  //   "--primary": colors.primary,
  //   "--accent": colors.accent,
  //   "--background": colors.background,
  // } as React.CSSProperties : {}

  // const colorVars = colors ? {
  //   "--primary": colors.primary,
  //   "--accent": colors.accent,
  //   "--background": colors.background,

  //   ...(colors.darkBackground && {
  //     "--dark-background": colors.darkBackground,
  //   }),

  //   "--chart-1": colors.primary,
  //   "--chart-2": colors.secondary,
  //   "--chart-3": colors.accent,
  // } as React.CSSProperties : {};

  return (
    <div
    // style={colorVars}
    >
      <GlobalStoreProvider payload={data.data}>
        <SidebarProvider className="gap-0 max-w-screen">
          <OrganizationSidebar />
          <OrganizationContents>
            {children}
          </OrganizationContents>
        </SidebarProvider>
      </GlobalStoreProvider>
    </div>
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