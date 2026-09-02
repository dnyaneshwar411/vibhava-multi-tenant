import { z } from "zod";
import { CONSTANTS } from "../../config/constants.js";
import { objectIdSchema } from "./common.schema.js";

const imageZodSchema = z.object({
  private: z.boolean().default(false),
  key: z.string().optional(),
});

const baseRegistrationSchema = z.object({
  organization: objectIdSchema,
  email: z.string().email("Invalid email address").trim(),
  password: z.string().min(8, "Password must be at least 8 characters long").trim(),
  countryCode: z.coerce.number().positive().optional(),
  mobileNumber: z.coerce.number().positive().optional(),
  avatar: imageZodSchema.optional(),
});

const createTenantSchema = baseRegistrationSchema.extend({
  type: z.literal("Tenant"),
  name: z.string().min(1, "Name is required").trim(),
  status: z
    .enum(CONSTANTS.TENANT_STATUS)
    .default("Applicant"),

  currentResidence: z
    .object({
      property: objectIdSchema.optional(),
      unit: objectIdSchema.optional(),
      activeLease: objectIdSchema.optional(),
      moveInDate: z.coerce.date().optional(),
    })
    .optional(),

  communicationPreferences: z
    .object({
      preferredChannel: z
        .enum(CONSTANTS.TENANT_COMMUNICATION_CHANNELS)
        .default("Email"),
      allowSmsNotifications: z.boolean().default(true),
      allowEmailNotifications: z.boolean().default(true),
    })
  // .default({}),
});

const createStandardUserSchema = baseRegistrationSchema.extend({
  type: z.literal("User"),
  name: z.string().min(1, "Name is required").trim(),
  status: z
    .enum(CONSTANTS.USER_STATUS)
    .optional(),
});

const createVendorSchema = baseRegistrationSchema.extend({
  type: z.literal("Vendor"),
  name: z.string().min(1, "Vendor name is required").trim(),
  status: z
    .enum(CONSTANTS.VENDOR_STATUS)
    .default("Active"),
  tradeCategory: z.enum(
    CONSTANTS.VENDOR_TRADE_CATEGORIES,
    { message: "Trade category is required" }
  ),

  address: z
    .object({
      street1: z.string().trim().optional(),
      street2: z.string().trim().optional(),
      city: z.string().trim().optional(),
      state: z.string().trim().optional(),
      zipCode: z.string().trim().optional(),
      country: z.enum(CONSTANTS.AVAILABLE_COUNTRIES),
    })
    .optional(),

  createdBy: objectIdSchema.optional(),
});

const updateTenantSchema = createTenantSchema.partial().extend({
  type: z.literal("Tenant"),
});

const updateStandardUserSchema = createStandardUserSchema.partial().extend({
  type: z.literal("User"),
});

const updateVendorSchema = createVendorSchema.partial().extend({
  type: z.literal("Vendor"),
});

export default class AuthSchema {
  static login = z.object({
    body: z.object({
      user: z.enum(CONSTANTS.POSSIBLE_USERS).default("User"),
      username: z.string().min(4, "Password must be at least 4 characters."),
      password: z.string().min(6, "Password must be at least 6 characters.")
    })
  })

  static update = z.object({
    body: z.discriminatedUnion("type", [
      updateTenantSchema,
      updateStandardUserSchema,
      updateVendorSchema,
    ])
  })
}

export type UpdateAuthInput = z.infer<typeof AuthSchema.update>;
export type LoginAuthInput = z.infer<typeof AuthSchema.login>;