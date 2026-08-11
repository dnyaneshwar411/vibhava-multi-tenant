"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import {
  ArrowUpRight,
  BadgeInfo,
  CalendarDays,
  CreditCard,
  Mail,
  Phone,
  Trash2,
  UserRound,
} from "lucide-react";

import useFetch from "@/hooks/useFetch";
import { ErrorState } from "@/components/ui/error";
import { ComponentLoader } from "@/components/ui/loader";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button, buttonVariants } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { DeleteUser } from "@/modules/user/components/delete-user";
import { UpdateUser } from "@/modules/user/components/update-user";

type UserDetails = {
  _id: string;
  name?: string;
  email?: string;
  mobileNumber?: string | number;
  countryCode?: string | number;
  employeeId?: string;
  reportingManager?: string | null;
  role?: string;
  department?: string;
  designation?: string;
  salary?: number;
  status?: string;
  joiningDate?: string;
  avatar?: { key?: string } | string;
  createdAt?: string;
  updatedAt?: string;
  organization?: string;
};

function formatDate(value?: string) {
  if (!value) return "—";
  return new Date(value).toLocaleDateString();
}

function Field({
  label,
  value,
}: {
  label: string;
  value: React.ReactNode;
}) {
  return (
    <div className="grid gap-1.5">
      <dt className="text-xs uppercase tracking-wide text-muted-foreground">
        {label}
      </dt>
      <dd className="text-sm font-medium text-foreground">{value}</dd>
    </div>
  );
}

export default function Page() {
  const { userId } = useParams() as { userId: string };
  const { isLoading, data, error, mutate } = useFetch(`/api/v1/user/${userId}`);

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
          title={data?.message || "User Sync Error"}
          description="Failed to load the user details."
          reset={() => mutate()}
        />
      </div>
    );
  }

  const user: UserDetails = data.data;
  const avatarUrl =
    typeof user.avatar === "string"
      ? user.avatar
      : user.avatar?.key
        ? `/api/uploads/${user.avatar.key}`
        : undefined;

  const displayMobile = user.mobileNumber
    ? `${user.countryCode ? `+${user.countryCode} ` : ""}${user.mobileNumber}`
    : "—";

  return (
    <div className="w-full space-y-6 p-4 md:p-6">
      <div className="rounded-lg border bg-card">
        <div className="flex flex-col gap-5 p-5 md:flex-row md:items-start md:justify-between">
          <div className="flex items-start gap-4">
            <Avatar className="h-16 w-16 border">
              <AvatarImage src={avatarUrl} alt={user.name || "User"} />
              <AvatarFallback className="text-base">
                {(user.name || "U").trim().charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>

            <div className="space-y-2">
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="text-2xl font-semibold tracking-tight">
                  {user.name || "Unnamed user"}
                </h1>
                <Badge variant="secondary" className="capitalize font-normal">
                  {user.status || "Unknown"}
                </Badge>
                <Badge variant="outline" className="font-normal">
                  {user.role || "User"}
                </Badge>
              </div>

              <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                <span className="inline-flex items-center gap-2">
                  <Mail className="size-4" />
                  {user.email || "—"}
                </span>
                <span className="hidden h-4 w-px bg-border sm:block" />
                <span className="inline-flex items-center gap-2">
                  <Phone className="size-4" />
                  {displayMobile}
                </span>
              </div>

              <p className="text-sm text-muted-foreground">
                Joined {formatDate(user.joiningDate || user.createdAt)}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <UpdateUser user={user}>
              <span className={buttonVariants({ variant: "outline", size: "sm" })}>
                Edit
              </span>
            </UpdateUser>

            <DeleteUser userId={user._id} userName={user.name}>
              <span
                className={cn(
                  buttonVariants({ variant: "destructive", size: "sm" }),
                  "gap-1"
                )}
              >
                <Trash2 className="size-4" />
                Delete
              </span>
            </DeleteUser>
          </div>
        </div>

        <Separator />

        <div className="grid gap-4 p-5 md:grid-cols-3">
          <div className="rounded-md border bg-background p-4">
            <p className="text-xs uppercase tracking-wide text-muted-foreground">
              Quick facts
            </p>
            <dl className="mt-4 grid gap-4">
              <Field label="Employee ID" value={user.employeeId || "—"} />
              <Field label="Department" value={user.department || "—"} />
              <Field label="Designation" value={user.designation || "—"} />
            </dl>
          </div>

          <div className="rounded-md border bg-background p-4 md:col-span-2">
            <p className="text-xs uppercase tracking-wide text-muted-foreground">
              Profile details
            </p>
            <dl className="mt-4 grid gap-4 sm:grid-cols-2">
              <Field label="Reporting manager" value={user.reportingManager || "—"} />
              <Field label="Salary" value={user.salary !== undefined ? `${user.salary}` : "—"} />
              <Field label="Organization" value={user.organization || "—"} />
              <Field label="User ID" value={user._id} />
            </dl>
          </div>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.4fr_0.9fr]">
        <div className="rounded-lg border bg-card p-5">
          <div className="flex items-center gap-2">
            <BadgeInfo className="size-4 text-muted-foreground" />
            <h2 className="text-sm font-medium text-muted-foreground">Identity</h2>
          </div>
          <Separator className="my-4" />
          <dl className="grid gap-4 sm:grid-cols-2">
            <Field label="Name" value={user.name || "—"} />
            <Field label="Email" value={user.email || "—"} />
            <Field label="Mobile" value={displayMobile} />
            <Field label="Status" value={user.status || "—"} />
          </dl>
        </div>

        <div className="rounded-lg border bg-card p-5">
          <div className="flex items-center gap-2">
            <CalendarDays className="size-4 text-muted-foreground" />
            <h2 className="text-sm font-medium text-muted-foreground">Timeline</h2>
          </div>
          <Separator className="my-4" />
          <dl className="grid gap-4">
            <Field label="Joining date" value={formatDate(user.joiningDate)} />
            <Field label="Created at" value={formatDate(user.createdAt)} />
            <Field label="Updated at" value={formatDate(user.updatedAt)} />
          </dl>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-lg border bg-card p-5">
          <div className="flex items-center gap-2">
            <CreditCard className="size-4 text-muted-foreground" />
            <h2 className="text-sm font-medium text-muted-foreground">Employment</h2>
          </div>
          <Separator className="my-4" />
          <dl className="grid gap-4 sm:grid-cols-2">
            <Field label="Department" value={user.department || "—"} />
            <Field label="Designation" value={user.designation || "—"} />
            <Field label="Reporting manager" value={user.reportingManager || "—"} />
            <Field label="Salary" value={user.salary !== undefined ? `${user.salary}` : "—"} />
          </dl>
        </div>

        <div className="rounded-lg border bg-card p-5">
          <div className="flex items-center gap-2">
            <UserRound className="size-4 text-muted-foreground" />
            <h2 className="text-sm font-medium text-muted-foreground">Summary</h2>
          </div>
          <Separator className="my-4" />
          <dl className="grid gap-4">
            <Field label="Role" value={user.role || "—"} />
            <Field label="Employee ID" value={user.employeeId || "—"} />
            <Field label="Organization" value={user.organization || "—"} />
          </dl>
        </div>
      </div>
    </div>
  );
}
