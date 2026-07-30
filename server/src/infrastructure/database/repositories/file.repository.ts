import { ObjectIdQueryTypeCasting } from "mongoose";
import File from "../models/file.model.js";
import { POSSIBLE_USERS } from "../../../common/types/index.js";

export default class FileRepository {
  private static model = File

  static async create(payload: {
    meta: Express.Multer.File;
    object: {
      key: string;
      private: boolean;
      resource: "profiles/user" | "profiles/tenant" | "profiles/vendor" | "profiles/operators";
    };
    provider: any;
    uploaderId: ObjectIdQueryTypeCasting;
    uploaderModel: POSSIBLE_USERS;
  }) {
    return await this.model.create(payload)
  }
}