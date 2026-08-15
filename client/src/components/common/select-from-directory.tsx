"use client"

import React, { useEffect, useState } from "react"
import { Loader2, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Skeleton } from "@/components/ui/skeleton"
import { cn } from "@/lib/utils"
import { useDebounce } from "@/hooks/useDebounce"

export interface DirectoryItem {
  id: string | number
  label: string
  value: string
}

export interface DirectoryPagination {
  page: number
  limit: number
  total: number
  query?: string
}

export interface SelectFromDirectoryProps {
  selectedItem?: DirectoryItem
  onValueChange: (value: string, item?: DirectoryItem) => void
  isLoading?: boolean
  error?: Error | null
  data?: DirectoryItem[]
  pagination: DirectoryPagination
  setPagination: React.Dispatch<React.SetStateAction<any>>
  placeholder?: string
  limitOptions?: number[]
}

export default function SelectFromDirectory({
  selectedItem,
  onValueChange,
  isLoading = false,
  error = null,
  data = [],
  pagination,
  setPagination,
  placeholder = "Select an item...",
  limitOptions = [10, 20, 30, 50],
}: SelectFromDirectoryProps) {
  const { page, limit, total } = pagination
  const totalPages = Math.ceil(total / limit) || 1
  const [searchQuery, setSearchQuery] = useState("")
  const debouncedQuery = useDebounce(searchQuery)

  useEffect(() => {
    setPagination((prev: DirectoryPagination) => ({
      ...prev,
      query: debouncedQuery,
      page: 1,
    }))
  }, [debouncedQuery])

  return (
    <Select
      value={selectedItem?.value ?? ""}
      onValueChange={(val) => {
        if (!val) return
        const selected = data.find((item) => item.value === val)
        onValueChange(val, selected)
      }}
    >
      <SelectTrigger className="w-full">
        <SelectValue placeholder={placeholder}>
          {selectedItem?.label || placeholder}
        </SelectValue>
      </SelectTrigger>

      <SelectContent
        align="start"
        alignItemWithTrigger={false}
        className="w-(--anchor-width) min-w-(--anchor-width) p-0"
      >
        {/* Search Input */}
        <div className="p-2 border-b">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-3.5 w-3.5 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search..."
              className="pl-8 h-8 text-xs"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => e.stopPropagation()}
            />
          </div>
        </div>

        {/* Directory Item List */}
        <SelectGroup className="max-h-60 w-full overflow-y-auto p-1">
          {error && (
            <div className="p-3 text-xs text-destructive text-center">
              Failed to load items.
            </div>
          )}

          {isLoading && data.length === 0 && (
            <div className="space-y-1.5 p-1">
              {Array.from({ length: 3 }).map((_, i) => (
                <Skeleton key={i} className="h-7 w-full" />
              ))}
            </div>
          )}

          {!isLoading && !error && data.length === 0 && (
            <div className="py-6 text-center text-xs text-muted-foreground">
              No results found.
            </div>
          )}

          {data.map((item) => (
            <SelectItem
              key={item.id}
              value={item.value}
              className={cn(
                "text-xs",
                item.value === selectedItem?.value && "bg-secondary font-medium"
              )}
            >
              {item.label}
            </SelectItem>
          ))}
        </SelectGroup>

        {/* Pagination & Limit Bar */}
        <div className="flex items-center justify-between border-t p-2 bg-muted/20 text-xs">
          <div className="flex items-center gap-1.5 text-muted-foreground">
            <Select
              value={String(limit)}
              onValueChange={(val) =>
                setPagination((prev: any) => ({
                  ...prev,
                  limit: Number(val),
                  page: 1,
                }))
              }
            >
              <SelectTrigger className="h-6 w-[55px] text-[11px] px-1.5">
                <SelectValue placeholder={String(limit)} />
              </SelectTrigger>
              <SelectContent>
                {limitOptions.map((opt) => (
                  <SelectItem key={opt} value={String(opt)} className="text-xs">
                    {opt}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {total > 0 && (
              <span className="text-[11px]">
                {(page - 1) * limit + 1}-{Math.min(page * limit, total)} of {total}
              </span>
            )}
          </div>

          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="sm"
              className="h-6 px-1.5 text-[11px]"
              disabled={page <= 1 || isLoading}
              onClick={(e) => {
                e.preventDefault()
                e.stopPropagation()
                setPagination((prev: any) => ({
                  ...prev,
                  page: Math.max(prev.page - 1, 1),
                }))
              }}
            >
              Prev
            </Button>
            <span className="text-[11px] text-muted-foreground">
              {page}/{totalPages}
            </span>
            <Button
              variant="ghost"
              size="sm"
              className="h-6 px-1.5 text-[11px]"
              disabled={page >= totalPages || isLoading}
              onClick={(e) => {
                e.preventDefault()
                e.stopPropagation()
                setPagination((prev: any) => ({
                  ...prev,
                  page: prev.page + 1,
                }))
              }}
            >
              {isLoading && <Loader2 className="mr-1 h-3 w-3 animate-spin" />}
              Next
            </Button>
          </div>
        </div>
      </SelectContent>
    </Select>
  )
}