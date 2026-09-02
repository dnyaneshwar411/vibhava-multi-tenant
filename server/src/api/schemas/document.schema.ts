import z from "zod";
import { CONSTANTS } from "../../config/constants.js";
import { imageSchema, objectIdSchema } from "./common.schema.js";

export default class DocumentSchema {
  private static cloudAssetSchema = imageSchema

  private static documentMetaSchema = z.object({
    name: z.string({ message: "Document name is required" }).trim().min(1),
    size: z
      .coerce
      .number({ message: "File size is required" })
      .positive("File size must be greater than 0"),
    mimeType: z.string()
    // enum(CONSTANTS.DOCUMENT_MIME_TYPES, { message: "Invalid document MIME type" }),
  });

  static create = z.object({
    body: z.object({
      property: objectIdSchema.optional(),

      title: z
        .string({ message: "Title is required" })
        .trim()
        .min(1, "Title cannot be empty"),

      entityType: z.enum(CONSTANTS.DOCUMENT_ENTITIES, { message: "Invalid entity type" }),

      entityId: objectIdSchema.optional(),

      status: z
        .enum(CONSTANTS.DOCUMENT_STATUS)
        .default("Pending Review"),

      visibility: z
        .enum(CONSTANTS.DOCUMENT_VISIBILITY)
        .default("Internal Only"),

      category: z
        .enum(CONSTANTS.DOCUMENT_CATEGORY)
        .default("Other"),

      meta: this.documentMetaSchema,

      cloud: this.cloudAssetSchema.optional(),

      user: objectIdSchema.optional(),
      tenant: objectIdSchema.optional(),

      expiresAt: z.coerce.date().nullable().optional(),
    }),
  });
}

export type CreateDocumentInput = z.infer<typeof DocumentSchema.create>;