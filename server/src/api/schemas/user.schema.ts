import z from "zod";
import { objectIdSchema } from "./common.schema.js";
import { CONSTANTS } from "../../config/constants.js";
import { USER_SCOPES } from "../../config/scopes.js";

export default class UserSchema {
  static create = z.object({
    body: z.object({
      name: z.string().trim().min(1, "Name is required"),
      email: z.string().email("Invalid email"),
      password: z.string().min(8, "Password must be at least 8 characters"),
      mobileNumber: z.number().optional(),
      countryCode: z.number().optional(),
    }),
  });

  static update = z.object({
    params: z.object({
      userId: objectIdSchema,
    }),
    body: z.object({
      name: z.string().trim().min(1, "Name cannot be empty").optional(),
      mobileNumber: z.number().optional(),
      countryCode: z.number().optional(),
      status: z.enum(CONSTANTS.USER_STATUS, { message: "Status is required!" }).default("Active"),
      avatar: z.object({
        private: z.boolean().optional(),
        key: z.string().optional(),
      }).optional(),
    }),
  });

  static manageScopes = z.object({
    params: z.object({
      userId: objectIdSchema,
    }),
    body: z.object({
      scopes: z.array(z.enum(USER_SCOPES)).min(1, "At least one scope is required"),
    }),
  });
}

export type UpdateUserSchema = z.infer<typeof UserSchema.update>;
export type ManageScopesSchema = z.infer<typeof UserSchema.manageScopes>;
