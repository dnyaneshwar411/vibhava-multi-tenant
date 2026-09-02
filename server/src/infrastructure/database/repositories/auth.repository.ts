import {
  IAuth,
  IAuthInstance,
} from "../../../core/use-cases/IAuth.repository.js";
import Scope from "../models/scopesMap.model.js";

const AuthRepository: IAuth = class implements IAuthInstance {
  private static scopeModel = Scope;
  static async findByIdWithScopes(userId: string) {
    const data = await this.scopeModel
      .findOne({ actor: userId })
      .populate("actor", "name organization status role email")
      .populate("organization", "owner subdomain status")
      .lean();
    if (!data)
      return {
        success: false,
        message: "User not found",
      };
    return { success: true, data: data as Record<string, any> };
  }
};

export default AuthRepository;
