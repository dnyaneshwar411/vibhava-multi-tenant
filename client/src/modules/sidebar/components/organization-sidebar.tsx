"use client";
import { Sidebar, SidebarHeader, SidebarMenu, SidebarMenuItem } from "@/components/ui/sidebar";
import { OrganizationSidebarContents } from "./organization-sidebar-header";
import Image from "next/image";
import { useGlobalStore } from "@/providers/store-provider";
import OrganizationSidebarFooter  from "./organization-sidebar-footer";
import { useMemo } from "react";
import { resolveSessionScopes } from "../helpers/restrictions";

export default function OrganizationSidebar() {
  const { organization } = useGlobalStore(state => state);
  const { scopeMap } = useGlobalStore(state => state)
  const sidebarItems = useMemo(() => resolveSessionScopes(scopeMap), [scopeMap])
  return (
    <Sidebar variant="floating" className="h-full p-0 [&_[data-slot=sidebar-inner]]:h-full">
      <div className="flex flex-col gap-0 overflow-hidden">
        <SidebarHeader className="h-[var(--header-height)] border-b-1 border-r-1 px-4">
          <SidebarMenu>
            <SidebarMenuItem>
              <a href="#" className="w-full h-full flex items-center justify-center gap-4">
                <Image
                  height={200}
                  width={200}
                  alt=""
                  src={organization.logoUrl || "/favicon.png"}
                  onError={e => {
                    // if (e.target) e.target.src = "/favicon.png"
                  }}
                  className="h-[42px] max-w-[48px] object-cover"
                />
                <span className="uppercase font-bold text-lg">{organization.name}</span>
              </a>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarHeader>

        <OrganizationSidebarContents items={sidebarItems} />
        <OrganizationSidebarFooter />
      </div>
    </Sidebar>
  );
}
