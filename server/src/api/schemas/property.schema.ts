import z from "zod";
import { imageSchema, objectIdSchema } from "./common.schema.js";
import { CONSTANTS } from "../../config/constants.js";

export default class PropertySchema {
  static galleryImageSchema = imageSchema.extend({
    caption: z
      .string()
      .trim()
      .max(200, "Caption cannot exceed 200 characters")
      .optional(),
    altText: z
      .string()
      .trim()
      .max(200, "Alt text cannot exceed 200 characters")
      .optional(),
    sortOrder: z.number().int().default(0),
    uploadedAt: z.coerce.date().default(() => new Date()),
  })

  static create = z.object({
    body: z.object({
      name: z
        .string({ message: "Property name is required" })
        .trim()
        .min(1, "Property name cannot be empty")
        .max(150, "Property name cannot exceed 150 characters"),
      propertyType: z
        .enum(CONSTANTS.PROPERTY_TYPE)
        .default("Multi-Family"),
      status: z
        .enum(CONSTANTS.PROPERTY_STATUS)
        .default("Active"),
      address: z.object({
        street1: z
          .string({ message: "Street address is required" })
          .trim()
          .min(1, "Street address cannot be empty"),
        street2: z.string().trim().nullable(),
        city: z
          .string({ message: "City is required" })
          .trim()
          .min(1, "City cannot be empty"),
        state: z
          .string({ message: "State is required" })
          .trim()
          .min(1, "State cannot be empty"),
        zipCode: z
          .string({ message: "Zip code is required" })
          .trim()
          .min(1, "Zip code cannot be empty"),
        country: z
          .enum(CONSTANTS.AVAILABLE_COUNTRIES)
          .default("India"),
        location: z.object({
          type: z.literal("Point").default("Point"),
          coordinates: z
            .array(z.number())
            .length(2, "Coordinates must contain exactly [longitude, latitude]")
            .nullable(),
        }),
      }),
      amenities: z
        .array(z.enum(CONSTANTS.PROPERTY_AMENITIES))
        .optional()
        .default([]),
      media: z.object({
        primaryImage: imageSchema,
        coverImage: imageSchema,
        gallery: z.array(this.galleryImageSchema).default([]),
      }),
      finance: z.object({
        currency: z
          .enum(CONSTANTS.AVAILABLE_CURRENCY)
          .nullable(),
        defaultLateFeeAmount: z
          .coerce
          .number({ message: "Default late fee amount is required" })
          .min(0, "Late fee cannot be negative")
          .default(0),
        defaultGracePeriodDays: z
          .coerce
          .number()
          .int()
          .min(0, "Grace period days cannot be negative")
          .default(15),
      }),
    }),
  })

  static update = z.object({
    params: z.object({
      propertyId: objectIdSchema,
    }).optional(),
    body: z.object({
      name: z
        .string()
        .trim()
        .min(1, "Property name cannot be empty")
        .max(150, "Property name cannot exceed 150 characters")
        .optional(),
      propertyType: z
        .enum(CONSTANTS.PROPERTY_TYPE)
        .optional(),
      status: z
        .enum(CONSTANTS.PROPERTY_STATUS)
        .optional(),
      address: z
        .object({
          street1: z.string().trim().min(1, "Street address cannot be empty").optional(),
          street2: z.string().trim().nullable().optional(),
          city: z.string().trim().min(1, "City cannot be empty").optional(),
          state: z.string().trim().min(1, "State cannot be empty").optional(),
          zipCode: z.string().trim().min(1, "Zip code cannot be empty").optional(),
          country: z.enum(CONSTANTS.AVAILABLE_COUNTRIES).optional(),
          location: z
            .object({
              type: z.literal("Point").default("Point"),
              coordinates: z
                .array(z.number())
                .length(2, "Coordinates must contain exactly [longitude, latitude]")
                .nullable(),
            })
            .optional(),
        })
        .optional(),
      amenities: z
        .array(z.enum(CONSTANTS.PROPERTY_AMENITIES))
        .optional(),
      media: z
        .object({
          primaryImage: imageSchema.optional(),
          coverImage: imageSchema.optional(),
          gallery: z.array(this.galleryImageSchema).optional(),
        })
        .optional(),
      finance: z
        .object({
          currency: z.enum(CONSTANTS.AVAILABLE_CURRENCY).nullable().optional(),
          defaultLateFeeAmount: z
            .number()
            .min(0, "Late fee cannot be negative")
            .optional(),
          defaultGracePeriodDays: z
            .number()
            .int()
            .min(0, "Grace period days cannot be negative")
            .optional(),
        })
        .optional(),
      manager: objectIdSchema.optional(),
    }),
  });
}

export type CreatePropertySchema = z.infer<typeof PropertySchema.create>
export type UpdatePropertySchema = z.infer<typeof PropertySchema.update>