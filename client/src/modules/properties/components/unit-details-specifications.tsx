"use client";

import { TabsContent } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import {
  Bath,
  Bed,
  Droplets,
  Flame,
  Lock,
  Maximize2,
  PawPrint,
  Zap,
  CheckCircle2,
  XCircle,
  Users,
  Compass,
} from "lucide-react";

export default function UnitDetailsSpecifications({
  specifications,
}: {
  specifications: any;
}) {
  return (
    <TabsContent
      value="specifications"
      className="m-0 focus-visible:outline-none space-y-6"
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="border bg-card/50 p-5 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b">
            <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-widest">
              Layout & Space
            </h3>
            <Maximize2 className="h-4 w-4 text-muted-foreground/60" />
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground flex items-center gap-2">
                <Maximize2 className="h-3.5 w-3.5" /> Total Area
              </span>
              <span className="font-semibold">{specifications.squareFeet} sq ft</span>
            </div>

            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground flex items-center gap-2">
                <Bed className="h-3.5 w-3.5" /> Bedrooms
              </span>
              <span className="font-semibold">{specifications.bedrooms}</span>
            </div>

            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground flex items-center gap-2">
                <Bath className="h-3.5 w-3.5" /> Bathrooms
              </span>
              <span className="font-semibold">
                {specifications.bathrooms} Full{" "}
                <span className="text-xs text-muted-foreground font-normal">
                  / {specifications.halfBathrooms} Half
                </span>
              </span>
            </div>

            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground flex items-center gap-2">
                <Compass className="h-3.5 w-3.5" /> Balconies
              </span>
              <span className="font-semibold">{specifications.balconies}</span>
            </div>

            <div className="flex items-center justify-between text-sm pt-2 border-t">
              <span className="text-muted-foreground">Furnishing</span>
              <Badge variant="secondary" className="font-normal text-xs rounded-none">
                {specifications.furnishingStatus}
              </Badge>
            </div>
          </div>
        </div>

        <div className="border bg-card/50 p-5 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b">
            <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-widest">
              Utility Meters & Access
            </h3>
            <Zap className="h-4 w-4 text-muted-foreground/60" />
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground flex items-center gap-2">
                <Zap className="h-3.5 w-3.5 text-amber-500/80" /> Electric Meter
              </span>
              <span className="font-mono text-xs bg-muted px-2 py-0.5 border">
                {specifications.utilityMeters.electricMeterNumber}
              </span>
            </div>

            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground flex items-center gap-2">
                <Droplets className="h-3.5 w-3.5 text-blue-500/80" /> Water Meter
              </span>
              <span className="font-mono text-xs bg-muted px-2 py-0.5 border">
                {specifications.utilityMeters.waterMeterNumber}
              </span>
            </div>

            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground flex items-center gap-2">
                <Flame className="h-3.5 w-3.5 text-orange-500/80" /> Gas Meter
              </span>
              <span className="font-mono text-xs bg-muted px-2 py-0.5 border">
                {specifications.utilityMeters.gasMeterNumber}
              </span>
            </div>

            <div className="flex items-center justify-between text-sm pt-2 border-t">
              <span className="text-muted-foreground flex items-center gap-2">
                <Lock className="h-3.5 w-3.5" /> Smart Lock ID
              </span>
              <span className="font-mono text-xs bg-muted px-2 py-0.5 border">
                {specifications.keyCodes.smartLockId}
              </span>
            </div>
          </div>
        </div>

        <div className="border bg-card/50 p-5 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b">
            <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-widest">
              Policies & Provisions
            </h3>
            <PawPrint className="h-4 w-4 text-muted-foreground/60" />
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground flex items-center gap-2">
                <PawPrint className="h-3.5 w-3.5" /> Pet Policy
              </span>
              <span className="font-medium text-right text-xs">
                {specifications.isPetFriendly
                  ? specifications.petPolicyDetails
                  : "Not Allowed"}
              </span>
            </div>

            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">ADA Accessible</span>
              {specifications.isAdaAccessible ? (
                <span className="inline-flex items-center gap-1 text-xs text-emerald-600 font-medium">
                  <CheckCircle2 className="h-3.5 w-3.5" /> Yes
                </span>
              ) : (
                <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
                  <XCircle className="h-3.5 w-3.5" /> No
                </span>
              )}
            </div>

            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Smoking Allowed</span>
              {specifications.isSmokingAllowed ? (
                <span className="inline-flex items-center gap-1 text-xs text-emerald-600 font-medium">
                  <CheckCircle2 className="h-3.5 w-3.5" /> Yes
                </span>
              ) : (
                <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
                  <XCircle className="h-3.5 w-3.5" /> No
                </span>
              )}
            </div>

            <div className="flex items-center justify-between text-sm pt-2 border-t">
              <span className="text-muted-foreground flex items-center gap-2">
                <Users className="h-3.5 w-3.5" /> Max Occupancy
              </span>
              <span className="font-semibold">
                {specifications.maxOccupancy} Guests
              </span>
            </div>
          </div>
        </div>
      </div>
    </TabsContent>
  );
}