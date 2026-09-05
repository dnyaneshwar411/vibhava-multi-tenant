import StripeClient from "stripe"
import { env } from "../../../config/envVars.js";

export const StripeConfig = new StripeClient(env.COMPANY_DEFAULT_STRIPE_KEY);

export const ALL_STRIPE_PAYMENT_METHOD_TYPES = [
  // "upi", 
  "card",
  // "link",
  // "amazon_pay",
    // "klarna"
  // "card", "acss_debit",  "alipay", "au_becs_debit", "bacs_debit", "bancontact",
  // "blik", "boleto", "cashapp", "crypto", "customer_balance", "eps", "fpx", "giropay", "grabpay", "ideal", "klarna",
  // "konbini", "link", "mb_way", "multibanco", "oxxo", "p24", "pay_by_bank", "paynow", "paypal", "payto", "pix",
  // "promptpay", "sepa_debit", "sofort", "swish", "upi", "us_bank_account", "wechat_pay", "revolut_pay", "mobilepay", "zip",
  // "scalapay", "amazon_pay", "alma", "twint", "kr_card", "naver_pay", "kakao_pay", "payco", "nz_bank_account",
  // "samsung_pay", "billie", "bizum", "paypay", "satispay", "sunbit"
  // "affirm", "afterpay_clearpay",
] as const;