"use client";
import useFetch from "@/hooks/useFetch";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import {
  Building2,
  Home,
  Calendar,
  IndianRupee,
  UserCheck,
  UserCircle,
  Clock,
  KeyRound,
  FileText,
  AlertCircle,
  Phone,
} from "lucide-react";
import AssignVendorPopover from "./assign-ticket-vendor";
import { useMemo } from "react";

type MaintenanceTicketDetailsContentProps = {
  ticketData: any;
};

type MaintenanceTicketDetailsSheetProps = {
  ticket: any;
  children?: React.ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
};

export default function MaintenanceTicketDetails({
  ticket: ticketData,
  children: trigger,
  open,
  onOpenChange,
}: MaintenanceTicketDetailsSheetProps) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetTrigger>{trigger}</SheetTrigger>
      <SheetContent
        side="right"
        className="!w-full sm:!max-w-xl p-0 flex flex-col h-full rounded-none border-l overflow-y-auto"
      >
        <MaintenanceTicketDetailsContent ticketData={ticketData} />
      </SheetContent>
    </Sheet>
  )
}

function MaintenanceTicketDetailsContent({
  ticketData
}: MaintenanceTicketDetailsContentProps) {
  const ticketId = useMemo(() => ticketData._id, [])
  const { data, isLoading, error } = useFetch(`/api/v1/maintenance/tickets/${ticketId}`);

  const ticket = data?.data;

  const getPriorityBadgeVariant = (priority?: string) => {
    switch (priority?.toLowerCase()) {
      case "emergency":
      case "high":
        return "destructive";
      default:
        return "secondary";
    }
  };

  return (
    <>
      <SheetHeader className="p-6 border-b space-y-3 relative shrink-0">
        <div className="flex items-center justify-between pr-8">
          <div className="flex items-center gap-2 flex-wrap">
            <Badge
              variant={getPriorityBadgeVariant(ticket?.priority)}
              className="rounded-none font-mono text-[11px] uppercase tracking-wider"
            >
              {ticket?.priority || "Normal"}
            </Badge>
            <Badge
              variant="outline"
              className="rounded-none font-mono text-[11px] uppercase tracking-wider"
            >
              {ticket?.category}
            </Badge>
            <Badge
              variant="secondary"
              className="rounded-none font-mono text-[11px] uppercase tracking-wider"
            >
              {ticket?.status}
            </Badge>
            {ticket?.isBillableToTenant && (
              <Badge className="rounded-none font-mono text-[10px] uppercase bg-primary/10 text-primary hover:bg-primary/20 border-none">
                Billable to Tenant
              </Badge>
            )}
          </div>
        </div>

        <div className="space-y-1">
          <SheetTitle className="text-xl font-semibold tracking-tight leading-snug">
            {isLoading ? "Loading Details..." : ticket?.title || "Ticket Details"}
          </SheetTitle>
          <div className="flex items-center justify-between">
            <p className="text-xs text-muted-foreground flex items-center gap-1.5 font-mono">
              <Clock className="w-3.5 h-3.5" />
              Reported on{" "}
              {ticket?.createdAt
                ? new Date(ticket.createdAt).toLocaleDateString("en-IN", {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                })
                : "N/A"}
            </p>
          </div>
        </div>
      </SheetHeader>

      {isLoading ? (
        <div className="flex-1 flex items-center justify-center p-8 text-sm text-muted-foreground font-mono">
          Loading ticket context...
        </div>
      ) : error || !ticket ? (
        <div className="flex-1 flex flex-col items-center justify-center p-8 text-center gap-2">
          <AlertCircle className="w-8 h-8 text-destructive" />
          <p className="text-sm font-medium text-destructive">
            Failed to load ticket details
          </p>
          <p className="text-xs text-muted-foreground">
            Please check your connection or try again later.
          </p>
        </div>
      ) : (
        <ScrollArea className="flex-1">
          <div className="p-6 space-y-6">
            <div className="space-y-2">
              <span className="text-[11px] font-mono font-semibold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
                <FileText className="w-3.5 h-3.5" /> Issue Details
              </span>
              <p className="text-sm text-foreground bg-muted/40 p-4 border rounded-none leading-relaxed whitespace-pre-wrap">
                {ticket.description}
              </p>
            </div>

            <div className="space-y-2">
              <span className="text-[11px] mb-2 block font-mono font-semibold uppercase tracking-wider text-muted-foreground">
                Location Context
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {ticket.property && (
                  <div className="flex items-center gap-3 p-3 border bg-card rounded-none">
                    <Avatar className="h-10 w-10 border">
                      <AvatarImage src={ticket.property.media?.primaryImage} />
                      <AvatarFallback className="bg-muted">
                        <Building2 className="w-4 h-4 text-muted-foreground" />
                      </AvatarFallback>
                    </Avatar>
                    <div className="space-y-0.5 min-w-0 flex-1">
                      <p className="text-[10px] text-muted-foreground uppercase font-mono">
                        Property
                      </p>
                      <p className="text-sm font-medium truncate">
                        {ticket.property.name}
                      </p>
                      <p className="text-[11px] text-muted-foreground">
                        {ticket.property.status}
                      </p>
                    </div>
                  </div>
                )}

                {ticket.unit && (
                  <div className="flex items-center gap-3 p-3 border bg-card rounded-none">
                    <Avatar className="h-10 w-10 border">
                      <AvatarImage src={ticket.unit.media?.primaryImage} />
                      <AvatarFallback className="bg-muted">
                        <Home className="w-4 h-4 text-muted-foreground" />
                      </AvatarFallback>
                    </Avatar>
                    <div className="space-y-0.5 min-w-0 flex-1">
                      <p className="text-[10px] text-muted-foreground uppercase font-mono">
                        Unit
                      </p>
                      <p className="text-sm font-medium truncate">
                        {ticket.unit.unitNumber}{" "}
                        <span className="text-muted-foreground text-xs font-normal">
                          ({ticket.unit.unitType})
                        </span>
                      </p>
                      <p className="text-[11px] text-muted-foreground">
                        {ticket.unit.status}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <Separator className="rounded-none" />

            <div className="space-y-3">
              <span className="text-[11px] mb-2 block font-mono font-semibold uppercase tracking-wider text-muted-foreground">
                Stakeholders
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {/* Reported By */}
                {ticket.reportedBy?.user && (
                  <div className="p-3 border bg-card rounded-none space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono text-muted-foreground uppercase flex items-center gap-1">
                        <UserCircle className="w-3 h-3" /> Reported By
                      </span>
                      <Badge
                        variant="outline"
                        className="rounded-none text-[10px] px-1.5 py-0 h-4 font-mono"
                      >
                        {ticket.reportedBy.role}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-3">
                      <Avatar className="h-9 w-9 border rounded-none">
                        <AvatarImage src={ticket.reportedBy.user.avatar} />
                        <AvatarFallback className="rounded-none font-medium">
                          {ticket.reportedBy.user.name?.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div className="space-y-0.5 min-w-0 flex-1">
                        <p className="text-sm font-medium truncate">
                          {ticket.reportedBy.user.name}
                        </p>
                        <p className="text-xs text-muted-foreground font-mono flex items-center gap-1">
                          <Phone className="w-3 h-3" />
                          +{ticket.reportedBy.user.countryCode}{" "}
                          {ticket.reportedBy.user.mobileNumber}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
                <div className="p-3 border bg-card rounded-none space-y-2">
                  <div className="flex items-center justify-between min-h-[24px]">
                    <span className="text-[10px] font-mono text-muted-foreground uppercase flex items-center gap-1">
                      <UserCheck className="w-3 h-3" /> Assigned Vendor
                    </span>
                    <AssignVendorPopover
                      ticketId={ticket._id}
                      currentVendorId={ticket.assignedVendor?._id}
                    />
                  </div>

                  {ticket.assignedVendor ? (
                    <div className="flex items-center gap-3 pt-1">
                      <Avatar className="h-9 w-9 border rounded-none">
                        <AvatarImage src={ticket.assignedVendor.avatar} />
                        <AvatarFallback className="rounded-none font-medium">
                          {ticket.assignedVendor.name?.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div className="space-y-0.5 min-w-0 flex-1">
                        <p className="text-sm font-medium truncate">
                          {ticket.assignedVendor.name}
                        </p>
                        <p className="text-xs text-muted-foreground font-mono flex items-center gap-1">
                          <Phone className="w-3 h-3" />
                          +{ticket.assignedVendor.countryCode}{" "}
                          {ticket.assignedVendor.mobileNumber}
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div className="pt-1 pb-1">
                      <p className="text-xs text-muted-foreground font-mono italic">
                        No vendor assigned yet.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <Separator className="rounded-none" />

            <div className="space-y-3">
              <span className="text-[11px] mb-2 block font-mono font-semibold uppercase tracking-wider text-muted-foreground">
                Parameters & Financials
              </span>
              <div className="grid grid-cols-2 gap-px p-px text-xs font-mono">
                <div className="p-3 space-y-1 border">
                  <span className="text-muted-foreground flex items-center gap-1 text-[11px]">
                    <KeyRound className="w-3 h-3" /> Entry Access
                  </span>
                  <p className="font-semibold text-foreground">
                    {ticket.permissionToEnter ? "Allowed" : "Restricted"}
                  </p>
                </div>

                <div className="p-3 space-y-1 border">
                  <span className="text-muted-foreground flex items-center gap-1 text-[11px]">
                    <Calendar className="w-3 h-3" /> Schedule
                  </span>
                  <p className="font-semibold text-foreground">
                    {ticket.preferredSchedule || "N/A"}
                  </p>
                </div>

                <div className="p-3 space-y-1 border">
                  <span className="text-muted-foreground flex items-center gap-1 text-[11px]">
                    <IndianRupee className="w-3 h-3" /> Estimated Cost
                  </span>
                  <p className="font-semibold text-foreground">
                    ₹{ticket.estimatedCost?.toLocaleString("en-IN") ?? 0}
                  </p>
                </div>

                <div className="p-3 space-y-1 border">
                  <span className="text-muted-foreground flex items-center gap-1 text-[11px]">
                    <IndianRupee className="w-3 h-3" /> Actual Cost
                  </span>
                  <p className="font-semibold text-foreground">
                    ₹{ticket.actualCost?.toLocaleString("en-IN") ?? 0}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </ScrollArea>
      )}
    </>
  );
}