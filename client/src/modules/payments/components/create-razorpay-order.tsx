import { initializeRazorpay } from "../helpers/razorpay"
import { toast } from "sonner";
import { buildToastMessage } from "@/lib/catchAsync";
import { ENV } from "@/config/envVars";

import { Button } from "@/components/ui/button";
import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

export default function CreateRazorpayOrder({
  options,
  credentials,
  onSuccess,
  triggerOnLoad = false
}: {
  options: any
  credentials?: any
  triggerOnLoad?: boolean
  onSuccess?: any
}) {
  const createRazorpayOrder = async function () {
    try {
      const res = await initializeRazorpay();
      if (!res) {
        throw new Error("Razorpay SDK Failed to load");
      }

      const config = {
        key: credentials.razorpayKeyId || ENV.RAZORPAY_KEY,
        name: "Manu Arora Pvt Ltd",
        currency: options.currency,
        amount: options.amount,
        order_id: options.id,
        description: "Thankyou for your test donation",
        image: "https://manuarora.in/logo.png",
        handler: function () {
          if (typeof onSuccess === "function") onSuccess()
        },
        ...(options.prefill && { prefill: options.prefill }),
      };

      const paymentObject = new window.Razorpay(config);
      paymentObject.open();

    } catch (error) {
      toast.error(buildToastMessage(error));
    }
  }
  const btn = useRef<HTMLButtonElement | null>(null)

  useEffect(function () {
    if (options.id && triggerOnLoad && btn.current) {
      btn.current.click()
    }
  }, [triggerOnLoad, options])

  if (!options?.id) {
    return (
      <></>
    )
  }

  return (
    <Button
      ref={btn}
      type="button"
      className={cn("rounded-none shadow-none min-w-[140px]", triggerOnLoad && "hidden")}
      onClick={createRazorpayOrder}
    >
      Pay Now
    </Button>
  )
}