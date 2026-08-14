"use client";

import * as React from "react";
import { X, Check, ChevronsUpDown, Plus } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Command,
  CommandGroup,
  CommandItem,
  CommandList,
  CommandInput,
  CommandEmpty,
} from "@/components/ui/command";
import { Tooltip, TooltipContent, TooltipTrigger } from "./tooltip";
import { cn } from "@/lib/utils";
import { Checkbox } from "./checkbox";
import { Input } from "./input";
import { Button } from "./button";

export type Option<T = unknown> = T & {
  label: string;
  value: string;
}

interface MultiSelectProps {
  options: any[];
  selected: any[];
  onChange: (selected: any[]) => void;
  placeholder?: string;
  className?: string;
  selectionField?: string;
}

export function MultiSelect({
  options,
  selected,
  onChange,
  placeholder = "Select options...",
  className = "",
  selectionField = "_id"
}: MultiSelectProps) {
  const [open, setOpen] = React.useState(false);

  const handleUnselect = (itemValue: string) => {
    onChange(selected.filter((v) => v !== itemValue));
  };
  const selectedItems = React.useMemo(function () {
    return new Set(selected.map(item => item[selectionField]))
  }, [selected])

  const handleSelect = (item: any) => {
    if (selectedItems.has(item[selectionField])) {
      onChange(selected.filter((v) => v[selectionField] !== item[selectionField]));
    } else {
      onChange([...selected, item]);
    }
  };

  const selectedLength = selected.length;

  return (
    <Command className={`overflow-visible bg-transparent ${className}`}>
      <div
        className="group border border-input px-3 py-2 text-sm ring-offset-background rounded-md focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2 bg-background cursor-pointer"
        onClick={() => setOpen(true)}
      >
        <div className="flex gap-1 flex-wrap items-center">
          {selected.slice(0, 3).map((option) => {
            return (
              <Badge key={option[selectionField]} variant="secondary" className="gap-1 pr-1">
                {option?.label}
                <button
                  type="button"
                  className="rounded-full outline-none ring-offset-background focus:ring-2 focus:ring-ring focus:ring-offset-2"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleUnselect(option[selectionField]);
                    }
                  }}
                  onMouseDown={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                  }}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleUnselect(option[selectionField]);
                  }}
                >
                  <X className="h-3 w-3 text-muted-foreground hover:text-foreground" />
                </button>
              </Badge>
            );
          })}
          {selectedLength > 3 && <Tooltip>
            <TooltipTrigger>
              <Badge>
                <Plus size={16} /> {selectedLength - 3}&nbsp;More
              </Badge>
            </TooltipTrigger>
            <TooltipContent className="bg-secondary border-1">
              {selected.map(item => <Badge key={item.value} className="gap-1 pr-1">
                {item.label}
              </Badge>)}
            </TooltipContent>
          </Tooltip>}

          {selectedLength === 0 && <div className="w-full opacity-50 font-light">{placeholder}</div>}
        </div>
      </div>

      {open && (
        <div className="relative mt-2">
          <Button
            size="xs"
            className="absolute translate-x-1/3 -translate-y-1/3 top-0 right-0 z-100"
            variant="destructive"
            onClick={() => setOpen(false)}
          >
            <X />
          </Button>
          <div className="absolute top-0 z-50 w-full rounded-md border bg-popover text-popover-foreground shadow-md outline-none animate-in fade-in-0 zoom-in-95">
            <CommandList>
              <CommandEmpty>No results found.</CommandEmpty>
              {/* <Input
                className="border-0 border-b-1"
                placeholder="Search..."
              /> */}
              <CommandGroup className="max-h-64 overflow-auto">
                {options.map((option) => {
                  return (
                    <SelectOption
                      option={option}
                      key={option[selectionField]}
                      isSelected={selectedItems.has(option[selectionField])}
                      handleSelect={handleSelect}
                    />
                  );
                })}
              </CommandGroup>
            </CommandList>
          </div>
        </div>
      )}
    </Command>
  );
}

function SelectOption({
  option,
  isSelected,
  handleSelect
}: {
  option: any
  isSelected: boolean
  handleSelect: (item: any) => void
}) {
  return (
    <CommandItem
      key={option.value}
      onMouseDown={(e) => {
        e.preventDefault();
        e.stopPropagation();
      }}
      onSelect={() => handleSelect(option)}
      className={cn("cursor-pointer justify-between", isSelected && "bg-secondary")}
    >
      <Checkbox checked={isSelected} onCheckedChange={() => handleSelect(option)} />
      <span>{option.label}</span>
    </CommandItem>
  )
}