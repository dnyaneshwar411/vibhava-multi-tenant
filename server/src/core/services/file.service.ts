import { readFileSync, unlink } from "node:fs";
import { FileUploadInput } from "../../api/schemas/file.schema.js";
import S3 from "../../infrastructure/providers/aws/s3.js";
import { ObjectIdQueryTypeCasting } from "mongoose";
import FileRepository from "../../infrastructure/database/repositories/file.repository.js";
import { POSSIBLE_USERS } from "../../common/types/index.js";

export default class FileService {
  static async upload(
    file: Express.Multer.File,
    payload: FileUploadInput["body"] & { key: string },
    uploader: {
      uploaderId: ObjectIdQueryTypeCasting,
      uploaderModel: POSSIBLE_USERS
    }
  ) {

    const fileContentBuffer = readFileSync(file.path);

    payload.key = payload.resource + "/" + file.filename

    const data = await S3.putObject({
      isPrivate: payload.private,
      key: payload.key,
      body: fileContentBuffer
    })


    const uploadPayload = {
      meta: file,
      object: {
        key: payload.key,
        private: payload.private,
        resource: payload.resource
      },
      provider: data,
      uploaderId: uploader.uploaderId,
      uploaderModel: uploader.uploaderModel
    }

    const fileDoc = await FileRepository.create(uploadPayload as any)

    return fileDoc
  }
}