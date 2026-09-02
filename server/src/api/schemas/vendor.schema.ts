import z from "zod";
import { CONSTANTS } from "../../config/constants.js";
import { imageSchema, objectIdSchema } from "./common.schema.js";

export default class VendorSchema {
  static create = z.object({
    body: z.object({
      name: z.string().trim().min(1, "Vendor name is required"),
      email: z.string().email("Invalid email address").trim(),
      password: z.string().min(8, "Password must be at least 8 characters"),
      countryCode: z.coerce.number().positive().optional(),
      mobileNumber: z.coerce.number().positive().optional(),
      avatar: imageSchema.optional(),
      status: z.enum(CONSTANTS.VENDOR_STATUS).default("Active"),
      tradeCategory: z.enum(CONSTANTS.VENDOR_TRADE_CATEGORIES, {
        message: "Trade category is required",
      }),
      
      address: z.object({
        street1: z.string().trim().optional(),
        street2: z.string().trim().optional(),
        city: z.string().trim().optional(),
        state: z.string().trim().optional(),
        zipCode: z.string().trim().optional(),
        country: z.enum(CONSTANTS.AVAILABLE_COUNTRIES).optional(),
      }).optional(),
      
      createdBy: objectIdSchema.optional(),
    }),
  });

  static update = z.object({
    params: z.object({
      vendorId: objectIdSchema,
    }).optional(),
    body: z.object({
      name: z.string().trim().min(1).optional(),
      email: z.string().email().trim().optional(),
      countryCode: z.coerce.number().positive().optional(),
      mobileNumber: z.coerce.number().positive().optional(),
      avatar: imageSchema.optional(),
      status: z.enum(CONSTANTS.VENDOR_STATUS).optional(),
      tradeCategory: z.enum(CONSTANTS.VENDOR_TRADE_CATEGORIES).optional(),
      
      address: z.object({
        street1: z.string().trim().optional(),
        street2: z.string().trim().optional(),
        city: z.string().trim().optional(),
        state: z.string().trim().optional(),
        zipCode: z.string().trim().optional(),
        country: z.enum(CONSTANTS.AVAILABLE_COUNTRIES).optional(),
      }).partial().optional(),
    }),
  });
  static manageScopes = z.object({
    params: z.object({
      vendorId: objectIdSchema,
    }),
    body: z.object({
      scopes: z.array(z.string()).min(1, "At least one scope is required"),
    }),
  });
}

export type CreateVendorInput = z.infer<typeof VendorSchema.create>;
export type UpdateVendorInput = z.infer<typeof VendorSchema.update>;
