"use client"

import { useMemo, useState } from "react"
import { useForm, UseFormReturn } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { ArrowRight, Key, ShieldAlert, Eye, EyeOff } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {
  PaymentGatewayInput,
  razorpayCredentialsSchema,
  stripeCredentialsSchema,
} from "../schemas/creation"

export default function PaymentGatewayCreationCredentials({
  form: defaultForm,
  nextStep,
  previousStep,
}: {
  form: UseFormReturn<PaymentGatewayInput>
  nextStep: () => Promise<void>
  previousStep?: () => void
}) {
  const defaultValues = useMemo(() => defaultForm.getValues(), [defaultForm])

  if (defaultValues.type === "RAZORPAY") {
    return (
      <RazorpayCredentials
        form={defaultForm}
        nextStep={nextStep}
        previousStep={previousStep}
      />
    )
  }

  return (
    <StripeCredentials
      form={defaultForm}
      nextStep={nextStep}
      previousStep={previousStep}
    />
  )
}

function RazorpayCredentials({
  form: defaultForm,
  nextStep,
  previousStep,
}: {
  form: UseFormReturn<PaymentGatewayInput>
  nextStep: () => void
  previousStep?: () => void
}) {
  const defaultValues = useMemo(() => defaultForm.getValues(), [defaultForm])

  const [showKeySecret, setShowKeySecret] = useState(false)
  const [showSignature, setShowSignature] = useState(false)

  const form = useForm<z.infer<typeof razorpayCredentialsSchema>>({
    resolver: zodResolver(razorpayCredentialsSchema),
    defaultValues: {
      razorpayKeyId: (defaultValues.credentials as any)?.razorpayKeyId || "",
      razorpayKeySecret: (defaultValues.credentials as any)?.razorpayKeySecret || "",
      razorpaySignature: (defaultValues.credentials as any)?.razorpaySignature || "",
    },
  })

  const onSubmit = (data: z.infer<typeof razorpayCredentialsSchema>) => {
    defaultForm.setValue("credentials", data, {
      shouldValidate: true,
      shouldDirty: true,
    })
    nextStep()
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Key className="h-5 w-5 text-primary" />
            <h3 className="text-lg font-bold tracking-tight">Razorpay Credentials</h3>
          </div>
          <p className="text-xs text-muted-foreground">
            Enter your API keys to securely authenticate transactions. These can be found in your Razorpay Dashboard under Settings.
          </p>
        </div>

        <div className="space-y-4 border p-6 bg-muted/10">
          <FormField
            control={form.control}
            name="razorpayKeyId"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Key ID
                </FormLabel>
                <FormControl>
                  <Input
                    autoComplete="off"
                    placeholder="rzp_live_..."
                    className="rounded-none shadow-none font-mono text-sm"
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-xs" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="razorpayKeySecret"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Key Secret
                </FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input
                      type={showKeySecret ? "text" : "password"}
                      autoComplete="off"
                      placeholder="••••••••••••••••"
                      className="rounded-none shadow-none font-mono text-sm pr-10"
                      {...field}
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="absolute right-0 top-0 h-full w-10 rounded-none hover:bg-transparent text-muted-foreground hover:text-foreground"
                      onClick={() => setShowKeySecret((prev) => !prev)}
                    >
                      {showKeySecret ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                </FormControl>
                <FormMessage className="text-xs" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="razorpaySignature"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Webhook Signature
                </FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input
                      type={showSignature ? "text" : "password"}
                      autoComplete="off"
                      placeholder="Enter webhook secret"
                      className="rounded-none shadow-none font-mono text-sm pr-10"
                      {...field}
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="absolute right-0 top-0 h-full w-10 rounded-none hover:bg-transparent text-muted-foreground hover:text-foreground"
                      onClick={() => setShowSignature((prev) => !prev)}
                    >
                      {showSignature ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                </FormControl>
                <FormDescription className="text-xs">
                  Used to verify that webhook events were sent by Razorpay.
                </FormDescription>
                <FormMessage className="text-xs" />
              </FormItem>
            )}
          />
        </div>

        <div className="flex items-center gap-2 text-xs text-muted-foreground bg-primary/5 p-3 border border-primary/20">
          <ShieldAlert className="h-4 w-4 text-primary" />
          <span>Keys are encrypted at rest. Never share your Key Secret publicly.</span>
        </div>

        <div className="flex items-center justify-end border-t pt-4 gap-2">
          {typeof previousStep === "function" && <Button
            type="button"
            variant="outline"
            className="rounded-none shadow-none min-w-[150px]"
            onClick={previousStep}
          >
            Back
          </Button>}
          <Button type="submit" className="rounded-none shadow-none min-w-[150px]">
            Continue
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </form>
    </Form>
  )
}

