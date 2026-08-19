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
  FormDescription,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
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
  TicketCreationAccessScheduleInput,
  ticketCreationAccessScheduleSchema,
  TicketCreationInput,
} from "../schema/creation";
import { MAINTENANCE_TICKET_PREFERRED_SCHEDULE } from "../config/constants";

export default function TicketCreationAccessSchedule({
  form: defaultForm,
  nextStep,
  previousStep,
}: {
  form: UseFormReturn<TicketCreationInput>;
  nextStep: () => void;
  previousStep: () => void;
}) {
  const defaultValues = useMemo(() => defaultForm.getValues(), [defaultForm]);

  const form = useForm<TicketCreationAccessScheduleInput>({
    resolver: zodResolver(ticketCreationAccessScheduleSchema),
    defaultValues: {
      permissionToEnter: defaultValues.permissionToEnter ?? false,
      entryNotes: defaultValues.entryNotes ?? "",
      preferredSchedule: defaultValues.preferredSchedule ?? "Anytime",
    },
  });

  const handleSubmit = (data: TicketCreationAccessScheduleInput) => {
    // Update root form state with Step 3 values
    Object.entries(data).forEach(([key, value]) => {
      defaultForm.setValue(key as keyof TicketCreationInput, value);
    });
    nextStep();
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
        <PermissionToEnterToggle form={form} />
        <EntryNotesInput form={form} />
        <PreferredScheduleSelect form={form} />
        <div className="mt-6 flex justify-between items-center">
          <Button
            type="button"
            variant="outline"
            className="min-w-[120px]"
            onClick={previousStep}
          >
            Back
          </Button>
          <Button type="submit" className="min-w-[120px]">
            Next
          </Button>
        </div>
      </form>
    </Form>
  );
}

function PermissionToEnterToggle({
  form,
}: {
  form: UseFormReturn<TicketCreationAccessScheduleInput>;
}) {
  return (
    <FormField
      control={form.control}
      name="permissionToEnter"
      render={({ field }) => (
        <FormItem className="flex flex-row items-center justify-between border p-3 shadow-sm">
          <div className="space-y-0.5">
            <FormLabel className="text-xs font-medium text-foreground">
              Permission to Enter
            </FormLabel>
            <FormDescription className="text-[11px] text-muted-foreground">
              Allow technicians to enter the premises if you are not at home.
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

function EntryNotesInput({
  form,
}: {
  form: UseFormReturn<TicketCreationAccessScheduleInput>;
}) {
  const permissionToEnter = useWatch({
    control: form.control,
    name: "permissionToEnter",
  });

  return (
    <FormField
      control={form.control}
      name="entryNotes"
      render={({ field }) => (
        <FormItem className="space-y-1">
          <FormLabel className="text-xs font-medium text-foreground">
            Entry Instructions / Notes
          </FormLabel>
          <FormControl>
            <Textarea
              placeholder={
                permissionToEnter
                  ? "e.g., Gate code #1234, dog in back room, key under mat"
                  : "e.g., Call before coming, knock loudly"
              }
              className="resize-none min-h-[80px]"
              {...field}
            />
          </FormControl>
          <FormMessage className="text-[10px]" />
        </FormItem>
      )}
    />
  );
}

function PreferredScheduleSelect({
  form,
}: {
  form: UseFormReturn<TicketCreationAccessScheduleInput>;
}) {
  return (
    <FormField
      control={form.control}
      name="preferredSchedule"
      render={({ field }) => (
        <FormItem className="space-y-1">
          <FormLabel className="text-xs font-medium text-foreground">
            Preferred Visit Timing
          </FormLabel>
          <Select onValueChange={field.onChange} value={field.value}>
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder="Select timing preference" />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {MAINTENANCE_TICKET_PREFERRED_SCHEDULE.map((schedule) => (
                <SelectItem key={schedule} value={schedule}>
                  {schedule}
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