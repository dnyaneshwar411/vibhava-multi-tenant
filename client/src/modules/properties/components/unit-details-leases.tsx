"use client";

import { TabsContent } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ErrorState } from "@/components/ui/error";
import { ComponentLoader } from "@/components/ui/loader";
import { Button } from "@/components/ui/button";
import useFetch from "@/hooks/useFetch";
import { ParamValue } from "next/dist/server/request/params";
import {
  FileText,
  Calendar,
  CreditCard,
  ShieldCheck,
  User,
  Clock,
  CheckCircle2,
  AlertCircle,
  FileDown,
  Building2,
  Users,
  Copy,
} from "lucide-react";

interface LeaseData {
  _id: string;
  leaseType: string;
  status: "Active" | "Pending Signature" | "Expired" | "Terminated" | string;
  startDate: string;
  endDate: string;
  moveInDate: string;
  finance: {
    rentAmount: number;
    paymentDueDay: number;
    billingCycle: string;
  };
  security: {
    amountRequired: number;
    amountPaid: number;
    status: "Paid" | "Unpaid" | "Partial" | string;
    heldInAccount: string;
  };
  createdBy?: {
    name: string;
    email: string;
    avatar?: {
      key?: string;
    };
  };
  coTenants?: string[];
  leaseAgreementDocument?: string | null;
  createdAt: string;
}

