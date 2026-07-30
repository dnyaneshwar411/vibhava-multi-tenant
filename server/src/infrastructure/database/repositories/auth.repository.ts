import { USER_TYPE } from "../../../common/types/index.js";
import {
  IAuth,
  IAuthInstance,
} from "../../../core/use-cases/IAuth.repository.js";
import Scope from "../models/scopesMap.model.js";

const AuthRepository: IAuth = class implements IAuthInstance {
  private static scopeModel = Scope;

  private static fieldsXUserMap(userType: USER_TYPE) {
    switch (userType) {
      case "Tenant":
        return { path: "tenant", select: "name organization" };
      case "Owner":
        return { path: "user", select: "name organization" };
      case "Staff":
        return { path: "user", select: "name organization" };
      case "Vendor":
        return { path: "vendor", select: "name organization" };
      default:
        throw new Error("Invalid userType");
    }
  }

  static async findByIdWithScopes(userId: string, userType: USER_TYPE) {
    const fieldsToPopulate = this.fieldsXUserMap(userType);
    const data = await this.scopeModel
      .findOne({ [fieldsToPopulate.path]: userId })
      .populate(fieldsToPopulate)
      .populate("organization", "subdomain")
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
