import { Badge } from "@/components/ui/badge";
import {
  UserCheck,
  UserX,
  Clock,
} from "lucide-react";

export default function TenantStatusBadge({ status }: { status: string }) {
  switch (status?.toLowerCase()) {
    case "active":
      return (
        <Badge
          variant="secondary"
          className="gap-1 text-[11px] font-mono font-medium text-emerald-600 bg-emerald-500/10 rounded-none border-0"
        >
          <UserCheck className="h-3 w-3" /> Active
        </Badge>
      );
    case "applicant":
      return (
        <Badge
          variant="secondary"
          className="gap-1 text-[11px] font-mono font-medium text-amber-600 bg-amber-500/10 rounded-none border-0"
        >
          <Clock className="h-3 w-3" /> Applicant
        </Badge>
      );
    case "vacated":
      return (
        <Badge
          variant="secondary"
          className="gap-1 text-[11px] font-mono font-medium text-muted-foreground bg-muted rounded-none border-0"
        >
          <UserX className="h-3 w-3" /> Vacated
        </Badge>
      );
    default:
      return (
        <Badge variant="secondary" className="text-[11px] font-mono rounded-none border-0">
          {status}
        </Badge>
      );
  }
}