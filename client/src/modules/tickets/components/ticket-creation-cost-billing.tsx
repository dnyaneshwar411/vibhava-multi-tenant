"use client";

import { useMemo } from "react";
import { useForm, UseFormReturn } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  TicketCreationCostBillingInput,
  ticketCreationCostBillingSchema,
  TicketCreationInput,
} from "../schema/creation";
import { MAINTENANCE_TICKET_PRIORITY } from "../config/constants";

export default function TicketCreationCostBilling({
  form: defaultForm,
  nextStep,
  previousStep,
}: {
  form: UseFormReturn<TicketCreationInput>;
  nextStep: () => void;
  previousStep: () => void;
}) {
  const defaultValues = useMemo(() => defaultForm.getValues(), [defaultForm]);

  const form = useForm<TicketCreationCostBillingInput>({
    resolver: zodResolver(ticketCreationCostBillingSchema),
    defaultValues: {
      priority: defaultValues.priority ?? "Medium",
      estimatedCost: defaultValues.estimatedCost ?? 0,
      isBillableToTenant: defaultValues.isBillableToTenant ?? false,
    },
  });

  const handleSubmit = (data: TicketCreationCostBillingInput) => {
    defaultForm.setValues(data)
    nextStep();
  };

  return (
    <Form {...form}>
      <div className="space-y-4">
        <SelectPriority form={form} />
        <InputEstimatedCost form={form} />
        <IsBillableToggle form={form} />
        <div className="mt-6 flex justify-between items-center">
          <Button
            type="button"
            variant="outline"
            className="min-w-[120px]"
            onClick={previousStep}
          >
            Back
          </Button>
          <Button onClick={form.handleSubmit(handleSubmit)} className="min-w-[120px]">
            Next
          </Button>
        </div>
      </div>
    </Form>
  );
}

function SelectPriority({
  form,
}: {
  form: UseFormReturn<TicketCreationCostBillingInput>;
}) {
  return (
    <FormField
      control={form.control}
      name="priority"
      render={({ field }) => (
        <FormItem className="space-y-1">
          <FormLabel className="text-xs font-medium text-foreground">
            Ticket Priority
          </FormLabel>
          <Select onValueChange={field.onChange} value={field.value}>
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder="Select ticket priority" />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {MAINTENANCE_TICKET_PRIORITY.map((priority) => (
                <SelectItem key={priority} value={priority}>
                  {priority}
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

function InputEstimatedCost({
  form,
}: {
  form: UseFormReturn<TicketCreationCostBillingInput>;
}) {
  return (
    <FormField
      control={form.control}
      name="estimatedCost"
      render={({ field }) => (
        <FormItem className="space-y-1">
          <FormLabel className="text-xs font-medium text-foreground">
            Estimated Cost (₹)
          </FormLabel>
          <FormControl>
            <Input
              type="number"
              min={0}
              step="5"
              placeholder="0.00"
              {...field}
              value={String(field.value)}
            />
          </FormControl>
          <FormMessage className="text-[10px]" />
        </FormItem>
      )}
    />
  );
}

function IsBillableToggle({
  form,
}: {
  form: UseFormReturn<TicketCreationCostBillingInput>;
}) {
  return (
    <FormField
      control={form.control}
      name="isBillableToTenant"
      render={({ field }) => (
        <FormItem className="flex flex-row items-center justify-between border p-3 shadow-sm">
          <div className="space-y-0.5">
            <FormLabel className="text-xs font-medium text-foreground">
              Billable to Tenant
            </FormLabel>
            <FormDescription className="text-[11px] text-muted-foreground">
              Mark if the cost of repair should be billed back to the tenant.
            </FormDescription>
          </div>
          <FormControl>
            <Switch
              checked={field.value}
              onCheckedChange={field.onChange}
            />
          </FormControl>
        </FormItem>
      )}
    />
  );
}