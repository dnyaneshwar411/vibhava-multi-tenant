import { initializeRazorpay } from "../helpers/razorpay"
import { toast } from "sonner";
import { buildToastMessage } from "@/lib/catchAsync";
import { ENV } from "@/config/envVars";

import { Button } from "@/components/ui/button";

export default function CreateRazorpayOrder({
  options,
  onSuccess
}: {
  options: any
  onSuccess?: any
}) {
  const createRazorpayOrder = async function () {
    try {
      const res = await initializeRazorpay();
      if (!res) {
        throw new Error("Razorpay SDK Failed to load");
      }

      const config = {
        key: ENV.RAZORPAY_KEY, // Enter the Key ID generated from the Dashboard
        name: "Manu Arora Pvt Ltd",
        currency: options.currency,
        amount: options.amount,
        order_id: options.id,
        description: "Thankyou for your test donation",
        image: "https://manuarora.in/logo.png",
        handler: function () {
          if (typeof onSuccess === "function") onSuccess()
        },
        prefill: {
          name: "Manu Arora",
          email: "manuarorawork@gmail.com",
          contact: "9999999999",
        },
      };

      const paymentObject = new window.Razorpay(config);
      paymentObject.open();

    } catch (error) {
      toast.error(buildToastMessage(error));
    }
  }

  if (!options?.id) {
    return (
      <></>
    )
  }

  return (
    <Button type="button" className="rounded-none shadow-none min-w-[140px]" onClick={createRazorpayOrder}>
      Pay Now
    </Button>
  )
}