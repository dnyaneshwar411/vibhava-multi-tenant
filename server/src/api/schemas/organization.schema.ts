import z from "zod";
import { CONSTANTS } from "../../config/constants.js";
import { objectIdSchema } from "./common.schema.js";

export default class OrganizationSchema {
  static hexColorSchema = z
    .string()
    .regex(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/, {
      message: "Invalid hex color code format (e.g. #1E3A8A)",
    });

  static update = z.object({
    body: z.object({
      name: z
        .string()
        .trim()
        .min(2, { message: "Organization name must be at least 2 characters" })
        .max(100, { message: "Organization name cannot exceed 100 characters" })
        .optional(),

      owner: objectIdSchema.optional(),

      meta: z
        .object({
          title: z
            .string()
            .trim()
            .max(70, { message: "Meta title should not exceed 70 characters" })
            .optional(),
          description: z
            .string()
            .trim()
            .max(160, { message: "Meta description should not exceed 160 characters" })
            .optional(),
          keywords: z.array(z.string().trim()).optional(),
        })
        .optional(),

      branding: z
        .object({
          logoUrl: z
            .string()
            .url({ message: "Invalid logo URL format" })
            .nullable()
            .optional(),
          primaryColor: this.hexColorSchema.optional(),
          secondaryColor: this.hexColorSchema.optional(),
        })
        .optional(),

      subscription: objectIdSchema.optional(),

      status: z.enum(CONSTANTS.ORGANIZATION_STATUS).optional(),
    }),
  });
}

export type UpdateOrganizationInput = z.infer<typeof OrganizationSchema.update>;