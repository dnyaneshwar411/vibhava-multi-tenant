import { Button } from "@/components/ui/button";
import { FormControl, FormField, FormItem, FormLabel, FormMessage, Form } from "@/components/ui/form";
import { ArrowLeft, ArrowRight, Building, Calendar, CheckCircle2, Home, KeyRound } from "lucide-react";
import { useForm, UseFormReturn, useWatch } from "react-hook-form";
import { TenantCreationInput, tenantCreationResidence, TenantCreationResidenceInput } from "../schema/create";
import { Input } from "@/components/ui/input";
import { useMemo, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { cn } from "@/lib/utils";
import PropertyDirectorySelection from "@/modules/properties/components/property-directory-selection";
import UnitDirectorySelection from "@/modules/unit/components/unit-directory-selection";

export default function AddTenantAddress({ form: defaultForm, previousStep, nextStep }: {
  form: UseFormReturn<TenantCreationInput>
  previousStep: () => void
  nextStep: () => void
}) {
  const defaultValues = useMemo(() => defaultForm.getValues(), []);

  const hasExistingData = useMemo(() => {
    return Boolean(defaultValues.currentResidence?.property || defaultValues.currentResidence?.unit)
  }, []);
  const [isAllotted, setIsAllotted] = useState<boolean>(hasExistingData);

  const form = useForm<TenantCreationResidenceInput>({
    resolver: zodResolver(tenantCreationResidence),
    mode: "onChange",
    defaultValues: {
      currentResidence: {
        property: defaultValues.currentResidence?.property || "",
        unit: defaultValues.currentResidence?.unit || "",
        activeLease: defaultValues.currentResidence?.activeLease || "",
        moveInDate: defaultValues.currentResidence?.moveInDate || "",
      }
    }
  });

  const selectedProperty = useWatch({
    control: form.control,
    name: "currentResidence.property",
  })

  const handleToggleAllotted = (status: boolean) => {
    setIsAllotted(status);
    if (!status) {
      form.reset({
        currentResidence: { property: "", unit: "", activeLease: "", moveInDate: "" }
      });
    }
  };

  function goToNextStage(data: TenantCreationResidenceInput) {
    if (isAllotted) {
      defaultForm.setValue("currentResidence", data.currentResidence);
    } else {
      defaultForm.setValue("currentResidence", {
        property: "",
        unit: "",
        activeLease: "",
        moveInDate: "",
      });
    }
    nextStep();
  }

  const handleNextClick = () => {
    if (isAllotted) {
      form.handleSubmit(goToNextStage)();
    } else {
      goToNextStage({ currentResidence: { property: "", unit: "", activeLease: "", moveInDate: "" } });
    }
  };

  return (
    <Form {...form}>
      <div className="space-y-6">
        <div>
          <h3 className="text-sm font-semibold text-foreground">Property Allocation</h3>
          <p className="text-xs text-muted-foreground mt-0.5">
            Assign an active unit or skip this step to leave the tenant unassigned for now.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <button
            type="button"
            onClick={() => handleToggleAllotted(true)}
            className={cn(
              "relative flex flex-col items-start p-3.5 border text-left transition-all duration-150 focus:outline-none",
              isAllotted
                ? "border-primary bg-primary/5 ring-1 ring-primary shadow-sm"
                : "border-border hover:border-muted-foreground/40 bg-card hover:bg-accent/40"
            )}
          >
            {isAllotted && (
              <CheckCircle2 className="absolute top-3 right-3 h-4 w-4 text-primary" />
            )}
            <div className={cn("p-2  mb-2", isAllotted ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground")}>
              <Home className="h-4 w-4" />
            </div>
            <span className="text-xs font-semibold text-foreground">Assign Property</span>
            <span className="text-[11px] text-muted-foreground mt-0.5">Link a unit and active lease</span>
          </button>

          <button
            type="button"
            onClick={() => handleToggleAllotted(false)}
            className={cn(
              "relative flex flex-col items-start p-3.5 border text-left transition-all duration-150 focus:outline-none",
              !isAllotted
                ? "border-primary bg-primary/5 ring-1 ring-primary shadow-sm"
                : "border-border hover:border-muted-foreground/40 bg-card hover:bg-accent/40"
            )}
          >
            {!isAllotted && (
              <CheckCircle2 className="absolute top-3 right-3 h-4 w-4 text-primary" />
            )}
            <div className={cn("p-2  mb-2", !isAllotted ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground")}>
              <KeyRound className="h-4 w-4" />
            </div>
            <span className="text-xs font-semibold text-foreground">Unassigned / Skip</span>
            <span className="text-[11px] text-muted-foreground mt-0.5">Allocate property later</span>
          </button>
        </div>

        {isAllotted && (
          <div className="space-y-4 pt-1 animate-in fade-in-50 duration-200">
            <SelectProperty form={form} />

            {selectedProperty && <SelectUnit
              key={selectedProperty}
              form={form}
              property={selectedProperty}
            />}

            {/* <FormField
                control={form.control}
                name="currentResidence.activeLease"
                render={({ field }) => (
                  <FormItem className="space-y-1">
                    <FormLabel className="text-xs font-medium text-foreground">Linked Lease ID <span className="text-muted-foreground font-normal">(Optional)</span></FormLabel>
                    <FormControl>
                      <Input placeholder="e.g. LEASE-2026-001" className="h-9 text-xs font-mono " {...field} />
                    </FormControl>
                    <FormMessage className="text-[10px]" />
                  </FormItem>
                )}
              /> */}

            <FormField
              control={form.control}
              name="currentResidence.moveInDate"
              render={({ field }) => (
                <FormItem className="space-y-1">
                  <FormLabel className="text-xs font-medium text-foreground">Move-In Date</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Calendar className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input
                        type="date"
                        className="h-9 pl-8 text-xs font-mono "
                        {...field}
                      />
                    </div>
                  </FormControl>
                  <FormMessage className="text-[10px]" />
                </FormItem>
              )}
            />
          </div>
        )}

        <div className="pt-4 flex items-center justify-between border-t border-border">
          <Button
            type="button"
            variant="ghost"
            onClick={previousStep}
            className="h-9 text-xs gap-1.5  px-3 text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="h-3.5 w-3.5" /> Back
          </Button>

          <Button
            type="button"
            onClick={handleNextClick}
            className="h-9 text-xs gap-1.5  px-4 font-medium"
          >
            {isAllotted ? "Communication Channel" : "Skip & Continue"}
            <ArrowRight className="h-3.5 w-3.5" />
          </Button>
        </div>
      </div>
    </Form>
  );
}

function SelectProperty({ form }: {
  form: UseFormReturn<TenantCreationResidenceInput>
}) {
  return <FormField
    control={form.control}
    name="currentResidence.property"
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
  form: UseFormReturn<TenantCreationResidenceInput>
  property: string
}) {
  return (
    <FormField
      control={form.control}
      disabled={form.getFieldState("currentResidence.unit").invalid}
      name="currentResidence.unit"
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