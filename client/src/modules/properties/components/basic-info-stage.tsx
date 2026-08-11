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
import { useForm, UseFormReturn } from "react-hook-form";
import { basicInfoFormSchema, BasicInfoFormSchemaType, CreatePropertyFormValues } from "../helpers/index";
import { PROPERTY_TYPES, PROPERTY_STATUSES } from "../configs/index";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { FieldGroup } from "@/components/ui/field";
import { useMemo } from "react";

export function BasicInfoStage({
  nextStep,
  form: defaultForm,
}: {
  nextStep: () => void;
  form: UseFormReturn<CreatePropertyFormValues>;
}) {
  const defaultFormState = useMemo(() => defaultForm.getValues(), [])

  const form = useForm<BasicInfoFormSchemaType>({
    resolver: zodResolver(basicInfoFormSchema),
    mode: "onChange",
    defaultValues: {
      name: defaultFormState.name,
      propertyType: defaultFormState.propertyType,
      status: defaultFormState.status
    }
  });

  async function goToNextStep(data: BasicInfoFormSchemaType) {
    defaultForm.setValues(data)
    nextStep();
  }

  return (
    <Form {...form}>
      <FieldGroup>
        <div onSubmit={form.handleSubmit(goToNextStep)} className="space-y-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field, ...others }) => (
              <FormItem>
                <FormLabel>Property Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter property name" {...field} />
                </FormControl>
                <FormMessage className="text-xs" />
              </FormItem>
            )}
          />
          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="propertyType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Property Type</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {PROPERTY_TYPES.map((type) => (
                        <SelectItem key={type} value={type}>
                          {type}
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
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {PROPERTY_STATUSES.map((status) => (
                        <SelectItem key={status} value={status}>
                          {status}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <Button onClick={form.handleSubmit(goToNextStep)} className="ml-auto block min-w-[100px]">
            Next
          </Button>
        </div>
      </FieldGroup>
    </Form>
  );
}