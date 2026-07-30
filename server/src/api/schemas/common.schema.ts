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