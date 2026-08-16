import { useMemo } from "react";
import { useForm, UseFormReturn, useWatch } from "react-hook-form";
import { LeaseCreationInput, LeaseCreationSpacePeopleInput, leaseCreationSpacePeopleSchema } from "../schemas/lease-creation";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import UnitDirectorySelection from "@/modules/unit/components/unit-directory-selection";
import PropertyDirectorySelection from "@/modules/properties/components/property-directory-selection";
import TenantDirectorySelection from "@/modules/tenant/components/tenant-directory-selection";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";

export default function CreateLeaseSpacePeople({
  form: defaultForm,
  nextStep
}: {
  form: UseFormReturn<LeaseCreationInput>,
  nextStep: Function
}) {
  const defaultValues = useMemo(() => defaultForm.getValues(), [])

  const form = useForm({
    resolver: zodResolver(leaseCreationSpacePeopleSchema),
    defaultValues: {
      property: defaultValues.property,
      unit: defaultValues.unit,
      primaryTenant: defaultValues.primaryTenant,
      coTenants: defaultValues.coTenants,
    }
  })

  const property = useWatch({
    control: form.control,
    name: "property"
  })

  function goToNextStep(data: LeaseCreationSpacePeopleInput) {
    defaultForm.setValues(data);
    nextStep();
  }

  return (
    <Form {...form}>
      <div className="space-y-4 mt-4">
        <SelectProperty form={form} />
        <SelectUnit key={property} form={form} property={property} />
        <PrimaryTenant form={form} />
        <CoTenants form={form} />
      </div>
      <div className="mt-4 flex justify-end">
        <Button className="min-w-[120px]" onClick={form.handleSubmit(goToNextStep)}>Next</Button>
      </div>
    </Form>
  )
}

function SelectProperty({ form }: {
  form: UseFormReturn<LeaseCreationSpacePeopleInput>
}) {
  return <FormField
    control={form.control}
    name="property"
    render={({ field }) => (
      <FormItem className="space-y-1">
        <FormLabel className="text-xs font-medium text-foreground">Property ID / Name</FormLabel>
        <PropertyDirectorySelection
          value={field.value}
          onValueChange={field.onChange}
        />
        <FormMessage className="text-[10px]" />
      </FormItem>
    )}
  />
}

function SelectUnit({ form, property }: {
  form: UseFormReturn<LeaseCreationSpacePeopleInput>
  property: string
}) {
  if (!property) return <></>

  return (
    <FormField
      key="property"
      control={form.control}
      name="unit"
      render={({ field }) => (
        <FormItem className="space-y-1">
          <FormLabel className="text-xs font-medium text-foreground">Unit Designation</FormLabel>
          <UnitDirectorySelection
            value={field.value}
            onValueChange={field.onChange}
            property={property as string}
          />
          <FormMessage className="text-[10px]" />
        </FormItem>
      )}
    />
  )
}

function PrimaryTenant({ form }: {
  form: UseFormReturn<LeaseCreationSpacePeopleInput>
}) {
  return (
    <FormField
      control={form.control}
      name="primaryTenant"
      render={({ field }) => (
        <FormItem className="space-y-1">
          <FormLabel className="text-xs font-medium text-foreground">Primary Tenant</FormLabel>
          <TenantDirectorySelection
            value={field.value}
            onValueChange={field.onChange}
          />
          <FormMessage className="text-[10px]" />
        </FormItem>
      )}
    />
  )
}

function CoTenants({
  form,
}: {
  form: UseFormReturn<LeaseCreationSpacePeopleInput>;
}) {
  const primaryTenant = useWatch({
    control: form.control,
    name: "primaryTenant",
  });

  return (
    <FormField
      control={form.control}
      name="coTenants"
      render={({ field }) => {
        const coTenantsList: string[] = field.value || [];

        const handleAddCoTenant = (tenantId: string) => {
          if (!tenantId || coTenantsList.includes(tenantId)) return;
          field.onChange([...coTenantsList, tenantId]);
        };

        const handleRemoveCoTenant = (tenantId: string) => {
          field.onChange(idList.filter((id) => id !== tenantId));
        };

        const idList = Array.isArray(coTenantsList) ? coTenantsList : [];

        return (
          <FormItem className="space-y-2">
            <FormLabel className="text-xs font-medium text-foreground">
              Co-Tenants
            </FormLabel>

            {/* Selected Co-Tenants Tags */}
            {idList.length > 0 && (
              <div className="flex flex-wrap gap-1.5 pb-1">
                {idList.map((tenantId) => (
                  <Badge
                    key={tenantId}
                    variant="secondary"
                    className="rounded-none text-xs flex items-center gap-1 px-2 py-0.5"
                  >
                    <span>{tenantId}</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveCoTenant(tenantId)}
                      className="hover:text-destructive focus:outline-none"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                ))}
              </div>
            )}

            {/* Selector to add new item to coTenants array */}
            <TenantDirectorySelection
              value=""
              onValueChange={handleAddCoTenant}
            // excludeIds={[primaryTenant, ...idList].filter(Boolean)}
            />
            <FormMessage className="text-[10px]" />
          </FormItem>
        );
      }}
    />
  );
}
