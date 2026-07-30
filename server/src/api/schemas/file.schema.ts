import z from "zod";
import { CONSTANTS } from "../../config/constants.js";

export default class FileSchema {
  static upload = z.object({
    body: z.object({
      private: z.enum(["true", "false"]).transform((val) => val === "true").default(false),
      resource: z.enum(CONSTANTS.FILE_UPLOAD_DIRECTORIES, {
        message: "resource should be either of - " + CONSTANTS.FILE_UPLOAD_DIRECTORIES.join(", ")
      })
    })
  })
}

export type FileUploadInput = z.infer<typeof FileSchema.upload>;