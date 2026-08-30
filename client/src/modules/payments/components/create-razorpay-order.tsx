import { initializeRazorpay } from "../helpers/razorpay"
import { toast } from "sonner";
import { buildToastMessage } from "@/lib/catchAsync";
import { ENV } from "@/config/envVars";

export default function CreateRazorpayOrder({
  options
}: {
  options: any
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
        handler: function (response: any) {
          // Validate payment at server - using webhooks is a better idea.
          console.log(response)
          // alert(response.razorpay_payment_id);
          // alert(response.razorpay_order_id);
          // alert(response.razorpay_signature);
        },
        prefill: {
          name: "Manu Arora",
          email: "manuarorawork@gmail.com",
          contact: "9999999999",
        },
      };

      console.log("CONFIG", config, options)
      const paymentObject = new window.Razorpay(config);
      paymentObject.open();

    } catch (error) {
      console.error(error);
      toast.error(buildToastMessage(error));
    }
  }

  if (!options.id) {
    return (
      <></>
    )
  }

  return (
    <button onClick={createRazorpayOrder}>
      Pay Now
    </button>
  )
}