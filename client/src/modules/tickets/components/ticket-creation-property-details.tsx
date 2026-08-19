"use client";

import { useMemo } from "react";
import { useForm, UseFormReturn, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import PropertyDirectorySelection from "@/modules/properties/components/property-directory-selection";
import UnitDirectorySelection from "@/modules/unit/components/unit-directory-selection";

import {
  TicketCreationInput,
  TicketCreationPropertyDetailsInput,
  ticketCreationPropertyDetailsSchema,
} from "../schema/creation";
import { MAINTENANCE_TICKET_STATUS } from "../config/constants";
import { FieldGroup } from "@/components/ui/field";

export default function TicketCreationPropertyDetails({
  form: defaultForm,
  nextStep,
}: {
  form: UseFormReturn<TicketCreationInput>;
  nextStep: () => void;
}) {
  const defaultValues = useMemo(() => defaultForm.getValues(), [defaultForm]);

  const form = useForm<TicketCreationPropertyDetailsInput>({
    resolver: zodResolver(ticketCreationPropertyDetailsSchema),
    mode: "onChange",
    defaultValues: {
      property: defaultValues.property,
      unit: defaultValues.unit,
      title: defaultValues.title,
      category: defaultValues.category,
      description: defaultValues.description,
    },
  });

  const property = useWatch({
    control: form.control,
    name: "property",
  });

  const handleSubmit = (data: TicketCreationPropertyDetailsInput) => {
    defaultForm.setValues(data)
    nextStep();
  };

  return (
    <Form {...form}>
      <FieldGroup>
        <div className="space-y-4">
          <SelectProperty form={form} />
          <SelectUnit key={property} form={form} property={property} />
          <SelectCategory form={form} />
          <InputTitle form={form} />
          <InputDescription form={form} />
          <div className="mt-6 flex justify-end">
            <Button onClick={form.handleSubmit(handleSubmit)} className="min-w-[120px]">
              Next
            </Button>
          </div>
        </div>
      </FieldGroup>
    </Form>
  );
}

function SelectProperty({
  form,
}: {
  form: UseFormReturn<TicketCreationPropertyDetailsInput>;
}) {
  return (
    <FormField
      control={form.control}
      name="property"
      render={({ field }) => (
        <FormItem className="space-y-1">
          <FormLabel className="text-xs font-medium text-foreground">
            Property ID / Name
          </FormLabel>
          <PropertyDirectorySelection
            value={field.value}
            onValueChange={(val: string) => {
              field.onChange(val);
              form.setValue("unit", "");
            }}
          />
          <FormMessage className="text-[10px]" />
        </FormItem>
      )}
    />
  );
}

function SelectUnit({
  form,
  property,
}: {
  form: UseFormReturn<TicketCreationPropertyDetailsInput>;
  property: string;
}) {
  return (
    <FormField
      key={property}
      control={form.control}
      name="unit"
      render={({ field }) => (
        <FormItem className="space-y-1">
          <FormLabel className="text-xs font-medium text-foreground">
            Unit Designation
          </FormLabel>
          {property && <UnitDirectorySelection
            value={field.value}
            onValueChange={field.onChange}
            property={property}
          />}
          {!property && <div className="text-muted-foreground">
            Please Select A Property
          </div>}
          <FormMessage className="text-[10px]" />
        </FormItem>
      )}
    />
  );
}

function SelectCategory({
  form,
}: {
  form: UseFormReturn<TicketCreationPropertyDetailsInput>;
}) {
  return (
    <FormField
      control={form.control}
      name="category"
      render={({ field }) => (
        <FormItem className="space-y-1">
          <FormLabel className="text-xs font-medium text-foreground">
            Category
          </FormLabel>
          <Select onValueChange={field.onChange} value={field.value}>
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder="Select maintenance category" />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {MAINTENANCE_TICKET_STATUS.map((cat) => (
                <SelectItem key={cat} value={cat}>
                  {cat}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <FormMessage className="text-[10px]" />
        </FormItem>
      )}
    />
  );
}

function InputTitle({
  form,
}: {
  form: UseFormReturn<TicketCreationPropertyDetailsInput>;
}) {
  return (
    <FormField
      control={form.control}
      name="title"
      render={({ field }) => (
        <FormItem className="space-y-1">
          <FormLabel className="text-xs font-medium text-foreground">
            Ticket Title
          </FormLabel>
          <FormControl>
            <Input
              placeholder="e.g., Leaking kitchen sink"
              maxLength={150}
              {...field}
            />
          </FormControl>
          <FormMessage className="text-[10px]" />
        </FormItem>
      )}
    />
  );
}

function InputDescription({
  form,
}: {
  form: UseFormReturn<TicketCreationPropertyDetailsInput>;
}) {
  return (
    <FormField
      control={form.control}
      name="description"
      render={({ field }) => (
        <FormItem className="space-y-1">
          <FormLabel className="text-xs font-medium text-foreground">
            Detailed Description
          </FormLabel>
          <FormControl>
            <Textarea
              placeholder="Describe the issue in detail..."
              className="resize-none min-h-[100px]"
              {...field}
            />
          </FormControl>
          <FormMessage className="text-[10px]" />
        </FormItem>
      )}
    />
  );
}