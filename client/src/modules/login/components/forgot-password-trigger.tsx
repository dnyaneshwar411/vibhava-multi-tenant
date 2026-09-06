import { AlertDialogCancel } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { buildToastMessage } from "@/lib/catchAsync";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, UseFormReturn } from "react-hook-form";
import { toast } from "sonner";
import { passwordResetSchema, PasswordUpdateInput } from "../schemas/forgot-password";
import api from "@/network/client";

export default function ForgotPasswordTrigger({
  form: defaultForm,
  otpSent,
  nextStep,
  onSuccess
}: {
  form: UseFormReturn<PasswordUpdateInput>;
  otpSent: boolean;
  nextStep: () => void,
  onSuccess: (val: boolean) => void;
}) {
  const form = useForm({
    resolver: zodResolver(passwordResetSchema),
    defaultValues: {
      user: defaultForm.getValues("user") || "User",
      username: defaultForm.getValues("username") || ""
    }
  });

  const handleProcess = async (isResend: boolean = false) => {
    if (otpSent && !isResend) {
      nextStep()
      return;
    }

    const values = form.getValues();
    try {
      const response = await api.post("/api/v1/auth/password/reset", {
        body: values
      });

      if (response.code !== 200) throw new Error(response.message)
      
      toast.success(
        isResend
          ? `OTP resent successfully to ${values.username}`
          : `OTP sent successfully to ${values.username}`
      );

      onSuccess(true);
      nextStep()
    } catch (error) {
      toast.error(buildToastMessage(error));
    }
  };

  const currentEmail = form.watch("username");

  return (
    <Form {...form}>
      <div className="space-y-4">
        <p className="text-sm text-muted-foreground">
          {otpSent ? (
            <>
              An OTP has already been sent to{" "}
              <span className="font-semibold">{currentEmail || "N/A"}</span>.
              Would you like to proceed or resend the code?
            </>
          ) : (
            <>
              We will send a 4-digit verification code to{" "}
              <span className="font-semibold">{currentEmail || "N/A"}</span>.
              Would you like to proceed?
            </>
          )}
        </p>

        <div className="flex justify-end gap-2 pt-2">
          <AlertDialogCancel>Cancel</AlertDialogCancel>

          {otpSent && (
            <Button
              type="button"
              variant="outline"
              disabled={form.formState.isSubmitting}
              onClick={() => handleProcess(true)}
            >
              Resend OTP
            </Button>
          )}

          <Button
            type="button"
            disabled={form.formState.isSubmitting}
            onClick={() => handleProcess(false)}
          >
            {form.formState.isSubmitting
              ? "Processing..."
              : otpSent
              ? "Next"
              : "Send OTP"}
          </Button>
        </div>
      </div>
    </Form>
  );
}