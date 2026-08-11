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
import { Checkbox } from "@/components/ui/checkbox";
import { useForm, UseFormReturn } from "react-hook-form";
import { amenitiesFinanceFormSchema, AmenitiesFinanceFormSchemaType, CreatePropertyFormValues } from "../helpers/index";
import { AMENITIES, CURRENCIES } from "../configs/index";
import { Button } from "@/components/ui/button";
import { useMemo } from "react";
import { zodResolver } from "@hookform/resolvers/zod";

export function AmenitiesFinanceStage({
  form: defaultForm,
  previousStep,
  nextStep
}: {
  previousStep: any,
  nextStep: any,
  form: UseFormReturn<CreatePropertyFormValues>;
}) {
  const defaultFormState = useMemo(() => defaultForm.getValues(), [])

  const form = useForm<AmenitiesFinanceFormSchemaType>({
    resolver: zodResolver(amenitiesFinanceFormSchema),
    mode: "onChange",
    defaultValues: {
      amenities: defaultFormState.amenities,
      finance: defaultFormState.finance
    }
  });

  async function goToNextStep(data: AmenitiesFinanceFormSchemaType) {
    defaultForm.setValues(data)
    nextStep(defaultFormState);
  }

  return (
    <Form {...form}>
      <FormField
        control={form.control}
        name="amenities"
        render={() => (
          <FormItem>
            <FormLabel>Amenities</FormLabel>
            <div className="grid grid-cols-2 gap-2">
              {AMENITIES.map((amenity) => (
                <FormField
                  key={amenity}
                  control={form.control}
                  name="amenities"
                  render={({ field }) => (
                    <FormItem className="flex items-center space-x-2 space-y-0">
                      <FormControl>
                        <Checkbox
                          checked={field.value?.includes(amenity)}
                          onCheckedChange={(checked) => {
                            return checked
                              ? field.onChange([...(field.value || []), amenity])
                              : field.onChange(
                                field.value?.filter(
                                  (value) => value !== amenity
                                )
                              );
                          }}
                        />
                      </FormControl>
                      <FormLabel className="text-sm font-normal">
                        {amenity}
                      </FormLabel>
                    </FormItem>
                  )}
                />
              ))}
            </div>
            <FormMessage />
          </FormItem>
        )}
      />
      <div className="grid grid-cols-2 gap-4">
        <FormField
          control={form.control}
          name="finance.currency"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Currency</FormLabel>
              <Select
                onValueChange={field.onChange}
                defaultValue={field.value ?? undefined}
              >
                <FormControl>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select currency" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {CURRENCIES.map((currency) => (
                    <SelectItem key={currency} value={currency}>
                      {currency}
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
          name="finance.defaultLateFeeAmount"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Late Fee</FormLabel>
              <FormControl>
                <Input type="number" placeholder="0" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="finance.defaultGracePeriodDays"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Grace Period (Days)</FormLabel>
              <FormControl>
                <Input type="number" placeholder="15" {...field} />
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
          className="min-w-[100px]"
          onClick={previousStep}
        >
          Back
        </Button>
        <Button className="min-w-[100px]" onClick={form.handleSubmit(goToNextStep)}>
          Save
        </Button>
      </div>
    </Form>
  );
}
