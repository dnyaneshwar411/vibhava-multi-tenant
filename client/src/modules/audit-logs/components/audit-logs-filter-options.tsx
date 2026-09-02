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
import { Input } from "@/components/ui/input";
import { MultiSelect, Option } from "@/components/ui/multi-select";
import {
  AUDIT_LOG_ACTION,
  AUDIT_LOG_ACTOR_MODEL,
  AUDIT_LOG_RESOURCE,
} from "../config";
import { cn } from "@/lib/utils";

type AuditLogFilterOptionsProps = {
  pagination: Record<string, any>;
  setPagination: Dispatch<SetStateAction<any>>;
};

export default function AuditLogFilterOptions({
  pagination,
  setPagination,
}: AuditLogFilterOptionsProps) {
  const MAPPED_ACTIONS: Option[] = useMemo(
    () =>
      [...AUDIT_LOG_ACTION].map((item) => ({
        _id: item,
        label: item,
        value: item,
      })),
    []
  );

  const MAPPED_RESOURCES: Option[] = useMemo(
    () =>
      [...AUDIT_LOG_RESOURCE].map((item) => ({
        _id: item,
        label: item,
        value: item,
      })),
    []
  );

  const MAPPED_ACTORS: Option[] = useMemo(
    () =>
      [...AUDIT_LOG_ACTOR_MODEL].map((item) => ({
        _id: item,
        label: item,
        value: item,
      })),
    []
  );

  const [selectedActions, setSelectedActions] = useState<Option[]>([]);
  const [selectedResources, setSelectedResources] = useState<Option[]>([]);
  const [selectedActors, setSelectedActors] = useState<Option[]>([]);
  const [fromDate, setFromDate] = useState<string>("");
  const [toDate, setToDate] = useState<string>("");
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (!isOpen) return;

    const currentActions = pagination.action
      ? String(pagination.action).split(",").filter(Boolean)
      : [];
    const currentResources = pagination.resource
      ? String(pagination.resource).split(",").filter(Boolean)
      : [];
    const currentActors = pagination.actor
      ? String(pagination.actor).split(",").filter(Boolean)
      : [];

    setSelectedActions(
      MAPPED_ACTIONS.filter((option) => currentActions.includes(option.value))
    );
    setSelectedResources(
      MAPPED_RESOURCES.filter((option) => currentResources.includes(option.value))
    );
    setSelectedActors(
      MAPPED_ACTORS.filter((option) => currentActors.includes(option.value))
    );
    setFromDate(pagination.from || "");
    setToDate(pagination.to || "");
  }, [
    pagination.action,
    pagination.resource,
    pagination.actor,
    pagination.from,
    pagination.to,
    MAPPED_ACTIONS,
    MAPPED_RESOURCES,
    MAPPED_ACTORS,
    isOpen,
  ]);

  const handleSaveFilters = () => {
    const actionValues = selectedActions.map((item) => item.value).join(",");
    const resourceValues = selectedResources.map((item) => item.value).join(",");
    const actorValues = selectedActors.map((item) => item.value).join(",");

    setPagination((prev: any) => ({
      ...prev,
      action: actionValues,
      resource: resourceValues,
      actor: actorValues,
      from: fromDate,
      to: toDate,
      page: 1,
    }));
    setIsOpen(false);
  };

  const handleReset = () => {
    setSelectedActions([]);
    setSelectedResources([]);
    setSelectedActors([]);
    setFromDate("");
    setToDate("");

    setPagination((prev: any) => ({
      ...prev,
      action: "",
      resource: "",
      actor: "",
      from: "",
      to: "",
      page: 1,
    }));
  };

  const activeFiltersCount =
    (pagination.action ? String(pagination.action).split(",").filter(Boolean).length : 0) +
    (pagination.resource ? String(pagination.resource).split(",").filter(Boolean).length : 0) +
    (pagination.actor ? String(pagination.actor).split(",").filter(Boolean).length : 0) +
    (pagination.from ? 1 : 0) +
    (pagination.to ? 1 : 0);

  const hasDraftFilters =
    selectedActions.length > 0 ||
    selectedResources.length > 0 ||
    selectedActors.length > 0 ||
    Boolean(fromDate) ||
    Boolean(toDate);

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger>
        <span className={cn("rounded-none h-8 border-muted gap-2 text-xs relative", buttonVariants({ variant: "outline", size: "sm" }))}>
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
            Filter Audit Logs
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

        <div className="space-y-1.5">
          <label className="text-xs font-medium text-muted-foreground block">
            Action
          </label>
          <MultiSelect
            options={MAPPED_ACTIONS}
            selected={selectedActions}
            onChange={setSelectedActions}
            placeholder="Select actions..."
            selectionField="_id"
            className="w-full"
          />
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-medium text-muted-foreground block">
            Resource
          </label>
          <MultiSelect
            options={MAPPED_RESOURCES}
            selected={selectedResources}
            onChange={setSelectedResources}
            placeholder="Select resources..."
            selectionField="_id"
            className="w-full"
          />
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-medium text-muted-foreground block">
            Actor Model
          </label>
          <MultiSelect
            options={MAPPED_ACTORS}
            selected={selectedActors}
            onChange={setSelectedActors}
            placeholder="Select actors..."
            selectionField="_id"
            className="w-full"
          />
        </div>

        <div className="grid grid-cols-2 gap-2">
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-muted-foreground block">
              From Date
            </label>
            <Input
              type="date"
              value={fromDate}
              onChange={(e) => setFromDate(e.target.value)}
              className="h-8 rounded-none text-xs"
            />
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-muted-foreground block">
              To Date
            </label>
            <Input
              type="date"
              value={toDate}
              onChange={(e) => setToDate(e.target.value)}
              className="h-8 rounded-none text-xs"
            />
          </div>
        </div>

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