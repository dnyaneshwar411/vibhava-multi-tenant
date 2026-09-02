import z from "zod";
import { CONSTANTS } from "../../config/constants.js";
import { imageSchema, objectIdSchema } from "./common.schema.js";
import { TENANT_SCOPES } from "../../config/scopes.js";

export default class TenantSchema {
  static create = z.object({
    body: z.object({
      name: z.string().trim().min(1, "Name is required"),
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
      name: z.string().trim().min(1).optional(),
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

  static paginate = z.object({
    params: z.object({
      unitId: objectIdSchema,
    })
  })

  static getUnitTenant = z.object({
    params: z.object({
      unitId: objectIdSchema,
    })
  })

  static filtering = z.object({
    query: z.object({
      status: z
        .string()
        .optional()
        .transform((val) =>
          val ? val.split(",").map((item) => item.trim()).filter(Boolean) : []
        )
        .refine((categories) =>
          categories.every((cat) =>
            (CONSTANTS.TENANT_STATUS as readonly string[]).includes(cat)
          ),
          { message: `Invalid tenant status provided. Allowed values are: ${CONSTANTS.TENANT_STATUS.join(", ")}`, }
        )
    })
  })

  static tenantId = z.object({
    params: z.object({
      tenantId: objectIdSchema
    })
  })

  static updateScopes = z.object({
    body: z.object({
      scopeMap: z
        .record(
          z.enum(TENANT_SCOPES, { message: "Invalid scope key provided" }),
          z.boolean({
            message: "Scope value must be a boolean",
          })
            .nullable()
            .optional()
        )
        .refine((obj) => Object.keys(obj).length > 0, {
          message: "At least one scope permission must be provided",
        })
        .transform((obj) => {
          return Object.fromEntries(
            Object.entries(obj).filter(([_, val]) => typeof val === "boolean")
          );
        })
    })
  })
}

export type CreateTenantInput = z.infer<typeof TenantSchema.create>;
export type UpdateTenantInput = z.infer<typeof TenantSchema.update>;
export type UnitTenantList = z.infer<typeof TenantSchema.getUnitTenant>
