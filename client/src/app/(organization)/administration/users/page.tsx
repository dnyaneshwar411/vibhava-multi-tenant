"use client";

import { useMemo, useState } from "react";
import {
  BadgeCheck,
  ArrowUpRight,
  CalendarDays,
  Trash2,
  Mail,
  Search,
  Users,
} from "lucide-react";
import Link from "next/link";

import useFetch from "@/hooks/useFetch";
import { useDebounce } from "@/hooks/useDebounce";
import { ErrorState } from "@/components/ui/error";
import { ComponentLoader } from "@/components/ui/loader";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import AdvancedPagination from "@/components/common/advanced-pagination";
import { cn } from "@/lib/utils";
import CreateUser from "@/modules/user/components/create-user";
import { DeleteUser } from "@/modules/user/components/delete-user";
import { buttonVariants } from "@/components/ui/button";

type UserRow = {
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
  avatar?: string;
  createdAt?: string;
};

function formatDate(value?: string) {
  if (!value) return "—";
  return new Date(value).toLocaleDateString();
}

function UserAvatar({
  name,
  avatar,
}: {
  name?: string;
  avatar?: string;
}) {
  const initial = (name || "U").trim().charAt(0).toUpperCase();

  return (
    <div className="flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-md border bg-muted">
      {avatar ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={avatar} alt={name || "User"} className="h-full w-full object-cover" />
      ) : (
        <span className="text-xs font-medium">{initial}</span>
      )}
    </div>
  );
}

export default function Page() {
  const [pagination, setPagination] = useState({
    query: "",
    page: 1,
    limit: 10,
  });

  const debouncedQuery = useDebounce(pagination.query);

  const { isLoading, data, error, mutate } = useFetch("/api/v1/user", {
    query: debouncedQuery,
    page: pagination.page.toString(),
    limit: pagination.limit.toString(),
  });

  const users: UserRow[] = useMemo(() => data?.data ?? [], [data]);
  const paginationData = data?.pagination;

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
          title={data?.message || "Users Sync Error"}
          description="The backend returned an invalid response or the request failed."
          reset={() => mutate()}
        />
      </div>
    );
  }

  return (
    <div className="flex w-full flex-col gap-6 p-4 md:p-6">
      <div className="flex flex-col gap-4 border-b pb-5 sm:flex-row sm:items-end sm:justify-between">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-semibold tracking-tight">Users</h1>
            <Badge variant="secondary" className="font-normal">
              {paginationData?.total ?? 0} total
            </Badge>
          </div>
          <p className="text-sm text-muted-foreground">
            Manage staff accounts, roles, and organizational access.
          </p>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="relative w-full sm:w-72">
            <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search users"
              value={pagination.query}
              onChange={(e) =>
                setPagination((prev) => ({
                  ...prev,
                  query: e.target.value,
                  page: 1,
                }))
              }
              className="pl-9"
            />
          </div>

          <CreateUser>
            <span className={buttonVariants({ variant: "default" })}>
              Create User
            </span>
          </CreateUser>
        </div>
      </div>

      {users.length === 0 ? (
        <div className="flex min-h-[55vh] items-center justify-center">
          <Empty>
            <EmptyHeader>
              <EmptyMedia variant="icon">
                <Users />
              </EmptyMedia>
              <EmptyTitle>No users found</EmptyTitle>
              <EmptyDescription>
                Add users to begin managing staff and permissions.
              </EmptyDescription>
            </EmptyHeader>
          </Empty>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-lg border bg-card">
          <Table className="w-full min-w-max">
            <TableHeader className="sticky top-0 z-10 bg-background">
              <TableRow>
                <TableHead className="w-[280px]">User</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Department</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>Joined</TableHead>
                <TableHead>Salary</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user._id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <UserAvatar name={user.name} avatar={user.avatar} />
                      <div className="min-w-0 space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="truncate font-medium text-foreground">
                            {user.name || "Unnamed user"}
                          </span>
                          {user.employeeId ? (
                            <span className="rounded-md border px-1.5 py-0.5 text-[10px] uppercase tracking-wide text-muted-foreground">
                              {user.employeeId}
                            </span>
                          ) : null}
                        </div>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <Mail className="size-3.5" />
                          <span className="truncate">{user.email || "—"}</span>
                        </div>
                      </div>
                    </div>
                  </TableCell>

                  <TableCell>
                    <Badge variant="outline" className="capitalize font-normal">
                      {user.role || "User"}
                    </Badge>
                  </TableCell>

                  <TableCell>
                    <div className="space-y-1">
                      <p className="font-medium">{user.department || "—"}</p>
                      <p className="text-xs text-muted-foreground">
                        {user.designation || "No designation"}
                      </p>
                    </div>
                  </TableCell>

                  <TableCell>
                    <Badge
                      variant={user.status === "Active" ? "secondary" : "outline"}
                      className={cn("capitalize font-normal")}
                    >
                      {user.status || "Unknown"}
                    </Badge>
                  </TableCell>

                  <TableCell>
                    <div className="space-y-1">
                      <div className="text-sm font-medium">
                        {user.countryCode ? `+${user.countryCode} ` : ""}
                        {user.mobileNumber || "—"}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        Manager: {user.reportingManager || "—"}
                      </div>
                    </div>
                  </TableCell>

                  <TableCell>
                    <div className="flex items-center gap-2 text-sm">
                      <CalendarDays className="size-4 text-muted-foreground" />
                      <span>{formatDate(user.joiningDate || user.createdAt)}</span>
                    </div>
                  </TableCell>

                  <TableCell>
                    <div className="text-center px-2">{user.salary || <>-</>}</div>
                  </TableCell>

                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Link
                        href={`/administration/users/${user._id}`}
                        className={buttonVariants({ variant: "outline", size: "sm" })}
                      >
                        View
                        <ArrowUpRight className="ml-1 size-4" />
                      </Link>
                      <DeleteUser userId={user._id} userName={user.name}>
                        <span
                          className={buttonVariants({
                            variant: "destructive",
                            size: "sm",
                          })}
                        >
                          <Trash2 className="mr-1 size-4" />
                          Delete
                        </span>
                      </DeleteUser>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}

      <AdvancedPagination
        page={pagination.page}
        limit={pagination.limit}
        total={paginationData?.total ?? 0}
        onPageChange={(page) => setPagination((prev) => ({ ...prev, page }))}
        onLimitChange={(limit) =>
          setPagination((prev) => ({ ...prev, limit, page: 1 }))
        }
      />
    </div>
  );
}
