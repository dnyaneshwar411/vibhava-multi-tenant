import z from "zod";
import { objectIdSchema } from "./common.schema.js";
import { CONSTANTS } from "../../config/constants.js";
import { OPERATOR_SCOPES } from "../../config/scopes.js";

export default class OperatorSchema {
  static create = z.object({
    body: z.object({
      name: z.string().trim().min(1, "Name is required"),
      email: z.string().email("Invalid email format"),
      password: z.string().min(8, "Password must be at least 8 characters"),
      role: z.enum(CONSTANTS.OPERATOR_ROLES).optional().default("SUPPORT_AGENT"),
      status: z.enum(CONSTANTS.OPERATOR_STATUS).optional().default("Active"),
      mfa: z.object({
        enabled: z.boolean().optional().default(false),
      }).optional(),
    }),
  });

  static update = z.object({
    params: z.object({
      operatorId: objectIdSchema,
    }),
    body: z.object({
      name: z.string().trim().min(1, "Name cannot be empty").optional(),
      role: z.enum(CONSTANTS.OPERATOR_ROLES).optional(),
      status: z.enum(CONSTANTS.OPERATOR_STATUS).optional(),
      mfa: z.object({
        enabled: z.boolean().optional(),
      }).optional(),
    }),
  });

  static manageScopes = z.object({
    params: z.object({
      operatorId: objectIdSchema,
    }),
    body: z.object({
      scopes: z.array(z.enum(OPERATOR_SCOPES)).min(1, "At least one scope is required"),
    }),
  });
}