export default function UnitDetailsLeases({ unitId }: { unitId: ParamValue }) {
  const { isLoading, error, data } = useFetch(`/api/v1/lease/unit/${unitId}`);

  if (isLoading) {
    return (
      <TabsContent value="lease" className="m-0 focus-visible:outline-none">
        <div className="border bg-card/50 p-12 flex justify-center items-center">
          <ComponentLoader />
        </div>
      </TabsContent>
    );
  }

  if (error || data?.code !== 200) {
    return (
      <TabsContent value="lease" className="m-0 focus-visible:outline-none">
        <div className="border bg-card/50 p-6">
          <ErrorState />
        </div>
      </TabsContent>
    );
  }

  const lease: LeaseData | null = data?.lease ?? null;

  if (!lease) {
    return (
      <TabsContent value="lease" className="m-0 focus-visible:outline-none">
        <div className="border bg-card/50 p-12 text-center space-y-3">
          <div className="mx-auto w-10 h-10 border flex items-center justify-center bg-muted/50">
            <FileText className="h-5 w-5 text-muted-foreground" />
          </div>
          <p className="text-sm font-medium">
            No active lease agreements found
          </p>
          <p className="text-xs text-muted-foreground">
            Lease contracts associated with this unit will be listed here.
          </p>
        </div>
      </TabsContent>
    );
  }

  const getStatusBadge = (status: string) => {
    switch (status?.toLowerCase()) {
      case "active":
        return (
          <Badge
            variant="secondary"
            className="gap-1 text-[11px] font-medium text-emerald-600 bg-emerald-500/10 rounded-none border-0"
          >
            <CheckCircle2 className="h-3 w-3" /> Active
          </Badge>
        );
      case "pending signature":
        return (
          <Badge
            variant="secondary"
            className="gap-1 text-[11px] font-medium text-amber-600 bg-amber-500/10 rounded-none border-0"
          >
            <Clock className="h-3 w-3" /> Pending Signature
          </Badge>
        );
      default:
        return (
          <Badge
            variant="secondary"
            className="text-[11px] rounded-none border-0"
          >
            {status}
          </Badge>
        );
    }
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <>
      <div className="border bg-card/50 p-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <h2 className="text-base font-semibold tracking-tight">
              {lease.leaseType} Agreement
            </h2>
            {getStatusBadge(lease.status)}
          </div>
          <p className="text-xs text-muted-foreground font-mono">
            ID: {lease._id}
          </p>
        </div>

        <div className="flex items-center gap-2">
          {lease.leaseAgreementDocument ? (
            <Button
              variant="outline"
              size="sm"
              className="rounded-none text-xs gap-1.5 h-8"
            >
              <a
                href={`/api/v1/files/${lease.leaseAgreementDocument}`}
                target="_blank"
                rel="noreferrer"
              >
                <FileDown className="h-3.5 w-3.5" /> Download Agreement
              </a>
            </Button>
          ) : (
            <Badge
              variant="outline"
              className="text-[11px] rounded-none font-normal text-muted-foreground py-1"
            >
              Document Pending
            </Badge>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="border bg-card/50 p-5 space-y-3">
          <div className="flex items-center justify-between pb-2 border-b">
            <span className="text-xs font-semibold text-muted-foreground uppercase tracking-widest">
              Monthly Rent
            </span>
            <CreditCard className="h-4 w-4 text-muted-foreground/60" />
          </div>
          <div className="space-y-1">
            <div className="text-2xl font-bold tracking-tight">
              ₹{lease.finance.rentAmount.toLocaleString()}
              <span className="text-xs font-normal text-muted-foreground ml-1">
                / {lease.finance.billingCycle.toLowerCase()}
              </span>
            </div>
            <p className="text-xs text-muted-foreground">
              Payment due on the {lease.finance.paymentDueDay}st of each month
            </p>
          </div>
        </div>

        <div className="border bg-card/50 p-5 space-y-3">
          <div className="flex items-center justify-between pb-2 border-b">
            <span className="text-xs font-semibold text-muted-foreground uppercase tracking-widest">
              Security Deposit
            </span>
            <ShieldCheck className="h-4 w-4 text-muted-foreground/60" />
          </div>
          <div className="space-y-1">
            <div className="text-2xl font-bold tracking-tight">
              ₹{lease.security.amountRequired.toLocaleString()}
            </div>
            <div className="flex items-center justify-between text-xs pt-1">
              <span className="text-muted-foreground">Status</span>
              <Badge
                variant="secondary"
                className={`text-[10px] rounded-none border-0 ${lease.security.status.toLowerCase() === "paid"
                    ? "text-emerald-600 bg-emerald-500/10"
                    : "text-amber-600 bg-amber-500/10"
                  }`}
              >
                {lease.security.status}
              </Badge>
            </div>
          </div>
        </div>

        <div className="border bg-card/50 p-5 space-y-3">
          <div className="flex items-center justify-between pb-2 border-b">
            <span className="text-xs font-semibold text-muted-foreground uppercase tracking-widest">
              Escrow Holding
            </span>
            <Building2 className="h-4 w-4 text-muted-foreground/60" />
          </div>
          <div className="space-y-1">
            <div className="font-mono text-sm font-semibold bg-muted px-2 py-1 border inline-block">
              {lease.security.heldInAccount}
            </div>
            <p className="text-xs text-muted-foreground pt-1">
              Amount Paid: ₹{lease.security.amountPaid.toLocaleString()}
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="border bg-card/50 p-5 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b">
            <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-widest">
              Term Schedule
            </h3>
            <Calendar className="h-4 w-4 text-muted-foreground/60" />
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Start Date</span>
              <span className="font-medium">{formatDate(lease.startDate)}</span>
            </div>

            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">End Date</span>
              <span className="font-medium">{formatDate(lease.endDate)}</span>
            </div>

            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Move-In Date</span>
              <span className="font-medium">
                {formatDate(lease.moveInDate)}
              </span>
            </div>

            <div className="flex items-center justify-between text-sm pt-2 border-t">
              <span className="text-muted-foreground">Co-Tenants Count</span>
              <span className="font-mono text-xs bg-muted px-2 py-0.5 border flex items-center gap-1">
                <Users className="h-3 w-3" /> {lease.coTenants?.length ?? 0}
              </span>
            </div>
          </div>
        </div>

        <div className="border bg-card/50 p-5 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b">
            <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-widest">
              Audit & Authority
            </h3>
            <User className="h-4 w-4 text-muted-foreground/60" />
          </div>

          {lease.createdBy ? (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground">
                  Created By
                </span>
                <div className="flex items-center gap-2">
                  <Avatar className="h-6 w-6 rounded-none border">
                    {lease.createdBy.avatar?.key && (
                      <AvatarImage
                        src={`/api/v1/files/${lease.createdBy.avatar.key}`}
                      />
                    )}
                    <AvatarFallback className="rounded-none text-[10px]">
                      {lease.createdBy.name.slice(0, 2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <span className="text-xs font-medium">
                    {lease.createdBy.name}
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Contact Email</span>
                <span className="text-xs font-mono">{lease.createdBy.email}</span>
              </div>

              <div className="flex items-center justify-between text-sm pt-2 border-t">
                <span className="text-muted-foreground">Created On</span>
                <span className="text-xs font-mono text-muted-foreground">
                  {formatDate(lease.createdAt)}
                </span>
              </div>
            </div>
          ) : (
            <p className="text-xs text-muted-foreground">
              No audit information attached.
            </p>
          )}
        </div>
      </div>
    </>
  );
}