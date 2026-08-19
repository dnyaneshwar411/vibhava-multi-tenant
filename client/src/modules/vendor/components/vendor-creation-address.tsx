"use client";

import { useForm, UseFormReturn } from "react-hook-form";
import { vendorAddressSchema, VendorCreationInput } from "../schemas/creation";
import { useMemo } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Check, MapPin, Building2, Globe, Hash } from "lucide-react";

export default function VendorCreationAddress({
  form: defaultForm,
  previousStep,
  onSubmit: finalOnSubmit,
}: {
  form: UseFormReturn<VendorCreationInput>;
  previousStep: () => void;
  onSubmit: (data: VendorCreationInput) => void;
}) {
  const defaultValues = useMemo(() => defaultForm.getValues(), [defaultForm]);

  const form = useForm({
    resolver: zodResolver(vendorAddressSchema),
    defaultValues: {
      address: {
        street1: defaultValues?.address?.street1 || "",
        street2: defaultValues?.address?.street2 || "",
        city: defaultValues?.address?.city || "",
        state: defaultValues?.address?.state || "",
        zipCode: defaultValues?.address?.zipCode || "",
        country: defaultValues?.address?.country || "India",
      }
    },
  });

  const handleSubmit = (data: any) => {
    defaultForm.setValues(data)
    if (typeof finalOnSubmit === "function") finalOnSubmit(data)
  };

  return (
    <Form {...form}>
      <div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pb-4">
          <FormField
            control={form.control}
            name="address.street1"
            render={({ field }) => (
              <FormItem className="space-y-1.5 md:col-span-2">
                <FormLabel className="text-xs font-medium text-muted-foreground">
                  Street Address 1
                </FormLabel>
                <FormControl>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
                    <Input
                      placeholder="e.g. 101 Main Street"
                      {...field}
                      className="pl-9 h-8 text-xs rounded-none border-muted focus-visible:ring-0 focus-visible:border-foreground"
                    />
                  </div>
                </FormControl>
                <FormMessage className="text-[11px]" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="address.street2"
            render={({ field }) => (
              <FormItem className="space-y-1.5 md:col-span-2">
                <FormLabel className="text-xs font-medium text-muted-foreground">
                  Street Address 2 (Optional)
                </FormLabel>
                <FormControl>
                  <div className="relative">
                    <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
                    <Input
                      placeholder="e.g. Suite 100 or Floor 2"
                      {...field}
                      className="pl-9 h-8 text-xs rounded-none border-muted focus-visible:ring-0 focus-visible:border-foreground"
                    />
                  </div>
                </FormControl>
                <FormMessage className="text-[11px]" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="address.city"
            render={({ field }) => (
              <FormItem className="space-y-1.5">
                <FormLabel className="text-xs font-medium text-muted-foreground">
                  City
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="e.g. Mumbai"
                    {...field}
                    className="h-8 text-xs rounded-none border-muted focus-visible:ring-0 focus-visible:border-foreground"
                  />
                </FormControl>
                <FormMessage className="text-[11px]" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="address.state"
            render={({ field }) => (
              <FormItem className="space-y-1.5">
                <FormLabel className="text-xs font-medium text-muted-foreground">
                  State / Province
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="e.g. Maharashtra"
                    {...field}
                    className="h-8 text-xs rounded-none border-muted focus-visible:ring-0 focus-visible:border-foreground"
                  />
                </FormControl>
                <FormMessage className="text-[11px]" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="address.zipCode"
            render={({ field }) => (
              <FormItem className="space-y-1.5">
                <FormLabel className="text-xs font-medium text-muted-foreground">
                  Zip / Postal Code
                </FormLabel>
                <FormControl>
                  <div className="relative">
                    <Hash className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
                    <Input
                      placeholder="e.g. 400001"
                      {...field}
                      className="pl-9 h-8 text-xs rounded-none border-muted focus-visible:ring-0 focus-visible:border-foreground"
                    />
                  </div>
                </FormControl>
                <FormMessage className="text-[11px]" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="address.country"
            render={({ field }) => (
              <FormItem className="space-y-1.5">
                <FormLabel className="text-xs font-medium text-muted-foreground">
                  Country
                </FormLabel>
                <FormControl>
                  <div className="relative">
                    <Globe className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
                    <Input
                      placeholder="e.g. India"
                      {...field}
                      className="pl-9 h-8 text-xs rounded-none border-muted focus-visible:ring-0 focus-visible:border-foreground"
                    />
                  </div>
                </FormControl>
                <FormMessage className="text-[11px]" />
              </FormItem>
            )}
          />
        </div>

        <div className="flex items-center justify-between pt-4 border-t">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={previousStep}
            className="rounded-none h-8 text-xs gap-1.5 px-3 border-muted"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            <span>Back</span>
          </Button>

          <Button
            type="submit"
            size="sm"
            className="rounded-none h-8 text-xs gap-1.5 px-4"
            onClick={form.handleSubmit(handleSubmit)}
          >
            <Check className="h-3.5 w-3.5" />
            <span>Save Vendor</span>
          </Button>
        </div>
      </div>
    </Form>
  );
}