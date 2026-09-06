import z from "zod";
import { POSSIBLE_USERS } from "../config";

export const passwordResetSchema = z.object({
  user: z.enum(POSSIBLE_USERS).default("User"),
  username: z.string().email("Invalid email address."),
})

export const passwordVerifySchema = z.object({
  password: z.string().min(6, "Password must be at least 6 characters."),
  otp: z.number().gte(1000).lte(9999)
})

export const passwordUpdateSchema = passwordResetSchema
  .merge(passwordVerifySchema)

export type PasswordUpdateInput = z.infer<typeof passwordUpdateSchema>
export type PasswordResetInput = z.infer<typeof passwordResetSchema>
export type PasswordVerifyInput = z.infer<typeof passwordVerifySchema>