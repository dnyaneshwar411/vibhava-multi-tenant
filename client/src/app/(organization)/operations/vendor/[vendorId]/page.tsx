"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import {
  ArrowUpRight,
  BadgeInfo,
  Building2,
  Mail,
  MapPinned,
  Pencil,
  Phone,
  Trash2,
  Truck,
  UserRound,
} from "lucide-react";

import useFetch from "@/hooks/useFetch";
import { ErrorState } from "@/components/ui/error";
import { ComponentLoader } from "@/components/ui/loader";
import { Badge } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { DeleteVendor } from "@/modules/vendor/components/delete-vendor";
import { UpdateVendor } from "@/modules/vendor/components/update-vendor";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

type VendorDetails = {
  _id: string;
  name?: string;
  email?: string;
  status?: string;
  tradeCategory?: string;
  countryCode?: number;
  mobileNumber?: number;
  organization?: string;
  createdBy?: string;
  address?: {
    street1?: string;
    street2?: string;
    city?: string;
    state?: string;
    zipCode?: string;
    country?: string;
  };
  isDeleted?: boolean;
};

function DetailRow({
  label,
  value,
}: {
  label: string;
  value: React.ReactNode;
}) {
  return (
    <div className="flex items-start justify-between gap-4 py-3">
      <dt className="text-sm text-muted-foreground">{label}</dt>
      <dd className="text-sm font-medium text-foreground text-right">{value}</dd>
    </div>
  );
}

export default function Page() {
  const { vendorId } = useParams() as { vendorId: string };
  const { isLoading, data, error, mutate } = useFetch(`/api/v1/vendor/${vendorId}`);

  if (isLoading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <ComponentLoader />
      </div>
    );
  }

  if (error || data?.code !== 200) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <ErrorState
          title={data?.message || "Vendor Sync Error"}
          description="Failed to load the vendor details."
          reset={() => mutate()}
        />
      </div>
    );
  }

  const vendor: VendorDetails = data.data;
  const displayPhone = vendor.mobileNumber
    ? `${vendor.countryCode ? `+${vendor.countryCode} ` : ""}${vendor.mobileNumber}`
    : "—";

  return (
    <div className="w-full space-y-6 p-4 md:p-6">
      <div className="rounded-lg border bg-card p-5">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
          <div className="flex items-start gap-4">
            <Avatar className="h-14 w-14 border bg-muted">
              <AvatarFallback className="text-base">
                {(vendor.name || "V").trim().charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>

            <div className="space-y-2">
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="text-2xl font-semibold tracking-tight">
                  {vendor.name || "Unnamed vendor"}
                </h1>
                <Badge variant="secondary" className="font-normal capitalize">
                  {vendor.status || "Unknown"}
                </Badge>
                <Badge variant="outline" className="font-normal">
                  {vendor.tradeCategory || "Vendor"}
                </Badge>
              </div>

              <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                <span className="inline-flex items-center gap-2">
                  <Mail className="size-4" />
                  {vendor.email || "—"}
                </span>
                <span className="inline-flex items-center gap-2">
                  <Phone className="size-4" />
                  {displayPhone}
                </span>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <UpdateVendor vendor={vendor as any}>
              <span className={buttonVariants({ variant: "outline", size: "sm" })}>
                <Pencil className="mr-1 size-4" />
                Edit
              </span>
            </UpdateVendor>

            <DeleteVendor vendorId={vendor._id} vendorName={vendor.name}>
              <span
                className={cn(
                  buttonVariants({ variant: "destructive", size: "sm" }),
                  "gap-1"
                )}
              >
                <Trash2 className="size-4" />
                Delete
              </span>
            </DeleteVendor>

            <Button variant="outline" size="sm" asChild>
              <Link href="/operations/vendor">
                Back <ArrowUpRight className="ml-1 size-4" />
              </Link>
            </Button>
          </div>
        </div>

        <Separator className="my-5" />

        <div className="grid gap-5 lg:grid-cols-[1.3fr_0.7fr]">
          <div className="rounded-lg border bg-background p-4">
            <div className="flex items-center gap-2">
              <BadgeInfo className="size-4 text-muted-foreground" />
              <h2 className="text-sm font-medium text-muted-foreground">Vendor profile</h2>
            </div>
            <Separator className="my-4" />
            <dl className="divide-y">
              <DetailRow label="Vendor name" value={vendor.name || "—"} />
              <DetailRow label="Email" value={vendor.email || "—"} />
              <DetailRow label="Phone" value={displayPhone} />
              <DetailRow label="Trade category" value={vendor.tradeCategory || "—"} />
              <DetailRow label="Status" value={vendor.status || "—"} />
            </dl>
          </div>

          <div className="space-y-5">
            <div className="rounded-lg border bg-background p-4">
              <div className="flex items-center gap-2">
                <MapPinned className="size-4 text-muted-foreground" />
                <h2 className="text-sm font-medium text-muted-foreground">Address</h2>
              </div>
              <Separator className="my-4" />
              <dl className="grid gap-4">
                <DetailRow label="Street 1" value={vendor.address?.street1 || "—"} />
                <DetailRow label="Street 2" value={vendor.address?.street2 || "—"} />
                <DetailRow label="City" value={vendor.address?.city || "—"} />
                <DetailRow label="State" value={vendor.address?.state || "—"} />
                <DetailRow label="ZIP" value={vendor.address?.zipCode || "—"} />
                <DetailRow label="Country" value={vendor.address?.country || "—"} />
              </dl>
            </div>

            <div className="rounded-lg border bg-background p-4">
              <div className="flex items-center gap-2">
                <Truck className="size-4 text-muted-foreground" />
                <h2 className="text-sm font-medium text-muted-foreground">Record</h2>
              </div>
              <Separator className="my-4" />
              <dl className="grid gap-4">
                <DetailRow label="Vendor ID" value={vendor._id} />
                <DetailRow label="Created by" value={vendor.createdBy || "—"} />
                <DetailRow label="Organization" value={vendor.organization || "—"} />
                <DetailRow
                  label="Deleted"
                  value={
                    vendor.isDeleted ? (
                      <Badge variant="destructive" className="font-normal">
                        Yes
                      </Badge>
                    ) : (
                      <Badge variant="secondary" className="font-normal">
                        No
                      </Badge>
                    )
                  }
                />
              </dl>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
