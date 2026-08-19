import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { cn } from "@/lib/utils"
import KanbanBoardTicketCard from "./kanban-board-ticket-card"

export default function KanbanBoardColumn({
  status,
  draggedTicketId,
  setDraggedTicketId,
  dragOverColumn,
  boardData,
  handleDragStart,
  handleDragOver,
  handleDrop,
  handleDragLeave,
}: {
  status: string,
  draggedTicketId: string,
  setDraggedTicketId: any,
  dragOverColumn: string,
  boardData: any,
  handleDragStart: any,
  handleDragOver: any,
  handleDragLeave: any,
  handleDrop: any,
}) {

  const col = boardData.columns[status]
  const isColumnTarget = dragOverColumn === status

  return (
    <div
      key={status}
      className={cn("flex w-80 shrink-0 flex-col space-y-3 transition-colors", isColumnTarget && "opacity-90")}
      onDragOver={(e) => handleDragOver(e, status)}
      onDragLeave={handleDragLeave}
      onDrop={(e) => handleDrop(e, status)}
    >
      <Card className="p-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="text-sm font-semibold">{status}</span>
            <Badge variant="secondary">{col.summary.totalCount}</Badge>
          </div>
          <span className="text-xs text-muted-foreground">
            ₹{col.summary.totalEstimatedCost.toLocaleString()}
          </span>
        </div>
      </Card>

      <ScrollArea>
        <div className="flex flex-col space-y-3 p-1 min-h-[150px]">
          {col.tickets.map((ticket: any) => {
            return (
              <KanbanBoardTicketCard
                key={ticket._id}
                ticket={ticket}
                draggedTicketId={draggedTicketId!}
                setDraggedTicketId={setDraggedTicketId}
                handleDragStart={handleDragStart}
              />
            )
          })}

          {col.tickets.length === 0 && (
            <Card className="flex h-24 items-center justify-center border-dashed">
              <span className="text-xs text-muted-foreground">
                Drop tickets here
              </span>
            </Card>
          )}
        </div>
      </ScrollArea>
    </div>
  )
}