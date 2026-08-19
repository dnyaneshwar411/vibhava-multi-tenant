"use client"

import React, { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import {
  Mail,
  Phone,
  User,
  Globe,
  MessageSquare,
  Loader2,
  Edit2,
} from "lucide-react"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button, buttonVariants } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import api from "@/network/client"
import { toast } from "sonner"
import { buildToastMessage } from "@/lib/catchAsync"

export const TENANT_STATUS = [
  { label: "Applicant", value: "Applicant" },
  { label: "Active", value: "Active" },
  { label: "Inactive", value: "Inactive" },
] as const

export const TENANT_COMMUNICATION_CHANNELS = ["Email", "SMS", "Both"] as const

export const tenantCreationOverview = z.object({
  name: z.string().trim().min(1, "Name is required"),
  email: z.string().email("Invalid email address").trim(),
  countryCode: z.string().min(1, "Country code is required"),
  mobileNumber: z.string().min(10, "Mobile number must be at least 10 digits"),
  status: z.enum(TENANT_STATUS.map((item) => item.value) as [string, ...string[]]),
})

export const tenantCreationCommunicationChannel = z.object({
  communicationPreferences: z.object({
    preferredChannel: z.enum(TENANT_COMMUNICATION_CHANNELS),
    allowSmsNotifications: z.boolean(),
    allowEmailNotifications: z.boolean(),
  }),
})

export const tenantUpdate = tenantCreationOverview.merge(
  tenantCreationCommunicationChannel
)

export type TenantUpdateFormValues = z.infer<typeof tenantUpdate>

interface TenantProfile {
  _id: string
  name: string
  email: string
  countryCode: number | string
  mobileNumber: number | string
  status: string
  communicationPreferences?: {
    preferredChannel?: string
    allowSmsNotifications?: boolean
    allowEmailNotifications?: boolean
  }
}

interface TenantProfileUpdateDialogProps {
  tenant: TenantProfile
  trigger?: React.ReactNode
}

