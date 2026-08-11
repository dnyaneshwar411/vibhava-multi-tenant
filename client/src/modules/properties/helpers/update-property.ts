import { z } from "zod";
import { PROPERTY_TYPES, PROPERTY_STATUSES, COUNTRIES, CURRENCIES, AMENITIES } from "../configs/index";

export const updatePropertyFormSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Property name is required")
    .max(150, "Property name cannot exceed 150 characters")
    .optional(),
  propertyType: z.enum(PROPERTY_TYPES).optional(),
  status: z.enum(PROPERTY_STATUSES).optional(),
  address: z
    .object({
      street1: z.string().trim().min(1, "Street address is required").optional(),
      street2: z.string().trim().nullable().optional(),
      city: z.string().trim().min(1, "City is required").optional(),
      state: z.string().trim().min(1, "State is required").optional(),
      zipCode: z.string().trim().min(1, "Zip code is required").optional(),
      country: z.enum(COUNTRIES).optional(),
      location: z
        .object({
          type: z.literal("Point"),
          coordinates: z
            .array(z.number())
            .length(2, "Coordinates must contain exactly [longitude, latitude]")
            .nullable(),
        })
        .optional(),
    })
    .optional(),
  amenities: z.array(z.enum(AMENITIES)).optional(),
  media: z
    .object({
      primaryImage: z.any().optional(),
      coverImage: z.any().optional(),
      gallery: z.array(z.any()).optional(),
    })
    .optional(),
  finance: z
    .object({
      currency: z.enum(CURRENCIES).optional(),
      defaultLateFeeAmount: z.coerce.number().min(0, "Late fee cannot be negative").optional(),
      defaultGracePeriodDays: z.coerce.number().int().min(0, "Grace period cannot be negative").optional(),
    })
    .optional(),
});

export type UpdatePropertyFormValues = z.infer<typeof updatePropertyFormSchema>;
