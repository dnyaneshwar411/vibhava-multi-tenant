import z from "zod";
import { CONSTANTS } from "../../config/constants.js";
import { commaSeparatedEnum, imageSchema, objectIdSchema } from "./common.schema.js";

export default class MaintenanceSchema {
  static create = z.object({
    body: z.object({
      property: objectIdSchema,
      unit: objectIdSchema,

      title: z
        .string({ message: "Ticket title is required" })
        .trim()
        .min(1, "Ticket title cannot be empty")
        .max(150, "Ticket title cannot exceed 150 characters"),
      description: z
        .string({ message: "Detailed description is required" })
        .trim()
        .min(1, "Detailed description cannot be empty"),
      category: z.enum(CONSTANTS.VENDOR_TRADE_CATEGORIES, {
        message: "Category is required",
      }),
      priority: z
        .enum(CONSTANTS.MAINTENANCE_TICKET_PRIORITY)
        .default("Medium"),

      permissionToEnter: z.boolean().default(false),
      entryNotes: z.string().trim().optional(),
      preferredSchedule: z
        .enum(CONSTANTS.MAINTENANCE_TICKET_PREFERRED_SCHEDULE)
        .default("Anytime"),

      attachments: z.array(imageSchema).default([]),

      estimatedCost: z.coerce.number().min(0, "Estimated cost cannot be negative").default(0),
      isBillableToTenant: z.boolean().default(false),
    }),
  });

  static update = z.object({
    params: z
      .object({
        ticketId: objectIdSchema,
      })
      .optional(),
    body: z.object({
      title: z
        .string()
        .trim()
        .min(1, "Ticket title cannot be empty")
        .max(150, "Ticket title cannot exceed 150 characters")
        .optional(),
      description: z
        .string()
        .trim()
        .min(1, "Detailed description cannot be empty")
        .optional(),
      category: z.enum(CONSTANTS.VENDOR_TRADE_CATEGORIES).optional(),
      priority: z.enum(CONSTANTS.MAINTENANCE_TICKET_PRIORITY).optional(),
      status: z.enum(CONSTANTS.MAINTENANCE_TICKET_STATUS).optional(),

      permissionToEnter: z.boolean().optional(),
      entryNotes: z.string().trim().optional(),
      preferredSchedule: z
        .enum(CONSTANTS.MAINTENANCE_TICKET_PREFERRED_SCHEDULE)
        .optional(),

      attachments: z.array(imageSchema).optional(),

      assignedVendor: objectIdSchema.nullable().optional(),
      assignedStaff: objectIdSchema.nullable().optional(),

      scheduledDate: z.coerce.date().nullable().optional(),
      completedAt: z.coerce.date().nullable().optional(),

      estimatedCost: z.coerce.number().min(0, "Estimated cost cannot be negative").optional(),
      actualCost: z.coerce.number().min(0, "Actual cost cannot be negative").optional(),
      isBillableToTenant: z.boolean().optional(),

      ledgerEntry: objectIdSchema.nullable().optional(),
    }),
  });

  static assign = z.object({
    body: z.object({
      assignedVendor: objectIdSchema.nullable().optional(),
      assignedStaff: objectIdSchema.nullable().optional(),
    }),
  });

  static complete = z.object({
    body: z.object({
      actualCost: z.coerce.number().min(0, "Actual cost cannot be negative").optional(),
      isBillableToTenant: z.boolean().optional(),
    }),
  });

  static updateStatus = z.object({
    body: z.object({
      status: z.enum(CONSTANTS.MAINTENANCE_TICKET_STATUS)
    }),
  });

  static feedback = z.object({
    body: z.object({
      rating: z.coerce.number().min(1, "Rating must be at least 1").max(5, "Rating cannot exceed 5"),
      comment: z.string().trim().optional(),
    }),
  });

  static paginate = z.object({
    query: z.object({
      status: commaSeparatedEnum(CONSTANTS.MAINTENANCE_TICKET_STATUS),
      priority: commaSeparatedEnum(CONSTANTS.MAINTENANCE_TICKET_PRIORITY),
      category: commaSeparatedEnum(CONSTANTS.VENDOR_TRADE_CATEGORIES),

      propertyId: objectIdSchema.optional(),
      vendorId: objectIdSchema.optional(),
      staffId: objectIdSchema.optional(),

      search: z.string().trim().optional(),
      limit: z
        .string()
        .optional()
        .default("20")
        .transform((val) => parseInt(val, 10))
        .pipe(z.number().positive().max(100)),
      cursor: z.string().optional(),
    }),
  });
}

export type CreateMaintenanceInput = z.infer<typeof MaintenanceSchema.create>;
export type UpdateMaintenanceInput = z.infer<typeof MaintenanceSchema.update>;
export type AssignMaintenanceInput = z.infer<typeof MaintenanceSchema.assign>;
export type CompleteMaintenanceInput = z.infer<typeof MaintenanceSchema.complete>;
export type FeedbackMaintenanceInput = z.infer<typeof MaintenanceSchema.feedback>;
