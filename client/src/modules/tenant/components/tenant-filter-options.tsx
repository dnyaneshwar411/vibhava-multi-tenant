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
import { MultiSelect, Option } from "@/components/ui/multi-select";
import { TENANT_STATUS } from "../config";

type TenantFilterOptionsProps = {
  pagination: Record<string, any>;
  setPagination: Dispatch<SetStateAction<any>>;
}

export default function TenantFilterOptions({
  pagination,
  setPagination,
}: TenantFilterOptionsProps) {
  const currentStatuses: string[] = pagination.status.split(",")

  const selectedOptions = TENANT_STATUS.filter((option) =>
    currentStatuses.includes(option.value)
  );

  const handleStatusChange = (selected: any[]) => {
    const selectedValues = selected.map((item) => item.value);
    setPagination((prev: any) => ({
      ...prev,
      status: selectedValues.join(","),
      page: 1,
    }));
  };

  const handleReset = () => {
    setPagination((prev: any) => ({
      ...prev,
      status: "",
      page: 1,
    }));
  };

  const hasActiveFilters = selectedOptions.length > 0;

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
              {selectedOptions.length}
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
            Tenant Status
          </label>
          <MultiSelect
            options={TENANT_STATUS}
            selected={selectedOptions}
            onChange={handleStatusChange}
            placeholder="Select status..."
            selectionField="_id"
            className="w-full"
          />
        </div>
      </PopoverContent>
    </Popover>
  );
}