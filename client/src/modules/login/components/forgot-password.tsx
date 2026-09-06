import { AlertDialog, AlertDialogCancel, AlertDialogContent, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { useState } from "react";
import { useForm, UseFormReturn } from "react-hook-form";
import { PasswordUpdateInput, passwordUpdateSchema } from "../schemas/forgot-password";
import { zodResolver } from "@hookform/resolvers/zod";
import ForgotPasswordTrigger from "./forgot-password-trigger";
import { POSSIBLE_USERS } from "../config";
import ForgotPasswordVerify from "./forgot-password-verify";

export default function ForgotPassword({ defaultValues }: {
  defaultValues: {
    user: string,
    username: string
  }
}) {
  return <AlertDialog>
    <AlertDialogTrigger className="ml-auto">Forgot Password?</AlertDialogTrigger>
    <AlertDialogContent>
      <FormContainer defaultValues={defaultValues} />
    </AlertDialogContent>
  </AlertDialog>
}

function FormContainer({ defaultValues }: {
  defaultValues: {
    user: typeof POSSIBLE_USERS[number],
    username: string,
  }
}) {
  const form = useForm({
    resolver: zodResolver(passwordUpdateSchema),
    defaultValues: {
      user: defaultValues.user as any,
      username: defaultValues.username as any,
      password: "",
      otp: 0
    }
  })

  return <div>
    <RenderStep form={form as any} />
  </div>
}

function RenderStep({
  form
}: { form: UseFormReturn<PasswordUpdateInput> }) {
  const [step, setStep] = useState(0);
  const [otpSent, setOtpSent] = useState(false)

  switch (step) {
    case 1:
      return <ForgotPasswordVerify
        onSuccess={() => {
          form.reset()
        }}
        onBack={() => setStep(0)}
        form={form}
      />
    default:
      return <ForgotPasswordTrigger
        onSuccess={(val: boolean) => setOtpSent(val)}
        otpSent={otpSent}
        nextStep={() => setStep(1)}
        form={form}
      />
  }
}

// Step1 just the UI to return ask the actor, if we should proceed with sending the otp to the email?
// onsuccessfull set the step to 2 (make a dummy function that udpate the setStep.)
// Step2 render the otp and password screen with form and use the passwordVerifySchema as the schema