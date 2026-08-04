import StripeClient from "stripe"
import { env } from "../../../config/envVars.js";

export const StripeConfig = new StripeClient(env.COMPANY_DEFAULT_STRIPE_KEY);