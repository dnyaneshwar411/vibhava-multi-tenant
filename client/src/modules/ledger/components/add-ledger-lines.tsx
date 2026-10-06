"use client";
import { UseFormReturn, useFieldArray } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { LedgerCreationInput } from "../schemas/create";

export default function AddLedgerLines({
  form,
  nextStep,
  previousStep,
}: {
  form: UseFormReturn<LedgerCreationInput>;
  nextStep: () => void;
  previousStep: () => void;
}) {
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "lines",
  });

  return (
    <Form {...form}>
      <div className="space-y-4">
        {fields.map((line, index) => (
          <div key={line.id} className="grid grid-cols-2 gap-3 rounded-none border p-4">
            <FormField
              control={form.control}
              name={`lines.${index}.accountId`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Account ID</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name={`lines.${index}.accountName`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Account Name</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name={`lines.${index}.type`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Type</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="DEBIT">Debit</SelectItem>
                      <SelectItem value="CREDIT">Credit</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name={`lines.${index}.amount`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Amount</FormLabel>
                  <FormControl>
                    <Input type="number" min={0} step="0.01" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name={`lines.${index}.description`}
              render={({ field }) => (
                <FormItem className="col-span-2">
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Input {...field} value={field.value ?? ""} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {fields.length > 1 && (
              <div className="col-span-2 flex justify-end">
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => remove(index)}
                >
                  Remove line
                </Button>
              </div>
            )}
          </div>
        ))}

        <Button
          type="button"
          variant="outline"
          onClick={() =>
            append({
              accountId: "",
              accountName: "",
              type: "DEBIT",
              amount: "0",
              description: undefined,
            })
          }
        >
          Add line
        </Button>

        {form.formState.errors.lines?.message && (
          <p className="text-sm text-destructive">
            {form.formState.errors.lines.message}
          </p>
        )}

        <div className="flex justify-between pt-2">
          <Button type="button" variant="outline" onClick={previousStep}>
            Back
          </Button>
          <Button type="button" onClick={nextStep}>
            Next
          </Button>
        </div>
      </div>
    </Form>
  );
}