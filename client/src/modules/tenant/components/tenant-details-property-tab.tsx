"use client";

import { TabsContent } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import {
  Building2,
  MapPin,
  Home,
  IndianRupee,
  ShieldCheck,
  Wrench,
  CheckCircle2,
  Layers,
  Sparkles,
  Calendar,
} from "lucide-react";
import UnitStatusBadge from "@/modules/unit/components/unit-status-badge";

interface CurrentResidenceData {
  property?: {
    _id: string;
    name: string;
    propertyType: string;
    status: string;
    address?: {
      street1?: string;
      street2?: string;
      city?: string;
      state?: string;
      zipCode?: string;
      country?: string;
    };
    amenities?: string[];
  } | null;
  unit?: {
    _id: string;
    unitNumber: string;
    unitType: string;
    status: string;
    finance?: {
      marketRent?: number;
      currentRent?: number;
      securityDeposit?: number;
      currency?: string;
    };
  } | null;
  activeLease?: Record<string, any> | null;
  moveInDate?: string;
}

export default function TenantDetailsPropertyTab({
  currentResidence,
}: {
  currentResidence: CurrentResidenceData;
}) {
  const property = currentResidence?.property;
  const unit = currentResidence?.unit;

  const formatDate = (dateString?: string) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const formatCurrency = (val?: number, currency = "INR") => {
    if (val === undefined || val === null) return "N/A";
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency,
      maximumFractionDigits: 0,
    }).format(val);
  };

  const getUnitStatusBadge = (status?: string) => {
    
  };

  if (!property && !unit) {
    return (
      <TabsContent value="property" className="m-0 focus-visible:outline-none">
        <div className="border bg-card/50 p-12 text-center space-y-3">
          <div className="mx-auto w-10 h-10 border flex items-center justify-center bg-muted/50">
            <Building2 className="h-5 w-5 text-muted-foreground" />
          </div>
          <p className="text-sm font-medium">No Active Property Assignment</p>
          <p className="text-xs text-muted-foreground max-w-sm mx-auto">
            This tenant is currently unassigned to any unit or active property record.
          </p>
        </div>
      </TabsContent>
    );
  }

  const addressString = [
    property?.address?.street1,
    property?.address?.street2,
    property?.address?.city,
    property?.address?.state,
    property?.address?.zipCode,
    property?.address?.country,
  ]
    .filter(Boolean)
    .join(", ");

  return (
    <TabsContent value="property" className="m-0 focus-visible:outline-none space-y-5">
      <div className="border bg-card/50 p-5 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b">
          <div className="flex items-center gap-2">
            <Building2 className="h-4 w-4 text-muted-foreground" />
            <h3 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              Assigned Property
            </h3>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="text-[11px] font-mono rounded-none">
              {property?.propertyType}
            </Badge>
            <Badge
              variant="secondary"
              className="text-[11px] font-mono text-emerald-600 bg-emerald-500/10 rounded-none border-0"
            >
              {property?.status}
            </Badge>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="md:col-span-2 space-y-1">
            <h4 className="text-base font-bold tracking-tight">{property?.name}</h4>
            <div className="flex items-start gap-1.5 text-xs text-muted-foreground">
              <MapPin className="h-3.5 w-3.5 shrink-0 mt-0.5" />
              <span>{addressString || "Address unmapped"}</span>
            </div>
          </div>
        </div>

        {property?.amenities && property.amenities.length > 0 && (
          <div className="pt-3 border-t flex items-center gap-2 flex-wrap">
            <span className="text-xs text-muted-foreground flex items-center gap-1 mr-1">
              <Sparkles className="h-3 w-3" /> Amenities:
            </span>
            {property.amenities.map((item) => (
              <Badge
                key={item}
                variant="secondary"
                className="text-[11px] rounded-none border-0 bg-muted/60"
              >
                {item}
              </Badge>
            ))}
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="border bg-card/50 p-5 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b">
            <div className="flex items-center gap-2">
              <Home className="h-4 w-4 text-muted-foreground" />
              <h3 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                Unit Specs
              </h3>
            </div>
            <UnitStatusBadge status={unit?.status!} />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <span className="text-xs text-muted-foreground block">Unit Designation</span>
              <span className="font-mono text-sm font-bold bg-muted px-2 py-1 border inline-block">
                {unit?.unitNumber || "N/A"}
              </span>
            </div>

            <div className="space-y-1">
              <span className="text-xs text-muted-foreground block">Unit Type</span>
              <div className="flex items-center gap-1.5 text-xs font-semibold mt-1">
                <Layers className="h-3.5 w-3.5 text-muted-foreground" />
                <span>{unit?.unitType || "N/A"}</span>
              </div>
            </div>

            <div className="space-y-1 col-span-2 pt-2 border-t">
              <span className="text-xs text-muted-foreground block">Scheduled Move-In</span>
              <div className="flex items-center gap-1.5 text-xs font-mono">
                <Calendar className="h-3.5 w-3.5 text-muted-foreground" />
                <span>{formatDate(currentResidence?.moveInDate)}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border bg-card/50 p-5 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b">
            <div className="flex items-center gap-2">
              <IndianRupee className="h-4 w-4 text-muted-foreground" />
              <h3 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                Financial Baseline
              </h3>
            </div>
            <span className="text-[11px] font-mono text-muted-foreground">
              {unit?.finance?.currency || "INR"}
            </span>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <span className="text-xs text-muted-foreground block">Current Rent</span>
              <span className="text-sm font-mono font-bold text-foreground">
                {formatCurrency(unit?.finance?.currentRent, unit?.finance?.currency)}
              </span>
            </div>

            <div className="space-y-1">
              <span className="text-xs text-muted-foreground block">Market Rent</span>
              <span className="text-sm font-mono text-muted-foreground line-through">
                {formatCurrency(unit?.finance?.marketRent, unit?.finance?.currency)}
              </span>
            </div>

            <div className="space-y-1 col-span-2 pt-2 border-t">
              <span className="text-xs text-muted-foreground block">Security Deposit Required</span>
              <div className="flex items-center gap-1.5 text-xs font-mono font-semibold">
                <ShieldCheck className="h-3.5 w-3.5 text-emerald-600" />
                <span>
                  {formatCurrency(unit?.finance?.securityDeposit, unit?.finance?.currency)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </TabsContent>
  );
}