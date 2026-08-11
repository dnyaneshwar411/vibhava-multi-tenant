"use client";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import api from "@/network/client";
import { toast } from "sonner";
import { buildToastMessage } from "@/lib/catchAsync";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  LEASE_BILLING_CYCLES,
  LEASE_SECURITY_DEPOSIT_STATUSES,
  LEASE_STATUSES,
  LEASE_TYPES,
} from "../config";
import type { CreateLeaseFormValues } from "../type";
import { createLeaseSchema } from "../helpers/schema";
import { createLeaseDefaultValue } from "../config/create-lease-default-value";

interface CreateLeaseProps {
  children: React.ReactNode;
}


function parseCoTenants(value: string) {
  return value
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}

export default function CreateLease({ children }: CreateLeaseProps) {
  const [open, setOpen] = useState(false);
  const form = useForm<CreateLeaseFormValues>({
    resolver: zodResolver(createLeaseSchema),
    defaultValues: createLeaseDefaultValue,
    mode: "all",
  });

  async function onSubmit(values: CreateLeaseFormValues) {
    try {
      const payload = {
        property: values.property,
        unit: values.unit,
        primaryTenant: values.primaryTenant,
        coTenants: parseCoTenants(values.coTenants),
        leaseType: values.leaseType,
        status: values.status,
        startDate: new Date(values.startDate),
        endDate: new Date(values.endDate),
        moveInDate: new Date(values.moveInDate),
        moveOutDate: new Date(values.moveOutDate),
        finance: {
          rentAmount: Number(values.rentAmount),
          paymentDueDay: Number(values.paymentDueDay),
          billingCycle: values.billingCycle,
        },
        security: {
          amountRequired: Number(values.amountRequired),
          amountPaid: Number(values.amountPaid),
          status: values.securityStatus,
          heldInAccount: values.heldInAccount,
        },
        leaseAgreementDocument: values.leaseAgreementDocument,
        notes: values.notes,
      };

      const response = await api.post("/api/v1/lease", {
        body: payload as any,
      });

      if (response.code !== 201) throw new Error(response.message);

      toast.success(response.message || "Lease created");
      setOpen(false);
      form.reset(createLeaseDefaultValue);
    } catch (error) {
      toast.error(buildToastMessage(error));
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>{children}</DialogTrigger>
      <DialogContent className="max-h-[85vh] overflow-y-auto sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>Create lease</DialogTitle>
          <DialogDescription>
            Add a new lease record for a unit and tenant.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
            <div className="grid gap-4 md:grid-cols-2">
              <FormField
                control={form.control}
                name="property"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Property ID</FormLabel>
                    <FormControl>
                      <Input placeholder="Property ObjectId" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="unit"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Unit ID</FormLabel>
                    <FormControl>
                      <Input placeholder="Unit ObjectId" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="primaryTenant"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Primary tenant ID</FormLabel>
                    <FormControl>
                      <Input placeholder="Primary tenant ObjectId" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="coTenants"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Co-tenants</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Comma-separated ObjectIds"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Separate multiple tenant IDs with commas.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="leaseType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Lease type</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select lease type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {LEASE_TYPES.map((item) => (
                          <SelectItem key={item} value={item}>
                            {item}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Status</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {LEASE_STATUSES.map((item) => (
                          <SelectItem key={item} value={item}>
                            {item}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="startDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Start date</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="endDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>End date</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="moveInDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Move-in date</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="moveOutDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Move-out date</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="rentAmount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Rent amount</FormLabel>
                    <FormControl>
                      <Input type="number" min={0} step="any" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="paymentDueDay"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Payment due day</FormLabel>
                    <FormControl>
                      <Input type="number" min={1} max={31} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="billingCycle"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Billing cycle</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select billing cycle" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {LEASE_BILLING_CYCLES.map((item) => (
                          <SelectItem key={item} value={item}>
                            {item}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="amountRequired"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Security deposit required</FormLabel>
                    <FormControl>
                      <Input type="number" min={0} step="any" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="amountPaid"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Security deposit paid</FormLabel>
                    <FormControl>
                      <Input type="number" min={0} step="any" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="securityStatus"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Security status</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select security status" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {LEASE_SECURITY_DEPOSIT_STATUSES.map((item) => (
                          <SelectItem key={item} value={item}>
                            {item}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="heldInAccount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Held in account</FormLabel>
                    <FormControl>
                      <Input placeholder="Bank / account reference" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="leaseAgreementDocument"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Lease agreement document ID</FormLabel>
                    <FormControl>
                      <Input placeholder="Document ObjectId" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="notes"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Notes</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Optional internal notes"
                      className="min-h-24"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex items-center justify-end gap-2">
              <Button type="button" variant="outline" onClick={() => setOpen(false)}>
                Cancel
              </Button>
              <Button type="submit">Create lease</Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
