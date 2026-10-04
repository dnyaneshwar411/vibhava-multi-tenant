"use client";
import { UseFormReturn } from "react-hook-form";
import { Button } from "@/components/ui/button";
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
import type { LedgerCreationInput } from "../schemas/create";
import { LEDGER_ENTRY_STATUS } from "../config";

export default function AddLedgerMeta({
  form,
  previousStep,
  onSubmit,
}: {
  form: UseFormReturn<LedgerCreationInput>;
  previousStep: () => void;
  onSubmit: () => void;
}) {
  return (
    <Form {...form}>
      <div className="space-y-4">
        <FormField
          control={form.control}
          name="status"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Status</FormLabel>
              <Select onValueChange={field.onChange} value={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {LEDGER_ENTRY_STATUS.map((value) => (
                    <SelectItem key={value} value={value}>
                      {value}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="rounded-none border p-4 text-xs">
          <pre className="overflow-x-auto">
            {JSON.stringify(form.getValues(), null, 2)}
          </pre>
        </div>

        <div className="flex justify-between pt-2">
          <Button type="button" variant="outline" onClick={previousStep}>
            Back
          </Button>
          <Button
            type="button"
            onClick={onSubmit}
            disabled={form.formState.isSubmitting}
          >
            Create Ledger
          </Button>
        </div>
      </div>
    </Form>
  );
}