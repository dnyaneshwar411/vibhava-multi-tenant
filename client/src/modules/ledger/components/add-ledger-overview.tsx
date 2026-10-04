"use client";
import { useEffect } from "react";
import { UseFormReturn, useWatch } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { LEDGER_ENTRY_TYPE } from "../config/index";
import type { LedgerCreationInput } from "../schemas/create";
import PropertyDirectorySelection from "@/modules/properties/components/property-directory-selection";
import UnitDirectorySelection from "@/modules/unit/components/unit-directory-selection";
import TenantDirectorySelection from "@/modules/tenant/components/tenant-directory-selection";
import VendorDirectorySelection from "@/modules/vendor/components/vendor-directory-selection";

export default function AddLedgerOverview({
  form,
  nextStep,
}: {
  form: UseFormReturn<LedgerCreationInput>;
  nextStep: () => void;
}) {
  const property = useWatch({
    control: form.control,
    name: "property"
  })

  useEffect(() => {
    form.setValue("unit", undefined);
  }, [property, form]);

  return (
    <Form {...form}>
      <div className="space-y-4">
        <SelectProperty form={form} />

        <SelectUnit key={property} form={form} property={property} />

        <div className="grid grid-cols-2 gap-4">
          <SelectTenant form={form} />
          <SelectVendor form={form} />

          <FormField
            control={form.control}
            name="entryType"
            render={({ field }) => (
              <FormItem className="space-y-1">
                <FormLabel className="text-xs font-medium text-foreground">
                  Entry Type
                </FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select entry type" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {LEDGER_ENTRY_TYPE.map((value) => (
                      <SelectItem key={value} value={value}>
                        {value}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage className="text-[10px]" />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="memo"
          render={({ field }) => (
            <FormItem className="space-y-1">
              <FormLabel className="text-xs font-medium text-foreground">
                Memo
              </FormLabel>
              <FormControl>
                <Textarea
                  rows={3}
                  placeholder="Optional"
                  {...field}
                  value={field.value ?? ""}
                />
              </FormControl>
              <FormMessage className="text-[10px]" />
            </FormItem>
          )}
        />

        <div className="flex justify-end pt-2">
          <Button type="button" onClick={nextStep}>
            Next
          </Button>
        </div>
      </div>
    </Form>
  );
}

function SelectProperty({ form }: { form: UseFormReturn<LedgerCreationInput> }) {
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
            onValueChange={field.onChange}
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
  form: UseFormReturn<LedgerCreationInput>;
  property: string;
}) {
  if (!property) return <></>;

  return (
    <FormField
      key="unit"
      control={form.control}
      name="unit"
      render={({ field }) => (
        <FormItem className="space-y-1">
          <FormLabel className="text-xs font-medium text-foreground">
            Unit Designation
          </FormLabel>
          <UnitDirectorySelection
            key={property}
            value={field.value || ""}
            onValueChange={field.onChange}
            property={property}
          />
          <FormMessage className="text-[10px]" />
        </FormItem>
      )}
    />
  );
}

function SelectTenant({ form }: { form: UseFormReturn<LedgerCreationInput> }) {
  return (
    <FormField
      control={form.control}
      name="tenant"
      render={({ field }) => (
        <FormItem className="space-y-1">
          <FormLabel className="text-xs font-medium text-foreground">
            Tenant
          </FormLabel>
          <TenantDirectorySelection
            value={field.value || ""}
            onValueChange={field.onChange}
          />
          <FormMessage className="text-[10px]" />
        </FormItem>
      )}
    />
  );
}

function SelectVendor({ form }: { form: UseFormReturn<LedgerCreationInput> }) {
  return (
    <FormField
      control={form.control}
      name="vendor"
      render={({ field }) => (
        <FormItem className="space-y-1">
          <FormLabel className="text-xs font-medium text-foreground">
            Vendor
          </FormLabel>
          <VendorDirectorySelection
            value={field.value || ""}
            onValueChange={field.onChange}
          />
          <FormMessage className="text-[10px]" />
        </FormItem>
      )}
    />
  );
}