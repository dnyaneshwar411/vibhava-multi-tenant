"use client";

import { Dispatch, SetStateAction, useMemo, useState, useEffect } from "react";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Filter, RotateCcw, Check } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { MultiSelect, Option } from "@/components/ui/multi-select";
import { LEASE_STATUSES, LEASE_TYPES } from "../config";

type LeaseFilterOptionsProps = {
  pagination: Record<string, any>;
  setPagination: Dispatch<SetStateAction<any>>;
};

export default function LeaseFilterOptions({
  pagination,
  setPagination,
}: LeaseFilterOptionsProps) {
  // 1. Map options for multi-selects
  const MAPPED_LEASE_STATUS = useMemo(
    () =>
      [...LEASE_STATUSES].map((item) => ({
        _id: item,
        label: item,
        value: item,
      })),
    []
  );

  const MAPPED_LEASE_TYPES = useMemo(
    () =>
      [...LEASE_TYPES].map((item) => ({
        _id: item,
        label: item,
        value: item,
      })),
    []
  );

  // 2. Local state to hold selections until user clicks "Save / Apply"
  const [selectedStatuses, setSelectedStatuses] = useState<Option[]>([]);
  const [selectedTypes, setSelectedTypes] = useState<Option[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  // Sync local state whenever pagination state changes or popover opens
  useEffect(() => {
    const currentStatuses = pagination.status ? pagination.status.split(",") : [];
    const currentTypes = pagination.type ? pagination.type.split(",") : [];

    setSelectedStatuses(
      MAPPED_LEASE_STATUS.filter((option) =>
        currentStatuses.includes(option.value)
      )
    );
    setSelectedTypes(
      MAPPED_LEASE_TYPES.filter((option) => currentTypes.includes(option.value))
    );
  }, [pagination.status, pagination.type, MAPPED_LEASE_STATUS, MAPPED_LEASE_TYPES, isOpen]);

  // 3. Save filters and update parent pagination state
  const handleSaveFilters = () => {
    const statusValues = selectedStatuses.map((item) => item.value).join(",");
    const typeValues = selectedTypes.map((item) => item.value).join(",");

    setPagination((prev: any) => ({
      ...prev,
      status: statusValues,
      type: typeValues,
      page: 1,
    }));
    setIsOpen(false);
  };

  // 4. Reset both local state and pagination state
  const handleReset = () => {
    setSelectedStatuses([]);
    setSelectedTypes([]);
    setPagination((prev: any) => ({
      ...prev,
      status: "",
      type: "",
      page: 1,
    }));
  };

  const activeFiltersCount =
    (pagination.status ? pagination.status.split(",").filter(Boolean).length : 0) +
    (pagination.type ? pagination.type.split(",").filter(Boolean).length : 0);

  const hasDraftFilters = selectedStatuses.length > 0 || selectedTypes.length > 0;

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger>
        <span
          className={buttonVariants({
            variant: "outline",
            size: "sm",
            className: "rounded-none h-8 border-muted gap-2 text-xs relative",
          })}
        >
          <Filter className="h-3.5 w-3.5" />
          <span>Filters</span>
          {activeFiltersCount > 0 && (
            <Badge
              variant="secondary"
              className="h-4 px-1 rounded-none font-mono text-[10px] bg-foreground text-background"
            >
              {activeFiltersCount}
            </Badge>
          )}
        </span>
      </PopoverTrigger>

      <PopoverContent
        align="end"
        className="w-80 rounded-none p-4 space-y-4 border bg-card text-card-foreground shadow-none"
      >
        <div className="flex items-center justify-between pb-2 border-b">
          <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
            Filter Directory
          </span>
          {(activeFiltersCount > 0 || hasDraftFilters) && (
            <Button
              variant="ghost"
              size="sm"
              onClick={handleReset}
              className="h-6 px-2 text-[11px] rounded-none text-muted-foreground hover:text-foreground gap-1"
            >
              <RotateCcw className="h-3 w-3" /> Reset
            </Button>
          )}
        </div>

        {/* Lease Status Multi-Select */}
        <div className="space-y-1.5">
          <label className="text-xs font-medium text-muted-foreground block">
            Lease Status
          </label>
          <MultiSelect
            options={MAPPED_LEASE_STATUS}
            selected={selectedStatuses}
            onChange={setSelectedStatuses}
            placeholder="Select status..."
            selectionField="_id"
            className="w-full"
          />
        </div>

        {/* Lease Type Multi-Select */}
        <div className="space-y-1.5">
          <label className="text-xs font-medium text-muted-foreground block">
            Lease Type
          </label>
          <MultiSelect
            options={MAPPED_LEASE_TYPES}
            selected={selectedTypes}
            onChange={setSelectedTypes}
            placeholder="Select type..."
            selectionField="_id"
            className="w-full"
          />
        </div>

        {/* Save / Apply Button */}
        <div className="pt-2 border-t">
          <Button
            size="sm"
            onClick={handleSaveFilters}
            className="w-full h-8 rounded-none text-xs gap-1.5"
          >
            <Check className="h-3.5 w-3.5" /> Apply Filters
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}