"use client";
import { useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button, buttonVariants } from "@/components/ui/button";
import { UserCheck, Loader2, Check } from "lucide-react";
import { toast } from "sonner";
import VendorDirectorySelection from "@/modules/vendor/components/vendor-directory-selection";
import api from "@/network/client";
import { buildToastMessage } from "@/lib/catchAsync";

type AssignVendorPopoverProps = {
  ticketId: string;
  currentVendorId?: string;
  onSuccess?: () => void;
};

export default function AssignVendorPopover({
  ticketId,
  currentVendorId = "",
  onSuccess,
}: AssignVendorPopoverProps) {
  const [open, setOpen] = useState(false);
  const [selectedVendorId, setSelectedVendorId] = useState<string>(currentVendorId);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleAssign = async () => {
    if (!selectedVendorId) {
      toast.error("Please select a vendor first.");
      return;
    }

    try {
      setIsSubmitting(true);

      const response = await api.patch(
        `/api/v1/maintenance/tickets/${ticketId}/assign`,
        {
          body: { assignedVendor: selectedVendorId },
        }
      );

      if (response.code !== 200) {
        throw new Error(response.message);
      }

      toast.success(response.message || "Vendor assigned successfully");
      setOpen(false);
      onSuccess?.();
    } catch (error: any) {
      toast.error(buildToastMessage(error));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger>
        <span className={buttonVariants({ variant: "outline", size: "sm", className: "rounded-none border-dashed font-mono text-xs h-8 gap-1.5" })}>
          <UserCheck className="w-3.5 h-3.5" />
          {currentVendorId ? "Reassign Vendor" : "Assign Vendor"}
        </span>
      </PopoverTrigger>

      <PopoverContent
        align="end"
        className="w-80 p-4 rounded-none border space-y-4 shadow-md bg-background"
      >
        <div className="space-y-1">
          <h4 className="text-sm font-semibold tracking-tight">Assign Vendor</h4>
          <p className="text-xs text-muted-foreground font-mono">
            Select a vendor from directory to assign to this ticket.
          </p>
        </div>

        <div className="space-y-2">
          <VendorDirectorySelection
            value={selectedVendorId}
            onValueChange={(val: string) => setSelectedVendorId(val)}
          />
        </div>

        <div className="flex items-center justify-end gap-2 pt-2 border-t">
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="rounded-none h-8 text-xs font-mono"
            onClick={() => setOpen(false)}
            disabled={isSubmitting}
          >
            Cancel
          </Button>

          <Button
            type="button"
            size="sm"
            className="rounded-none h-8 text-xs font-mono gap-1.5"
            onClick={handleAssign}
            disabled={isSubmitting || !selectedVendorId || selectedVendorId === currentVendorId}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
                Assigning...
              </>
            ) : (
              <>
                <Check className="w-3.5 h-3.5" />
                Confirm
              </>
            )}
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}