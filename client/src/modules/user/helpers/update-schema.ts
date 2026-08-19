import z from "zod";

export const updateUserSchema = z.object({
  name: z.string().min(1, "Name cannot be empty"),
  email: z.string(),
  mobileNumber: z.string(),
  countryCode: z.string(),
  status: z.string().optional(),
  avatar: z.any()
});

export type UpdateUserInput = z.infer<typeof updateUserSchema>;