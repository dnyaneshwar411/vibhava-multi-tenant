"use client";

import { TabsContent } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import {
  FileText,
  Calendar,
  IndianRupee,
  ShieldAlert,
  Clock,
  CheckCircle2,
  CalendarDays,
  Vault,
  Copy,
} from "lucide-react";
import LeaseStatusBadge from "@/modules/lease/components/lease-status-badge";
import SecurityStatusBadge from "./security-status-badge";

interface ActiveLeaseData {
  _id: string;
  leaseType: string;
  status: string;
  startDate: string;
  endDate: string;
  moveInDate: string;
  finance?: {
    rentAmount?: number;
    paymentDueDay?: number;
    billingCycle?: string;
  };
  security?: {
    amountRequired?: number;
    amountPaid?: number;
    status?: string;
    heldInAccount?: string;
  };
}

export default function TenantDetailsLeaseTab({
  activeLease,
}: {
  activeLease: ActiveLeaseData | null;
}) {
  const formatDate = (dateString?: string) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const formatCurrency = (val?: number) => {
    if (val === undefined || val === null) return "N/A";
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(val);
  };

  if (!activeLease) {
    return (
      <TabsContent value="lease" className="m-0 focus-visible:outline-none">
        <div className="border bg-card/50 p-12 text-center space-y-3">
          <div className="mx-auto w-10 h-10 border flex items-center justify-center bg-muted/50">
            <FileText className="h-5 w-5 text-muted-foreground" />
          </div>
          <p className="text-sm font-medium">No Active Lease Agreement</p>
          <p className="text-xs text-muted-foreground max-w-sm mx-auto">
            There is currently no active or pending lease record linked to this tenant profile.
          </p>
        </div>
      </TabsContent>
    );
  }

  return (
    <TabsContent value="lease" className="m-0 focus-visible:outline-none space-y-5">
      <div className="border bg-card/50 p-5 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b">
          <div className="flex items-center gap-2">
            <FileText className="h-4 w-4 text-muted-foreground" />
            <h3 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              Lease Contract
            </h3>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="text-[11px] font-mono rounded-none">
              {activeLease.leaseType}
            </Badge>
            <LeaseStatusBadge status={activeLease.status} />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

          <div className="space-y-1">
            <span className="text-[11px] text-muted-foreground uppercase tracking-wider block font-semibold">
              Move-In Schedule
            </span>
            <div className="flex items-center gap-1.5 text-xs font-mono font-semibold">
              <Calendar className="h-3.5 w-3.5 text-muted-foreground" />
              <span>{formatDate(activeLease.moveInDate)}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="border bg-card/50 p-5 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b">
            <div className="flex items-center gap-2">
              <CalendarDays className="h-4 w-4 text-muted-foreground" />
              <h3 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                Term & Schedule
              </h3>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <span className="text-xs text-muted-foreground block">Effective Start Date</span>
              <span className="text-xs font-mono font-semibold block">
                {formatDate(activeLease.startDate)}
              </span>
            </div>

            <div className="space-y-1">
              <span className="text-xs text-muted-foreground block">Termination Date</span>
              <span className="text-xs font-mono font-semibold block">
                {formatDate(activeLease.endDate)}
              </span>
            </div>

            <div className="space-y-1 col-span-2 pt-2 border-t">
              <span className="text-xs text-muted-foreground block">Billing Cycle & Payment Due</span>
              <div className="flex items-center justify-between text-xs font-mono pt-1">
                <span>{activeLease.finance?.billingCycle || "Monthly"}</span>
                <span className="text-muted-foreground">
                  Due on Day {activeLease.finance?.paymentDueDay || 1} of each cycle
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="border bg-card/50 p-5 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b">
            <div className="flex items-center gap-2">
              <IndianRupee className="h-4 w-4 text-muted-foreground" />
              <h3 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                Financials & Security
              </h3>
            </div>
            <SecurityStatusBadge status={activeLease.security?.status!} />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <span className="text-xs text-muted-foreground block">Agreed Rent</span>
              <span className="text-sm font-mono font-bold text-foreground block">
                {formatCurrency(activeLease.finance?.rentAmount)}
                <span className="text-[10px] text-muted-foreground font-normal"> /mo</span>
              </span>
            </div>

            <div className="space-y-1">
              <span className="text-xs text-muted-foreground block">Deposit Required</span>
              <span className="text-sm font-mono font-semibold block">
                {formatCurrency(activeLease.security?.amountRequired)}
              </span>
            </div>

            <div className="space-y-1 col-span-2 pt-2 border-t">
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground flex items-center gap-1">
                  <Vault className="h-3.5 w-3.5" /> Account
                </span>
                <span className="font-mono text-xs bg-muted px-2 py-0.5 border">
                  {activeLease.security?.heldInAccount || "UNASSIGNED"}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </TabsContent>
  );
}