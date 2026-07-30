import z from "zod";
import { CONSTANTS } from "../../config/constants.js";
import { imageSchema, objectIdSchema } from "./common.schema.js";

export default class TenantSchema {
  static create = z.object({
    body: z.object({
      firstName: z.string().trim().min(1, "First name is required"),
      lastName: z.string().trim().min(1, "Last name is required"),
      email: z.string().email("Invalid email address").trim(),
      countryCode: z.number().positive().optional(),
      mobileNumber: z.number().positive().optional(),
      avatar: imageSchema.optional(),
      status: z.enum(CONSTANTS.TENANT_STATUS).default("Applicant"),
      
      currentResidence: z.object({
        property: objectIdSchema.optional(),
        unit: objectIdSchema.optional(),
        activeLease: objectIdSchema.optional(),
        moveInDate: z.coerce.date().optional(),
      }).optional(),

      communicationPreferences: z.object({
        preferredChannel: z.enum(CONSTANTS.TENANT_COMMUNICATION_CHANNELS).default("Email"),
        allowSmsNotifications: z.boolean().default(true),
        allowEmailNotifications: z.boolean().default(true),
      }).default({
        preferredChannel: "Email",
        allowSmsNotifications: true,
        allowEmailNotifications: true,
      }),
    }),
  });

  static update = z.object({
    params: z.object({
      tenantId: objectIdSchema,
    }).optional(),
    body: z.object({
      firstName: z.string().trim().min(1).optional(),
      lastName: z.string().trim().min(1).optional(),
      email: z.string().email().trim().optional(),
      countryCode: z.number().positive().optional(),
      mobileNumber: z.number().positive().optional(),
      avatar: imageSchema.optional(),
      status: z.enum(CONSTANTS.TENANT_STATUS).optional(),
      
      currentResidence: z.object({
        property: objectIdSchema.optional(),
        unit: objectIdSchema.optional(),
        activeLease: objectIdSchema.optional(),
        moveInDate: z.coerce.date().optional(),
      }).partial().optional(),

      communicationPreferences: z.object({
        preferredChannel: z.enum(CONSTANTS.TENANT_COMMUNICATION_CHANNELS).optional(),
        allowSmsNotifications: z.boolean().optional(),
        allowEmailNotifications: z.boolean().optional(),
      }).partial().optional(),
    }),
  });
}

export type CreateTenantInput = z.infer<typeof TenantSchema.create>;
export type UpdateTenantInput = z.infer<typeof TenantSchema.update>;
