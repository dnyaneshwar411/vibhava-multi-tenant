import { USER_TYPE } from "../../common/types/index.js";
import Scope from "../../infrastructure/database/models/scopesMap.model.js";
import AuthRepository from "../../infrastructure/database/repositories/auth.repository.js";

type NonOwnerRole = Exclude<USER_TYPE, "Owner">;

export default class ScopeService {
  private static model = Scope;

  static async findScopeByUserIdRole(userId: string, role: NonOwnerRole) {
    return await AuthRepository.findByIdWithScopes(userId, role)
  }
}