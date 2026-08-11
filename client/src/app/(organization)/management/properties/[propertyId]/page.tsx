"use client";

import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
  ArrowUpRight,
  BadgeInfo,
  Building2,
  CalendarDays,
  CreditCard,
  MapPin,
  PanelTop,
  Pencil,
  Sparkles,
  Trash2,
  UserRound,
} from "lucide-react";

import useFetch from "@/hooks/useFetch";
import { ErrorState } from "@/components/ui/error";
import { ComponentLoader } from "@/components/ui/loader";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button, buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DeleteProperty } from "@/modules/properties/components/delete-property";
import { UpdatePropertyDialog } from "@/modules/properties/components/update-property-dialog";
import { cn } from "@/lib/utils";

type GalleryItem = {
  key: string;
  altText?: string;
  caption?: string;
  sortOrder?: number;
};

type PropertyDetails = {
  _id: string;
  name: string;
  propertyType?: string;
  status?: string;
  manager?: string | null;
  address?: {
    street1?: string;
    street2?: string | null;
    city?: string;
    state?: string;
    zipCode?: string;
    country?: string;
  };
  amenities?: string[];
  media?: {
    primaryImage?: { key?: string; altText?: string };
    coverImage?: { key?: string; altText?: string };
    gallery?: GalleryItem[];
  };
  finance?: {
    currency?: string;
    defaultLateFeeAmount?: number;
    defaultGracePeriodDays?: number;
  };
  createdBy?: {
    _id?: string;
    name?: string;
    mobileNumber?: string | number;
    avatar?: { key?: string };
  };
};

function DetailItem({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: React.ReactNode;
}) {
  return (
    <div className="flex items-start gap-3 rounded-lg border bg-background p-3">
      <div className="mt-0.5 text-muted-foreground">{icon}</div>
      <div className="space-y-0.5">
        <p className="text-xs uppercase tracking-wide text-muted-foreground">
          {label}
        </p>
        <div className="text-sm font-medium text-foreground">{value}</div>
      </div>
    </div>
  );
}

