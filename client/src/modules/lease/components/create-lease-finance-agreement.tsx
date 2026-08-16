"use client";

import { useMemo } from "react";
import { useForm, UseFormReturn } from "react-hook-form";
import {
  LeaseCreationFinanceAgreementInput,
  LeaseCreationInput,
  leaseCreationFinanceAgreement,
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
import { LEASE_BILLING_CYCLES, LEASE_SECURITY_DEPOSIT_STATUSES } from "../config";

export default function CreateLeaseFinanceAgreement({
  form: defaultForm,
  nextStep,
  previousStep,
}: {
  form: UseFormReturn<LeaseCreationInput>;
  nextStep: () => void;
  previousStep: () => void;
}) {
  const defaultValues = useMemo(() => defaultForm.getValues(), [defaultForm]);

  const form = useForm<LeaseCreationFinanceAgreementInput>({
    resolver: zodResolver(leaseCreationFinanceAgreement),
    defaultValues: {
      finance: {
        rentAmount: defaultValues?.finance?.rentAmount || "",
        paymentDueDay: defaultValues?.finance?.paymentDueDay || "",
        billingCycle: defaultValues?.finance?.billingCycle || LEASE_BILLING_CYCLES[0],
      },
      security: {
        amountRequired: defaultValues?.security?.amountRequired || "",
        amountPaid: defaultValues?.security?.amountPaid || "",
        status: defaultValues?.security?.status || LEASE_SECURITY_DEPOSIT_STATUSES[0],
        heldInAccount: defaultValues?.security?.heldInAccount || "",
      },
    },
  });

  const handleSubmit = (data: LeaseCreationFinanceAgreementInput) => {
    defaultForm.setValue("finance", data.finance);
    defaultForm.setValue("security", data.security);
    nextStep();
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6 mt-4">
        <div className="space-y-4">
          <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground block border-b pb-1">
            Rent & Payment Details
          </span>

          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="finance.rentAmount"
              render={({ field }) => (
                <FormItem className="space-y-1">
                  <FormLabel className="text-xs font-medium text-foreground">
                    Base Rent Amount
                  </FormLabel>
                  <FormControl>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground text-xs">
                        $
                      </span>
                      <Input
                        placeholder="0.00"
                        className="pl-6 h-9 text-xs rounded-none"
                        {...field}
                      />
                    </div>
                  </FormControl>
                  <FormMessage className="text-[10px]" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="finance.billingCycle"
              render={({ field }) => (
                <FormItem className="space-y-1">
                  <FormLabel className="text-xs font-medium text-foreground">
                    Billing Cycle
                  </FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="h-9 text-xs rounded-none">
                        <SelectValue placeholder="Select billing cycle" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="rounded-none">
                      {LEASE_BILLING_CYCLES.map((cycle) => (
                        <SelectItem key={cycle} value={cycle} className="text-xs">
                          {cycle}
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
            name="finance.paymentDueDay"
            render={({ field }) => (
              <FormItem className="space-y-1 w-1/2 pr-2">
                <FormLabel className="text-xs font-medium text-foreground">
                  Payment Due Day (1-31)
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="e.g. 1, 15, 31"
                    className="h-9 text-xs rounded-none"
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-[10px]" />
              </FormItem>
            )}
          />
        </div>

        <div className="space-y-4 pt-2">
          <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground block border-b pb-1">
            Security Deposit Details
          </span>

          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="security.amountRequired"
              render={({ field }) => (
                <FormItem className="space-y-1">
                  <FormLabel className="text-xs font-medium text-foreground">
                    Deposit Required
                  </FormLabel>
                  <FormControl>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground text-xs">
                        $
                      </span>
                      <Input
                        placeholder="0.00"
                        className="pl-6 h-9 text-xs rounded-none"
                        {...field}
                      />
                    </div>
                  </FormControl>
                  <FormMessage className="text-[10px]" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="security.amountPaid"
              render={({ field }) => (
                <FormItem className="space-y-1">
                  <FormLabel className="text-xs font-medium text-foreground">
                    Deposit Paid
                  </FormLabel>
                  <FormControl>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground text-xs">
                        $
                      </span>
                      <Input
                        placeholder="0.00"
                        className="pl-6 h-9 text-xs rounded-none"
                        {...field}
                      />
                    </div>
                  </FormControl>
                  <FormMessage className="text-[10px]" />
                </FormItem>
              )}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="security.status"
              render={({ field }) => (
                <FormItem className="space-y-1">
                  <FormLabel className="text-xs font-medium text-foreground">
                    Deposit Status
                  </FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    value={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="h-9 text-xs rounded-none">
                        <SelectValue placeholder="Select deposit status" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="rounded-none">
                      {LEASE_SECURITY_DEPOSIT_STATUSES.map((status) => (
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

            <FormField
              control={form.control}
              name="security.heldInAccount"
              render={({ field }) => (
                <FormItem className="space-y-1">
                  <FormLabel className="text-xs font-medium text-foreground">
                    Held In Account (Escrow/Bank)
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="e.g. Escrow Account #1029"
                      className="h-9 text-xs rounded-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-[10px]" />
                </FormItem>
              )}
            />
          </div>
        </div>

        <div className="mt-6 flex justify-end gap-2 pt-2 border-t">
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