import { LucideIcon } from "lucide-react";

export type OrgSidebarResource = {
  type: "RESOURCE";
  title: string;
  icon: LucideIcon;
  href: string;
  scopes: string[];
}

export type OrgSidebarResourceNested = {
  type: "RESOURCE-NESTED";
  title: string;
  icon: LucideIcon;
  scopes: string[];
  resourceType: "/financials/reports";
  children: {
    title: string;
    href: string;
  }[];
}

export type OrgSidebarSection = {
  type: "SECTION";
  label: string;
  resourceGroup: "/dashboard" | "/management" | "/operations" | "/financials" | "/administration" | "/settings";
  children: (OrgSidebarResource | OrgSidebarResourceNested)[];
}