import { ObjectIdQueryTypeCasting } from "mongoose";
import { LoginAuthInput } from "../../api/schemas/auth.schema.js";
import { POSSIBLE_USERS, USER_TYPE } from "../../common/types/index.js";
import { validateHash } from "../../common/utils/hash.js";
import AuthRepository from "../../infrastructure/database/repositories/auth.repository.js";
import OperatorRepository from "../../infrastructure/database/repositories/operator.repository.js";
import TenantRepository from "../../infrastructure/database/repositories/tenant.repository.js";
import UserRepository from "../../infrastructure/database/repositories/user.repository.js";
import VendorRepository from "../../infrastructure/database/repositories/vendor.repository.js";
import TokenService from "./token.service.js";
import ScopeService from "./scope.service.js";
import S3 from "../../infrastructure/providers/aws/s3.js";

type AuthLogin = {
  success: false; data?: any; message: string
} | {
  success: true; message?: string; data: any
}

type SubdomainValidation = {
  success: boolean;
  message?: string;
  subdomain?: string;
}

export default class AuthService {
  static async validateWithToken(token: string): Promise<
    {
      success: boolean,
      message?: string,
      data?: Record<string, any>,
    }
  > {
    const valid = await TokenService.validateToken(token) as { _id: string, userType: USER_TYPE };

    if (!valid) {
      return { success: false, message: "Session Expired" }
    }

    const result = await AuthRepository.findByIdWithScopes(valid._id as string);
    if (!result.success || !result.data) return result
    result.data.userType = valid.userType;
    return result;
  }

  static async getProfile(
    organizationId: ObjectIdQueryTypeCasting,
    userId: ObjectIdQueryTypeCasting,
    actorModel: POSSIBLE_USERS,
  ): Promise<{
    success: true,
    data: any
    message?: string
  } | {
    success: false,
    data?: any
    message: string
  }> {
    const scopes = await ScopeService.getProfile(userId, "")
    if (!scopes) return {
      success: false,
      message: "Scopes Not Assigned!"
    }

    if (scopes.actorModel !== "Operator" && String(scopes.organization?._id) !== String(organizationId)) return {
      success: false,
      message: "Bad Request!"
    }

    const user: any = scopes.actor;
    if (!user) return {
      success: false,
      message: "User Not Found!"
    }

    if (user.avatar && user.avatar.key) user.avatar = await S3.getObjectUrl({
      isPrivate: user.avatar.private,
      key: user.avatar.key
    })

    return {
      success: true,
      data: scopes
    }
  }

  private static async buildTokens(payload: any) {
    const [access, refresh] = await Promise.all([
      TokenService.createToken(payload),
      TokenService.createToken(payload)
    ])
    return { access, refresh }
  }

  private static async loginTenant(
    credentials: LoginAuthInput["body"],
    subdomain: string
  ): Promise<AuthLogin> {
    const tenant: any = await TenantRepository.getTenantFilter({ email: credentials.username })

    if (!tenant) return {
      success: false,
      message: "Tenant with these credentials not found"
    }

    if (!tenant.organization || tenant.organization.subdomain !== subdomain) return {
      success: false,
      message: "Invalid Request"
    }

    if (!await validateHash(credentials.password, tenant.password)) return {
      success: false,
      message: "Invalid Password!"
    }

    delete tenant.password

    const tokens = await this.buildTokens({
      organization: tenant.organization._id,
      organizationOwner: tenant.organization.owner,
      _id: tenant._id,
      userType: "Tenant",
      actorModel: "Tenant"
    })

    return {
      success: true,
      data: {
        user: tenant,
        tokens
      }
    }
  }

  private static async loginVendor(
    credentials: LoginAuthInput["body"],
    subdomain: string
  ): Promise<AuthLogin> {
    const vendor: any = await VendorRepository.getVendorFilter({ email: credentials.username })

    if (!vendor) return {
      success: false,
      message: "Vendor with these credentials not found"
    }

    if (!vendor.organization || vendor.organization.subdomain !== subdomain) return {
      success: false,
      message: "Invalid Request"
    }

    if (!await validateHash(credentials.password, vendor.password)) return {
      success: false,
      message: "Invalid Password!"
    }

    delete vendor.password

    const tokens = await this.buildTokens({
      organization: vendor.organization._id,
      organizationOwner: vendor.organization.owner,
      _id: vendor._id,
      userType: "Vendor",
      actorModel: "Vendor"
    })

    return {
      success: true,
      data: {
        user: vendor,
        tokens
      }
    }
  }

  private static async loginUser(
    credentials: LoginAuthInput["body"],
    subdomain: string
  ): Promise<AuthLogin> {
    const user: any = await UserRepository.getUserFilter({ email: credentials.username })

    if (!user) return {
      success: false,
      message: "User with these credentials not found"
    }

    if (!user.organization || user.organization.subdomain !== subdomain) return {
      success: false,
      message: "Invalid Request"
    }

    if (!await validateHash(credentials.password, user.password)) return {
      success: false,
      message: "Invalid Password!"
    }

    delete user.password

    const tokens = await this.buildTokens({
      organization: user.organization._id,
      organizationOwner: user.organization.owner,
      _id: user._id,
      userType: "User",
      actorModel: "User"
    })

    return {
      success: true,
      data: {
        user,
        tokens
      }
    }
  }

  private static async loginOperator(credentials: LoginAuthInput["body"]): Promise<AuthLogin> {
    const operator: any = await OperatorRepository.getOperatorFilter({ email: credentials.username })

    if (!operator) return {
      success: false,
      message: "Operator with these credentials not found"
    }

    if (!await validateHash(credentials.password, operator.password)) return {
      success: false,
      message: "Invalid Password!"
    }

    delete operator.password

    const tokens = await this.buildTokens({
      _id: operator._id,
      userType: "Operator",
      actorModel: "Operator"
    })

    return {
      success: true,
      data: {
        user: operator,
        tokens
      }
    }
  }

  static async login(
    credentials: LoginAuthInput["body"],
    subdomainDetails: SubdomainValidation
  ): Promise<AuthLogin> {
    if (!subdomainDetails.subdomain && credentials.user !== "Operator") return {
      success: false,
      message: "Invalid Request"
    }

    const subdomain = subdomainDetails.subdomain

    if (credentials.user === "Operator" && subdomain) return {
      success: false,
      message: "Invalid Request"
    }

    switch (credentials.user) {
      case "Tenant": {
        credentials.user = "Tenant";
        return await this.loginTenant(credentials, subdomain!);
      }
      case "Vendor": {
        return await this.loginVendor(credentials, subdomain!);
      }
      case "User": {
        return await this.loginUser(credentials, subdomain!);
      }
      case "Operator": {
        return await this.loginOperator(credentials);
      }
    }
  }
}