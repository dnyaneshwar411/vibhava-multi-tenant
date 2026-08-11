import { z } from "zod";
import { PROPERTY_TYPES, PROPERTY_STATUSES, COUNTRIES, CURRENCIES, AMENITIES } from "../configs/index";

export const updatePropertyFormSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Property name is required")
    .max(150, "Property name cannot exceed 150 characters"),
  propertyType: z.enum(PROPERTY_TYPES),
  status: z.enum(PROPERTY_STATUSES),
  address: z
    .object({
      street1: z.string().trim().min(1, "Street address is required"),
      street2: z.string(),
      city: z.string().trim().min(1, "City is required"),
      state: z.string().trim().min(1, "State is required"),
      zipCode: z.string().trim().min(1, "Zip code is required"),
      country: z.enum(COUNTRIES),
      location: z
        .object({
          type: z.literal("Point"),
          coordinates: z
            .array(z.string())
            .length(2, "Coordinates must contain exactly [longitude, latitude]"),
        }),
    }),
  amenities: z.array(z.enum(AMENITIES)),
  media: z
    .object({
      primaryImage: z.any(),
      coverImage: z.any(),
      gallery: z.array(z.any()),
    }),
  finance: z
    .object({
      currency: z.enum(CURRENCIES),
      defaultLateFeeAmount: z.string(),
      defaultGracePeriodDays: z.string(),
    }),
});

export type UpdatePropertyFormValues = z.infer<typeof updatePropertyFormSchema>;
