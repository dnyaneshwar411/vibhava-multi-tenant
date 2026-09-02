import { isValidObjectId } from "mongoose";
import { z } from "zod";

export const objectIdSchema = z.string().refine((val) => isValidObjectId(val), {
  message: "Invalid ObjectId format",
});

export const imageSchema = z.object({
  private: z
    .boolean({ message: "Image URL is required" }),
  key: z
    .string({ message: "Storage key/path is required" })
    .trim()
    .min(1, "Key cannot be empty"),
});

export const paginationSchema = z.object({
  page: z.coerce.number().default(1),
  limit: z.coerce.number().default(1),
  query: z.string().optional(),
})

export const commaSeparatedEnum = <T extends readonly [string, ...string[]]>(enumValues: T) =>
  z
    .string()
    .optional()
    .transform((val) => (val ? val.split(",").map((s) => s.trim()) : undefined))
    .pipe(z.array(z.enum(enumValues)).optional());