"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";

import api from "@/network/client";
import { buildToastMessage } from "@/lib/catchAsync";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

import { createVendorSchema } from "../helpers/schema";
import { createVendorDefaultValues } from "../config/create-vendor-default-value";
import { AVAILABLE_COUNTRIES, VENDOR_STATUS, VENDOR_TRADE_CATEGORIES } from "../config";
import type { CreateVendorFormValues } from "../types";

export default function CreateVendor({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const form = useForm<CreateVendorFormValues>({
    resolver: zodResolver(createVendorSchema),
    defaultValues: createVendorDefaultValues,
    mode: "all",
  });

  async function onSubmit(values: CreateVendorFormValues) {
    try {
      const payload = {
        name: values.name,
        email: values.email,
        password: values.password,
        countryCode: values.countryCode ? Number(values.countryCode) : undefined,
        mobileNumber: values.mobileNumber ? Number(values.mobileNumber) : undefined,
        status: values.status,
        tradeCategory: values.tradeCategory,
        address: {
          street1: values.street1 || undefined,
          street2: values.street2 || undefined,
          city: values.city || undefined,
          state: values.state || undefined,
          zipCode: values.zipCode || undefined,
          country: values.country || undefined,
        },
      };

      const response = await api.post("/api/v1/vendor", { body: payload as any });
      if (response.code !== 201) throw new Error(response.message);

      toast.success(response.message || "Vendor created");
      setOpen(false);
      form.reset(createVendorDefaultValues);
    } catch (error) {
      toast.error(buildToastMessage(error));
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>{children}</DialogTrigger>
      <DialogContent className="max-h-[85vh] overflow-y-auto sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>Create vendor</DialogTitle>
          <DialogDescription>
            Add a service vendor with contact and address details.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form className="space-y-5" onSubmit={form.handleSubmit(onSubmit)}>
            <div className="grid gap-4 md:grid-cols-2">
              <FormField control={form.control} name="name" render={({ field }) => (
                <FormItem><FormLabel>Name</FormLabel><FormControl><Input placeholder="Plumbing Pros" {...field} /></FormControl><FormMessage /></FormItem>
              )} />
              <FormField control={form.control} name="email" render={({ field }) => (
                <FormItem><FormLabel>Email</FormLabel><FormControl><Input type="email" placeholder="contact@example.com" {...field} /></FormControl><FormMessage /></FormItem>
              )} />
              <FormField control={form.control} name="password" render={({ field }) => (
                <FormItem><FormLabel>Password</FormLabel><FormControl><Input type="password" placeholder="••••••••" {...field} /></FormControl><FormMessage /></FormItem>
              )} />
              <FormField control={form.control} name="tradeCategory" render={({ field }) => (
                <FormItem><FormLabel>Trade category</FormLabel><Select onValueChange={field.onChange} value={field.value}><FormControl><SelectTrigger><SelectValue placeholder="Select trade" /></SelectTrigger></FormControl><SelectContent>{VENDOR_TRADE_CATEGORIES.map((item) => <SelectItem key={item} value={item}>{item}</SelectItem>)}</SelectContent></Select><FormMessage /></FormItem>
              )} />
              <FormField control={form.control} name="status" render={({ field }) => (
                <FormItem><FormLabel>Status</FormLabel><Select onValueChange={field.onChange} value={field.value}><FormControl><SelectTrigger><SelectValue placeholder="Select status" /></SelectTrigger></FormControl><SelectContent>{VENDOR_STATUS.map((item) => <SelectItem key={item} value={item}>{item}</SelectItem>)}</SelectContent></Select><FormMessage /></FormItem>
              )} />
              <FormField control={form.control} name="countryCode" render={({ field }) => (
                <FormItem><FormLabel>Country code</FormLabel><FormControl><Input placeholder="91" {...field} /></FormControl><FormMessage /></FormItem>
              )} />
              <FormField control={form.control} name="mobileNumber" render={({ field }) => (
                <FormItem><FormLabel>Mobile number</FormLabel><FormControl><Input placeholder="9876543210" {...field} /></FormControl><FormMessage /></FormItem>
              )} />
              <FormField control={form.control} name="country" render={({ field }) => (
                <FormItem><FormLabel>Country</FormLabel><Select onValueChange={field.onChange} value={field.value}><FormControl><SelectTrigger><SelectValue placeholder="Select country" /></SelectTrigger></FormControl><SelectContent>{AVAILABLE_COUNTRIES.map((item) => <SelectItem key={item} value={item}>{item}</SelectItem>)}</SelectContent></Select><FormMessage /></FormItem>
              )} />
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <FormField control={form.control} name="street1" render={({ field }) => (
                <FormItem><FormLabel>Street 1</FormLabel><FormControl><Input placeholder="42 Industrial Ave" {...field} /></FormControl><FormMessage /></FormItem>
              )} />
              <FormField control={form.control} name="street2" render={({ field }) => (
                <FormItem><FormLabel>Street 2</FormLabel><FormControl><Input placeholder="Suite 200" {...field} /></FormControl><FormMessage /></FormItem>
              )} />
              <FormField control={form.control} name="city" render={({ field }) => (
                <FormItem><FormLabel>City</FormLabel><FormControl><Input placeholder="Mumbai" {...field} /></FormControl><FormMessage /></FormItem>
              )} />
              <FormField control={form.control} name="state" render={({ field }) => (
                <FormItem><FormLabel>State</FormLabel><FormControl><Input placeholder="Maharashtra" {...field} /></FormControl><FormMessage /></FormItem>
              )} />
              <FormField control={form.control} name="zipCode" render={({ field }) => (
                <FormItem><FormLabel>ZIP code</FormLabel><FormControl><Input placeholder="400001" {...field} /></FormControl><FormMessage /></FormItem>
              )} />
            </div>

            <div className="flex items-center justify-end gap-2">
              <Button type="button" variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
              <Button type="submit">Create vendor</Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
