import { ObjectIdQueryTypeCasting, QueryFilter } from "mongoose";
import Tenant from "../models/tenant.model.js";
import S3 from "../../providers/aws/s3.js";

export default class TenantRepository {
  private static model = Tenant;

  static async getOrganizationTenant(organization: ObjectIdQueryTypeCasting, tenantId: ObjectIdQueryTypeCasting) {
    const tenant: any = await this.model
      .findOne({ organization, _id: tenantId })
      .select("-organziation -__v -updatedAt -password")
      .populate("currentResidence.property", "name propertyType status amenities address")
      .populate("currentResidence.unit", "unitNumber unitType status finance")
      .populate("currentResidence.activeLease", "leaseType status startDate endDate moveInDate finance security")
      .lean()
    if (tenant?.avatar?.key) {
      tenant.avatar = await S3.getObjectUrl({ isPrivate: tenant.avatar.private, key: tenant.avatar.key })
    }
    return tenant
  }

  static async paginate(organizationId: ObjectIdQueryTypeCasting, filters: QueryFilter<{}>) {
    const dbQuery: QueryFilter<{}> = { isDeleted: false, organization: organizationId }
    if (filters.query) {
      dbQuery.$or = [
        { name: { $regex: filters.query, $options: "i" } },
        { email: { $regex: filters.query, $options: "i" } }
      ]
    }

    if (filters.status && filters.status.length > 0) {
      dbQuery.status = { $in: filters.status }
    }

    const [tenants, total] = await Promise.all([
      this.model
        .find(dbQuery)
        .select("name name email mobileNumber countryCode status")
        .limit(filters.limitNumber)
        .skip(filters.skip)
        .lean(),
      this.model
        .countDocuments(dbQuery)
    ])

    return { tenants, total }
  }

  static async getTenantFilter(filter: QueryFilter<{}>) {
    return await this.model
      .findOne(filter)
      .populate("organization", "owner subdomain")
      .select("+password")
      // .select("-updatedAt -__v")
      .lean();
  }

  static async resolveForEmails(ids: ObjectIdQueryTypeCasting[]) {
    return this.model
      .find({ _id: { $in: ids } })
      .select("name email mobileNumber")
      .lean()
  }
}