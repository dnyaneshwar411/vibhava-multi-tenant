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
import PropertyDirectorySelection from "@/modules/properties/components/property-directory-selection";
import UnitDirectorySelection from "@/modules/unit/components/unit-directory-selection";

const TICKET_STATUSES = [
  "Open",
  "In Review",
  "Vendor Scheduled",
  "Pending Parts",
  "In Progress",
  "Completed",
  "Canceled",
];

const TICKET_CATEGORIES = [
  "Plumbing",
  "Electrical",
  "HVAC",
  "Carpentry",
  "Landscaping",
  "General Contracting",
  "Appliance Repair",
  "Security & Locks",
  "Painting",
  "Other",
];

const TICKET_PRIORITIES = ["Emergency", "High", "Medium", "Low"];

type TicketFilterOptionsProps = {
  pagination: {
    page: number;
    limit: number;
    status?: string;
    category?: string;
    priority?: string;
    property?: string;
    unit?: string;
    [key: string]: any;
  };
  setPagination: Dispatch<SetStateAction<any>>;
  pageNumber?: number;
  limitNumber?: number;
};

export default function TicketFilterOptions({
  pagination,
  setPagination,
  pageNumber,
  limitNumber,
}: TicketFilterOptionsProps) {
  const activePage = pageNumber ?? pagination.page ?? 1;
  const activeLimit = limitNumber ?? pagination.limit ?? 10;

  const MAPPED_STATUSES = useMemo(
    () =>
      TICKET_STATUSES.map((item) => ({
        _id: item,
        label: item,
        value: item,
      })),
    []
  );

  const MAPPED_CATEGORIES = useMemo(
    () =>
      TICKET_CATEGORIES.map((item) => ({
        _id: item,
        label: item,
        value: item,
      })),
    []
  );

  const MAPPED_PRIORITIES = useMemo(
    () =>
      TICKET_PRIORITIES.map((item) => ({
        _id: item,
        label: item,
        value: item,
      })),
    []
  );

  const [selectedStatuses, setSelectedStatuses] = useState<Option[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<Option[]>([]);
  const [selectedPriorities, setSelectedPriorities] = useState<Option[]>([]);
  const [selectedProperty, setSelectedProperty] = useState<string>("");
  const [selectedUnit, setSelectedUnit] = useState<string>("");
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const currentStatuses = pagination.status ? pagination.status.split(",") : [];
    const currentCategories = pagination.category ? pagination.category.split(",") : [];
    const currentPriorities = pagination.priority ? pagination.priority.split(",") : [];

    setSelectedStatuses(
      MAPPED_STATUSES.filter((option) => currentStatuses.includes(option.value))
    );
    setSelectedCategories(
      MAPPED_CATEGORIES.filter((option) => currentCategories.includes(option.value))
    );
    setSelectedPriorities(
      MAPPED_PRIORITIES.filter((option) => currentPriorities.includes(option.value))
    );
    setSelectedProperty(pagination.property || "");
    setSelectedUnit(pagination.unit || "");
  }, [
    pagination.status,
    pagination.category,
    pagination.priority,
    pagination.property,
    pagination.unit,
    MAPPED_STATUSES,
    MAPPED_CATEGORIES,
    MAPPED_PRIORITIES,
    isOpen,
  ]);

  const handleSaveFilters = () => {
    const statusValues = selectedStatuses.map((item) => item.value).join(",");
    const categoryValues = selectedCategories.map((item) => item.value).join(",");
    const priorityValues = selectedPriorities.map((item) => item.value).join(",");

    setPagination((prev: any) => ({
      ...prev,
      status: statusValues,
      category: categoryValues,
      priority: priorityValues,
      property: selectedProperty,
      unit: selectedUnit,
      page: 1,
      limit: activeLimit,
    }));
    setIsOpen(false);
  };

  const handleReset = () => {
    setSelectedStatuses([]);
    setSelectedCategories([]);
    setSelectedPriorities([]);
    setSelectedProperty("");
    setSelectedUnit("");

    setPagination((prev: any) => ({
      ...prev,
      status: "",
      category: "",
      priority: "",
      property: "",
      unit: "",
      page: 1,
      limit: activeLimit,
    }));
  };

  const activeFiltersCount =
    (pagination.status ? pagination.status.split(",").filter(Boolean).length : 0) +
    (pagination.category ? pagination.category.split(",").filter(Boolean).length : 0) +
    (pagination.priority ? pagination.priority.split(",").filter(Boolean).length : 0) +
    (pagination.property ? 1 : 0) +
    (pagination.unit ? 1 : 0);

  const hasDraftFilters =
    selectedStatuses.length > 0 ||
    selectedCategories.length > 0 ||
    selectedPriorities.length > 0 ||
    Boolean(selectedProperty) ||
    Boolean(selectedUnit);

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger>
        <span className={buttonVariants({ variant: "outline", size: "sm" })}>
          <Filter className="h-3.5 w-3.5" />
          <span>Filters</span>
          {activeFiltersCount > 0 && (
            <Badge variant="secondary" className="px-1.5 py-0 text-xs">
              {activeFiltersCount}
            </Badge>
          )}
        </span>
      </PopoverTrigger>

      <PopoverContent align="end" className="w-80 p-4 space-y-4">
        <div className="flex items-center justify-between pb-2 border-b">
          <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Filter Tickets
          </span>
          {(activeFiltersCount > 0 || hasDraftFilters) && (
            <Button
              variant="ghost"
              size="sm"
              onClick={handleReset}
              className="h-6 px-2 text-xs text-muted-foreground hover:text-foreground gap-1"
            >
              <RotateCcw className="h-3 w-3" /> Reset
            </Button>
          )}
        </div>

        <div className="space-y-3">
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-muted-foreground block">
              Property
            </label>
            <PropertyDirectorySelection
              value={selectedProperty}
              onValueChange={setSelectedProperty}
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-medium text-muted-foreground block">
              Unit
            </label>
            <UnitDirectorySelection
              value={selectedUnit}
              onValueChange={setSelectedUnit}
            />
          </div>
        </div>

        <div className="space-y-3 pt-2 border-t">
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-muted-foreground block">
              Status
            </label>
            <MultiSelect
              options={MAPPED_STATUSES}
              selected={selectedStatuses}
              onChange={setSelectedStatuses}
              placeholder="Select status..."
              selectionField="_id"
              className="w-full"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-medium text-muted-foreground block">
              Category
            </label>
            <MultiSelect
              options={MAPPED_CATEGORIES}
              selected={selectedCategories}
              onChange={setSelectedCategories}
              placeholder="Select category..."
              selectionField="_id"
              className="w-full"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-medium text-muted-foreground block">
              Priority
            </label>
            <MultiSelect
              options={MAPPED_PRIORITIES}
              selected={selectedPriorities}
              onChange={setSelectedPriorities}
              placeholder="Select priority..."
              selectionField="_id"
              className="w-full"
            />
          </div>
        </div>

        <div className="pt-2 border-t">
          <Button size="sm" onClick={handleSaveFilters} className="w-full gap-1.5">
            <Check className="h-3.5 w-3.5" /> Apply Filters
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}