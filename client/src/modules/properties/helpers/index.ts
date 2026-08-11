import z from "zod";
import { PROPERTY_TYPES, PROPERTY_STATUSES, COUNTRIES, CURRENCIES, AMENITIES } from "../configs/index";

export const basicInfoFormSchema = z.object({
  name: z
    .string()
    // .trim()
    .min(1, "Property name is required")
    .max(150, "Property name cannot exceed 150 characters"),
  propertyType: z.enum(PROPERTY_TYPES),
  status: z.enum(PROPERTY_STATUSES),
})

export const addressFormSchema = z.object({
  address: z.object({
    street1: z.string().trim().min(1, "Street address is required"),
    street2: z.string().trim().nullable(),
    city: z.string().trim().min(1, "City is required"),
    state: z.string().trim().min(1, "State is required"),
    zipCode: z.string().trim().min(1, "Zip code is required"),
    country: z.enum(COUNTRIES),
    location: z.object({
      type: z.literal("Point"),
      coordinates: z
        .array(z.number())
        .length(2, "Coordinates must contain exactly [longitude, latitude]")
        .nullable(),
    }),
  }),
})

export const amenitiesFinanceFormSchema = z.object({
  amenities: z.array(z.enum(AMENITIES)),
  finance: z.object({
    currency: z.enum(CURRENCIES),
    defaultLateFeeAmount: z.string().min(0, "Late fee cannot be negative"),
    defaultGracePeriodDays: z.string().min(0, "Grace period cannot be negative"),
  }),
})

export const mediaFormSchema = z.object({
  media: z.object({
    primaryImage: z.instanceof(File, { message: "Primary image is required" }),
    coverImage: z.instanceof(File, { message: "Cover image is required" }),
    gallery: z.array(z.instanceof(File)).min(1, "At least one gallery image is required"),
  })
});

export const createPropertyFormSchema = basicInfoFormSchema
  .merge(addressFormSchema)
  .merge(amenitiesFinanceFormSchema)
  .merge(mediaFormSchema);

export type BasicInfoFormSchemaType = z.infer<typeof basicInfoFormSchema>
export type CreatePropertyFormValues = z.infer<typeof createPropertyFormSchema>;