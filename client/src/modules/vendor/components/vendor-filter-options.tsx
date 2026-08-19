"use client";

import { Dispatch, SetStateAction } from "react";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Filter, RotateCcw } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { MultiSelect, Option } from "@/components/ui/multi-select";
import { VENDOR_STATUS, VENDOR_TRADE_CATEGORIES } from "../config";

type VendorFilterOptionsProps = {
  pagination: Record<string, any>;
  setPagination: Dispatch<SetStateAction<any>>;
};

export default function VendorFilterOptions({
  pagination,
  setPagination,
}: VendorFilterOptionsProps) {
  const currentStatuses = pagination.status
    ? pagination.status.split(",").filter(Boolean)
    : [];
  const selectedStatusOptions = VENDOR_STATUS
    .filter((option) => currentStatuses.includes(option))
    .map((option) => ({ label: option, value: option }));

  const currentTrades = pagination.tradeCategory
    ? pagination.tradeCategory.split(",").filter(Boolean)
    : [];
  const selectedTradeOptions = VENDOR_TRADE_CATEGORIES
    .filter((option) => currentTrades.includes(option))
    .map((option) => ({ label: option, value: option }));

  const handleStatusChange = (selected: Option[]) => {
    const selectedValues = selected.map((item) => item.value);
    setPagination((prev: any) => ({
      ...prev,
      status: selectedValues.join(","),
      page: 1,
    }));
  };

  const handleTradeCategoryChange = (selected: Option[]) => {
    const selectedValues = selected.map((item) => item.value);
    setPagination((prev: any) => ({
      ...prev,
      tradeCategory: selectedValues.join(","),
      page: 1,
    }));
  };

  const handleLocationSearchToggle = (checked: boolean) => {
    setPagination((prev: any) => ({
      ...prev,
      searchByLocation: checked,
      page: 1,
    }));
  };

  const handleReset = () => {
    setPagination((prev: any) => ({
      ...prev,
      status: "",
      tradeCategory: "",
      searchByLocation: false,
      page: 1,
    }));
  };

  const activeFiltersCount =
    selectedStatusOptions.length +
    selectedTradeOptions.length +
    (pagination.searchByLocation ? 1 : 0);

  const hasActiveFilters = activeFiltersCount > 0;

  return (
    <Popover>
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
          {hasActiveFilters && (
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
          {hasActiveFilters && (
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

        <div className="space-y-2">
          <label className="text-xs font-medium text-muted-foreground block">
            Vendor Status
          </label>
          <MultiSelect
            options={VENDOR_STATUS.map(item => ({ label: item, value: item }))}
            selected={selectedStatusOptions}
            onChange={handleStatusChange}
            placeholder="Select status..."
            selectionField="value"
            className="w-full"
          />
        </div>

        <div className="space-y-2">
          <label className="text-xs font-medium text-muted-foreground block">
            Trade Category
          </label>
          <MultiSelect
            options={VENDOR_TRADE_CATEGORIES.map(item => ({ label: item, value: item }))}
            selected={selectedTradeOptions}
            onChange={handleTradeCategoryChange}
            placeholder="Select trade categories..."
            selectionField="value"
            className="w-full"
          />
        </div>

        <div className="flex items-center space-x-2 pt-2 border-t">
          <Checkbox
            id="searchByLocation"
            checked={!!pagination.searchByLocation}
            onCheckedChange={handleLocationSearchToggle}
            className="rounded-none border-muted focus-visible:ring-0"
          />
          <Label
            htmlFor="searchByLocation"
            className="text-xs font-medium text-muted-foreground leading-none cursor-pointer"
          >
            Search within address/location fields
          </Label>
        </div>
      </PopoverContent>
    </Popover>
  );
}