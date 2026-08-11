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
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import {
  updatePropertyFormSchema,
  type UpdatePropertyFormValues,
} from "../helpers/update-property";
import { BasicInfoStage } from "./basic-info-stage";
import { AddressStage } from "./address-stage";
import { AmenitiesFinanceStage } from "./amenities-finance-stage";
import { MediaStage } from "./media-stage";
import { toast } from "sonner";
import { buildToastMessage } from "@/lib/catchAsync";
import api from "@/network/client";

const STAGES = ["Basic Info", "Address", "Amenities & Finance", "Media"];

export function UpdatePropertyDialog({
  property,
  children,
}: {
  property: any;
  children: React.ReactNode;
}) {
  const [currentStage, setCurrentStage] = useState(0);
  const form = useForm<UpdatePropertyFormValues>({
    resolver: zodResolver(updatePropertyFormSchema as any),
    mode: "all",
    defaultValues: {
      name: property.name,
      propertyType: property.propertyType,
      status: property.status,
      address: {
        street1: property.address.street1,
        street2: property.address.street2,
        city: property.address.city,
        state: property.address.state,
        zipCode: property.address.zipCode,
        country: property.address.country,
      },
      amenities: property.amenities,
      finance: {
        currency: property.finance.currency,
        defaultLateFeeAmount: property.finance.defaultLateFeeAmount,
        defaultGracePeriodDays: property.finance.defaultGracePeriodDays,
      },
    },
  });

  async function onSubmit(values: UpdatePropertyFormValues) {
    try {
      const response = await api.put(`/api/v1/property/${property._id}`, {
        body: values as any,
      });
      if (response.code !== 200) throw new Error(response.message);
      toast.success(response.message);
      window.location.reload();
    } catch (error) {
      toast.error(buildToastMessage(error));
    }
  }

  const renderStage = () => {
    switch (currentStage) {
      case 0:
        return <BasicInfoStage form={form as any} />;
      case 1:
        return <AddressStage form={form as any} />;
      case 2:
        return <AmenitiesFinanceStage form={form as any} />;
      case 3:
        return <MediaStage form={form as any} />;
      default:
        return null;
    }
  };

  const isLastStage = currentStage === STAGES.length - 1;

  return (
    <Dialog>
      <DialogTrigger>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Update Property - {STAGES[currentStage]}</DialogTitle>
          <DialogDescription>
            Step {currentStage + 1} of {STAGES.length}
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <div className="space-y-4">
            {renderStage()}
            <div className="flex justify-between pt-4">
              <Button
                type="button"
                variant="outline"
                disabled={currentStage === 0}
                onClick={() => setCurrentStage((prev) => prev - 1)}
              >
                Back
              </Button>
              {isLastStage ? (
                <Button onClick={form.handleSubmit(onSubmit)}>
                  Update Property
                </Button>
              ) : (
                <Button onClick={() => setCurrentStage((prev) => prev + 1)}>
                  Next
                </Button>
              )}
            </div>
          </div>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
