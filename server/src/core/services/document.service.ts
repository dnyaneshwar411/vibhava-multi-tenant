import { ObjectIdQueryTypeCasting } from "mongoose";
import { CreateDocumentInput } from "../../api/schemas/document.schema.js";
import FileService from "./file.service.js";
import { POSSIBLE_USERS } from "../../common/types/index.js";
import DocumentRepository from "../../infrastructure/database/repositories/document.repository.js";

export default class DocumentService {
  static async create(
    organizationId: ObjectIdQueryTypeCasting,
    file: Express.Multer.File,
    payload: CreateDocumentInput["body"],
    uploader: {
      uploaderId: ObjectIdQueryTypeCasting,
      uploaderModel: POSSIBLE_USERS
    },
  ) {
    const fileDoc = await FileService.upload(file, {
      key: "/",
      private: true,
      resource: "documents"
    }, uploader)
    payload.cloud = {
      key: fileDoc.object?.key!,
      private: fileDoc.object?.private!
    }
    const doc = await DocumentRepository.create(organizationId, payload)
    return doc;
  }
}