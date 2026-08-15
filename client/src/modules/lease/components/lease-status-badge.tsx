import { Badge } from "@/components/ui/badge";
import { CheckCircle2, Clock } from "lucide-react";

export default function LeaseStatusBadge({ status }: { status: string }) {
  switch (status?.toLowerCase()) {
    case "pending signature":
      return (
        <Badge
          variant="secondary"
          className="gap-1 text-[11px] font-mono font-medium text-amber-600 bg-amber-500/10 rounded-none border-0"
        >
          <Clock className="h-3 w-3" /> Pending Signature
        </Badge>
      );
    case "active":
      return (
        <Badge
          variant="secondary"
          className="gap-1 text-[11px] font-mono font-medium text-emerald-600 bg-emerald-500/10 rounded-none border-0"
        >
          <CheckCircle2 className="h-3 w-3" /> Active
        </Badge>
      );
    default:
      return (
        <Badge variant="secondary" className="text-[11px] font-mono rounded-none border-0">
          {status || "Draft"}
        </Badge>
      );
  }
}