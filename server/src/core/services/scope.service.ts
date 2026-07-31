import { ClientSession, ObjectIdQueryTypeCasting } from "mongoose";
import { USER_TYPE } from "../../common/types/index.js";
import Scope from "../../infrastructure/database/models/scopesMap.model.js";
import AuthRepository from "../../infrastructure/database/repositories/auth.repository.js";

type NonOwnerRole = Exclude<USER_TYPE, "Owner">;

export default class ScopeService {
  private static model = Scope;

  static async findScopeByUserIdRole(userId: string) {
    return await AuthRepository.findByIdWithScopes(userId)
  }

  static async createWithSession(payload: any, session: ClientSession) {
    return await this.model.create([payload], { session })
  }

  static async getProfile(
    actorId: ObjectIdQueryTypeCasting,
    fields: string // tbd in future
  ) {
    const scopesMap = await this.model
      .findOne({ actor: actorId })
      .populate("organization", "name subdomain meta branding status")
      .populate("actor", "name email mobileNumber countryCode avatar status")
      .select("-updatedAt -__v")
      .lean();
    return scopesMap;
  }
}