"use client";

import { useMemo, useState } from "react";
import { useParams } from "next/navigation";
import {
  Search,
  Copy,
  Check,
  Building2,
  CheckCircle2,
  Clock,
  Wrench,
  ChevronDown,
  Eye,
} from "lucide-react";

import { ErrorState } from "@/components/ui/error";
import { ComponentLoader } from "@/components/ui/loader";
import useFetch from "@/hooks/useFetch";
import { copyText } from "@/lib/helpers";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Link from "next/link";

interface Unit {
  _id: string;
  organization: string;
  property: string;
  unitNumber: string;
  floor: number;
  unitType: string;
  status: "Occupied" | "Under Maintenance" | "Vacant";
  amenities: string[];
  createdBy: string;
  isDeleted: boolean;
}

export default function Page() {
  const { propertyId } = useParams() as { propertyId: string };
  const { isLoading, data, error, mutate } = useFetch(
    `/api/v1/property/${propertyId}/units`
  );

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");

  const units: Unit[] = useMemo(() => data?.data || [], [data]);

  const stats = useMemo(() => {
    return {
      total: units.length,
      occupied: units.filter((u) => u.status === "Occupied").length,
      vacant: units.filter((u) => u.status === "Vacant").length,
      maintenance: units.filter((u) => u.status === "Under Maintenance").length,
    };
  }, [units]);

  const filteredUnits = useMemo(() => {
    return units.filter((unit) => {
      const matchesSearch =
        unit.unitNumber.toLowerCase().includes(search.toLowerCase()) ||
        unit.unitType.toLowerCase().includes(search.toLowerCase());

      const matchesStatus =
        statusFilter === "all" || unit.status === statusFilter;

      const matchesType =
        typeFilter === "all" || unit.unitType === typeFilter;

      return matchesSearch && matchesStatus && matchesType;
    });
  }, [units, search, statusFilter, typeFilter]);

  if (isLoading)
    return (
      <div className="flex items-center justify-center h-screen">
        <ComponentLoader />
      </div>
    );

  if (error || data?.code !== 200) {
    return (
      <div className="flex items-center justify-center h-screen">
        <ErrorState
          title={data?.message || "Units Sync Error"}
          description="Failed to load units for this property."
          reset={() => mutate()}
        />
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b">
        <h1 className="text-xl font-semibold tracking-tight">Units</h1>
      </div>

      <div className="flex items-center gap-6 text-sm pb-2">
        <div className="flex items-center gap-2">
          <span className="text-muted-foreground">Total:</span>
          <span className="font-semibold">{stats.total}</span>
        </div>
        <div className="h-3 w-[1px] bg-border" />
        <div className="flex items-center gap-2">
          <span className="text-muted-foreground">Occupied:</span>
          <span className="font-semibold">{stats.occupied}</span>
        </div>
        <div className="h-3 w-[1px] bg-border" />
        <div className="flex items-center gap-2">
          <span className="text-muted-foreground">Vacant:</span>
          <span className="font-semibold">{stats.vacant}</span>
        </div>
        <div className="h-3 w-[1px] bg-border" />
        <div className="flex items-center gap-2">
          <span className="text-muted-foreground">Maintenance:</span>
          <span className="font-semibold">{stats.maintenance}</span>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="relative w-full sm:w-72">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search unit..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9 h-9 text-sm rounded-none border-x-0 border-t-0 border-b focus-visible:ring-0 px-0 pl-7"
          />
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          <Select value={statusFilter} onValueChange={setStatusFilter as any}>
            <SelectTrigger className="w-[140px] h-8 text-xs rounded-none border-x-0 border-t-0 border-b focus:ring-0">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="Occupied">Occupied</SelectItem>
              <SelectItem value="Vacant">Vacant</SelectItem>
              <SelectItem value="Under Maintenance">Maintenance</SelectItem>
            </SelectContent>
          </Select>

          <Select value={typeFilter} onValueChange={setTypeFilter as any}>
            <SelectTrigger className="w-[130px] h-8 text-xs rounded-none border-x-0 border-t-0 border-b focus:ring-0">
              <SelectValue placeholder="Unit Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="1BHK">1BHK</SelectItem>
              <SelectItem value="2BHK">2BHK</SelectItem>
              <SelectItem value="3BHK">3BHK</SelectItem>
              <SelectItem value="Studio">Studio</SelectItem>
              <SelectItem value="Other">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="w-full bg-secondary/40 border-1">
        <Table>
          <TableHeader className="bg-secondary">
            <TableRow className="hover:bg-transparent border-b">
              <TableHead className="w-[120px] font-medium text-xs">Sr No</TableHead>
              <TableHead className="w-[120px] font-medium text-xs">UNIT</TableHead>
              <TableHead className="w-[100px] font-medium text-xs">FLOOR</TableHead>
              <TableHead className="w-[120px] font-medium text-xs">TYPE</TableHead>
              <TableHead className="w-[160px] font-medium text-xs">STATUS</TableHead>
              <TableHead className="font-medium text-xs">AMENITIES</TableHead>
              <TableHead />
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredUnits.length > 0 ? (
              filteredUnits.map((unit, index) => (
                <TableRow
                  key={unit._id}
                  className="hover:bg-muted/40 transition-colors border-b"
                >
                  <TableCell className="font-medium text-sm py-3">
                    {index + 1}
                  </TableCell>
                  <TableCell className="font-medium text-sm py-3">
                    {unit.unitNumber}
                  </TableCell>
                  <TableCell className="text-sm py-3 text-muted-foreground">
                    Floor {unit.floor}
                  </TableCell>
                  <TableCell className="text-sm py-3 font-medium">
                    {unit.unitType}
                  </TableCell>
                  <TableCell className="py-3">
                    <StatusDot status={unit.status} />
                  </TableCell>
                  <TableCell className="py-3">
                    <div className="flex flex-wrap gap-1.5">
                      {unit.amenities.length > 0 ? (
                        unit.amenities.map((amenity, idx) => (
                          <span
                            key={idx}
                            className="text-xs text-muted-foreground bg-muted/60 px-2 py-0.5"
                          >
                            {amenity}
                          </span>
                        ))
                      ) : (
                        <span className="text-xs text-muted-foreground/50">—</span>
                      )}
                    </div>
                  </TableCell>
                  <TableCell className="py-3">
                    <Link className="opacity-50 hover:opacity-100" href={`/management/properties/${propertyId}/units/${unit._id}`}>
                      <Eye strokeWidth={1.5} size={18} />
                    </Link>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={6}
                  className="h-32 text-center text-sm text-muted-foreground"
                >
                  No units matching current filters.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

function StatusDot({ status }: { status: Unit["status"] }) {
  switch (status) {
    case "Occupied":
      return (
        <span className="inline-flex items-center gap-1.5 text-xs font-medium text-foreground">
          <span className="h-1.5 w-1.5 bg-emerald-500" />
          Occupied
        </span>
      );
    case "Vacant":
      return (
        <span className="inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
          <span className="h-1.5 w-1.5 bg-zinc-400" />
          Vacant
        </span>
      );
    case "Under Maintenance":
      return (
        <span className="inline-flex items-center gap-1.5 text-xs font-medium text-amber-600 dark:text-amber-500">
          <span className="h-1.5 w-1.5 bg-amber-500" />
          Maintenance
        </span>
      );
    default:
      return null;
  }
}