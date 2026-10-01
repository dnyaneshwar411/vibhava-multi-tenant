"use client"
import React, { useMemo, useState, useEffect } from "react"
import { ErrorState } from "@/components/ui/error"
import { ComponentLoader } from "@/components/ui/loader"
import useFetch from "@/hooks/useFetch"
import CreateTicket from "@/modules/tickets/components/create-ticket"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { COLUMN_ORDER } from "@/modules/tickets/config/constants"
import KanbanBoardColumn from "@/modules/tickets/components/kanban-board-column"
import api from "@/network/client"
import { toast } from "sonner"
import { buildToastMessage } from "@/lib/catchAsync"
import TicketFilterOptions from "@/modules/tickets/components/ticket-filter-options"

export default function KanbanPage() {
const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    status: "Open,In Progress,Completed,Canceled",
    category: "",
    priority: "",
    property: "",
    unit: "",
  })

  const { isLoading, data, error, mutate } = useFetch("/api/v1/maintenance/tickets", pagination)

  const [tickets, setTickets] = useState<any[]>([])
  const [draggedTicketId, setDraggedTicketId] = useState<string | null>(null)
  const [dragOverColumn, setDragOverColumn] = useState<string | null>(null)

  useEffect(() => {
    if (data?.data?.[0]?.tickets) {
      setTickets(data.data[0].tickets)
    }
  }, [data])

  const boardData = useMemo(() => {
    if (!data?.data?.[0]) return null

    const payload = data.data[0]
    const summariesMap = new Map(
      payload.columnSummaries.map((s: any) => [s._id, s])
    )

    const columnsMap: Record<string, { summary: any; tickets: any[] }> = {}

    COLUMN_ORDER.forEach((status) => {
      columnsMap[status] = {
        summary: summariesMap.get(status) || {
          totalCount: 0,
          totalEstimatedCost: 0,
          totalActualCost: 0,
        },
        tickets: tickets.filter((ticket: any) => ticket.status === status),
      }
    })

    return {
      totalTickets: payload.totalCount?.[0]?.count || 0,
      columns: columnsMap,
    }
  }, [data, tickets])

  const columnsToDisplay = useMemo(function() {
    if (!boardData) return [];
    return COLUMN_ORDER.filter(column => boardData.columns[column].tickets.length > 0)
  }, [boardData])

  const handleDragStart = (e: React.DragEvent, ticketId: string) => {
    e.dataTransfer.setData("text/plain", ticketId)
    e.dataTransfer.effectAllowed = "move"
    setDraggedTicketId(ticketId)
  }

  const handleDragOver = (e: React.DragEvent, status: string) => {
    e.preventDefault()
    e.dataTransfer.dropEffect = "move"
    if (dragOverColumn !== status) {
      setDragOverColumn(status)
    }
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
  }

  // const handleDrop = async (e: React.DragEvent, targetStatus: string) => {
  //   console.log(targetStatus)
  //   e.preventDefault()
  //   setDragOverColumn(null)
    
  //   const ticketId = e.dataTransfer.getData("text/plain") || draggedTicketId
  //   console.log(ticketId)
  //   if (!ticketId) return
  //   return

  //   const draggedTicket = tickets.find((t) => t._id === ticketId)
  //   if (!draggedTicket || draggedTicket.status === targetStatus) return

  //   setTickets((prev) =>
  //     prev.map((ticket) =>
  //       ticket._id === ticketId ? { ...ticket, status: targetStatus } : ticket
  //     )
  //   )

  //   try {
  //     const response = await api.patch(`/api/v1/maintenance/tickets/${ticketId}/status/${targetStatus}`, {
  //       body: { status: targetStatus },
  //     })

  //     if (response.code !== 200) {
  //       throw new Error(response.message);
  //     }

  //     toast.success(response.message || "Successfull");
  //   } catch (err) {
  //     toast.error(buildToastMessage(err))
  //   } finally {
  //     setDraggedTicketId(null)
  //   }
  // }

const handleDrop = async (e: React.DragEvent, targetStatus: string) => {
  e.preventDefault();
  setDragOverColumn(null);

  const ticketId = e.dataTransfer.getData("text/plain") || draggedTicketId;
  if (!ticketId) return;

  const draggedTicket = tickets.find((t) => t._id === ticketId);
  if (!draggedTicket) return;

  const columnContainer = document.getElementById(`column-${targetStatus}`);
  const cardElements = columnContainer ? Array.from(columnContainer.querySelectorAll('[data-ticket-id]')) : [];

  let prevTicketId: string | undefined = undefined;
  let nextTicketId: string | undefined = undefined;

  const mouseY = e.clientY;
  let targetIndex = cardElements.length;

  for (let i = 0; i < cardElements.length; i++) {
    const rect = cardElements[i].getBoundingClientRect();
    const cardMiddle = rect.top + rect.height / 2;

    if (mouseY < cardMiddle) {
      targetIndex = i;
      break;
    }
  }

  const targetColumnTickets = tickets.filter((t) => t.status === targetStatus && t._id !== ticketId);

  if (targetIndex === 0) {
    prevTicketId = undefined;
    nextTicketId = targetColumnTickets[0]?._id || undefined;
  } else if (targetIndex >= targetColumnTickets.length) {
    prevTicketId = targetColumnTickets[targetColumnTickets.length - 1]?._id || undefined;
    nextTicketId = undefined;
  } else {
    prevTicketId = targetColumnTickets[targetIndex - 1]._id;
    nextTicketId = targetColumnTickets[targetIndex]._id;
  }

  // 3. Optimistic UI Update (reorder locally immediately)
  // ... update local state array with new status & position if desired ...

  try {
    const response = await api.patch(`/api/v1/maintenance/tickets/${ticketId}/status/kanban`, {
      body: {
        status: targetStatus,
        prevTicketId,
        nextTicketId,
      } as any
    });

    if (response.code !== 200 && response.status !== 200) {
      throw new Error(response.message || "Failed to update position");
    }

    toast.success("Ticket position updated successfully");
    mutate();
  } catch (err) {
    toast.error(buildToastMessage(err));
    mutate();
  } finally {
    setDraggedTicketId(null);
  }
};

  if (isLoading) {
    return (
      <div className="flex h-96 items-center justify-center">
        <ComponentLoader />
      </div>
    )
  }

  if (error || data?.code !== 200 || !boardData) {
    return (
      <div className="flex h-96 items-center justify-center">
        <ErrorState
          title={data?.message || "Dashboard Sync Error"}
          description="The database cluster returned an invalid schema or network failure."
          reset={() => mutate()}
        />
      </div>
    )
  }

  return (
    <div className="flex flex-col p-4 space-y-6">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h1 className="text-2xl font-bold tracking-tight">Maintenance Board</h1>
          <p className="text-sm text-muted-foreground">
            Showing {tickets.length} of {boardData.totalTickets} tickets
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <CreateTicket />
          <TicketFilterOptions
            pagination={pagination}
            setPagination={setPagination}
          />
        </div>
      </div>

      <ScrollArea className="flex-1 w-full whitespace-nowrap">
        <div className="flex space-x-4 p-1">
          {columnsToDisplay.map((status) => <KanbanBoardColumn
            key={status}
            status={status}
            draggedTicketId={draggedTicketId!}
            setDraggedTicketId={setDraggedTicketId}
            dragOverColumn={dragOverColumn!}
            boardData={boardData}
            handleDragStart={handleDragStart}
            handleDragOver={handleDragOver}
            handleDragLeave={handleDragLeave}
            handleDrop={handleDrop}
          />)}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  )
}