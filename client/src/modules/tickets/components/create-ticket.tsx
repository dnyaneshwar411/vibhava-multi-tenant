import { buttonVariants } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription } from "@/components/ui/dialog";
import { buildToastMessage } from "@/lib/catchAsync";
import api from "@/network/client";
import { toast } from "sonner";
import { useForm, UseFormReturn } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { TicketCreationInput, ticketCreationSchema } from "../schema/creation";
import TicketCreationPropertyDetails from "./ticket-creation-property-details";
import TicketCreationAccessSchedule from "./ticket-creation-access-schedule";
import TicketCreationCostBilling from "./ticket-creation-cost-billing";
import TicketCreationMediaAttachments from "./ticket-creation-media-attachments";
import { buildTicketRequestPayload } from "../helpers/request-payload";

export default function CreateTicket() {
  return (
    <Dialog>
      <DialogTrigger>
        <span className={buttonVariants({ variant: "default" })}>
          Create Ticket
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

  const form = useForm<TicketCreationInput>({
    resolver: zodResolver(ticketCreationSchema),
    mode: "all",
    defaultValues: {
      property: "",
      unit: "",
      category: "Electrical",
      title: "",
      description: "",
      permissionToEnter: false,
      entryNotes: "",
      preferredSchedule: "Anytime",
      priority: "Medium",
      estimatedCost: "500",
      isBillableToTenant: false,
      attachments: [],
    },
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
            Create Ticket
          </DialogTitle>
          <Badge variant="outline" className="font-mono text-[11px] rounded-none">
            Step {currentStep + 1} of 4
          </Badge>
        </div>
        <DialogDescription className="text-xs text-muted-foreground mt-1">
          Register Create identity, assign residence details, and configure messaging channels.
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
  form: UseFormReturn<TicketCreationInput>;
}) {
  const onSubmit = async function () {
    try {
      const data: TicketCreationInput = form.getValues()
      if(data.attachments.length > 0) {
        const toastId = toast.loading("Uploading Media...")
        const payload = await buildTicketRequestPayload(data)
        toast.dismiss(toastId)
        form.setValues(payload)
      }
      const response = await api.post("/api/v1/maintenance/tickets", {
        body: form.getValues()
      });

      if (response.code !== 200) throw new Error(response.message)
      toast.success(response.message || "Successfull")
    } catch (error) {
      toast.error(buildToastMessage(error))
    }
  };
  switch (currentStep) {
    case 0:
      return <TicketCreationPropertyDetails
        nextStep={nextStep}
        form={form}
      />
    case 1:
      return <TicketCreationAccessSchedule
        previousStep={previousStep}
        nextStep={nextStep}
        form={form}
      />;
    case 2:
      return <TicketCreationCostBilling
        previousStep={previousStep}
        nextStep={nextStep}
        form={form}
      />;
    case 3:
      return <TicketCreationMediaAttachments
        previousStep={previousStep}
        onSubmit={onSubmit}
        form={form}
      />;
    default:
      return null;
  }
  return (<></>)
}