export default function Page() {
  const { propertyId } = useParams() as { propertyId: string };
  const { isLoading, data: propertyResponse, error, mutate } = useFetch(
    `/api/v1/property/${propertyId}`
  );

  if (isLoading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <ComponentLoader />
      </div>
    );
  }

  if (error || propertyResponse?.code !== 200) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <ErrorState
          title={propertyResponse?.message || "Property Sync Error"}
          description="Failed to load the property details."
          reset={() => mutate()}
        />
      </div>
    );
  }

  const property: PropertyDetails = propertyResponse.data;
  const gallery = [
    property.media?.primaryImage,
    property.media?.coverImage,
    ...(property.media?.gallery || []),
  ].filter(Boolean) as { key: string; altText?: string }[];

  const addressLine = [
    property.address?.street1,
    property.address?.street2,
    property.address?.city,
    property.address?.state,
    property.address?.zipCode,
  ]
    .filter(Boolean)
    .join(", ");

  return (
    <div className="w-full space-y-6 p-4 md:p-6">
      <div className="flex flex-col gap-4 border-b pb-5 lg:flex-row lg:items-end lg:justify-between">
        <div className="space-y-2">
          <div className="flex flex-wrap items-center gap-2">
            <h1 className="text-2xl font-semibold tracking-tight">
              {property.name}
            </h1>
            <Badge variant="secondary" className="capitalize font-normal">
              {property.status || "Unknown"}
            </Badge>
            <Badge variant="outline" className="font-normal">
              {property.propertyType || "Property"}
            </Badge>
          </div>

          <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
            <MapPin className="size-4" />
            <span>{addressLine || "Address not set"}</span>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <Link href={`/management/properties/${property._id}/units`}>
            <span className={buttonVariants({ variant: "outline", size: "sm" })}>
              View Units <ArrowUpRight className="ml-1 size-4" />
            </span>
          </Link>

          <UpdatePropertyDialog property={property}>
            <span className={buttonVariants({ variant: "outline", size: "sm" })}>
              <Pencil className="mr-1 size-4" />
              Edit
            </span>
          </UpdatePropertyDialog>

          <DeleteProperty propertyId={property._id} propertyName={property.name}>
            <span
              className={cn(
                buttonVariants({ variant: "destructive", size: "sm" }),
                "gap-1"
              )}
            >
              <Trash2 className="size-4" />
              Delete
            </span>
          </DeleteProperty>
        </div>
      </div>

      {gallery.length > 0 && (
        <div className="grid gap-3 overflow-hidden rounded-lg border bg-muted/20 md:grid-cols-3">
          <div className="relative aspect-[16/10] md:col-span-2">
            <Image
              src={`/api/uploads/${gallery[0].key}`}
              alt={gallery[0].altText || property.name}
              fill
              priority
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 66vw"
              onError={(e) => {
                (e.target as HTMLImageElement).src = "/placeholder.avif";
              }}
            />
          </div>

          <div className="grid grid-cols-2 gap-3 p-3 md:grid-cols-1 md:grid-rows-2 md:p-0 md:pl-0">
            {gallery.slice(1, 3).map((item, index) => (
              <div
                key={`${item.key}-${index}`}
                className="relative aspect-[16/10] overflow-hidden rounded-md bg-muted md:aspect-auto"
              >
                <Image
                  src={`/api/uploads/${item.key}`}
                  alt={item.altText || property.name}
                  fill
                  className="object-cover"
                  sizes="33vw"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = "/placeholder.avif";
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                <BadgeInfo className="size-4" />
                Overview
              </CardTitle>
            </CardHeader>
            <CardContent className="grid gap-3 sm:grid-cols-2">
              <DetailItem
                icon={<Building2 className="size-4" />}
                label="Property type"
                value={property.propertyType || "—"}
              />
              <DetailItem
                icon={<UserRound className="size-4" />}
                label="Manager"
                value={property.manager || "Unassigned"}
              />
              <DetailItem
                icon={<CreditCard className="size-4" />}
                label="Currency"
                value={property.finance?.currency || "—"}
              />
              <DetailItem
                icon={<PanelTop className="size-4" />}
                label="Late fee"
                value={
                  property.finance?.defaultLateFeeAmount !== undefined
                    ? `${property.finance.defaultLateFeeAmount}`
                    : "—"
                }
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                <CalendarDays className="size-4" />
                Address and location
              </CardTitle>
            </CardHeader>
            <CardContent className="grid gap-3 sm:grid-cols-2">
              <DetailItem
                icon={<MapPin className="size-4" />}
                label="Street"
                value={property.address?.street1 || "—"}
              />
              <DetailItem
                icon={<MapPin className="size-4" />}
                label="Street 2"
                value={property.address?.street2 || "—"}
              />
              <DetailItem
                icon={<MapPin className="size-4" />}
                label="City"
                value={property.address?.city || "—"}
              />
              <DetailItem
                icon={<MapPin className="size-4" />}
                label="State / ZIP"
                value={
                  [property.address?.state, property.address?.zipCode]
                    .filter(Boolean)
                    .join(" • ") || "—"
                }
              />
            </CardContent>
          </Card>

          {property.amenities?.length ? (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                  <Sparkles className="size-4" />
                  Amenities
                </CardTitle>
              </CardHeader>
              <CardContent className="flex flex-wrap gap-2">
                {property.amenities.map((amenity) => (
                  <Badge key={amenity} variant="secondary" className="font-normal">
                    {amenity}
                  </Badge>
                ))}
              </CardContent>
            </Card>
          ) : null}
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                <UserRound className="size-4" />
                Created by
              </CardTitle>
            </CardHeader>
            <CardContent className="flex items-center gap-3">
              <Avatar className="h-10 w-10 border">
                <AvatarImage
                  src={
                    property.createdBy?.avatar?.key
                      ? `/api/uploads/${property.createdBy.avatar.key}`
                      : undefined
                  }
                  alt={property.createdBy?.name || "Creator"}
                />
                <AvatarFallback>
                  {(property.createdBy?.name || "U").charAt(0)}
                </AvatarFallback>
              </Avatar>
              <div className="min-w-0">
                <p className="truncate text-sm font-medium">
                  {property.createdBy?.name || "Unknown"}
                </p>
                <p className="truncate text-xs text-muted-foreground">
                  {property.createdBy?.mobileNumber || "—"}
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                <BadgeInfo className="size-4" />
                Summary
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              {/* <div className="flex items-center justify-between gap-3">
                <span className="text-muted-foreground">Property ID</span>
                <span className="max-w-[14rem] truncate font-medium">{property._id}</span>
              </div> */}
              <div className="flex items-center justify-between gap-3">
                <span className="text-muted-foreground">Country</span>
                <span className="font-medium">{property.address?.country || "—"}</span>
              </div>
              <div className="flex items-center justify-between gap-3">
                <span className="text-muted-foreground">Late fee</span>
                <span className="font-medium">
                  {property.finance?.defaultLateFeeAmount !== undefined
                    ? `${property.finance.defaultLateFeeAmount}`
                    : "—"}
                </span>
              </div>
              <div className="flex items-center justify-between gap-3">
                <span className="text-muted-foreground">Grace period</span>
                <span className="font-medium">
                  {property.finance?.defaultGracePeriodDays !== undefined
                    ? `${property.finance.defaultGracePeriodDays} days`
                    : "—"}
                </span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
