"use client";
import { useMemo, useState } from "react";
import { useForm, UseFormReturn } from "react-hook-form";
import {
  leaseCreationDocument,
  LeaseCreationDocumentInput,
  LeaseCreationInput,
} from "../schemas/lease-creation";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import DocumentUpload from "@/components/common/document-upload";
import api from "@/network/client";
import { toast } from "sonner";
import { buildToastMessage } from "@/lib/catchAsync";
import { format } from "date-fns";

export default function CreateLeaseDocument({
  form: defaultForm,
  onSubmit: submitParentForm,
  previousStep,
}: {
  form: UseFormReturn<LeaseCreationInput>;
  onSubmit: () => void;
  previousStep: () => void;
}) {
  const [file, setFile] = useState<File | null>(null)
  const defaultValues = useMemo(() => defaultForm.getValues(), [defaultForm]);

  const form = useForm<LeaseCreationDocumentInput>({
    resolver: zodResolver(leaseCreationDocument),
    defaultValues: {
      leaseAgreementDocument: defaultValues.leaseAgreementDocument,
    },
  });

  const handleSubmit = async function (data: LeaseCreationDocumentInput) {
    const toastId = toast.loading("Uploading Document")
    try {
      if(!file) {
        toast.dismiss(toastId)
        throw new Error("Please select a lease document")
      }
      const payload = new FormData()
      payload.append("property", defaultValues.property);
      payload.append("title", `Standard Lease Agreement ${format(new Date(), "yyyy")}`);
      payload.append("entityType", "Lease");
      payload.append("status", "Pending Review");
      payload.append("visibility", "Internal Only");
      payload.append("category", "Lease Agreement");

      payload.append("meta[name]", file.name);
      payload.append("meta[size]", file.size.toString());
      payload.append("meta[mimeType]", file.type || "application/pdf");
      payload.append("tenant", defaultValues.primaryTenant);
      payload.append("file", file);

      const response = await api.post("/api/v1/document", {
        body: payload,
        headers: {
          Accept: "application/json"
        },
        multiPartRequest: true
      })
      if (response.code !== 201) throw new Error(response.message);
      defaultForm.setValue("leaseAgreementDocument", response.data._id);
      toast.success(response.message || "Successfully Uploaded Document!");

    } catch (error) {
      toast.error(buildToastMessage(error));
    }
    toast.dismiss(toastId);
    submitParentForm()
  };

  return (
    <Form {...form}>
      <div onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4 mt-4">
        <DocumentUpload
          fieldLabel="Lease Agreement Document"
          file={file}
          setFile={setFile}
          documentLink={
            typeof defaultValues.leaseAgreementDocument === "string"
              ? defaultValues.leaseAgreementDocument
              : undefined
          }
        />
        <div className="mt-6 flex justify-end gap-2">
          <Button
            type="button"
            variant="secondary"
            className="min-w-[120px] rounded-none"
            onClick={previousStep}
          >
            Previous
          </Button>
          <Button onClick={form.handleSubmit(handleSubmit)} className="min-w-[120px] rounded-none">
            Create Lease
          </Button>
        </div>
      </div>
    </Form>
  );
}