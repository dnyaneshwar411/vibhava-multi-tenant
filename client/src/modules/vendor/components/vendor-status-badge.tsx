import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { VendorStatus } from "../types";

interface VendorStatusBadgeProps {
  status: VendorStatus;
  className?: string;
}

export default function VendorStatusBadge({
  status,
  className,
}: VendorStatusBadgeProps) {
  const normalizedStatus = status?.trim();

  const getStatusStyles = (statusVal: string) => {
    switch (statusVal.toLowerCase()) {
      case "active":
        return "border-emerald-500/30 bg-emerald-500/10 text-emerald-700 dark:text-emerald-400";
      case "inactive":
        return "border-zinc-500/30 bg-zinc-500/10 text-zinc-600 dark:text-zinc-400";
      case "pending":
        return "border-amber-500/30 bg-amber-500/10 text-amber-700 dark:text-amber-400";
      case "suspended":
        return "border-rose-500/30 bg-rose-500/10 text-rose-700 dark:text-rose-400";
      default:
        return "border-muted bg-muted/50 text-muted-foreground";
    }
  };

  const getStatusDot = (statusVal: string) => {
    switch (statusVal.toLowerCase()) {
      case "active":
        return "bg-emerald-500";
      case "inactive":
        return "bg-zinc-400";
      case "pending":
        return "bg-amber-500";
      case "suspended":
        return "bg-rose-500";
      default:
        return "bg-muted-foreground";
    }
  };

  return (
    <Badge
      variant="outline"
      className={cn(
        "rounded-none px-2 py-0.5 text-[10px] font-medium tracking-wide uppercase inline-flex items-center gap-1.5 shadow-none",
        getStatusStyles(normalizedStatus),
        className
      )}
    >
      <span
        className={cn("h-1.5 w-1.5 rounded-full", getStatusDot(normalizedStatus))}
      />
      <span>{normalizedStatus || "Unknown"}</span>
    </Badge>
  );
}