import { z } from "zod";
import { objectIdSchema } from "./common.schema.js";
import { CONSTANTS } from "../../config/constants.js";
import { yyyyMMddRegex } from "../../common/utils/regex.js";

export default class ReportsSchema {
  static getUnitRentPaySchema = z.object({
    params: z.object({
      unitId: objectIdSchema,
    }),
  });

  static payRentSchema = z.object({
    params: z.object({
      unitId: objectIdSchema,
    }),
    body: z.object({
      startDate: z
        .string()
        .regex(yyyyMMddRegex, "startDate must be in yyyy-MM-dd format")
        .refine((dateStr) => !isNaN(Date.parse(dateStr)), {
          message: "Invalid calendar date",
        })
        .transform((dateStr) => new Date(dateStr).toISOString()),
      gateway: z.enum(CONSTANTS.PAYMENT_GATEWAY),
    }),
  });
}

export type PayRentInput = z.infer<typeof ReportsSchema.payRentSchema>;