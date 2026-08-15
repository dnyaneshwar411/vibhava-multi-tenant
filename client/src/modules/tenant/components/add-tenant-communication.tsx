import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, CheckCircle2 } from "lucide-react";
import { TENANT_COMMUNICATION_CHANNELS } from "../config";
import { Switch } from "@/components/ui/switch";
import { useForm, UseFormReturn } from "react-hook-form";
import { tenantCreationCommunicationChannel, TenantCreationCommunicationChannelInput, TenantCreationInput } from "../schema/create";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMemo } from "react";

export default function AddTenantCommunication({ form: defaultForm, previousStep, onSubmit }: {
  form: UseFormReturn<TenantCreationInput>
  previousStep: any,
  onSubmit: any,
}) {
  const defaultValues = useMemo(() => defaultForm.getValues(), [])

  const form = useForm<TenantCreationCommunicationChannelInput>({
    resolver: zodResolver(tenantCreationCommunicationChannel),
    mode: "onChange",
    defaultValues: {
      communicationPreferences: {
        preferredChannel: defaultValues.communicationPreferences.preferredChannel,
        allowSmsNotifications: defaultValues.communicationPreferences.allowSmsNotifications,
        allowEmailNotifications: defaultValues.communicationPreferences.allowEmailNotifications,
      }
    }
  })

  return (
    <Form {...form}>
      <div className="space-y-5">
        <FormField
          control={form.control}
          name="communicationPreferences.preferredChannel"
          render={({ field }) => (
            <FormItem className="space-y-1">
              <FormLabel className="text-xs font-semibold">Primary Communication Channel</FormLabel>
              <Select onValueChange={field.onChange} value={field.value}>
                <FormControl>
                  <SelectTrigger className="h-9 rounded-none text-xs font-mono">
                    <SelectValue placeholder="Select channel" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent className="rounded-none">
                  {TENANT_COMMUNICATION_CHANNELS.map((channel) => (
                    <SelectItem key={channel} value={channel} className="text-xs font-mono">
                      {channel}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage className="text-[10px]" />
            </FormItem>
          )}
        />

        <div className="border bg-card/50 divide-y">
          <FormField
            control={form.control}
            name="communicationPreferences.allowEmailNotifications"
            render={({ field }) => (
              <FormItem className="p-3 flex items-center justify-between space-y-0">
                <div className="space-y-0.5">
                  <FormLabel className="text-xs font-semibold cursor-pointer block">
                    Email Notifications
                  </FormLabel>
                  <FormDescription className="text-[11px] text-muted-foreground">
                    Receive automated ledger updates, statements, and lease updates.
                  </FormDescription>
                </div>
                <FormControl>
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    className="rounded-none"
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="communicationPreferences.allowSmsNotifications"
            render={({ field }) => (
              <FormItem className="p-3 flex items-center justify-between space-y-0">
                <div className="space-y-0.5">
                  <FormLabel className="text-xs font-semibold cursor-pointer block">
                    SMS / WhatsApp Nudges
                  </FormLabel>
                  <FormDescription className="text-[11px] text-muted-foreground">
                    Send urgent payment reminders and maintenance schedule alerts via mobile.
                  </FormDescription>
                </div>
                <FormControl>
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    className="rounded-none"
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </div>

        <div className="pt-4 flex justify-between border-t">
          <Button
            type="button"
            variant="outline"
            onClick={previousStep}
            className="h-9 rounded-none text-xs gap-1.5"
          >
            <ArrowLeft className="h-3.5 w-3.5" /> Back
          </Button>
          <Button
            type="submit"
            className="h-9 rounded-none text-xs gap-1.5 bg-emerald-600 hover:bg-emerald-700 text-white"
            onClick={form.handleSubmit(onSubmit)}
          >
            <CheckCircle2 className="h-3.5 w-3.5" /> Save & Provision
          </Button>
        </div>
      </div>
    </Form>
  );
}