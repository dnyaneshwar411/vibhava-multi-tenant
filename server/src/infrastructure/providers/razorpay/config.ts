import RazorpayClient from "razorpay";
import { env } from "../../../config/envVars.js";

export const RazorpayConfig = new RazorpayClient({
  key_id: env.COMPANY_DEFAULT_RAZORPAY_KEY_ID,
  key_secret: env.COMPANY_DEFAULT_RAZORPAY_KEY_SECRET,
});
