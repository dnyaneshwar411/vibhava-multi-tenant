import { buttonVariants } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription } from "@/components/ui/dialog";
import { buildToastMessage } from "@/lib/catchAsync";
import api from "@/network/client";
import { toast } from "sonner";
import { useForm, UseFormReturn } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Pen, Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { TicketCreationInput, ticketCreationSchema } from "../schema/creation";
import TicketCreationPropertyDetails from "./ticket-creation-property-details";
import TicketCreationAccessSchedule from "./ticket-creation-access-schedule";
import TicketCreationCostBilling from "./ticket-creation-cost-billing";
import TicketCreationMediaAttachments from "./ticket-creation-media-attachments";
import { buildTicketRequestPayload } from "../helpers/request-payload";

export default function UpdateTicket({ ticket }: {
  ticket: any
}) {
  return (
    <Dialog>
      <DialogTrigger>
        <span className={buttonVariants({ variant: "ghost", size: "icon" })}>
         <Pen className="!w-4 !h-4" />
        </span>
      </DialogTrigger>
      <DialogContent className="!z-[100] p-0 !max-w-lg w-full">
        <FormContainer ticket={ticket} />
      </DialogContent>
    </Dialog>
  )
}


function FormContainer({ ticket }: {
  ticket: any
}) {
  const [currentStep, setCurrentStep] = useState(0);

  const form = useForm<TicketCreationInput>({
    resolver: zodResolver(ticketCreationSchema),
    mode: "all",
    defaultValues: {
      property: ticket.property?._id,
      unit: ticket.unit._id,
      category: "Electrical",
      title: ticket.title || "",
      description: ticket.description || "",
      permissionToEnter: ticket.permissionToEnter || false,
      entryNotes: ticket.entryNotes || "",
      preferredSchedule: ticket.preferredSchedule || "Anytime",
      priority: ticket.priority || "Medium",
      estimatedCost: String(ticket.estimatedCost) || "500",
      isBillableToTenant: ticket.isBillableToTenant || false,
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
            Update Ticket
          </DialogTitle>
          <Badge variant="outline" className="font-mono text-[11px] rounded-none">
            Step {currentStep + 1} of 4
          </Badge>
        </div>
      </DialogHeader>

      <div className="p-6 max-h-[60vh] overflow-y-auto">
        <RenderStep
          currentStep={currentStep}
          nextStep={nextStep}
          previousStep={previousStep}
          form={form}
          ticketId={ticket._id}
        />
      </div>
    </div>
  );
}

function RenderStep({ currentStep, nextStep, previousStep, form, ticketId }: {
  currentStep: number;
  nextStep: () => void;
  previousStep: () => void;
  form: UseFormReturn<TicketCreationInput>;
  ticketId: string
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
      const response = await api.put(`/api/v1/maintenance/tickets/${ticketId}`, {
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