import z from "zod";

export const updateUserSchema = z.object({
  name: z.string().min(1, "Name cannot be empty"),
  mobileNumber: z.string(),
  countryCode: z.string(),
  status: z.string().min(1, "Status is required"),
});
