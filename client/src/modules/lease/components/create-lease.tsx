import { zodResolver } from "@hookform/resolvers/zod"
import { useForm, UseFormReturn } from "react-hook-form"
import { LeaseCreationInput, leaseCreationSchema } from "../schemas/lease-creation"
import { addMonths, format } from "date-fns"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { buttonVariants } from "@/components/ui/button"
import { Scale, Sparkles } from "lucide-react"
import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import api from "@/network/client"
import { toast } from "sonner"
import { buildToastMessage } from "@/lib/catchAsync"
import { buildLeaseRequestBody } from "../helpers"
import CreateLeaseSpacePeople from "./create-lease-space-people"
import CreateLeaseDatesDuration from "./create-lease-dates-duration"
import CreateLeaseFinanceAgreement from "./create-lease-finance-agreement"
import CreateLeaseDocument from "./create-lease-document"

export default function CreateLease() {
  return (
    <Dialog>
      <DialogTrigger>
        <span className={buttonVariants({ variant: "default", size: "sm" })}>
          <Scale className="h-4 w-4 mr-2" />
          Create Lease
        </span>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[560px] p-0 rounded-none border gap-0 overflow-hidden">
        <FormContainer />
      </DialogContent>
    </Dialog>
  )
}
function FormContainer() {
  const [currentStep, setCurrentStep] = useState(0);

  const form = useForm({
    resolver: zodResolver(leaseCreationSchema),
    mode: "all",
    defaultValues: {
      property: "",
      unit: "",
      primaryTenant: "",
      coTenants: [],
      leaseType: "Month-to-Month",
      startDate: format(new Date(), "yyyy-MM-dd"),
      endDate: format(addMonths(new Date(), 1), "yyyy-MM-dd"),
      moveInDate: "",
      moveOutDate: "",
      status: "Draft",
      finance: {
        rentAmount: "",
        paymentDueDay: "1",
        billingCycle: "Monthly"
      },
      security: {
        status: "Unpaid",
        amountRequired: "100000",
        amountPaid: "0",
        heldInAccount: ""
      }
    }
  })

  const nextStep = async () => {
    setCurrentStep(prev => prev + 1)
  };

  const previousStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 0));
  };

  return (
    <div>
      <DialogHeader className="p-5 border-b bg-muted/20">
        <div className="flex items-center justify-between">
          <DialogTitle className="text-sm font-bold uppercase tracking-widest flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-primary" />
            Create Lease
          </DialogTitle>
          <Badge variant="outline" className="font-mono text-[11px] rounded-none">
            Step {currentStep + 1} of 4
          </Badge>
        </div>
        <DialogDescription className="text-xs text-muted-foreground mt-1">
          Create Lease identity, assign residence details, and configure messaging channels.
        </DialogDescription>
        <RenderStep
          currentStep={currentStep}
          nextStep={nextStep}
          previousStep={previousStep}
          form={form}
        />
      </DialogHeader>
    </div>
  )
}

function RenderStep({ currentStep, nextStep, previousStep, form }: {
  currentStep: number;
  nextStep: () => void;
  previousStep: () => void;
  form: UseFormReturn<LeaseCreationInput>;
}) {
  const onSubmit = async function () {
    try {
      const data: LeaseCreationInput = form.getValues()
      const payload = buildLeaseRequestBody(data)
      const response = await api.post("/api/v1/lease", {
        body: payload
      });
      if (response.code !== 200) throw new Error(response.message)
      toast.success(response.message || "Successfull")
    } catch (error) {
      toast.error(buildToastMessage(error))
    }
  };

  switch (currentStep) {
    case 0:
      return <CreateLeaseSpacePeople
        nextStep={nextStep}
        form={form}
      />;
    case 1:
      return <CreateLeaseDatesDuration
        previousStep={previousStep}
        nextStep={nextStep}
        form={form}
      />;
    case 2:
      return <CreateLeaseFinanceAgreement
        previousStep={previousStep}
        form={form}
        nextStep={nextStep}
      />;
    case 3:
      return <CreateLeaseDocument
        previousStep={previousStep}
        form={form}
        onSubmit={onSubmit}
      />;
    default:
      return null;
  }
}