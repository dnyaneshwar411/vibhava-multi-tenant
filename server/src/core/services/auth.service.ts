import { ObjectIdQueryTypeCasting } from "mongoose";
import { LoginAuthInput, PasswordResetInput, PasswordVerifyInput } from "../../api/schemas/auth.schema.js";
import { CONSTANTS_TYPE, POSSIBLE_USERS, USER_TYPE } from "../../common/types/index.js";
import { hashString, validateHash } from "../../common/utils/hash.js";
import AuthRepository from "../../infrastructure/database/repositories/auth.repository.js";
import OperatorRepository from "../../infrastructure/database/repositories/operator.repository.js";
import TenantRepository from "../../infrastructure/database/repositories/tenant.repository.js";
import UserRepository from "../../infrastructure/database/repositories/user.repository.js";
import VendorRepository from "../../infrastructure/database/repositories/vendor.repository.js";
import TokenService from "./token.service.js";
import ScopeService from "./scope.service.js";
import S3 from "../../infrastructure/providers/aws/s3.js";
import { EventOrchestrator } from "../events/eventBus.js";
import { randomInt } from "node:crypto";
import OTPRepository from "../../infrastructure/database/repositories/otp.service.js";
import { addMinutes } from "date-fns";
import TenantService from "./tenant.service.js";
import UserService from "./user.service.js";
import VendorService from "./vendor.service.js";
import Logger from "../../common/logger/index.js";
import { env } from "../../config/envVars.js";

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
  private static PASSWORD_EXPIRATION = 10;

  private static readonly actorUpdaters: Record<
    CONSTANTS_TYPE["POSSIBLE_USERS"],
    (id: ObjectIdQueryTypeCasting, data: any, payload?: any) => Promise<any>
  > = {
      Tenant: (id: ObjectIdQueryTypeCasting, data: any) => TenantService.updateById(id as string, data),
      User: (id: ObjectIdQueryTypeCasting, data: any) => UserService.updateById(id as string, data),
      Vendor: (id: ObjectIdQueryTypeCasting, data: any) => VendorService.updateById(id as string, data),
      Operator: (id: ObjectIdQueryTypeCasting, data: any) => OperatorRepository.update(id, data),
    };

  private static async updateActor(
    actorId: ObjectIdQueryTypeCasting,
    updateData: Record<string, any>,
    payload: { actorModel: CONSTANTS_TYPE["POSSIBLE_USERS"];[key: string]: any }
  ) {
    const updater = this.actorUpdaters[payload.actorModel];
    return await updater(actorId, updateData, payload);
  }

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

  static async actorExists(payload: { user: CONSTANTS_TYPE["POSSIBLE_USERS"], username: string }) {
    switch (payload.user) {
      case "User":
        return await UserRepository.getUserFilter({ email: payload.username })
      case "Tenant":
        return await TenantRepository.getTenantFilter({ email: payload.username })
      case "Vendor":
        return await VendorRepository.getVendorFilter({ email: payload.username })
      // case "Operator":
      // return await VendorRepository.getOperatorFilter({ email: payload.username })
      default:
        return null;
    }
  }

  private static generatePasswordResetOTP(length: number = 4): number {
    const min = Math.pow(10, length - 1);
    const max = Math.pow(10, length) - 1;
    return randomInt(min, max + 1)
  }

  static async passwordReset(payload: PasswordResetInput["body"]) {
    const actor = await this.actorExists(payload)
    if (!actor) return {
      success: false,
      message: "User Not Found!"
    }

    const otp = this.generatePasswordResetOTP();

    await OTPRepository.create({
      actor: actor._id,
      actorModel: payload.user,
      entity: "PASSWORD_RESET",
      otp,
      expiresAt: addMinutes(new Date(), this.PASSWORD_EXPIRATION)
    })

    EventOrchestrator.publish("EMAILS", {
      type: "EMAILS",
      entity: "PASSWORD_RESET",
      payload: {
        to: actor.email,
        subject: "Security Alert: Verification Code to Reset Password",
        name: actor.name,
        mobileNumber: actor.mobileNumber,
        countryCode: actor.countryCode,
        otp,
      }
    })
    return { success: true }
  }

  static async passwordVerify(payload: PasswordVerifyInput["body"]) {
    const actor = await this.actorExists(payload)
    if (!actor) return {
      success: false,
      message: "User Not Found!"
    }

    const otp = await OTPRepository.findOne({
      actor: actor._id,
      actorModel: payload.user,
      entity: "PASSWORD_RESET",
    })

    if (!otp) return {
      success: false,
      message: "OTP Expired, Please try again later!"
    }

    if (otp.otp !== payload.otp) return {
      success: false,
      message: "Invalid OTP provided"
    }


    await Promise.all([
      this.updateActor(actor._id, { password: payload.password }, {
        actorModel: payload.user
      }),
      OTPRepository.deleteOne(otp._id)
    ])

    return {
      success: true
    }
  }

  private static resolveOrgClientURL(subdomain: string) {
    return `https://${subdomain}.${env.CLIENT_BASE_HOSTNAME}`
  }

  private static getActorOnboardingSubject(actorModel: string, organizationName?: string): string {
    const org = organizationName || "Your Organization";
    switch (actorModel) {
      case "User":
        return `Welcome to ${org} - Set Up Your Account`;
      case "Tenant":
        return `Welcome to Your Tenant Portal - ${org}`;
      case "Vendor":
        return `Vendor Onboarding - Set Up Your Access for ${org}`;
      case "Operator":
        return `Vibhava Operator Access Granted - Complete Your Setup`;
      default:
        return `Welcome to ${org}`;
    }
  }

  static async actorOnboardingMail(actor: ObjectIdQueryTypeCasting) {
    const profile: any = await ScopeService.getProfile(actor, "");
    const orgLogo = await S3.getObjectUrl({
      isPrivate: profile?.organization?.branding?.logo?.private,
      key: profile?.organization?.branding?.logo?.key,
    })

    const orgBaseURL = this.resolveOrgClientURL(profile?.organization?.subdomain)

    EventOrchestrator.publish("EMAILS", {
      type: "EMAILS",
      entity: "ACTOR_ONBOARDING",
      payload: {
        to: profile?.actor?.email,
        subject: this.getActorOnboardingSubject(profile.actorModel, profile?.organization?.name),
        actor: profile.actorModel,
        recipientName: profile?.actor?.name,
        countryCode: profile?.actor?.countryCode,
        mobileNumber: profile?.actor?.mobileNumber,
        organizationName: profile?.organization?.name,
        organizationLogo: orgLogo,
        loginUrl: `${orgBaseURL}/login`,
      }
    })
  }
}