import z from "zod";
import { CONSTANTS } from "../../config/constants.js";
import { imageSchema, objectIdSchema } from "./common.schema.js";

export default class UnitSchema {
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
  });

  static utilityMetersSchema = z.object({
    electricMeterNumber: z.string().trim(),
    waterMeterNumber: z.string().trim(),
    gasMeterNumber: z.string().trim(),
  });

  static keyCodesSchema = z.object({
    smartLockId: z.string().trim(),
    keypadCode: z.string().trim(),
    keyTagNumber: z.string().trim(),
  });

  static createSpecificationSchema = z.object({
    squareFeet: z
      .number()
      .min(0, "Square feet cannot be negative")
      .nullable(),
    bedrooms: z
      .number()
      .int()
      .min(0, "Bedrooms cannot be negative")
      .default(0),
    bathrooms: z
      .number()
      .min(0, "Bathrooms cannot be negative")
      .default(1),
    halfBathrooms: z
      .number()
      .min(0, "Half bathrooms cannot be negative")
      .default(0),
    balconies: z
      .number()
      .int()
      .min(0, "Balconies cannot be negative")
      .default(0),
    maxOccupancy: z
      .number()
      .int()
      .min(1, "Max occupancy must be at least 1")
      .nullable(),
    furnishingStatus: z
      .enum(CONSTANTS.UNIT_FURNISH_STATUS)
      .default("Unfurnished"),
    flooringType: z
      .enum(CONSTANTS.UNIT_FLOORING_TYPE)
      .nullable(),
    heatingType: z
      .enum(CONSTANTS.UNIT_HEATING_TYPE),
    coolingType: z
      .enum(CONSTANTS.UNIT_COOLING_TYPE),
    utilityMeters: this.utilityMetersSchema,
    isPetFriendly: z.boolean().default(false),
    petPolicyDetails: z.string().trim(),
    isAdaAccessible: z.boolean().default(false),
    isSmokingAllowed: z.boolean().default(false),
    keyCodes: this.keyCodesSchema,
  });

  static updateSpecificationSchema = z.object({
    squareFeet: z.number().min(0, "Square feet cannot be negative").optional(),
    bedrooms: z.number().int().min(0, "Bedrooms cannot be negative").optional(),
    bathrooms: z.number().min(0, "Bathrooms cannot be negative").optional(),
    halfBathrooms: z.number().min(0, "Half bathrooms cannot be negative").optional(),
    balconies: z.number().int().min(0, "Balconies cannot be negative").optional(),
    maxOccupancy: z.number().int().min(1, "Max occupancy must be at least 1").optional(),
    furnishingStatus: z.enum(CONSTANTS.UNIT_FURNISH_STATUS),
    flooringType: z.enum(CONSTANTS.UNIT_FLOORING_TYPE),
    heatingType: z.enum(CONSTANTS.UNIT_HEATING_TYPE),
    coolingType: z.enum(CONSTANTS.UNIT_COOLING_TYPE),
    utilityMeters: this.utilityMetersSchema.partial(),
    isPetFriendly: z.boolean().optional(),
    petPolicyDetails: z.string().trim().optional(),
    isAdaAccessible: z.boolean().optional(),
    isSmokingAllowed: z.boolean().optional(),
    keyCodes: this.keyCodesSchema.partial().optional(),
  });

  static createFinanceSchema = z.object({
    marketRent: z
      .number({ message: "Market rent is required" })
      .min(0, "Market rent cannot be negative"),
    currentRent: z
      .number()
      .min(0, "Current rent cannot be negative")
      .default(0),
    securityDeposit: z
      .number()
      .min(0, "Security deposit cannot be negative")
      .default(0),
    currency: z
      .enum(CONSTANTS.AVAILABLE_CURRENCY)
      .default("INR"),
  });

  static updateFinanceSchema = z.object({
    marketRent: z.number().min(0, "Market rent cannot be negative").optional(),
    currentRent: z.number().min(0, "Current rent cannot be negative").optional(),
    securityDeposit: z.number().min(0, "Security deposit cannot be negative").optional(),
    currency: z.enum(CONSTANTS.AVAILABLE_CURRENCY).optional(),
  });

  static createMediaSchema = z.object({
    primaryImage: imageSchema,
    coverImage: imageSchema.default({ private: false, key: "" }),
    gallery: z.array(this.galleryImageSchema).default([]),
  });

  static updateMediaSchema = z.object({
    primaryImage: imageSchema,
    coverImage: imageSchema.optional(),
    gallery: z.array(this.galleryImageSchema),
  });

  static create = z.object({
    params: z
      .object({
        propertyId: objectIdSchema,
      })
      .optional(),
    body: z.object({
      unitNumber: z
        .string({ message: "Unit number or name is required" })
        .trim()
        .min(1, "Unit number cannot be empty"),
      floor: z.number().int().default(1),
      specifications: this.createSpecificationSchema,
      finance: this.createFinanceSchema,
      unitType: z.enum(CONSTANTS.UNIT_TYPE).default("Other"),
      status: z.enum(CONSTANTS.UNIT_STATUS).default("Vacant"),
      occupant: objectIdSchema.optional(),
      media: this.createMediaSchema,
      amenities: z
        .array(z.enum(CONSTANTS.UNIT_AMENITIES))
        .optional()
        .default([]),
    }),
  });

  static update = z.object({
    params: z
      .object({
        unitId: objectIdSchema,
      })
      .optional(),
    body: z.object({
      // property: objectIdSchema.optional(),
      unitNumber: z.string().trim().min(1, "Unit number cannot be empty").optional(),
      floor: z.number().int().optional(),
      specifications: this.updateSpecificationSchema.optional(),
      finance: this.updateFinanceSchema.optional(),
      unitType: z.enum(CONSTANTS.UNIT_TYPE).optional(),
      status: z.enum(CONSTANTS.UNIT_STATUS).optional(),
      occupant: objectIdSchema.nullable().optional(),
      media: this.updateMediaSchema.optional(),
      amenities: z.array(z.enum(CONSTANTS.UNIT_AMENITIES)).optional(),
    }),
  });
}

export type CreateUnitInput = z.infer<typeof UnitSchema.create>;
export type UpdateUnitInput = z.infer<typeof UnitSchema.update>;