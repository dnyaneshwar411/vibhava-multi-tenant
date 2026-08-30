"use client";
import { useState } from "react";
import { toast } from "sonner";

import { ConfirmationAlert } from "@/components/common/confirmation-alert";
import api from "@/network/client";
import { buildToastMessage } from "@/lib/catchAsync";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";

interface DeleteTicketProps {
  ticketId: string;
  ticketTitle?: string;
}

export default function DeleteTicket({
  ticketId,
  ticketTitle,
}: DeleteTicketProps) {
  const [isOpen, setIsOpen] = useState(false);

  async function handleDelete() {
    try {
      const response = await api.delete(`/api/v1/maintenance/tickets/${ticketId}`);
      if (response.code !== 200) throw new Error(response.message);

      toast.success(response.message || "Maintenance ticket deleted");
    } catch (error) {
      toast.error(buildToastMessage(error));
    }
  }

  return (
    <>
      <Button
        variant="ghost"
        size="icon"
        className="h-6 w-6 hover:text-destructive"
        onClick={(e) => {
          e.stopPropagation()
          setIsOpen(true)
        }}
      >
        <Trash2 size={14} />
        <span className="sr-only">Delete ticket</span>
      </Button>
      <ConfirmationAlert
        isOpen={isOpen}
        onOpenChange={setIsOpen}
        title="Are you sure?"
        description={`This will permanently delete the maintenance ticket ${ticketTitle ? `"${ticketTitle}"` : ""}. This action cannot be undone.`}
        onConfirm={handleDelete}
        confirmText="Delete Ticket"
      />
    </>
  );
}