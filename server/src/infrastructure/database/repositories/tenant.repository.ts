import { ObjectIdQueryTypeCasting, QueryFilter } from "mongoose";
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

  static async paginate(organizationId: ObjectIdQueryTypeCasting, filters: QueryFilter<{}>) {
    const dbQuery: QueryFilter<{}> = { organization: organizationId }
    if (filters.query) {
      dbQuery.$or = [
        { name: { $regex: filters.query, $options: "i" } },
        { email: { $regex: filters.query, $options: "i" } }
      ]
    }

    if(filters.status) {
      dbQuery.status = filters.status
    }

    const [tenants, total] = await Promise.all([
      this.model
        .find(dbQuery)
        .select("name email mobileNumber countryCode status")
        .limit(filters.limitNumber)
        .skip(filters.skip)
        .lean(),
      this.model
        .countDocuments(dbQuery)
    ])

    return { tenants, total }
  }
}