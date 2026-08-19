import { Badge } from "@/components/ui/badge"

export default function KanbanBoardPriorityBadge({ priority }: { priority: string }) {
  const variantMap: Record<string, "destructive" | "default" | "secondary" | "outline"> = {
    Emergency: "destructive",
    High: "default",
    Medium: "secondary",
    Low: "outline",
  }

  return (
    <Badge variant={variantMap[priority] || "outline"}>
      {priority}
    </Badge>
  )
}