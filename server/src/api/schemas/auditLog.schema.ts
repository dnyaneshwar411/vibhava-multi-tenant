import z from "zod"
import { CONSTANTS } from "../../config/constants.js"

export default class AuditLogSchema {
  static paginate = z.object({
    query: z.object({
      action: z
        .string()
        .optional()
        .transform((val) =>
          val ? val.split(",").map((item) => item.trim()).filter(Boolean) : []
        )
        .refine((values) =>
          values.every((cat) =>
            (CONSTANTS.AUDIT_LOG_ACTION as readonly string[]).includes(cat)
          ),
          { message: `Invalid action provided. Allowed values are: ${CONSTANTS.AUDIT_LOG_ACTION.join(", ")}`, }
        ),
      resource: z
        .string()
        .optional()
        .transform((val) =>
          val ? val.split(",").map((item) => item.trim()).filter(Boolean) : []
        )
        .refine((values) =>
          values.every((cat) =>
            (CONSTANTS.AUDIT_LOG_RESOURCE as readonly string[]).includes(cat)
          ),
          { message: `Invalid resource provided. Allowed values are: ${CONSTANTS.AUDIT_LOG_RESOURCE.join(", ")}`, }
        ),
      actor: z
        .string()
        .optional()
        .transform((val) =>
          val ? val.split(",").map((item) => item.trim()).filter(Boolean) : []
        )
        .refine((values) =>
          values.every((cat) =>
            (CONSTANTS.AUDIT_LOG_ACTOR_MODEL as readonly string[]).includes(cat)
          ),
          { message: `Invalid actor provided. Allowed values are: ${CONSTANTS.AUDIT_LOG_ACTOR_MODEL.join(", ")}`, }
        ),
      from: z
        .string()
        .optional()
        .refine((val) => !val || (/^\d{4}-\d{2}-\d{2}$/.test(val) && !isNaN(Date.parse(val))), {
          message: "Invalid from date format. Expected yyyy-MM-dd",
        })
        .transform((val) => (val ? new Date(`${val}T00:00:00.000Z`).toISOString() : undefined)),
      to: z
        .string()
        .optional()
        .refine((val) => !val || (/^\d{4}-\d{2}-\d{2}$/.test(val) && !isNaN(Date.parse(val))), {
          message: "Invalid to date format. Expected yyyy-MM-dd",
        })
        .transform((val) => (val ? new Date(`${val}T23:59:59.999Z`).toISOString() : undefined)),
    })
  })
}