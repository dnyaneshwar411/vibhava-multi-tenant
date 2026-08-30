"use client"
import { useState } from "react"
import { Trash2 } from "lucide-react"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { ConfirmationAlert } from "@/components/common/confirmation-alert"
import api from "@/network/client"
import { buildToastMessage } from "@/lib/catchAsync"

interface DeletePaymentGatewayProps {
  gatewayType?: string
  onSuccess?: () => void
}

export default function DeletePaymentGateway({
  gatewayType,
  onSuccess,
}: DeletePaymentGatewayProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)

  async function handleDelete() {
    try {
      setIsDeleting(true)
      const response = await api.delete(`/api/v1/payment-gateway/${gatewayType}`)
      
      if (response.code !== 200) {
        throw new Error(response.message)
      }

      toast.success(response.message || "Payment gateway removed successfully")
      onSuccess?.()
    } catch (error) {
      toast.error(buildToastMessage(error))
    } finally {
      setIsDeleting(false)
    }
  }

  return (
    <>
      <Button
        variant="destructive"
        size="icon"
        className="h-7 w-7 rounded-none shadow-none hover:bg-destructive/10 hover:text-destructive"
        onClick={(e) => {
          e.stopPropagation()
          setIsOpen(true)
        }}
      >
        <Trash2 className="h-4 w-4" />
        <span className="sr-only">Delete payment gateway</span>
      </Button>

      <ConfirmationAlert
        isOpen={isOpen}
        onOpenChange={setIsOpen}
        title="Delete Payment Gateway?"
        description={`This action will permanently delete the ${
          gatewayType ? `${gatewayType} ` : ""
        }integration. Any active checkouts relying on this gateway will fail.`}
        onConfirm={handleDelete}
        confirmText={isDeleting ? "Deleting..." : "Delete Gateway"}
      />
    </>
  )
}