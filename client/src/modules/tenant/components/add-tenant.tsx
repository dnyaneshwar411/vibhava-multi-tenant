"use client";
import { useState } from "react";
import { useForm, UseFormReturn } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { buttonVariants } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import {
  User,
  Sparkles,
} from "lucide-react";
import api from "@/network/client";
import { toast } from "sonner";
import { buildToastMessage } from "@/lib/catchAsync";
import AddTenantCommunication from "./add-tenant-communication";
import AddTenantAddress from "./add-tenant-address";
import AddTenantBasicInfo from "./add-tenant-basic-info";
import { tenantCreation, TenantCreationInput } from "../schema/create";
import { buildTenantRequestBody } from "../helper";
import { format } from "date-fns";
import { STAGE_FIELDS } from "../config";

export default function AddTenant() {
  return (
    <Dialog>
      <DialogTrigger>
        <span className={buttonVariants({ variant: "default", size: "sm" })}>
          <User className="h-4 w-4 mr-2" />
          Add Tenant
        </span>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[560px] p-0 rounded-none border gap-0 overflow-hidden">
        <FormContainer />
      </DialogContent>
    </Dialog>
  );
}

function FormContainer() {
  const [currentStage, setCurrentStage] = useState(0);

  const form = useForm<TenantCreationInput>({
    resolver: zodResolver(tenantCreation),
    mode: "all",
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      countryCode: "91",
      mobileNumber: "",
      status: "Active",
      currentResidence: {
        property: "",
        unit: "",
        activeLease: "",
        moveInDate: format(new Date(), "yyyy-MM-dd"),
      },
      communicationPreferences: {
        preferredChannel: "Email",
        allowSmsNotifications: false,
        allowEmailNotifications: true,
      },
    },
  });

  const nextStep = async () => {
    const fieldsToValidate = STAGE_FIELDS[currentStage];
    const isStageValid = await form.trigger(fieldsToValidate);
    if (isStageValid) {
      setCurrentStage((prev) => Math.min(prev + 1, 2));
    }
  };

  const previousStep = () => {
    setCurrentStage((prev) => Math.max(prev - 1, 0));
  };

  return (
    <div>
      <DialogHeader className="p-5 border-b bg-muted/20">
        <div className="flex items-center justify-between">
          <DialogTitle className="text-sm font-bold uppercase tracking-widest flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-primary" />
            Add New Tenant
          </DialogTitle>
          <Badge variant="outline" className="font-mono text-[11px] rounded-none">
            Stage {currentStage + 1} of 3
          </Badge>
        </div>
        <DialogDescription className="text-xs text-muted-foreground mt-1">
          Register tenant identity, assign residence details, and configure messaging channels.
        </DialogDescription>
      </DialogHeader>

      <div className="p-6 max-h-[60vh] overflow-y-auto">
        <RenderStage
          currentStage={currentStage}
          nextStep={nextStep}
          previousStep={previousStep}
          form={form}
        />
      </div>
    </div>
  );
}

function RenderStage({ currentStage, nextStep, previousStep, form }: {
  currentStage: number;
  nextStep: () => void;
  previousStep: () => void;
  form: UseFormReturn<TenantCreationInput>;
}) {
  const onSubmit = async function () {
    try {
      const data: TenantCreationInput = form.getValues()
      const payload = buildTenantRequestBody(data)
      const response = await api.post("/api/v1/tenant", {
        body: payload
      });
      if(response.code!==200) throw new Error(response.message)
      toast.success(response.message || "Successfull")
    } catch (error) {
      toast.error(buildToastMessage(error))
    }
  };
  switch (currentStage) {
    case 0:
      return <AddTenantBasicInfo
        nextStep={nextStep}
        form={form}
      />;
    case 1:
      return <AddTenantAddress
        previousStep={previousStep}
        nextStep={nextStep}
        form={form}
      />;
    case 2:
      return <AddTenantCommunication
        previousStep={previousStep}
        form={form}
        onSubmit={onSubmit}
      />;
    default:
      return null;
  }
}