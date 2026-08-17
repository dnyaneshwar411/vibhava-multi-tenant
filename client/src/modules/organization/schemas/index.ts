import z from "zod";

export const organizationGeneralInformationSchema = z.object({
  name: z.string(),
  meta: z.object({
    title: z
      .string()
      .trim()
      .max(70, { message: "Meta title should not exceed 70 characters" }),
    description: z
      .string()
      .trim()
      .max(160, { message: "Meta description should not exceed 160 characters" }),
    keywords: z.array(z.string().trim()),
    ogImage: z.string().trim(),
    ogTitle: z.string().trim(),
    ogDescription: z.string().trim(),
    twitterCardType: z.enum(["summary", "summary_large_image"]),
    twitterHandle: z.string().trim(),
    canonicalUrl: z.string().trim(),
    noIndex: z.boolean(),
  })
})

export const organizationBrandingSchema = z.object({
  branding: z.object({
    logo: z.any(),
    darkLogo: z.any(),
    favicon: z.any(),
    banner: z.any(),
    colors: z
      .object({
        primary: z
          .string()
          .regex(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/, {
            message: "Invalid hex color code format (e.g. #1E3A8A)",
          }),
        secondary: z
          .string()
          .regex(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/, {
            message: "Invalid hex color code format (e.g. #1E3A8A)",
          }),
        accent: z
          .string()
          .regex(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/, {
            message: "Invalid hex color code format (e.g. #1E3A8A)",
          }),
        background: z
          .string()
          .regex(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/, {
            message: "Invalid hex color code format (e.g. #1E3A8A)",
          }),
        darkBackground: z
          .string()
          .regex(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/, {
            message: "Invalid hex color code format (e.g. #1E3A8A)",
          }),
      })
      .optional(),
    emailFooterText: z.string().trim().optional(),
    supportEmail: z.string().email({ message: "Invalid support email format" }).optional(),
    supportPhone: z.string().trim().optional(),
  })
})

export const organizationSchema = organizationGeneralInformationSchema
  .merge(organizationBrandingSchema)

export type OrganizationGeneralInformationInput = z.infer<typeof organizationGeneralInformationSchema>
export type OrganizationInput = z.infer<typeof organizationSchema>