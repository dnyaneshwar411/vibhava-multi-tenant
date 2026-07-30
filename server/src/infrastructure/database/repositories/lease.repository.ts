import { ObjectIdQueryTypeCasting } from "mongoose";
import Lease from "../models/lease.model.js";
import { PaginationOptions } from "../../../common/utils/pagination.js";
import { CreateLeaseInput, UpdateLeaseInput } from "../../../api/schemas/lease.schema.js";

export default class LeaseRepository {
  private static model = Lease;

  static async organizationLeasesPaginate(
    organizationId: ObjectIdQueryTypeCasting,
    filters: PaginationOptions
  ) {
    const dbQuery = { organization: organizationId, isDeleted: false }

    const [leases, total] = await Promise.all([
      this.model.find(dbQuery)
        .select("-finance -security -leaseAgreementDocument -startDate -endDate -moveInDate -moveOutDate -primaryTenant -coTenants -createdBy -organization -isDeleted -updatedAt -__v")
        .populate("property", "name status media.primaryImage")
        .populate("unit", "unitType unitNumber status media.primaryImage")
        .limit(filters.limitNumber)
        .skip(filters.pageNumber - 1)
        .lean(),
      this.model.countDocuments(dbQuery)
    ])

    return {
      leases,
      total
    }
  }

  static async getOrganizationLeaseById(organizationId: ObjectIdQueryTypeCasting, leaseId: ObjectIdQueryTypeCasting) {
    return await this.model
      .findOne({ organization: organizationId, _id: leaseId })
      .select("-updatedAt -__v -organization -primaryTenant -coTenants -leaseAgreementDocument")
      .populate("property", "name status media.primaryImage")
      .populate("createdBy", "name avatar countryCode mobileNumber")
      .populate("unit", "unitType unitNumber status media.primaryImage")
      .lean()
  }

  static async create(payload: CreateLeaseInput["body"]) {
    return await this.model.create(payload)
  }

  static async findUpdateOrganizationLease(
    organizationId: ObjectIdQueryTypeCasting,
    leaseId: ObjectIdQueryTypeCasting,
    payload: UpdateLeaseInput["body"] |
    { isDeleted: boolean }
  ) {
    return await this.model.findOneAndUpdate({
      organization: organizationId,
      _id: leaseId
    }, {
      $set: payload
    }, { returnDocument: "after" })
  }

  static async findLeaseTenants(organizationId: ObjectIdQueryTypeCasting, leaseId: ObjectIdQueryTypeCasting) {
    return this.model
      .findOne({ _id: leaseId, organization: organizationId })
      .select("primaryTenant coTenants")
      .populate("primaryTenant", "name avatar countryCode mobileNumber")
      .populate("coTenants", "name avatar countryCode mobileNumber")
      .lean()
  }
}