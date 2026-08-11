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
  Layers3,
  MapPin,
  Pencil,
  ReceiptText,
  ShieldCheck,
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
import { cn } from "@/lib/utils";
import { DeleteLease } from "@/modules/lease/components/delete-lease";
import { UpdateLease } from "@/modules/lease/components/update-lease";

type LeaseDetails = {
  _id: string;
  property?: {
    _id?: string;
    name?: string;
    status?: string;
    media?: {
      primaryImage?: { key?: string };
    };
  } | null;
  unit?: {
    _id?: string;
    unitNumber?: string;
    unitType?: string;
    status?: string;
    media?: {
      primaryImage?: { key?: string };
    };
  } | null;
  createdBy?: {
    _id?: string;
    name?: string;
    mobileNumber?: string | number;
    avatar?: { key?: string };
  };
  leaseType?: string;
  status?: string;
  startDate?: string;
  endDate?: string;
  moveInDate?: string;
  moveOutDate?: string | null;
  finance?: {
    rentAmount?: number;
    paymentDueDay?: number;
    billingCycle?: string;
  };
  security?: {
    amountRequired?: number;
    amountPaid?: number;
    status?: string;
    heldInAccount?: string | null;
  };
  createdAt?: string;
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

function formatDate(value?: string) {
  if (!value) return "—";
  return new Date(value).toLocaleDateString();
}

export default function Page() {
  const { leaseId } = useParams() as { leaseId: string };
  const { isLoading, data, error, mutate } = useFetch(`/api/v1/lease/${leaseId}`);

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
          title={data?.message || "Lease Sync Error"}
          description="Failed to load the lease details."
          reset={() => mutate()}
        />
      </div>
    );
  }

  const lease: LeaseDetails = data.data;
  const propertyImage = lease.property?.media?.primaryImage?.key;
  const unitImage = lease.unit?.media?.primaryImage?.key;

  return (
    <div className="w-full space-y-6 p-4 md:p-6">
      <div className="flex flex-col gap-4 border-b pb-5 lg:flex-row lg:items-end lg:justify-between">
        <div className="space-y-2">
          <div className="flex flex-wrap items-center gap-2">
            <h1 className="text-2xl font-semibold tracking-tight">
              Lease #{lease._id.slice(-6)}
            </h1>
            <Badge variant="secondary" className="capitalize font-normal">
              {lease.status || "Unknown"}
            </Badge>
            <Badge variant="outline" className="font-normal">
              {lease.leaseType || "Lease"}
            </Badge>
          </div>

          <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
            <CalendarDays className="size-4" />
            <span>Created {formatDate(lease.createdAt)}</span>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {lease.property?._id ? (
            <Link href={`/management/properties/${lease.property._id}`}>
              <Button variant="outline" size="sm">
                View property <ArrowUpRight className="ml-1 size-4" />
              </Button>
            </Link>
          ) : null}

          {lease.unit?._id ? (
            <Link href={`/management/units/${lease.unit._id}`}>
              <Button variant="outline" size="sm">
                View unit <ArrowUpRight className="ml-1 size-4" />
              </Button>
            </Link>
          ) : null}

          <UpdateLease lease={lease}>
            <span className={buttonVariants({ variant: "outline", size: "sm" })}>
              <Pencil className="mr-1 size-4" />
              Edit
            </span>
          </UpdateLease>

          <DeleteLease leaseId={lease._id} leaseLabel={`Lease #${lease._id.slice(-6)}`}>
            <span
              className={cn(
                buttonVariants({ variant: "destructive", size: "sm" }),
                "gap-1"
              )}
            >
              <Trash2 className="size-4" />
              Delete
            </span>
          </DeleteLease>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          {(propertyImage || unitImage) && (
            <div className="grid gap-3 overflow-hidden rounded-lg border bg-muted/20 md:grid-cols-2">
              <div className="relative aspect-[16/10] bg-muted">
                {propertyImage ? (
                  <Image
                    src={`/api/uploads/${propertyImage}`}
                    alt={lease.property?.name || "Property"}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = "/placeholder.avif";
                    }}
                  />
                ) : null}
              </div>
              <div className="relative aspect-[16/10] bg-muted">
                {unitImage ? (
                  <Image
                    src={`/api/uploads/${unitImage}`}
                    alt={lease.unit?.unitNumber || "Unit"}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = "/placeholder.avif";
                    }}
                  />
                ) : null}
              </div>
            </div>
          )}

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                <BadgeInfo className="size-4" />
                Lease overview
              </CardTitle>
            </CardHeader>
            <CardContent className="grid gap-3 sm:grid-cols-2">
              <DetailItem
                icon={<CalendarDays className="size-4" />}
                label="Start date"
                value={formatDate(lease.startDate)}
              />
              <DetailItem
                icon={<CalendarDays className="size-4" />}
                label="End date"
                value={formatDate(lease.endDate)}
              />
              <DetailItem
                icon={<CalendarDays className="size-4" />}
                label="Move-in date"
                value={formatDate(lease.moveInDate)}
              />
              <DetailItem
                icon={<CalendarDays className="size-4" />}
                label="Move-out date"
                value={formatDate(lease.moveOutDate ?? undefined)}
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                <CreditCard className="size-4" />
                Finance
              </CardTitle>
            </CardHeader>
            <CardContent className="grid gap-3 sm:grid-cols-2">
              <DetailItem
                icon={<CreditCard className="size-4" />}
                label="Rent amount"
                value={
                  lease.finance?.rentAmount !== undefined
                    ? `${lease.finance.rentAmount}`
                    : "—"
                }
              />
              <DetailItem
                icon={<ReceiptText className="size-4" />}
                label="Due day"
                value={lease.finance?.paymentDueDay ?? "—"}
              />
              <DetailItem
                icon={<Layers3 className="size-4" />}
                label="Billing cycle"
                value={lease.finance?.billingCycle || "—"}
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                <ShieldCheck className="size-4" />
                Security deposit
              </CardTitle>
            </CardHeader>
            <CardContent className="grid gap-3 sm:grid-cols-2">
              <DetailItem
                icon={<ShieldCheck className="size-4" />}
                label="Required"
                value={
                  lease.security?.amountRequired !== undefined
                    ? `${lease.security.amountRequired}`
                    : "—"
                }
              />
              <DetailItem
                icon={<ShieldCheck className="size-4" />}
                label="Paid"
                value={
                  lease.security?.amountPaid !== undefined
                    ? `${lease.security.amountPaid}`
                    : "—"
                }
              />
              <DetailItem
                icon={<ShieldCheck className="size-4" />}
                label="Status"
                value={lease.security?.status || "—"}
              />
              <DetailItem
                icon={<ShieldCheck className="size-4" />}
                label="Held in account"
                value={lease.security?.heldInAccount || "—"}
              />
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                <Building2 className="size-4" />
                Property
              </CardTitle>
            </CardHeader>
            <CardContent className="flex items-center gap-3">
              <div className="relative h-12 w-12 overflow-hidden rounded-md border bg-muted">
                {propertyImage ? (
                  <Image
                    src={`/api/uploads/${propertyImage}`}
                    alt={lease.property?.name || "Property"}
                    fill
                    className="object-cover"
                    sizes="48px"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = "/placeholder.avif";
                    }}
                  />
                ) : null}
              </div>
              <div className="min-w-0">
                <p className="truncate text-sm font-medium">
                  {lease.property?.name || "Unassigned"}
                </p>
                <p className="truncate text-xs text-muted-foreground">
                  {lease.property?._id || "No property linked"}
                </p>
                <p className="mt-1 text-xs text-muted-foreground">
                  {lease.property?.status || "Unknown"}
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                <Layers3 className="size-4" />
                Unit
              </CardTitle>
            </CardHeader>
            <CardContent className="flex items-center gap-3">
              <div className="relative h-12 w-12 overflow-hidden rounded-md border bg-muted">
                {unitImage ? (
                  <Image
                    src={`/api/uploads/${unitImage}`}
                    alt={lease.unit?.unitNumber || "Unit"}
                    fill
                    className="object-cover"
                    sizes="48px"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = "/placeholder.avif";
                    }}
                  />
                ) : null}
              </div>
              <div className="min-w-0">
                <p className="truncate text-sm font-medium">
                  {lease.unit?.unitNumber || "Unassigned"}
                </p>
                <p className="truncate text-xs text-muted-foreground">
                  {lease.unit?._id || "No unit linked"}
                </p>
                <p className="mt-1 text-xs text-muted-foreground">
                  {lease.unit?.unitType || "—"} • {lease.unit?.status || "Unknown"}
                </p>
              </div>
            </CardContent>
          </Card>

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
                    lease.createdBy?.avatar?.key
                      ? `/api/uploads/${lease.createdBy.avatar.key}`
                      : undefined
                  }
                  alt={lease.createdBy?.name || "Creator"}
                />
                <AvatarFallback>
                  {(lease.createdBy?.name || "U").charAt(0)}
                </AvatarFallback>
              </Avatar>
              <div className="min-w-0">
                <p className="truncate text-sm font-medium">
                  {lease.createdBy?.name || "Unknown"}
                </p>
                <p className="truncate text-xs text-muted-foreground">
                  {lease.createdBy?.mobileNumber || "—"}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
