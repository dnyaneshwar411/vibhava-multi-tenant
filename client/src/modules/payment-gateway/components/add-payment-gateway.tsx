import { buttonVariants } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, UseFormReturn } from "react-hook-form";
import { PaymentGatewayInput, paymentGatewaySchema } from "../schemas/creation";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import PaymentGatewayCreationProvider from "./payment-gateway-creation-provider";
import PaymentGatewayCreationCredentials from "./payment-gateway-creation-credentials";
import api from "@/network/client";
import { toast } from "sonner";
import { buildToastMessage } from "@/lib/catchAsync";

export default function AddPaymentGateway() {
  return (
    <Dialog>
      <DialogTrigger>
        <span className={cn(buttonVariants())}>Add New</span>
      </DialogTrigger>
      <DialogContent className="p-0 !max-w-[550px] w-full">
        <FormContainer />
      </DialogContent>
    </Dialog>
  )
}

function FormContainer() {
  const [currentStep, setCurrentStep] = useState(0);

  const form = useForm({
    resolver: zodResolver(paymentGatewaySchema),
    defaultValues: {
      type: "RAZORPAY",
      credentials: {
        razorpayKeyId: "",
        razorpayKeySecret: "",
        razorpaySignature: "",
      }
    }
  })

  const nextStep = async () => {
    setCurrentStep(prev => prev + 1)
  };

  const previousStep = () => {
    setCurrentStep(prev => prev - 1)
  };

  return (
    <div>
      <DialogHeader className="p-4 border-b bg-muted/20">
        <div className="flex items-center justify-between">
          <DialogTitle className="text-sm font-bold uppercase tracking-widest flex items-center gap-2">
            Add Payment Gateway
          </DialogTitle>
          <Badge variant="outline" className="font-mono text-[11px] rounded-none">
            Step {currentStep + 1} of 2
          </Badge>
        </div>
      </DialogHeader>

      <div className="p-6 max-h-[60vh] overflow-y-auto">
        <RenderStep
          currentStep={currentStep}
          nextStep={nextStep}
          previousStep={previousStep}
          form={form}
          onSuccess={() => {
            form.reset()
            setCurrentStep(0)
          }}
        />
      </div>
    </div>
  );
}

function RenderStep({ currentStep, nextStep, previousStep, form, onSuccess }: {
  currentStep: number;
  nextStep: () => void;
  previousStep: () => void;
  form: UseFormReturn<PaymentGatewayInput>;
  onSuccess: () => void;
}) {
  const onSubmit = async function () {
    try {
      const response = await api.post("/api/v1/payment-gateway", {
        body: form.getValues()
      });
      if (![200, 201].includes(response.code)) {
        throw new Error(response.message)
      }
      toast.success(response.message || "Successfull")
      onSuccess();
    } catch (error) {
      toast.error(buildToastMessage(error))
    }
  }
  switch (currentStep) {
    case 0:
      return <PaymentGatewayCreationProvider
        form={form}
        nextStep={nextStep}
      />
    case 1:
      return <PaymentGatewayCreationCredentials
        form={form}
        nextStep={onSubmit}
        previousStep={previousStep}
      />
  }
}