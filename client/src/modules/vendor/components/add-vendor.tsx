import { buttonVariants } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription } from "@/components/ui/dialog";
import { buildToastMessage } from "@/lib/catchAsync";
import api from "@/network/client";
import { toast } from "sonner";
import { VendorCreationInput, vendorCreationSchema } from "../schemas/creation";
import { useForm, UseFormReturn } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import VendorCreationBasicInformation from "./vendor-creation-basic-information";
import VendorCreationAddress from "./vendor-creation-address";

export default function AddVendor() {
  return (
    <Dialog>
      <DialogTrigger>
        <span className={buttonVariants({ variant: "default" })}>
          Add Vendor
        </span>
      </DialogTrigger>
      <DialogContent className="p-0 !max-w-lg w-full">
        <FormContainer />
      </DialogContent>
    </Dialog>
  )
}


function FormContainer() {
  const [currentStep, setCurrentStep] = useState(0);

  const form = useForm<VendorCreationInput>({
    resolver: zodResolver(vendorCreationSchema),
    mode: "all",
    defaultValues: {},
  });

  const nextStep = async () => {
    setCurrentStep(prev => prev + 1)
  };

  const previousStep = () => {
    setCurrentStep(prev => prev - 1)
  };

  return (
    <div>
      <DialogHeader className="p-5 border-b bg-muted/20">
        <div className="flex items-center justify-between">
          <DialogTitle className="text-sm font-bold uppercase tracking-widest flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-primary" />
            Add New Vendor
          </DialogTitle>
          <Badge variant="outline" className="font-mono text-[11px] rounded-none">
            Step {currentStep + 1} of 2
          </Badge>
        </div>
        <DialogDescription className="text-xs text-muted-foreground mt-1">
          Register Vendor identity, assign residence details, and configure messaging channels.
        </DialogDescription>
      </DialogHeader>

      <div className="p-6 max-h-[60vh] overflow-y-auto">
        <RenderStep
          currentStep={currentStep}
          nextStep={nextStep}
          previousStep={previousStep}
          form={form}
        />
      </div>
    </div>
  );
}

function RenderStep({ currentStep, nextStep, previousStep, form }: {
  currentStep: number;
  nextStep: () => void;
  previousStep: () => void;
  form: UseFormReturn<VendorCreationInput>;
}) {
  const onSubmit = async function () {
    try {
      const data: VendorCreationInput = form.getValues()
      const response = await api.post("/api/v1/vendor", {
        body: data as any
      });
      if (response.code !== 200) throw new Error(response.message)
      toast.success(response.message || "Successfull")
    } catch (error) {
      toast.error(buildToastMessage(error))
    }
  };
  switch (currentStep) {
    case 0:
      return <VendorCreationBasicInformation
        nextStep={nextStep}
        form={form}
      />;
    case 1:
      return <VendorCreationAddress
        previousStep={previousStep}
        onSubmit={onSubmit}
        form={form}
      />;
    default:
      return null;
  }
  return (<></>)
}