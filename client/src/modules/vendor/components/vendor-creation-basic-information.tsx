"use client";

import { useForm, UseFormReturn } from "react-hook-form";
import { vendorBasicInformationSchema, VendorCreationInput } from "../schemas/creation";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ArrowRight, User, Mail, Lock, Phone, Wrench, ShieldCheck } from "lucide-react";
import { VENDOR_STATUS, VENDOR_TRADE_CATEGORIES } from "../config";

export default function VendorCreationBasicInformation({
  form: defaultForm,
  nextStep,
}: {
  form: UseFormReturn<VendorCreationInput>;
  nextStep: () => void;
}) {
  const defaultValues = useMemo(() => defaultForm.getValues(), [defaultForm]);

  const form = useForm({
    mode: "onChange",
    resolver: zodResolver(vendorBasicInformationSchema),
    defaultValues: {
      name: defaultValues.name || "",
      email: defaultValues.email || "",
      countryCode: defaultValues.countryCode || "91",
      mobileNumber: defaultValues.mobileNumber || "",
      status: defaultValues.status,
      tradeCategory: defaultValues.tradeCategory || "",
    },
  });

  const onSubmit = (data: any) => {
    defaultForm.setValues(data)
    nextStep();
  };

  return (
    <Form {...form}>
      <div className="space-y-6 text-xs">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="space-y-1.5">
                <FormLabel className="text-xs font-medium text-muted-foreground">
                  Vendor / Contractor Name
                </FormLabel>
                <FormControl>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
                    <Input
                      placeholder="e.g. Aarav Sharma"
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
            name="email"
            render={({ field }) => (
              <FormItem className="space-y-1.5">
                <FormLabel className="text-xs font-medium text-muted-foreground">
                  Email Address
                </FormLabel>
                <FormControl>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
                    <Input
                      type="email"
                      placeholder="e.g. contact@vendor.com"
                      {...field}
                      className="pl-9 h-8 text-xs rounded-none border-muted focus-visible:ring-0 focus-visible:border-foreground"
                    />
                  </div>
                </FormControl>
                <FormMessage className="text-[11px]" />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-3 gap-2">
            <FormField
              control={form.control}
              name="countryCode"
              render={({ field }) => (
                <FormItem className="space-y-1.5">
                  <FormLabel className="text-xs font-medium text-muted-foreground">
                    Code
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="number"
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
              name="mobileNumber"
              render={({ field }) => (
                <FormItem className="col-span-2 space-y-1.5">
                  <FormLabel className="text-xs font-medium text-muted-foreground">
                    Mobile Number
                  </FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
                      <Input
                        type="number"
                        placeholder="9876543200"
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

          <FormField
            control={form.control}
            name="tradeCategory"
            render={({ field }) => (
              <FormItem className="space-y-1.5">
                <FormLabel className="text-xs font-medium text-muted-foreground">
                  Trade Category
                </FormLabel>
                <Select
                  onValueChange={field.onChange}
                  value={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="h-8 text-xs rounded-none border-muted focus:ring-0 focus:border-foreground">
                      <div className="flex items-center gap-2">
                        <Wrench className="h-3.5 w-3.5 text-muted-foreground" />
                        <SelectValue placeholder="Select primary trade..." />
                      </div>
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="rounded-none border text-xs">
                    {VENDOR_TRADE_CATEGORIES.map((category) => (
                      <SelectItem
                        key={category}
                        value={category}
                        className="rounded-none text-xs"
                      >
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage className="text-[11px]" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="status"
            render={({ field }) => (
              <FormItem className="space-y-1.5">
                <FormLabel className="text-xs font-medium text-muted-foreground">
                  Vendor Status
                </FormLabel>
                <Select
                  onValueChange={field.onChange}
                  value={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="h-8 text-xs rounded-none border-muted focus:ring-0 focus:border-foreground">
                      <div className="flex items-center gap-2">
                        <ShieldCheck className="h-3.5 w-3.5 text-muted-foreground" />
                        <SelectValue placeholder="Select status..." />
                      </div>
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="rounded-none border text-xs">
                    {VENDOR_STATUS.map((status) => (
                      <SelectItem
                        key={status}
                        value={status}
                        className="rounded-none text-xs"
                      >
                        {status}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage className="text-[11px]" />
              </FormItem>
            )}
          />
        </div>

        <div className="flex items-center justify-end pt-4 border-t">
          <Button
            onClick={form.handleSubmit(onSubmit)}
            size="sm"
            className="rounded-none h-8 text-xs gap-1.5 px-4"
          >
            <span>Continue</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </Button>
        </div>
      </div>
    </Form>
  );
}