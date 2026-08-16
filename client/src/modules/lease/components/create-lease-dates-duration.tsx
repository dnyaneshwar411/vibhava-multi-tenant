"use client";

import { useMemo } from "react";
import { useForm, UseFormReturn } from "react-hook-form";
import {
  LeaseCreationDatesDurationInput,
  LeaseCreationInput,
  leaseCreationDatesDurationSchema,
} from "../schemas/lease-creation";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { LEASE_TYPES, LEASE_STATUSES } from "../config";

export default function CreateLeaseDatesDuration({
  form: defaultForm,
  nextStep,
  previousStep,
}: {
  form: UseFormReturn<LeaseCreationInput>;
  nextStep: () => void;
  previousStep: () => void;
}) {
  const defaultValues = useMemo(() => defaultForm.getValues(), [defaultForm]);

  const form = useForm<LeaseCreationDatesDurationInput>({
    resolver: zodResolver(leaseCreationDatesDurationSchema),
    defaultValues: {
      leaseType: defaultValues.leaseType,
      status: defaultValues.status,
      startDate: defaultValues.startDate || "",
      endDate: defaultValues.endDate || "",
      moveInDate: defaultValues.moveInDate || "",
      moveOutDate: defaultValues.moveOutDate || "",
    },
  });

  const onSubmit = (data: LeaseCreationDatesDurationInput) => {
    // Sync local step fields back to parent form
    defaultForm.setValue("leaseType", data.leaseType);
    defaultForm.setValue("status", data.status);
    defaultForm.setValue("startDate", data.startDate);
    defaultForm.setValue("endDate", data.endDate);
    defaultForm.setValue("moveInDate", data.moveInDate);
    defaultForm.setValue("moveOutDate", data.moveOutDate);

    nextStep();
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mt-4">
        {/* Lease Type & Status */}
        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="leaseType"
            render={({ field }) => (
              <FormItem className="space-y-1">
                <FormLabel className="text-xs font-medium text-foreground">
                  Lease Type
                </FormLabel>
                <Select
                  onValueChange={field.onChange}
                  value={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="h-9 text-xs rounded-none">
                      <SelectValue placeholder="Select lease type" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="rounded-none">
                    {LEASE_TYPES.map((type) => (
                      <SelectItem key={type} value={type} className="text-xs">
                        {type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage className="text-[10px]" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="status"
            render={({ field }) => (
              <FormItem className="space-y-1">
                <FormLabel className="text-xs font-medium text-foreground">
                  Lease Status
                </FormLabel>
                <Select
                  onValueChange={field.onChange}
                  value={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="h-9 text-xs rounded-none">
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="rounded-none">
                    {LEASE_STATUSES.map((status) => (
                      <SelectItem key={status} value={status} className="text-xs">
                        {status}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage className="text-[10px]" />
              </FormItem>
            )}
          />
        </div>

        {/* Start Date & End Date */}
        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="startDate"
            render={({ field }) => (
              <FormItem className="space-y-1">
                <FormLabel className="text-xs font-medium text-foreground">
                  Start Date
                </FormLabel>
                <FormControl>
                  <Input
                    type="date"
                    className="h-9 text-xs rounded-none"
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-[10px]" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="endDate"
            render={({ field }) => (
              <FormItem className="space-y-1">
                <FormLabel className="text-xs font-medium text-foreground">
                  End Date
                </FormLabel>
                <FormControl>
                  <Input
                    type="date"
                    className="h-9 text-xs rounded-none"
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-[10px]" />
              </FormItem>
            )}
          />
        </div>

        {/* Move-In & Move-Out Dates */}
        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="moveInDate"
            render={({ field }) => (
              <FormItem className="space-y-1">
                <FormLabel className="text-xs font-medium text-foreground">
                  Move-In Date
                </FormLabel>
                <FormControl>
                  <Input
                    type="date"
                    className="h-9 text-xs rounded-none"
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-[10px]" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="moveOutDate"
            render={({ field }) => (
              <FormItem className="space-y-1">
                <FormLabel className="text-xs font-medium text-foreground">
                  Move-Out Date
                </FormLabel>
                <FormControl>
                  <Input
                    type="date"
                    className="h-9 text-xs rounded-none"
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-[10px]" />
              </FormItem>
            )}
          />
        </div>

        {/* Navigation Actions */}
        <div className="mt-6 flex justify-end gap-2">
          <Button
            type="button"
            variant="secondary"
            className="min-w-[120px] rounded-none"
            onClick={previousStep}
          >
            Previous
          </Button>
          <Button type="submit" className="min-w-[120px] rounded-none">
            Next
          </Button>
        </div>
      </form>
    </Form>
  );
}