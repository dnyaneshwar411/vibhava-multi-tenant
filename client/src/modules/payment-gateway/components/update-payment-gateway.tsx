import { buttonVariants } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { Pen } from "lucide-react";
import { useForm } from "react-hook-form";
import { paymentGatewaySchema } from "../schemas/creation";
import PaymentGatewayCreationCredentials from "./payment-gateway-creation-credentials";
import api from "@/network/client";
import { toast } from "sonner";
import { buildToastMessage } from "@/lib/catchAsync";

export default function UpdatePaymentGateway({
  gateway
}: {
  gateway: any
}) {
  return (
    <Dialog>
      <DialogTrigger>
        <span className={cn(buttonVariants({ size: "icon-sm" }))}>
          <Pen />
        </span>
      </DialogTrigger>
      <DialogContent className="p-0 !max-w-[550px] w-full">
        <FormContainer gateway={gateway} />
      </DialogContent>
    </Dialog>
  )
}


function FormContainer({gateway}: {
  gateway: any
}) {

  const form = useForm({
    resolver: zodResolver(paymentGatewaySchema),
    defaultValues: {
      type: gateway.type,
      credentials: gateway.credentials
    }
  })

  const onSubmit = async function() {
    try {
      const body = form.getValues()
      const response = await api.put(`/api/v1/payment-gateway/${body.type}`, {
        body
      });

      if (![200, 201].includes(response.code)) {
        throw new Error(response.message)
      }
      toast.success(response.message || "Successfull")
    } catch (error) {
      toast.error(buildToastMessage(error))
    }
  }

  return (
    <div>
      <DialogHeader className="p-4 border-b bg-muted/20">
        <div className="flex items-center justify-between">
          <DialogTitle className="text-sm font-bold uppercase tracking-widest flex items-center gap-2">
            Update Payment Gateway
          </DialogTitle>
        </div>
      </DialogHeader>
      <div className="p-4">
        <PaymentGatewayCreationCredentials
          nextStep={onSubmit}
          form={form}
        />
      </div>
    </div>
  );
}