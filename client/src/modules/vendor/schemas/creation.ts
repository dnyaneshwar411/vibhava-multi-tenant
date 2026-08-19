import z from "zod";
import { AVAILABLE_COUNTRIES, VENDOR_STATUS, VENDOR_TRADE_CATEGORIES } from "../config";

export const vendorBasicInformationSchema = z.object({
  name: z.string().trim().min(1, "Vendor name is required"),
  email: z.string().email("Invalid email address").trim(),
  countryCode: z.string(),
  mobileNumber: z.string(),
  status: z.enum(VENDOR_STATUS),
  tradeCategory: z.enum(VENDOR_TRADE_CATEGORIES),
});

export const vendorPasswordSchema = z.object({
  password: z.string().optional(),
})

export const vendorAddressSchema = z.object({
  address: z.object({
    street1: z.string(),
    street2: z.string(),
    city: z.string(),
    state: z.string(),
    zipCode: z.string(),
    country: z.enum(AVAILABLE_COUNTRIES),
  })
});

export const vendorCreationSchema = vendorBasicInformationSchema
  .merge(vendorAddressSchema)
  .merge(vendorPasswordSchema)

export type VendorCreationInput = z.infer<typeof vendorCreationSchema>;
export type VendorAccountInput = z.infer<typeof vendorBasicInformationSchema>;
export type VendorAddressInput = z.infer<typeof vendorAddressSchema>;