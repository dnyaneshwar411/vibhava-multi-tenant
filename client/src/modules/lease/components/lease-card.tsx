import React from "react";
import Link from "next/link";
import { 
  Building2, 
  DoorOpen, 
  Calendar, 
  ChevronRight, 
  ArrowUpRight, 
  ExternalLink
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import LeaseStatusBadge from "./lease-status-badge";
import { format } from "date-fns";

export type LeaseStatus =
  | "Draft"
  | "Pending Signature"
  | "Active"
  | "Expiring Soon"
  | "Renewed"
  | "Terminated"
  | "Expired";

export interface LeaseData {
  _id: string;
  property: {
    _id: string;
    name: string;
  };
  unit: {
    _id: string;
    unitNumber: string;
    unitType: string;
  };
  leaseType: string;
  status: LeaseStatus;
  isActive: boolean;
  createdAt: string;
}

interface LeaseCardProps {
  lease: LeaseData;
}

export default function LeaseCard({ lease }: LeaseCardProps) {
  const formattedDate = format(lease.createdAt, "MMM dd, yyyy")

  return (
    <div className="group relative border border-border bg-card p-5 transition-colors hover:border-muted-foreground/30">
      <div className="flex items-start justify-between gap-3 border-b border-border/60 pb-4">
        <div className="space-y-1 mr-auto">
          <div className="flex items-center gap-2">
            <Building2 className="h-4 w-4 shrink-0 text-muted-foreground" />
            <h4 className="font-medium leading-none text-card-foreground">
              {lease.property.name}
            </h4>
          </div>
          <p className="text-xs text-muted-foreground pl-6">
            Created on {formattedDate}
          </p>
        </div>
        <LeaseStatusBadge status={lease.status} />
        <Link href={`/management/leases/${lease._id}`}>
          <ExternalLink size={18} strokeWidth={1.5} />
        </Link>
      </div>

      <div className="grid grid-cols-2 gap-4 py-4">
        <div className="space-y-1">
          <span className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
            Unit Details
          </span>
          <div className="flex items-center gap-1.5 text-sm font-medium text-card-foreground">
            <DoorOpen className="h-3.5 w-3.5 text-muted-foreground" />
            <span>{lease.unit.unitNumber}</span>
            <Badge variant="outline" className="ml-1 text-[10px] font-normal py-0 h-4">
              {lease.unit.unitType}
            </Badge>
          </div>
        </div>

        <div className="space-y-1">
          <span className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground"> Lease Terms
          </span>
          <div className="flex items-center gap-1.5 text-sm font-medium text-card-foreground">
            <Calendar className="h-3.5 w-3.5 text-muted-foreground" />
            <span>{lease.leaseType}</span>
          </div>
        </div>
      </div>
    </div>
  );
}