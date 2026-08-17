import { buttonVariants } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useForm, UseFormReturn } from "react-hook-form";
import { OrganizationInput, organizationSchema } from "../schemas";
import OrganizationCreationGeneralInformation from "./organization-creation-general-information";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Organization } from "../types";
import { ImageSchema } from "@/validation-schemas/common.schema";
import OrganizationCreationBranding from "./organization-creation-branding";
import { buildOrganizationRequestPayload } from "../helpers/request-payload";
import { toast } from "sonner";
import { buildToastMessage } from "@/lib/catchAsync";
import api from "@/network/client";

export default function UpdateOrganization({ organization }: {
  organization: Organization
}) {
  return (
    <Dialog>
      <DialogTrigger>
        <span className={buttonVariants({ variant: "default" })}>Update</span>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[560px] p-0 rounded-none border gap-0 overflow-hidden">
        <FormContainer organization={organization} />
      </DialogContent>
    </Dialog>
  )
}

function FormContainer({
  organization
}: {
  organization: Organization
}) {
  const [currentStep, setCurrentStep] = useState(0);

  const form = useForm<OrganizationInput>({
    resolver: zodResolver(organizationSchema),
    mode: "all",
    defaultValues: {
      name: organization.name,
      meta: organization.meta,
      branding: {
        logo: organization.branding.logo as ImageSchema,
        darkLogo: organization.branding.darkLogo as ImageSchema,
        favicon: organization.branding.favicon as ImageSchema,
        banner: organization.branding.banner as ImageSchema,
        colors: organization.branding.colors,
        emailFooterText: organization.branding.emailFooterText,
        supportEmail: organization.branding.supportEmail,
        supportPhone: organization.branding.supportPhone,
      }
    },
  });

  const nextStep = async function () {
    setCurrentStep(currentStep + 1);
  };

  const previousStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 0));
  };

  const onSubmit = async function () {
    const imageUploadToast = toast.loading("Uploading Organization Media...");
    try {
      const values = form.getValues();
      const payload = await buildOrganizationRequestPayload(values);
      toast.dismiss(imageUploadToast);
      toast.success("Organization Media Upload Successfull!")
      const response = await api.put("/api/v1/organization", {
        body: payload
      })
      if (response.code !== 200) throw new Error(response.message)
      toast.success(response.message || "Success")
    } catch (error) {
      toast.dismiss(imageUploadToast)
      toast.error(buildToastMessage(error))
    }
  }

  return (
    <div>
      <DialogHeader className="p-5 border-b bg-muted/20">
        <div className="flex items-center justify-between">
          <DialogTitle className="text-sm font-bold uppercase tracking-widest flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-primary" />
            Update Organization
          </DialogTitle>
          <Badge variant="outline" className="font-mono text-[11px] rounded-none">
            Stage {currentStep + 1} of 3
          </Badge>
        </div>
        <DialogDescription className="text-xs text-muted-foreground mt-1">
          Register tenant identity, assign residence details, and configure messaging channels.
        </DialogDescription>
      </DialogHeader>
      <div className="p-6 max-h-[60vh] overflow-y-auto">
        <RenderStep
          currentStep={currentStep}
          nextStep={nextStep}
          previousStep={previousStep}
          form={form}
          onSubmit={onSubmit}
        />
      </div>
    </div>
  )
}

function RenderStep({ currentStep, nextStep, previousStep, onSubmit, form }: {
  currentStep: number;
  nextStep: () => void;
  previousStep: () => void;
  onSubmit: (data: OrganizationInput) => void;
  form: UseFormReturn<OrganizationInput>;
}) {
  switch (currentStep) {
    case 0:
      return <OrganizationCreationGeneralInformation
        form={form}
        nextStep={nextStep}
      />
    case 1:
      return <OrganizationCreationBranding
        form={form}
        nextStep={nextStep}
        prevStep={previousStep}
        onSubmit={onSubmit}
      />
    default:
      break;
  }
}