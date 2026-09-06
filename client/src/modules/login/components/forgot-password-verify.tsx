import { AlertDialogCancel } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { buildToastMessage } from "@/lib/catchAsync";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, UseFormReturn } from "react-hook-form";
import { toast } from "sonner";
import { PasswordVerifyInput, passwordVerifySchema, PasswordUpdateInput } from "../schemas/forgot-password";
import api from "@/network/client";
import { useRef } from "react";

export default function ForgotPasswordVerify({
  form: parentForm,
  onBack,
  onSuccess
}: {
  form: UseFormReturn<PasswordUpdateInput>;
  onBack: () => void;
  onSuccess: () => void;
}) {
  const cancelRef = useRef<HTMLButtonElement | null>(null)

  const form = useForm<PasswordVerifyInput>({
    resolver: zodResolver(passwordVerifySchema),
    defaultValues: {
      otp: parentForm.getValues("otp") || ("" as unknown as number),
      password: parentForm.getValues("password") || ""
    }
  });

  const onVerifyAndUpdate = async (values: PasswordVerifyInput) => {
    try {
      parentForm.setValue("otp", values.otp);
      parentForm.setValue("password", values.password);
      const payload = parentForm.getValues();

      const response = await api.post("/api/v1/auth/password/verify", {
        body: payload
      });

      if (response.code !== 200) throw new Error(response.message)

      toast.success("Password updated successfully!");

      onSuccess();
      if (cancelRef.current) cancelRef.current.click()
    } catch (error) {
      toast.error(buildToastMessage(error));
    }
  };

  return (
    <Form {...form}>
      <div className="space-y-4">
        <FormField
          control={form.control}
          name="otp"
          render={({ field }) => (
            <FormItem>
              <FormLabel>4-Digit OTP</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="1234"
                  {...field}
                  onChange={(e) => field.onChange(e.target.valueAsNumber || "")}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>New Password</FormLabel>
              <FormControl>
                <Input type="password" placeholder="••••••••" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-between items-center pt-2">
          <Button type="button" variant="ghost" onClick={onBack}>
            Back
          </Button>

          <div className="flex gap-2">
            <AlertDialogCancel ref={cancelRef}>Cancel</AlertDialogCancel>
            <Button type="submit" disabled={form.formState.isSubmitting} onClick={form.handleSubmit(onVerifyAndUpdate)}>
              {form.formState.isSubmitting ? "Updating..." : "Update Password"}
            </Button>
          </div>
        </div>
      </div>
    </Form>
  );
}