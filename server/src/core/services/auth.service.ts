import { POSSIBLE_USERS, USER_TYPE } from "../../common/types/index.js";
import AuthRepository from "../../infrastructure/database/repositories/auth.repository.js";
import TokenService from "./token.service.js";

export default class AuthService {
  static async validateWithToken(token: string): Promise<
    {
      success: boolean,
      message?: string,
      data?: Record<string, any>,
    }
  > {
    const valid = await TokenService.validateToken(token) as { _id: string, userType: USER_TYPE, userModel: POSSIBLE_USERS };

    if (!valid) {
      return { success: false, message: "Session Expired" }
    }

    const result = await AuthRepository.findByIdWithScopes(valid._id as string, valid.userType);
    if (!result.success || !result.data) return result
    result.data.userType = valid.userType;
    result.data.userModel = valid.userModel;
    return result;
  }

  static mapValidatedUser(data: Record<string, any>) {
    switch (data.userType) {
      case "Tenant":
        return {
          success: true,
          user: data.tenant,
          organization: data.tenant?.organization
        }
      case "Vendor":
        return {
          success: true,
          user: data.vendor,
          organization: data.vendor?.organization
        }
      case "Staff":
        return {
          success: true,
          user: data.user,
          organization: data.user?.organization
        }
      default:
        return { success: false, message: "Invalid User Type" };
    }
  }

  static login(credentials: Record<string, string>) {

  }
}