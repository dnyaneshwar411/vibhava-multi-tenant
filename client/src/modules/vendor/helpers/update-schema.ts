import z from "zod";
import { AVAILABLE_COUNTRIES, VENDOR_STATUS, VENDOR_TRADE_CATEGORIES } from "../config";

export const updateVendorSchema = z.object({
  name: z.string().trim().min(1, "Vendor name is required"),
  email: z.string().email("Invalid email address").trim(),
  countryCode: z.string(),
  mobileNumber: z.string(),
  status: z.enum(VENDOR_STATUS),
  tradeCategory: z.enum(VENDOR_TRADE_CATEGORIES),
  street1: z.string(),
  street2: z.string(),
  city: z.string(),
  state: z.string(),
  zipCode: z.string(),
  country: z.enum(AVAILABLE_COUNTRIES),
});
