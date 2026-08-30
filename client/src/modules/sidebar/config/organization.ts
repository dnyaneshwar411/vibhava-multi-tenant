import {
  LayoutDashboard,
  Building2,
  DoorOpen,
  Users,
  FileText,
  Wrench,
  Truck,
  Receipt,
  BarChart3,
  UserCog,
  Shield,
  UserPlus,
  History,
  Building,
  CircleUserRound,
  DollarSign,
  CreditCard,
} from "lucide-react";
import { OrgSidebarSection } from "../types/organization";

export const sidebarData: OrgSidebarSection[] = [
  // Overview Section
  {
    label: "Overview",
    type: "SECTION",
    resourceGroup: "/dashboard",
    children: [
      { title: "Dashboard", type: "RESOURCE", scopes: [], icon: LayoutDashboard, href: "/dashboard" },
    ]
  },

  // Property Management Section
  {
    label: "Property Management",
    type: "SECTION",
    resourceGroup: "/management",
    children: [
      { title: "Properties", type: "RESOURCE", scopes: ["property:read", "property:read:assigned"], icon: Building2, href: "/management/properties" },
      // { title: "Units", type: "RESOURCE", scopes: ["unit:read"], icon: DoorOpen, href: "/management/units" },
      { title: "Tenants", type: "RESOURCE", scopes: ["tenant:read"], icon: Users, href: "/management/tenants" },
      { title: "Leases", type: "RESOURCE", scopes: ["lease:read"], icon: FileText, href: "/management/leases" },
    ]
  },

  // Operations Section
  {
    label: "Operations",
    type: "SECTION",
    resourceGroup: "/operations",
    children: [
      { title: "Maintenance", type: "RESOURCE", scopes: ["ticket:read:all", "ticket:read:own"], icon: Wrench, href: "/operations/maintenance" },
      { title: "Vendors", type: "RESOURCE", scopes: ["vendor:read"], icon: Truck, href: "/operations/vendor" },
    ]
  },

  // Financials Section
  {
    label: "Financials",
    type: "SECTION",
    resourceGroup: "/financials",
    children: [
      { title: "Ledger", type: "RESOURCE", scopes: ["ledger:read"], icon: Receipt, href: "/financials/ledger" },
      {
        title: "Reports",
        type: "RESOURCE-NESTED",
        icon: BarChart3,
        scopes: [],
        resourceType: "/financials/reports",
        children: [
          { title: "Profit & Loss", href: "/financials/reports/profit-loss" },
          { title: "Rent Roll", href: "/financials/reports/rent-roll" },
        ],
      },
    ]
  },


  // Administration Section
  {
    label: "Administration",
    type: "SECTION",
    resourceGroup: "/administration",
    children: [
      { title: "Users", type: "RESOURCE", scopes: ["user:read"],icon: UserCog, href: "/administration/users" },
      { title: "Payment Gateway", type: "RESOURCE", scopes: ["payment-gateway:read"],icon: CreditCard, href: "/administration/payment-gateway" },
      { title: "Memberships", type: "RESOURCE", scopes: ["organization:membership:manage"],icon: DollarSign, href: "/administration/memberships" },
      { title: "Audit Logs", type: "RESOURCE", scopes: ["user:read"],icon: History, href: "/administration/audit-logs" },
    ],
  },

  // Settings Section
  {
    label: "Settings",
    type: "SECTION",
    resourceGroup: "/settings",
    children: [
      { title: "Profile", type: "RESOURCE", scopes: [], icon: CircleUserRound, href: "/settings/profile" },
      { 
        title: "Organization", 
        type: "RESOURCE-NESTED", 
        scopes: ["organization:read"],
         icon: Building,
         resourceType: "/settings/organization",
         children: [
          { title: "Profile", href: "/settings/organization" },
          // { title: "Landing", href: "/settings/organization/pages/landing" },
          // { title: "About", href: "/settings/organization/pages/about" },
          // { title: "Terms & Conditions", href: "/settings/organization/pages/terms-conditions" },
          // { title: "Privacy Policy", href: "/settings/organization/pages/privacy-policy" },
         ]
       },
    ]
  },
];