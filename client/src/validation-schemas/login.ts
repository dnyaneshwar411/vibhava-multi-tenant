import z from "zod";

export const loginSchema = z.object({
  user: z.enum(["User", "Tenant", "Vendor"]),
  username: z.string().email("Invalid email address."),
  password: z.string()
    .min(8, "Password must be at least 8 characters.")
    // .refine(
    //   (password) => /[A-Z]/.test(password) && /[a-z]/.test(password),
    //   "Password must contain both uppercase and lowercase letters."
    // )
    // .refine(
    //   (password) => /[0-9]/.test(password),
    //   "Password must contain at least one number."
    // )
    // // .refine(
    // //   (password) => /[^A-Za-z0-9]/.test(password),
    // //   "Password must contain at least one special character."
    // // ),
})

export type LoginSchemaInput = z.infer<typeof loginSchema>;