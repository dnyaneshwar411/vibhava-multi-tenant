import { ObjectIdQueryTypeCasting } from "mongoose";
import { CreateDocumentInput } from "../../../api/schemas/document.schema.js";
import Document from "../models/document.model.js";

export default class DocumentRepository {
  private static model = Document;

  static async create(organizationId: ObjectIdQueryTypeCasting, payload: CreateDocumentInput["body"]) {
    return await this.model.create({
      organization: organizationId,
      ...payload
    } as any)
  }
}