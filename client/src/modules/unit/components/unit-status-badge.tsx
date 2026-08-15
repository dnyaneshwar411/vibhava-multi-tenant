import { Badge } from "@/components/ui/badge";
import { CheckCircle2, Wrench } from "lucide-react";

export default function UnitStatusBadge({ status }: { status: string }) {
  switch (status?.toLowerCase()) {
    case "under maintenance":
      return (
        <Badge
          variant="secondary"
          className="gap-1 text-[11px] font-mono font-medium text-amber-600 bg-amber-500/10 rounded-none border-0"
        >
          <Wrench className="h-3 w-3" /> Under Maintenance
        </Badge>
      );
    case "occupied":
      return (
        <Badge
          variant="secondary"
          className="gap-1 text-[11px] font-mono font-medium text-emerald-600 bg-emerald-500/10 rounded-none border-0"
        >
          <CheckCircle2 className="h-3 w-3" /> Occupied
        </Badge>
      );
    default:
      return (
        <Badge variant="secondary" className="text-[11px] font-mono rounded-none border-0">
          {status || "Vacant"}
        </Badge>
      );
  }
}