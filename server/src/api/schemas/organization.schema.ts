import z from "zod";
import { imageSchema } from "./common.schema.js";
import { CONSTANTS } from "../../config/constants.js";

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
          ogImage: z.string().trim().optional(),
          ogTitle: z.string().trim().optional(),
          ogDescription: z.string().trim().optional(),
          twitterCardType: z.enum(["summary", "summary_large_image"]).optional(),
          twitterHandle: z.string().trim().optional(),
          canonicalUrl: z.string().trim().optional(),
          noIndex: z.boolean().optional(),
        })
        .optional(),

      branding: z
        .object({
          logo: imageSchema.optional(),
          darkLogo: imageSchema.optional(),
          favicon: imageSchema.optional(),
          banner: imageSchema.optional(),
          colors: z
            .object({
              primary: OrganizationSchema.hexColorSchema.optional(),
              secondary: OrganizationSchema.hexColorSchema.optional(),
              accent: OrganizationSchema.hexColorSchema.optional(),
              background: OrganizationSchema.hexColorSchema.optional(),
              darkBackground: OrganizationSchema.hexColorSchema.optional(),
            })
            .optional(),
          emailFooterText: z.string().trim().optional(),
          supportEmail: z.string().email({ message: "Invalid support email format" }).optional(),
          supportPhone: z.string().trim().optional(),
        })
        .optional(),
    }),
  });

  static updateCompanyPages = z.object({
    body: z.object({
      pages: z.array(
        z.object({
          page: z.enum(CONSTANTS.ORGANIZATION_COMPANY_PAGE, { message: `Page should be either of - ${CONSTANTS.ORGANIZATION_COMPANY_PAGE.join(", ")}` }),
          html: z.string({ message: "HTML is mandatory" })
        })
      )
    })
  })
}

export type UpdateOrganizationInput = z.infer<typeof OrganizationSchema.update>;
export type UpdateOrganizationPagesInput = z.infer<typeof OrganizationSchema.updateCompanyPages>