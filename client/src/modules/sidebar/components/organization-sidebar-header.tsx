"use client";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from "@/components/ui/collapsible";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarMenuSubButton,
  SidebarContent,
} from "@/components/ui/sidebar";
import Link from "next/link";
import { OrgSidebarResource, OrgSidebarResourceNested, OrgSidebarSection } from "../types/organization";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";

export function OrganizationSidebarContents({ items }: { items: OrgSidebarSection[] }) {
  return (
    <SidebarContent className="overflow-hidden">
      <ScrollArea className="py-8 h-[calc(100vh-110px)]">
        <div className="px-4">
          {items.map((item, index) => (
            <SidebarNavMainItem
              key={item.label || index}
              item={item}
            />
          ))}
        </div>
      </ScrollArea>
    </SidebarContent>
  );
}

function SidebarNavMainItem({ item }: {
  item: OrgSidebarSection | OrgSidebarResource | OrgSidebarResourceNested;
}) {
  const pathname = usePathname()

  if (item.type === "SECTION") {
    return (
      <SidebarGroup className="p-0 pt-5 first:pt-0">
        <SidebarGroupLabel className={cn(
          "p-0 text-xs uppercase text-sidebar-foreground",
          pathname.startsWith(item.resourceGroup) ? "font-medium" : "opacity-50"
        )}>
          {item.label}
        </SidebarGroupLabel>
        {item.children?.map((item, index) => <SidebarNavMainItem
          key={index}
          item={item}
        />)}
      </SidebarGroup>
    );
  }

  if (item.type === "RESOURCE") {
    return (
      <SidebarMenu>
        <SidebarMenuItem>
          <SidebarMenuButton
            id={`nav-main-button-${item.title.toLowerCase().replace(/\s+/g, '-')}`}
            tooltip={item.title}
            isActive={pathname.startsWith(item.href)}
            className={cn(
              "rounded-xs text-sm font-medium px-3 h-[34px] transition-colors hover:opacity-100 hover:font-medium font-light cursor-pointer",
              pathname === item.href ? "bg-primary! text-primary-foreground!" : "opacity-60"
            )}
            render={<Link href={item.href!}></Link>}
          >
            {item.icon && <item.icon strokeWidth={1} />}
            {item.title}
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    );
  }

  if (item.type === "RESOURCE-NESTED") {
    return <SidebarNavMainNested item={item} />
  }
}

function SidebarNavMainNested({ item }: { item: OrgSidebarResourceNested }) {
  const pathname = usePathname()
  const [open, setOpen] = useState(() => pathname.startsWith(item.resourceType))
  return (
    <SidebarGroup className="p-0">
      <SidebarMenu>
        <Collapsible open={open} onOpenChange={setOpen}>
          <SidebarMenuItem>
            <CollapsibleTrigger
              className="w-full"
              render={
                <SidebarMenuButton
                  id={`nav-main-trigger-${item.title.toLowerCase().replace(/\s+/g, '-')}`}
                  tooltip={item.title}
                  className={cn(
                    "rounded-xs text-sm font-medium px-3 h-[34px] transition-colors hover:opacity-100 hover:font-medium font-light cursor-pointer",
                    pathname.startsWith(item.resourceType) ? "bg-primary! text-primary-foreground!" : "opacity-60"
                  )}
                >
                  {item.icon && <item.icon size={16} strokeWidth={1} />}
                  <span>{item.title}</span>
                  <ChevronRight
                    className={cn("ml-auto transition-transform duration-200", open && "rotate-90")}
                  />
                </SidebarMenuButton>
              }
            />
            <CollapsibleContent>
              <SidebarMenuSub className="me-0 pe-0">
                {item.children!.map((child, index) => (
                  <SidebarNavMainSubItem
                    key={child.title || index}
                    item={child}
                  />
                ))}
              </SidebarMenuSub>
            </CollapsibleContent>
          </SidebarMenuItem>
        </Collapsible>
      </SidebarMenu>
    </SidebarGroup>
  );
}

function SidebarNavMainSubItem({ item }: {
  item: OrgSidebarResourceNested["children"][number];
}) {
  const pathname = usePathname();
  return (
    <SidebarMenuSubItem className="w-full">
      <SidebarMenuSubButton
        id={`nav-sub-button-${item.title.toLowerCase().replace(/\s+/g, '-')}`}
        className={cn(
          "rounded-xs text-sm font-medium px-3 transition-colors hover:opacity-100 hover:font-medium font-light cursor-pointer",
          pathname.startsWith(item.href) ? "bg-secondary! text-primary-foreground!" : "opacity-60"
        )}
        render={<a href={item.href}>{item.title}</a>}
      />
    </SidebarMenuSubItem>
  );
}