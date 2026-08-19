"use client";

import { useMemo, useState } from "react";
import { useForm, UseFormReturn } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  VendorCreationInput,
  vendorPasswordSchema,
} from "../schemas/creation";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  ArrowLeft,
  ArrowRight,
  Eye,
  EyeOff,
  Lock,
  KeyRound,
} from "lucide-react";

export default function VendorCreationPassword({
  form: defaultForm,
  nextStep,
  previousStep,
}: {
  form: UseFormReturn<VendorCreationInput>;
  nextStep: () => void;
  previousStep: () => void;
}) {
  const [showPassword, setShowPassword] = useState(false);
  const defaultValues = useMemo(() => defaultForm.getValues(), [defaultForm]);

  const form = useForm({
    mode: "onChange",
    resolver: zodResolver(vendorPasswordSchema),
    defaultValues: {
      password: defaultValues.password || "",
    },
  });

  const onSubmit = (data: { password?: string }) => {
    if (data.password) {
      defaultForm.setValue("password", data.password);
    }
    nextStep();
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="space-y-4 max-w-md">
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem className="space-y-1.5">
                <FormLabel className="text-xs font-medium text-muted-foreground">
                  Account Password
                </FormLabel>
                <FormControl>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
                    <Input
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter a secure password"
                      {...field}
                      className="pl-9 pr-9 h-8 text-xs rounded-none border-muted focus-visible:ring-0 focus-visible:border-foreground"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword((prev) => !prev)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {showPassword ? (
                        <EyeOff className="h-3.5 w-3.5" />
                      ) : (
                        <Eye className="h-3.5 w-3.5" />
                      )}
                    </button>
                  </div>
                </FormControl>
                <FormMessage className="text-[11px]" />
              </FormItem>
            )}
          />

          <div className="p-3 border bg-muted/20 space-y-1 text-[11px] text-muted-foreground">
            <div className="flex items-center gap-1.5 font-medium text-foreground">
              <KeyRound className="h-3.5 w-3.5 text-muted-foreground" />
              <span>Password Requirements</span>
            </div>
            <ul className="list-disc list-inside space-y-0.5 pt-1 pl-1">
              <li>Minimum 8 characters in length</li>
              <li>Must contain at least one uppercase letter</li>
              <li>Must contain at least one number or special character</li>
            </ul>
          </div>
        </div>

        {/* Form Actions */}
        <div className="flex items-center justify-between pt-4 border-t">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={previousStep}
            className="rounded-none h-8 text-xs gap-1.5 px-3 border-muted"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            <span>Back</span>
          </Button>

          <Button
            type="submit"
            size="sm"
            className="rounded-none h-8 text-xs gap-1.5 px-4"
          >
            <span>Continue</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </Button>
        </div>
      </form>
    </Form>
  );
}