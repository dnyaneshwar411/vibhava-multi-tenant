"use client";

import { FolderSearch, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";

interface EmptyStateProps {
  title?: string;
  description?: string;
  actionLabel?: string;
  onAction?: () => void;
  className?: string;
}

export default function EmptyState({
  title = "No records found",
  description = "We couldn't find anything matching your search criteria or filters.",
  actionLabel = "Reset Filters",
  onAction,
  className = "",
}: EmptyStateProps) {
  return (
    <div
      className={`border bg-card/50 p-12 flex flex-col items-center justify-center text-center min-h-[350px] space-y-4 ${className}`}
    >
      <div className="h-12 w-12 border bg-background flex items-center justify-center text-muted-foreground">
        <FolderSearch className="h-6 w-6 stroke-[1.5]" />
      </div>

      <div className="space-y-1 max-w-sm">
        <h3 className="text-sm font-semibold tracking-tight text-foreground">
          {title}
        </h3>
        <p className="text-xs text-muted-foreground leading-relaxed">
          {description}
        </p>
      </div>

      {onAction && (
        <Button
          variant="outline"
          size="sm"
          onClick={onAction}
          className="rounded-none h-8 text-xs border-muted gap-1.5 hover:border-foreground transition-colors"
        >
          <RotateCcw className="h-3.5 w-3.5" />
          {actionLabel}
        </Button>
      )}
    </div>
  );
}