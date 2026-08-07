import z from "zod";
import { CONSTANTS } from "../../config/constants.js";
import { objectIdSchema, paginationSchema } from "./common.schema.js";

export default class DirectorySchema {
  static user = z.object({
    query: paginationSchema.extend({
      status: z.enum(CONSTANTS.USER_STATUS).default("Active"),
    })
  })

  static tenant = z.object({
    query: paginationSchema.extend({
      status: z.enum(CONSTANTS.TENANT_STATUS).default("Active"),
    })
  })

  static vendor = z.object({
    query: paginationSchema.extend({
      status: z.enum(CONSTANTS.VENDOR_STATUS).default("Active"),
      tradeCategory: z
        .string()
        .optional()
        .transform((val) =>
          val ? val.split(",").map((item) => item.trim()).filter(Boolean) : []
        )
        .refine((categories) =>
          categories.every((cat) =>
            (CONSTANTS.VENDOR_TRADE_CATEGORIES as readonly string[]).includes(cat)
          ),
          { message: `Invalid trade category provided. Allowed values are: ${CONSTANTS.VENDOR_TRADE_CATEGORIES.join(", ")}`, }
        ),
      searchByLocation: z
        .preprocess((val) => {
          if (typeof val === "string") {
            const normalized = val.trim().toLowerCase();
            if (normalized === "true") return true;
            if (normalized === "false") return false;
            return val;
          }
          return val;
        }, z.boolean().default(false)),
    })
  })

  static property = z.object({
    query: paginationSchema.extend({
      status: z.enum(CONSTANTS.PROPERTY_STATUS).default("Active"),
      amenities: z
        .string()
        .optional()
        .transform((val) =>
          val ? val.split(",").map((item) => item.trim()).filter(Boolean) : []
        )
        .refine((categories) =>
          categories.every((cat) =>
            (CONSTANTS.PROPERTY_AMENITIES as readonly string[]).includes(cat)
          ),
          { message: `Invalid Property Amenities provided. Allowed values are: ${CONSTANTS.PROPERTY_AMENITIES.join(", ")}`, }
        ),
      propertyType: z
        .string()
        .optional()
        .transform((val) =>
          val ? val.split(",").map((item) => item.trim()).filter(Boolean) : []
        )
        .refine((categories) =>
          categories.every((cat) =>
            (CONSTANTS.PROPERTY_TYPE as readonly string[]).includes(cat)
          ),
          { message: `Invalid Property Type provided. Allowed values are: ${CONSTANTS.PROPERTY_TYPE.join(", ")}`, }
        ),
      searchByLocation: z
        .preprocess((val) => {
          if (typeof val === "string") {
            const normalized = val.trim().toLowerCase();
            if (normalized === "true") return true;
            if (normalized === "false") return false;
            return val;
          }
          return val;
        }, z.boolean().default(false)),
    })
  })

  static unit = z.object({
    query: paginationSchema.extend({
      status: z.enum(CONSTANTS.UNIT_STATUS).default("Vacant"),
      unitType: z
        .string()
        .optional()
        .transform((val) =>
          val ? val.split(",").map((item) => item.trim()).filter(Boolean) : []
        )
        .refine((categories) =>
          categories.every((cat) =>
            (CONSTANTS.UNIT_TYPE as readonly string[]).includes(cat)
          ),
          { message: `Invalid Unit Type provided. Allowed values are: ${CONSTANTS.UNIT_TYPE.join(", ")}`, }
        ),
      property: objectIdSchema.optional(),
      floor: z
        .string()
        .optional()
        .transform((val) =>
          val ? val.split(",").map((item) => item.trim()).filter(Boolean) : []
        )
        .refine(
          (floors) => floors.every((floor) => /^-?\d+$/.test(floor)),
          {
            message: "Floor must be a comma-separated list of valid numbers (e.g. '1, 2, 3' or '-1, 0, 1').",
          }
        )
    })
  })
}

export interface DirectorySchemaInterface {
  user: z.infer<typeof DirectorySchema.user>["query"],
  tenant: z.infer<typeof DirectorySchema.tenant>["query"],
  vendor: z.infer<typeof DirectorySchema.vendor>["query"],
  property: z.infer<typeof DirectorySchema.property>["query"],
  unit: z.infer<typeof DirectorySchema.unit>["query"],
}