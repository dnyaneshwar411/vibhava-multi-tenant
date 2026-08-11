import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm, UseFormReturn } from "react-hook-form";
import { addressFormSchema, AddressInfoFormSchemaType, CreatePropertyFormValues } from "../helpers/index";
import { useMemo } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";

export function AddressStage({
  form: defaultForm,
  previousStep,
  nextStep
}: {
  previousStep: any
  nextStep: any,
  form: UseFormReturn<CreatePropertyFormValues>;
}) {
  const defaultFormState = useMemo(() => defaultForm.getValues(), [])

  const form = useForm<AddressInfoFormSchemaType>({
    resolver: zodResolver(addressFormSchema),
    mode: "onChange",
    defaultValues: {
      address: defaultFormState.address
    }
  });

  async function goToNextStep(data: AddressInfoFormSchemaType) {
    defaultForm.setValues(data)
    nextStep();
  }

  return (
    <Form {...form}>
      <FormField
        control={form.control}
        name="address.street1"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Street Address</FormLabel>
            <FormControl>
              <Input placeholder="Street 1" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="address.street2"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Street Address 2</FormLabel>
            <FormControl>
              <Input
                placeholder="Street 2"
                {...field}
                value={field.value ?? ""}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <div className="grid grid-cols-3 gap-4">
        <FormField
          control={form.control}
          name="address.city"
          render={({ field }) => (
            <FormItem>
              <FormLabel>City</FormLabel>
              <FormControl>
                <Input placeholder="City" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="address.state"
          render={({ field }) => (
            <FormItem>
              <FormLabel>State</FormLabel>
              <FormControl>
                <Input placeholder="State" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="address.zipCode"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Zip Code</FormLabel>
              <FormControl>
                <Input placeholder="Zip Code" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
      <div className="flex justify-end gap-4 pt-4">
        <Button
          type="button"
          variant="outline"
          onClick={previousStep}
          className="min-w-[100px]"
        >
          Back
        </Button>
        <Button onClick={form.handleSubmit(goToNextStep)} className="min-w-[100px]">
          Next
        </Button>
      </div>
    </Form>
  );
}
