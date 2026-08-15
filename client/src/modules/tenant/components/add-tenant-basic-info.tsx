import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowRight, Mail, Phone } from "lucide-react";
import { TENANT_STATUS } from "../config";
import { useForm, UseFormReturn } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { FieldGroup } from "@/components/ui/field";
import { TenantCreationInput, tenantCreationOverview, TenantCreationOverviewInput } from "../schema/create";
import { useMemo } from "react";

export default function AddTenantBasicInfo({ form: defaultForm, nextStep }: {
  form: UseFormReturn<TenantCreationInput>
  nextStep: any
}) {
  const defaultValues = useMemo(() => defaultForm.getValues(), [])

  const form = useForm<TenantCreationOverviewInput>({
    resolver: zodResolver(tenantCreationOverview),
    mode: "onChange",
    defaultValues: {
      firstName: defaultValues.firstName,
      lastName: defaultValues.lastName,
      email: defaultValues.email,
      countryCode: defaultValues.countryCode,
      mobileNumber: defaultValues.mobileNumber,
      status: defaultValues.status,
    }
  })

  function goToNextStage(data: TenantCreationOverviewInput) {
    defaultForm.setValues(data);
    nextStep();
  }

  return (
    <Form {...form}>
      <FieldGroup>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem className="space-y-1">
                  <FormLabel className="text-xs font-semibold">First Name</FormLabel>
                  <FormControl>
                    <Input placeholder="John" className="h-9 rounded-none text-xs" {...field} />
                  </FormControl>
                  <FormMessage className="text-[10px]" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem className="space-y-1">
                  <FormLabel className="text-xs font-semibold">Last Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Doe" className="h-9 rounded-none text-xs" {...field} />
                  </FormControl>
                  <FormMessage className="text-[10px]" />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="space-y-1">
                <FormLabel className="text-xs font-semibold">Email Address</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Mail className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="john.doe@domain.com"
                      className="h-9 pl-8 rounded-none text-xs font-mono"
                      {...field}
                    />
                  </div>
                </FormControl>
                <FormMessage className="text-[10px]" />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-3 gap-3">
            <FormField
              control={form.control}
              name="countryCode"
              render={({ field }) => (
                <FormItem className="space-y-1 col-span-1">
                  <FormLabel className="text-xs font-semibold">Code</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <span className="absolute left-2.5 top-2.5 text-xs text-muted-foreground font-mono">
                        +
                      </span>
                      <Input className="h-9 pl-6 rounded-none text-xs font-mono" {...field} />
                    </div>
                  </FormControl>
                  <FormMessage className="text-[10px]" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="mobileNumber"
              render={({ field }) => (
                <FormItem className="space-y-1 col-span-2">
                  <FormLabel className="text-xs font-semibold">Mobile Number</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Phone className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder="9876543210"
                        className="h-9 pl-8 rounded-none text-xs font-mono"
                        {...field}
                      />
                    </div>
                  </FormControl>
                  <FormMessage className="text-[10px]" />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="status"
            render={({ field }) => (
              <FormItem className="space-y-1">
                <FormLabel className="text-xs font-semibold">Account Status</FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger className="h-9 rounded-none text-xs font-mono">
                      <SelectValue placeholder="Select initial status" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="rounded-none">
                    {TENANT_STATUS.map((item) => (
                      <SelectItem key={item.value} value={item.value} className="text-xs font-mono">
                        {item.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage className="text-[10px]" />
              </FormItem>
            )}
          />

          <div className="pt-4 flex justify-end border-t">
            <Button
              type="button"
              onClick={form.handleSubmit(goToNextStage)}
              className="h-9 rounded-none text-xs gap-1.5"
            >
              Residence Details <ArrowRight className="h-3.5 w-3.5" />
            </Button>
          </div>
        </div>
      </FieldGroup>
    </Form>
  );
}