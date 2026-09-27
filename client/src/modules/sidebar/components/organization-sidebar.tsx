"use client";
import { Sidebar, SidebarHeader, SidebarMenu, SidebarMenuItem } from "@/components/ui/sidebar";
import { OrganizationSidebarContents } from "./organization-sidebar-contents";
import Image from "next/image";
import { useGlobalStore } from "@/providers/store-provider";
import OrganizationSidebarFooter  from "./organization-sidebar-footer";
import { useMemo } from "react";
import { resolveSessionScopes } from "../helpers/restrictions";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { wordInitials } from "@/lib/helpers";

export default function OrganizationSidebar() {
  const { organization } = useGlobalStore(state => state);
  const { scopeMap, actorModel } = useGlobalStore(state => state)
  const sidebarItems = useMemo(() => resolveSessionScopes(scopeMap, actorModel), [scopeMap, actorModel])
  return (
    <Sidebar variant="floating" className="h-full p-0 [&_[data-slot=sidebar-inner]]:h-full">
      <div className="flex flex-col gap-0 overflow-hidden">
        <SidebarHeader className="h-[var(--header-height)] border-b border-r px-4 flex items-center">
          <SidebarMenu className="w-full">
            <SidebarMenuItem>
              <div className="w-full h-full flex items-center gap-3 py-2 px-2 hover:bg-sidebar-accent/50 transition-colors group">
                <Avatar className="!rounded-[4px] !border-0">
                  <AvatarImage className="rounded-none !border-0" src={organization.logoUrl || "/favicon.png"} />
                  <AvatarFallback>
                    {wordInitials(organization.name || "ON")}
                  </AvatarFallback>
                </Avatar>

                <div className="flex flex-col min-w-0 text-left">
                  <span className="font-bold text-sm tracking-wide truncate">
                    Workspace
                  </span>
                  <span className="text-[11px] text-muted-foreground truncate">
                    {organization.name || "Overview"}
                  </span>
                </div>
              </div>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarHeader>

        <OrganizationSidebarContents items={sidebarItems} />
        <OrganizationSidebarFooter />
      </div>
    </Sidebar>
  );
}
