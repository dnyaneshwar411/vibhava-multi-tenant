"use client"
import { useMemo } from "react"
import { useForm, UseFormReturn } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Check, CreditCard, ArrowRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form"
import { PaymentGatewayInput, TypeStepInput, typeStepSchema } from "../schemas/creation"
import { PROVIDERS } from "../config"


export default function PaymentGatewayCreationProvider({
  form: defaultForm,
  nextStep,
}: {
  form: UseFormReturn<PaymentGatewayInput>
  nextStep: () => void
}) {
  const defaultValues = useMemo(() => defaultForm.getValues(), [defaultForm])

  const form = useForm<TypeStepInput>({
    resolver: zodResolver(typeStepSchema),
    defaultValues: {
      type: defaultValues.type || "RAZORPAY",
    },
  })

  const onSubmit = (data: TypeStepInput) => {
    defaultForm.setValue("type", data.type, {
      shouldValidate: true,
      shouldDirty: true,
    })
    nextStep()
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6">
        <div className="space-y-1">
          <h3 className="text-lg font-bold tracking-tight">Select Provider</h3>
          <p className="text-xs text-muted-foreground">
            Choose the payment gateway infrastructure you want to connect to your workspace.
          </p>
        </div>

        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormControl>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  {PROVIDERS.map((provider) => {
                    const isSelected = field.value === provider.id

                    return (
                      <button
                        key={provider.id}
                        type="button"
                        onClick={() => field.onChange(provider.id)}
                        className={cn(
                          "relative flex flex-col justify-between border p-5 text-left transition-all rounded-none",
                          isSelected
                            ? "border-primary bg-primary/5 ring-1 ring-primary"
                            : "border-border bg-background hover:bg-muted/30"
                        )}
                      >
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <CreditCard
                                className={cn(
                                  "h-5 w-5",
                                  isSelected ? "text-primary" : "text-muted-foreground"
                                )}
                              />
                              <span className="font-bold text-base">{provider.title}</span>
                            </div>
                            {isSelected && <Check className="h-4 w-4 text-primary" />}
                          </div>
                          <p className="text-xs text-muted-foreground leading-relaxed">
                            {provider.description}
                          </p>
                        </div>

                        <div className="mt-4 pt-3 border-t">
                          <span className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground">
                            {provider.badge}
                          </span>
                        </div>
                      </button>
                    )
                  })}
                </div>
              </FormControl>
              <FormMessage className="text-xs font-normal" />
            </FormItem>
          )}
        />

        <div className="flex items-center justify-between border-t pt-4">
          <Button type="submit" className="rounded-none shadow-none">
            Continue
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </form>
    </Form>
  )
}