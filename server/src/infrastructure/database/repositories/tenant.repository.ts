import { ObjectIdQueryTypeCasting } from "mongoose";
import Tenant from "../models/tenant.model.js";

export default class TenantRepository {
  private static model = Tenant;

  static async getOrganizationTenant(organization: ObjectIdQueryTypeCasting, tenantId: ObjectIdQueryTypeCasting) {
    return await this.model.findOne({
      organization,
      _id: tenantId
    })
    .select("")
    .lean()
  }
}