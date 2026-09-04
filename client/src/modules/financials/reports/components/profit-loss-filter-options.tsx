"use client";

import { Dispatch, SetStateAction, useState, useEffect } from "react";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Filter, RotateCcw, Check } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

type ProfitLossFilterOptionsProps = {
  pagination: Record<string, any>;
  setPagination: Dispatch<SetStateAction<any>>;
};

export default function ProfitLossFilterOptions({
  pagination = {},
  setPagination,
}: ProfitLossFilterOptionsProps) {
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (!isOpen) return;
    setStartDate(pagination.startDate || "");
    setEndDate(pagination.endDate || "");
  }, [pagination.startDate, pagination.endDate, isOpen]);

  const handleSaveFilters = () => {
    if (typeof setPagination === "function") {
      setPagination((prev: any) => ({
        ...(prev || {}),
        startDate: startDate || "",
        endDate: endDate || "",
        page: 1,
      }));
    }
    setIsOpen(false);
  };

  const handleReset = () => {
    setStartDate("");
    setEndDate("");

    if (typeof setPagination === "function") {
      setPagination((prev: any) => ({
        ...(prev || {}),
        startDate: "",
        endDate: "",
        page: 1,
      }));
    }
  };

  const activeFiltersCount =
    (pagination.startDate ? 1 : 0) + (pagination.endDate ? 1 : 0);

  const hasDraftFilters = Boolean(startDate) || Boolean(endDate);

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger>
        <span
          className={cn(
            "rounded-none h-8 border-muted gap-2 text-xs relative cursor-pointer",
            buttonVariants({ variant: "outline", size: "sm" })
          )}
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
            Filter Statement
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

        <div className="grid grid-cols-2 gap-2">
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-muted-foreground block">
              Start Date
            </label>
            <Input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="h-8 rounded-none text-xs"
            />
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-muted-foreground block">
              End Date
            </label>
            <Input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="h-8 rounded-none text-xs"
            />
          </div>
        </div>

        <div className="pt-2 border-t">
          <Button
            size="sm"
            onClick={handleSaveFilters}
            className="w-full h-8 rounded-none text-xs gap-1.5 bg-teal-700 hover:bg-teal-800 text-white"
          >
            <Check className="h-3.5 w-3.5" /> Apply Filters
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}
