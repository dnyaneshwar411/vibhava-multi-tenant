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
import { MultiSelect, Option } from "@/components/ui/multi-select";
import { cn } from "@/lib/utils";
import { PAYMENT_STATUS_OPTIONS } from "../config/constants";

type RentRollFilterOptionsProps = {
  pagination: Record<string, any>;
  setPagination: Dispatch<SetStateAction<any>>;
};

export default function RentRollFilterOptions({
  pagination = {},
  setPagination,
}: RentRollFilterOptionsProps) {
  const [selectedPaymentStatuses, setSelectedPaymentStatuses] = useState<Option[]>([]);
  const [rentAfterDate, setRentAfterDate] = useState<string>("");
  const [rentBeforeDate, setRentBeforeDate] = useState<string>("");
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (!isOpen) return;

    const currentStatuses = pagination.paymentStatus
      ? String(pagination.paymentStatus).split(",").filter(Boolean)
      : [];

    setSelectedPaymentStatuses(
      PAYMENT_STATUS_OPTIONS.filter((option) => currentStatuses.includes(option.value))
    );
    setRentAfterDate(pagination.rentAfter || "");
    setRentBeforeDate(pagination.rentBefore || "");
  }, [
    pagination.paymentStatus,
    pagination.rentAfter,
    pagination.rentBefore,
    isOpen,
  ]);

  const handleSaveFilters = () => {
    const statusValues = (selectedPaymentStatuses || []).map((item) => item.value).join(",");

    if (typeof setPagination === "function") {
      setPagination((prev: any) => ({
        ...(prev || {}),
        paymentStatus: statusValues,
        rentAfter: rentAfterDate || "",
        rentBefore: rentBeforeDate || "",
        page: 1,
      }));
    }
    setIsOpen(false);
  };

  const handleReset = () => {
    setSelectedPaymentStatuses([]);
    setRentAfterDate("");
    setRentBeforeDate("");

    if (typeof setPagination === "function") {
      setPagination((prev: any) => ({
        ...(prev || {}),
        paymentStatus: "",
        rentAfter: "",
        rentBefore: "",
        page: 1,
      }));
    }
  };

  const activeFiltersCount =
    (pagination.paymentStatus ? String(pagination.paymentStatus).split(",").filter(Boolean).length : 0) +
    (pagination.rentAfter ? 1 : 0) +
    (pagination.rentBefore ? 1 : 0);

  const hasDraftFilters =
    selectedPaymentStatuses.length > 0 ||
    Boolean(rentAfterDate) ||
    Boolean(rentBeforeDate);

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger>
        <span
          className={cn(
            "h-8 border-muted gap-2 text-xs relative cursor-pointer",
            buttonVariants({ variant: "outline", size: "sm" })
          )}
        >
          <Filter className="h-3.5 w-3.5" />
          <span>Filters</span>
          {activeFiltersCount > 0 && (
            <Badge
              variant="secondary"
              className="h-4 px-1 font-mono text-[10px]"
            >
              {activeFiltersCount}
            </Badge>
          )}
        </span>
      </PopoverTrigger>

      <PopoverContent
        align="end"
        className="w-80 p-4 space-y-4 border bg-card text-card-foreground"
      >
        <div className="flex items-center justify-between pb-2 border-b">
          <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
            Filter Rent Roll
          </span>
          {(activeFiltersCount > 0 || hasDraftFilters) && (
            <Button
              variant="ghost"
              size="sm"
              onClick={handleReset}
              className="h-6 px-2 text-[11px] text-muted-foreground hover:text-foreground gap-1"
            >
              <RotateCcw className="h-3 w-3" /> Reset
            </Button>
          )}
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-medium text-muted-foreground block">
            Payment Status
          </label>
          <MultiSelect
            options={PAYMENT_STATUS_OPTIONS}
            selected={selectedPaymentStatuses}
            onChange={setSelectedPaymentStatuses}
            placeholder="Select payment statuses..."
            selectionField="_id"
            className="w-full"
          />
        </div>

        <div className="grid grid-cols-2 gap-2">
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-muted-foreground block">
              Rents After (From)
            </label>
            <Input
              type="date"
              value={rentAfterDate}
              onChange={(e) => setRentAfterDate(e.target.value)}
              className="h-8 text-xs"
            />
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-muted-foreground block">
              Rents Before (To)
            </label>
            <Input
              type="date"
              value={rentBeforeDate}
              onChange={(e) => setRentBeforeDate(e.target.value)}
              className="h-8 text-xs"
            />
          </div>
        </div>

        <div className="pt-2 border-t">
          <Button
            size="sm"
            onClick={handleSaveFilters}
            className="w-full h-8 text-xs gap-1.5"
          >
            <Check className="h-3.5 w-3.5" /> Apply Filters
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}
