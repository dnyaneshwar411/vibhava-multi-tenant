import { buildToastMessage } from "@/lib/catchAsync";
import { useState } from "react";
import { toast } from "sonner";
import { ConfirmationAlert } from "./confirmation-alert";

export default function LogoutSession({ open, setOpen }: { open: boolean, setOpen: (val: boolean) => void }) {
  const [processing, setProcessing] = useState(false);
  async function logout() {
    try {
      if (processing) return;
      setProcessing(true)
      const response = await fetch("/api/logout/organization", {
        method: "POST"
      });
      const data = await response.json();
      if (data.code !== 200) throw new Error(data.message);
      toast.success(data.message || "Successfully Logged Out!");
      window.location.replace("/login");
    } catch (error) {
      toast.error(buildToastMessage(error));
    }
    setProcessing(false);
    setOpen(false);
  }
  return (
    <ConfirmationAlert
      title="Log Out"
      description="Are you sure you want to log out? You will need to sign back in to access your account."
      confirmText={processing ? "Logging out..." : "Log Out"}
      isOpen={open}
      onOpenChange={setOpen}
      onConfirm={logout}
    />
  )
}