export default function TenantProfileUpdateDialog({
  tenant,
  trigger,
}: TenantProfileUpdateDialogProps) {
  const [open, setOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const form = useForm<TenantUpdateFormValues>({
    resolver: zodResolver(tenantUpdate),
    defaultValues: {
      name: tenant.name || "",
      email: tenant.email || "",
      countryCode: String(tenant.countryCode || "1"),
      mobileNumber: String(tenant.mobileNumber || ""),
      status: tenant.status || "Applicant",
      communicationPreferences: {
        preferredChannel:
          (tenant.communicationPreferences?.preferredChannel as "Email" | "SMS" | "Both") ||
          "Email",
        allowSmsNotifications:
          tenant.communicationPreferences?.allowSmsNotifications ?? true,
        allowEmailNotifications:
          tenant.communicationPreferences?.allowEmailNotifications ?? true,
      },
    },
  })

  const handleOpenChange = (isOpen: boolean) => {
    if (isOpen) {
      form.reset({
        name: tenant.name || "",
        email: tenant.email || "",
        countryCode: String(tenant.countryCode || "1"),
        mobileNumber: String(tenant.mobileNumber || ""),
        status: tenant.status || "Applicant",
        communicationPreferences: {
          preferredChannel:
            (tenant.communicationPreferences?.preferredChannel as "Email" | "SMS" | "Both") ||
            "Email",
          allowSmsNotifications:
            tenant.communicationPreferences?.allowSmsNotifications ?? true,
          allowEmailNotifications:
            tenant.communicationPreferences?.allowEmailNotifications ?? true,
        },
      })
    }
    setOpen(isOpen)
  }

  const handleFormSubmit = async (data: TenantUpdateFormValues) => {
    try {
      setIsSubmitting(true)
      const response = await api.put("/api/v1/auth/profile", {
        body: {
          ...data,
          type: "Tenant"
        }
      })
      if(response.code !==200) throw new Error(response.message)
      toast.success(response.message || "Successfull")
      setOpen(false)
    } catch (error) {
      toast.error(buildToastMessage(error))
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger>
        {trigger || (
          <span className={buttonVariants({variant: "outline"})}>
            <Edit2 className="h-3.5 w-3.5" />
            Edit Profile
          </span>
        )}
      </DialogTrigger>

      <DialogContent className="!max-w-lg w-full rounded-none sm:rounded-none">
        <DialogHeader>
          <DialogTitle className="text-sm font-semibold">
            Update Tenant Profile
          </DialogTitle>
          <DialogDescription className="text-xs">
            Modify profile parameters and communication settings for {tenant.name}.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleFormSubmit)} className="space-y-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs">Full Name</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <User className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                          {...field}
                          className="pl-9 text-xs rounded-none"
                          placeholder="John Doe"
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
                  <FormItem>
                    <FormLabel className="text-xs">Email Address</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Mail className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                          {...field}
                          type="email"
                          className="pl-9 text-xs rounded-none"
                          placeholder="john@example.com"
                        />
                      </div>
                    </FormControl>
                    <FormMessage className="text-[11px]" />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <FormLabel className="text-xs">Mobile Contact</FormLabel>
                <div className="flex gap-2">
                  <FormField
                    control={form.control}
                    name="countryCode"
                    render={({ field }) => (
                      <FormItem className="w-24 shrink-0 space-y-0">
                        <FormControl>
                          <div className="relative">
                            <Globe className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                            <Input
                              {...field}
                              className="pl-8 text-xs rounded-none"
                              placeholder="1"
                            />
                          </div>
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="mobileNumber"
                    render={({ field }) => (
                      <FormItem className="w-full space-y-0">
                        <FormControl>
                          <div className="relative">
                            <Phone className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                            <Input
                              {...field}
                              className="pl-9 text-xs rounded-none"
                              placeholder="5550192834"
                            />
                          </div>
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>
                {(form.formState.errors.countryCode ||
                  form.formState.errors.mobileNumber) && (
                  <p className="text-[11px] font-medium text-destructive">
                    {form.formState.errors.countryCode?.message ||
                      form.formState.errors.mobileNumber?.message}
                  </p>
                )}
              </div>

              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs">Status</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      value={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="text-xs rounded-none">
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="rounded-none">
                        {TENANT_STATUS.map((item) => (
                          <SelectItem
                            key={item.value}
                            value={item.value}
                            className="text-xs rounded-none"
                          >
                            {item.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage className="text-[11px]" />
                  </FormItem>
                )}
              />
            </div>

            <div className="border-t pt-4 space-y-3">
              <FormLabel className="text-xs font-medium">
                Communication Preferences
              </FormLabel>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 items-end">
                <FormField
                  control={form.control}
                  name="communicationPreferences.preferredChannel"
                  render={({ field }) => (
                    <FormItem>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <div className="relative">
                            <MessageSquare className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground z-10" />
                            <SelectTrigger className="pl-9 text-xs rounded-none">
                              <SelectValue placeholder="Select channel" />
                            </SelectTrigger>
                          </div>
                        </FormControl>
                        <SelectContent className="rounded-none">
                          {TENANT_COMMUNICATION_CHANNELS.map((channel) => (
                            <SelectItem
                              key={channel}
                              value={channel}
                              className="text-xs rounded-none"
                            >
                              {channel}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormItem>
                  )}
                />

                <div className="flex items-center gap-4 h-9">
                  <FormField
                    control={form.control}
                    name="communicationPreferences.allowEmailNotifications"
                    render={({ field }) => (
                      <FormItem className="flex items-center space-x-2 space-y-0">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                            className="rounded-none"
                          />
                        </FormControl>
                        <FormLabel className="text-xs font-normal cursor-pointer">
                          Email
                        </FormLabel>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="communicationPreferences.allowSmsNotifications"
                    render={({ field }) => (
                      <FormItem className="flex items-center space-x-2 space-y-0">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                            className="rounded-none"
                          />
                        </FormControl>
                        <FormLabel className="text-xs font-normal cursor-pointer">
                          SMS
                        </FormLabel>
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            </div>

            <DialogFooter className="pt-2 border-t">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => setOpen(false)}
                className="rounded-none text-xs"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                size="sm"
                disabled={isSubmitting || !form.formState.isDirty}
                className="rounded-none text-xs gap-2"
              >
                {isSubmitting && <Loader2 className="h-3.5 w-3.5 animate-spin" />}
                Save Changes
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}