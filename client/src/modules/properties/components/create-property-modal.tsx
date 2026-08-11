"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  createPropertyFormSchema,
  type CreatePropertyFormValues,
} from "../helpers/index";
import { BasicInfoStage } from "./basic-info-stage";
import { AddressStage } from "./address-stage";
import { AmenitiesFinanceStage } from "./amenities-finance-stage";
import { MediaStage } from "./media-stage";
import { toast } from "sonner";
import { buildToastMessage } from "@/lib/catchAsync";
import api from "@/network/client";
import { createPropertyDefaultValue } from "../configs/creation-default";
import { uploadPropertyImages } from "../helpers/network";

const STAGES = ["Basic Info", "Address", "Amenities & Finance", "Media"];

export default function CreatePropertyModal({
  children,
}: {
  children: React.ReactNode;
}) {
  const [currentStage, setCurrentStage] = useState(0);
  const form = useForm<CreatePropertyFormValues>({
    resolver: zodResolver(createPropertyFormSchema),
    mode: "all",
    defaultValues: createPropertyDefaultValue
  });

  async function onSubmit(values: CreatePropertyFormValues) {
    try {
      const toastMediaUpload = toast.loading("Uploading Media Images");
      const mediaResponse: any = await uploadPropertyImages(values.media)
      const payload = {
        ...values,
        media: {
          primaryImage: mediaResponse.primaryImage.data,
          coverImage: mediaResponse.coverImage.data,
          gallery: mediaResponse.gallery.map((item: any) => item.data)
        }
      }
      toast.dismiss(toastMediaUpload);
      toast.success("Media Uploaded Successfully");
      const response = await api.post("/api/v1/property", {
        body: payload as any
      })
      if (response.code !== 201) throw new Error(response.message);
      toast.success(response.message);
    } catch (error) {
      toast.error(buildToastMessage(error));
    }
  }

  const nextStep = function () {
    if (currentStage === 3) return
    setCurrentStage(step => step + 1);
  }

  const previousStep = function () {
    if (currentStage === 0) return
    setCurrentStage(step => step - 1);
  }

  const renderStage = () => {
    switch (currentStage) {
      case 0:
        return <BasicInfoStage
          nextStep={nextStep}
          form={form}
        />;
      case 1:
        return <AddressStage
          previousStep={previousStep}
          nextStep={nextStep}
          form={form}
        />;
      case 2:
        return <AmenitiesFinanceStage
          previousStep={previousStep}
          nextStep={nextStep}
          form={form}
        />;
      case 3:
        return <MediaStage
          previousStep={previousStep}
          nextStep={onSubmit}
          form={form}
        />;
      default:
        return null;
    }
  };

  return (
    <Dialog>
      <DialogTrigger className="btn">{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-x-auto">
        <DialogHeader>
          <DialogTitle>Create New Property - {STAGES[currentStage]}</DialogTitle>
          <DialogDescription>
            Step {currentStage + 1} of {STAGES.length}
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          {renderStage()}
        </div>
      </DialogContent>
    </Dialog>
  );
}
