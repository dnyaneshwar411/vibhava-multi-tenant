import { ClientSession, ObjectIdQueryTypeCasting } from "mongoose";
import Scope from "../../infrastructure/database/models/scopesMap.model.js";
import AuthRepository from "../../infrastructure/database/repositories/auth.repository.js";
import S3 from "../../infrastructure/providers/aws/s3.js";
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

  static async getTenantScopes(organizationId: ObjectIdQueryTypeCasting, tenantId: ObjectIdQueryTypeCasting) {
    return await this.model
      .findOne({ organization: organizationId, actor: tenantId })
      .select("scopeMap")
      .lean()
  }

  static async updateTenantScopes(
    organizationId: ObjectIdQueryTypeCasting,
    tenantId: ObjectIdQueryTypeCasting,
    payload: any
  ) {
    return await this.model.findOneAndUpdate({
      organization: organizationId,
      actor: tenantId,
      actorModel: "Tenant"
    }, {
      $set: payload
    }, { upsert: true, returnDocument: "after" })
  }

  static async me(userId: ObjectIdQueryTypeCasting) {
    const data: any = await this.model
      .findOne({ actor: userId })
      .populate("actor", "-createdAt -password -organization -__v ")
      .select("-organization -scopeMap -__v")
      .lean();
    if (!data) return null
    if (data.actor?.avatar && data.actor?.avatar?.key) {
      data.actor.avatar = await S3.getObjectUrl({
        isPrivate: data.actor.avatar.private,
        key: data.actor.avatar.key,
      })
    }
    return data;
  }
}