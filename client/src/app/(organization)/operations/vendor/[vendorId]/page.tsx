"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button, buttonVariants } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ErrorState } from "@/components/ui/error";
import { ComponentLoader } from "@/components/ui/loader";
import useFetch from "@/hooks/useFetch";
import { wordInitials } from "@/lib/helpers";
import {
  Mail,
  Phone,
  Wrench,
  MapPin,
  BarChart3,
  Ticket,
  Calendar,
  Building,
  Edit,
  ArrowLeft,
  Globe,
  Hash,
  Building2,
  Trash2,
} from "lucide-react";
import Link from "next/link";
import VendorStatusBadge from "@/modules/vendor/components/vendor-status-badge";
import { useParams } from "next/navigation";
import { useTabsContentNavigation } from "@/hooks/useTabsContentNavigation";
import UpdateVendor from "@/modules/vendor/components/update-vendor";
import { DeleteVendor } from "@/modules/vendor/components/delete-vendor";

interface Address {
  street1: string;
  street2?: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

interface VendorDetail {
  _id: string;
  name: string;
  countryCode: number;
  mobileNumber: number;
  email: string;
  status: string;
  tradeCategory: string;
  address: Address;
  createdBy: string;
  avatar?: string | { key?: string; private?: boolean };
  updatedAt: string;
}

export default function VendorDetailPage() {
  const { selectedTab, tabChange } = useTabsContentNavigation("address", [
    "address", "statistics", "tickets"
  ]);
  const { vendorId } = useParams();
  const { isLoading, data, error, mutate } = useFetch(`/api/v1/vendor/${vendorId}`);

  if (isLoading) {
    return (
      <div className="border bg-card/50 p-12 flex items-center justify-center min-h-[450px]">
        <ComponentLoader />
      </div>
    );
  }

  if (error || data?.code !== 200 || !data?.data) {
    return (
      <div className="border bg-card/50 p-6 flex items-center justify-center min-h-[450px]">
        <ErrorState
          title={data?.message || "Vendor Profile Sync Error"}
          description="Failed to load vendor record details from the cluster."
          reset={() => mutate()}
        />
      </div>
    );
  }

  const vendor: VendorDetail = data.data;

  const formattedDate = new Date(vendor.updatedAt).toLocaleDateString(
    "en-US",
    {
      year: "numeric",
      month: "short",
      day: "numeric",
    }
  );

  return (
    <div>
      <div className="border bg-card/50 overflow-hidden">
        <div className="h-28 bg-gradient-to-r from-muted/80 via-card to-muted/50 border-b relative" />
        <div className="px-6 pb-6 relative">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 -mt-12 mb-4">
            <div className="flex items-end gap-4">
              <Avatar className="h-20 w-20 border-2 border-background bg-background shadow-sm">
                <AvatarImage src={vendor.avatar as string} alt={vendor.name} />
                <AvatarFallback className="text-base font-bold bg-muted">
                  {wordInitials(vendor.name)}
                </AvatarFallback>
              </Avatar>
              <div className="mb-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <h1 className="text-xl font-bold tracking-tight text-foreground">
                    {vendor.name}
                  </h1>
                  <VendorStatusBadge status={vendor.status as any} />
                </div>
                <div className="flex items-center gap-1.5 text-xs text-muted-foreground mt-0.5">
                  <Wrench className="h-3.5 w-3.5" />
                  <span className="font-medium text-foreground">
                    {vendor.tradeCategory}
                  </span>
                </div>
              </div>

            </div>
            <div className="ml-auto flex items-center gap-2">
              <UpdateVendor vendor={vendor as any} />
                <DeleteVendor vendorId={vendor._id}>
                  <span className={buttonVariants({ variant: "destructive" })}>
                    <Trash2 className="!w-4 !h-4" strokeWidth={1.5} />
                    Delete
                  </span>
                </DeleteVendor>
              </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 pt-3 border-t text-xs">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Mail className="h-3.5 w-3.5 shrink-0" />
              <span className="truncate text-foreground">{vendor.email}</span>
            </div>

            <div className="flex items-center gap-2 text-muted-foreground">
              <Phone className="h-3.5 w-3.5 shrink-0" />
              <span className="text-foreground">
                +{vendor.countryCode} {vendor.mobileNumber}
              </span>
            </div>

            <div className="flex items-center gap-2 text-muted-foreground">
              <Calendar className="h-3.5 w-3.5 shrink-0" />
              <span>Last Updated: {formattedDate}</span>
            </div>
          </div>
        </div>
      </div>

      <Tabs value={selectedTab} onValueChange={tabChange} className="w-full">
        <TabsList className="w-full justify-start rounded-none h-10 p-0 border bg-card/50 divide-x">
          <TabsTrigger
            value="address"
            className="rounded-none h-full text-xs gap-2 px-4 data-[state=active]:bg-background data-[state=active]:shadow-none"
          >
            <MapPin className="h-3.5 w-3.5" />
            <span>Address</span>
          </TabsTrigger>

          <TabsTrigger
            value="statistics"
            className="rounded-none h-full text-xs gap-2 px-4 data-[state=active]:bg-background data-[state=active]:shadow-none"
          >
            <BarChart3 className="h-3.5 w-3.5" />
            <span>Statistics</span>
          </TabsTrigger>

          <TabsTrigger
            value="tickets"
            className="rounded-none h-full text-xs gap-2 px-4 data-[state=active]:bg-background data-[state=active]:shadow-none"
          >
            <Ticket className="h-3.5 w-3.5" />
            <span>Tickets</span>
          </TabsTrigger>
        </TabsList>
        <TabsContent value="address">
          <div className="border bg-card/50 p-6 space-y-4">
            <div className="pb-3 border-b">
              <h2 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                Operating Address
              </h2>
            </div>

            {vendor.address ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                <div className="space-y-1">
                  <span className="text-muted-foreground block text-[11px]">
                    Street Address
                  </span>
                  <div className="flex items-center gap-2 text-foreground font-medium">
                    <Building2 className="h-3.5 w-3.5 text-muted-foreground" />
                    <span>
                      {vendor.address.street1}
                      {vendor.address.street2 ? `, ${vendor.address.street2}` : ""}
                    </span>
                  </div>
                </div>

                <div className="space-y-1">
                  <span className="text-muted-foreground block text-[11px]">
                    City & State
                  </span>
                  <div className="flex items-center gap-2 text-foreground font-medium">
                    <Building className="h-3.5 w-3.5 text-muted-foreground" />
                    <span>
                      {vendor.address.city}, {vendor.address.state}
                    </span>
                  </div>
                </div>

                <div className="space-y-1">
                  <span className="text-muted-foreground block text-[11px]">
                    Zip / Postal Code
                  </span>
                  <div className="flex items-center gap-2 text-foreground font-medium">
                    <Hash className="h-3.5 w-3.5 text-muted-foreground" />
                    <span>{vendor.address.zipCode}</span>
                  </div>
                </div>

                <div className="space-y-1">
                  <span className="text-muted-foreground block text-[11px]">
                    Country
                  </span>
                  <div className="flex items-center gap-2 text-foreground font-medium">
                    <Globe className="h-3.5 w-3.5 text-muted-foreground" />
                    <span>{vendor.address.country}</span>
                  </div>
                </div>
              </div>
            ) : (
              <p className="text-xs text-muted-foreground">
                No address details recorded for this vendor.
              </p>
            )}
          </div>
        </TabsContent>

        <TabsContent value="statistics" className="mt-2">
          <div className="border bg-card/50 p-12 flex items-center justify-center min-h-[250px]">
            <p className="text-xs text-muted-foreground italic">
              Statistics view is currently under construction.
            </p>
          </div>
        </TabsContent>

        <TabsContent value="tickets" className="mt-2">
          <div className="border bg-card/50 p-12 flex items-center justify-center min-h-[250px]">
            <p className="text-xs text-muted-foreground italic">
              Tickets view is currently under construction.
            </p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}