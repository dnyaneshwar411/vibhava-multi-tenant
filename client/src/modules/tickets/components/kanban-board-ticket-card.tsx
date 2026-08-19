import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import KanbanBoardPriorityBadge from "./kanban-board-priority-badge"
import { Eye } from "lucide-react"
import MaintenanceTicketDetailsDrawer from "./maintenance-ticket-details-drawer"
import { buttonVariants } from "@/components/ui/button"
import UpdateTicket from "./update-ticket"
import DeleteTicket from "./delete-ticket"

export default function KanbanBoardTicketCard({
  ticket,
  draggedTicketId,
  setDraggedTicketId,
  handleDragStart,
}: {
  ticket: any
  draggedTicketId: string
  setDraggedTicketId: any
  handleDragStart: any
}) {
  const isDragging = draggedTicketId === ticket._id

  return (
    <Card
      key={ticket._id}
      draggable
      onDragStart={(e) => handleDragStart(e, ticket._id)}
      onDragEnd={() => setDraggedTicketId(null)}
      className={`cursor-grab active:cursor-grabbing transition-opacity p-0 ${
        isDragging ? "opacity-40" : "opacity-100"
      }`}
    >
      <CardHeader className="p-4 pb-2 space-y-2">
        <div className="flex items-center justify-between gap-1">
          <div className="flex items-center gap-1.5 overflow-hidden">
            <Badge variant="outline" className="truncate">
              {ticket.category}
            </Badge>
            {ticket.isBillableToTenant && (
              <Badge variant="secondary" className="text-[10px] px-1.5 py-0">
                Billable
              </Badge>
            )}
          </div>
          <KanbanBoardPriorityBadge priority={ticket.priority} />
        </div>

        {(ticket.property?.name || ticket.unit?.unitNumber) && (
          <div className="text-[11px] font-medium text-muted-foreground truncate">
            {ticket.property?.name}
            {ticket.property?.name && ticket.unit?.unitNumber && " • "}
            {ticket.unit?.unitNumber}
          </div>
        )}

        <CardTitle className="text-sm font-semibold leading-tight line-clamp-2">
          {ticket.title}
        </CardTitle>
      </CardHeader>

      <CardContent className="px-4 pb-3 pt-0 space-y-2">
        <CardDescription className="text-xs line-clamp-2">
          {ticket.description}
        </CardDescription>

        {ticket.assignedVendor?.name && (
          <div className="flex items-center gap-1 text-[11px] text-muted-foreground pt-1">
            <span className="font-medium">Vendor:</span>
            <span className="truncate">{ticket.assignedVendor.name}</span>
          </div>
        )}
      </CardContent>

      <CardFooter className="px-4 py-2.5 gap-1 flex items-center justify-between border-t text-xs text-muted-foreground">
        <span>Est. ₹{ticket.estimatedCost.toLocaleString()}</span>
        <span className="mr-auto">
          •{" "}
          {new Date(ticket.createdAt).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
          })}
        </span>
        <div
          className="flex items-center gap-0"
          onClick={(e) => e.stopPropagation()}
        >
          <MaintenanceTicketDetailsDrawer ticket={ticket}>
            <span className={buttonVariants({ variant: "ghost", size: "icon" })}>
              <Eye size={16} />
            </span>
          </MaintenanceTicketDetailsDrawer>
          <UpdateTicket ticket={ticket} />
          <DeleteTicket ticketId={ticket._id} ticketTitle={ticket.title} />
        </div>
      </CardFooter>
    </Card>
  )
}