function StripeCredentials({
  form: defaultForm,
  nextStep,
  previousStep,
}: {
  form: UseFormReturn<PaymentGatewayInput>
  nextStep: () => void
  previousStep?: () => void
}) {
  const defaultValues = useMemo(() => defaultForm.getValues(), [defaultForm])

  const [showKeyId, setShowKeyId] = useState(false)
  const [showSignature, setShowSignature] = useState(false)

  const form = useForm<z.infer<typeof stripeCredentialsSchema>>({
    resolver: zodResolver(stripeCredentialsSchema),
    defaultValues: {
      stripeKeyId: (defaultValues.credentials as any)?.stripeKeyId || "",
      stripeSignature: (defaultValues.credentials as any)?.stripeSignature || "",
    },
  })

  const onSubmit = (data: z.infer<typeof stripeCredentialsSchema>) => {
    defaultForm.setValue("credentials", data, {
      shouldValidate: true,
      shouldDirty: true,
    })
    nextStep()
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Key className="h-5 w-5 text-primary" />
            <h3 className="text-lg font-bold tracking-tight">Stripe Credentials</h3>
          </div>
          <p className="text-xs text-muted-foreground">
            Enter your Stripe API keys. Find these in your Stripe Dashboard under Developers {'>'} API keys.
          </p>
        </div>

        <div className="space-y-4 border p-6 bg-muted/10">
          <FormField
            control={form.control}
            name="stripeKeyId"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Secret Key
                </FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input
                      type={showKeyId ? "text" : "password"}
                      autoComplete="off"
                      placeholder="sk_live_..."
                      className="rounded-none shadow-none font-mono text-sm pr-10"
                      {...field}
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="absolute right-0 top-0 h-full w-10 rounded-none hover:bg-transparent text-muted-foreground hover:text-foreground"
                      onClick={() => setShowKeyId((prev) => !prev)}
                    >
                      {showKeyId ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                </FormControl>
                <FormMessage className="text-xs" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="stripeSignature"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Webhook Signing Secret
                </FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input
                      type={showSignature ? "text" : "password"}
                      autoComplete="off"
                      placeholder="whsec_..."
                      className="rounded-none shadow-none font-mono text-sm pr-10"
                      {...field}
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="absolute right-0 top-0 h-full w-10 rounded-none hover:bg-transparent text-muted-foreground hover:text-foreground"
                      onClick={() => setShowSignature((prev) => !prev)}
                    >
                      {showSignature ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                </FormControl>
                <FormDescription className="text-xs">
                  Required to securely validate incoming Stripe webhooks.
                </FormDescription>
                <FormMessage className="text-xs" />
              </FormItem>
            )}
          />
        </div>

        <div className="flex items-center gap-2 text-xs text-muted-foreground bg-primary/5 p-3 border border-primary/20">
          <ShieldAlert className="h-4 w-4 text-primary" />
          <span>Keys are encrypted at rest. Never expose your Secret Key to the frontend.</span>
        </div>

        <div className="flex items-center justify-end border-t pt-4 gap-2">
          {typeof previousStep === "function" && <Button
            type="button"
            variant="outline"
            className="rounded-none shadow-none min-w-[150px]"
            onClick={previousStep}
          >
            Back
          </Button>}
          <Button type="submit" className="rounded-none shadow-none min-w-[150px]">
            Continue
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </form>
    </Form>
  )
}