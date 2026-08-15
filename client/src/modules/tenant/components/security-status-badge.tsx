import { Badge } from "@/components/ui/badge";
import { CheckCircle2, ShieldAlert } from "lucide-react";

export default function SecurityStatusBadge({ status }: { status: string }) {
  switch (status?.toLowerCase()) {
    case "unpaid":
      return (
        <Badge
          variant="secondary"
          className="gap-1 text-[11px] font-mono font-medium text-destructive bg-destructive/10 rounded-none border-0"
        >
          <ShieldAlert className="h-3 w-3" /> Unpaid
        </Badge>
      );
    case "paid":
      return (
        <Badge
          variant="secondary"
          className="gap-1 text-[11px] font-mono font-medium text-emerald-600 bg-emerald-500/10 rounded-none border-0"
        >
          <CheckCircle2 className="h-3 w-3" /> Fully Paid
        </Badge>
      );
    default:
      return (
        <Badge variant="secondary" className="text-[11px] font-mono rounded-none border-0">
          {status || "Pending"}
        </Badge>
      );
  }
}