import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { ACTION_BADGE_VARIANTS } from "../config";

export default function AuditLogRow({ log }: {
  log: any
}) {
  return (
    <TableRow key={log._id || log.id} className="hover:bg-muted/50">
      <TableCell className="whitespace-nowrap font-mono text-xs">
        {new Date(log.createdAt || log.timestamp).toLocaleString()}
      </TableCell>
      <TableCell>
        <div className="flex flex-col">
          <span className="font-medium text-sm">
            {log.actorSnapshot?.fullName || log.actorId || "System"}
          </span>
          <span className="text-xs text-muted-foreground">
            {log.actorModel} {log.actorSnapshot?.email ? `• ${log.actorSnapshot.email}` : ""}
          </span>
        </div>
      </TableCell>
      <TableCell>
        <Badge variant={ACTION_BADGE_VARIANTS[log.action] || "outline"}>
          {log.action}
        </Badge>
      </TableCell>
      <TableCell>
        <span className="font-medium text-sm">{log.resource}</span>
        {log.resourceId && (
          <span className="ml-1 text-xs text-muted-foreground font-mono">
            ({String(log.resourceId).slice(-6)})
          </span>
        )}
      </TableCell>
      <TableCell className="font-mono text-xs text-muted-foreground">
        {log.context?.ipAddress || "—"}
      </TableCell>
    </TableRow>
  )
}