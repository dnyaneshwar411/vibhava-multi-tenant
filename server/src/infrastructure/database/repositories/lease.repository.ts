import { ObjectIdQueryTypeCasting, QueryFilter } from "mongoose";
import Lease from "../models/lease.model.js";
import { PaginationOptions } from "../../../common/utils/pagination.js";
import { CreateLeaseInput, UpdateLeaseInput } from "../../../api/schemas/lease.schema.js";
import S3 from "../../providers/aws/s3.js";
import { EventOrchestrator } from "../../../core/events/eventBus.js";
import Logger from "../../../common/logger/index.js";

export default class LeaseRepository {
  private static model = Lease;

  static normalizeDoc(doc: any) {
    return doc.toObject ? doc.toObject() : doc
  }

  static async findOne(query: QueryFilter<{}>) {
    return await this
      .model
      .findOne(query)
      .select("startDate endDate property finance leaseType")
      .populate("property", "name")
      .populate("unit", "unitType unitNumber")
      .populate("primaryTenant", "name email mobileNumber countryCode")
      .populate("coTenants", "name email mobileNumber countryCode")
      .lean();
  }

  static async organizationLeasesPaginate(
    organizationId: ObjectIdQueryTypeCasting,
    filters: PaginationOptions & {
      status?: string
      leaseType?: string
    }
  ) {
    const dbQuery: QueryFilter<{}> = { organization: organizationId, isDeleted: false }

    if (typeof filters.status === "string" && filters.status.length > 4) {
      dbQuery.status = { $in: filters.status.split(",") }
    }

    if (typeof filters.leaseType === "string" && filters.leaseType.length > 4) {
      dbQuery.leaseType = { $in: filters.leaseType.split(",") }
    }

    const [leases, total] = await Promise.all([
      this.model.find(dbQuery)
        .select("-finance -security -leaseAgreementDocument -startDate -endDate -moveInDate -moveOutDate -primaryTenant -coTenants -createdBy -organization -isDeleted -updatedAt -__v")
        .populate("property", "name")
        .populate("unit", "unitType unitNumber")
        .populate("leaseAgreementDocument", "cloud")
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
    const lease: any = await this.model
      .findOne({ organization: organizationId, _id: leaseId })
      .select("-updatedAt -isDeleted -__v -organization -primaryTenant -coTenants -leaseAgreementDocument")
      .populate("property", "name status address")
      .populate("createdBy", "name avatar countryCode mobileNumber")
      .populate("unit", "unitType unitNumber status")
      .populate("primaryTenant", "name status email mobileNumber countryCode")
      .populate("coTenants", "name status email mobileNumber countryCode")
      .populate("leaseAgreementDocument", "cloud meta")
      .lean()
    if (!lease) return null

    if (lease.leaseAgreementDocument && lease.leaseAgreementDocument.cloud?.key) {
      lease.leaseAgreementDocument.url = await S3.getObjectUrl({
        isPrivate: lease.leaseAgreementDocument?.cloud?.private,
        key: lease.leaseAgreementDocument?.cloud?.key,
      })
      delete lease.leaseAgreementDocument.cloud
    }

    return lease
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

  static async getActiveUnitLeaseTenants(dbQuery: QueryFilter<{}>): Promise<{
    success: true;
    data: any
  } | {
    success: false;
    message: string
  }> {
    const lease: any = await this.model
      .findOne(dbQuery)
      .select("coTenants primaryTenant")
      .populate("primaryTenant", "name email mobileNumber countryCode avatar status")
      .populate("coTenants", "name email mobileNumber countryCode avatar status")
      .lean()
    if (!lease) return {
      success: false,
      message: "Data not found!"
    }
    return {
      success: true,
      data: {
        primaryTenant: lease.primaryTenant,
        coTenants: lease.coTenants
      }
    }
  }

  static async getUnitActiveLeae(dbQuery: QueryFilter<{}>) {
    const unit = await this.model
      .findOne(dbQuery)
      .populate("createdBy", "name email mobileNumber countryCode avatar")
      .populate("leaseAgreementDocument", "title status category meta")
      .lean()
    return unit
  }

  static async notify(organizationId: ObjectIdQueryTypeCasting, leaseId: ObjectIdQueryTypeCasting) {
    const lease = await this.getOrganizationLeaseById(organizationId, leaseId)
    if (!lease) return
    EventOrchestrator.publish("EMAILS", {
      type: "EMAILS",
      entity: "LEASE_CREATED",
      payload: {
        ...lease,
        from: "Vibhava",
        subject: `Lease Agreement Confirmed - [${lease.property?.name || "Property"} / ${lease.unit?.unitNumber || "Unit"}]`,
        to: lease.primaryTenant?.email,
        cc: (lease.coTenants)
          .map((tenant: any) => tenant.email),
      }
    })
  }

  static processExpiringLeasesCursor(filters: QueryFilter<{}>) {
    return this.model
      .find(filters)
      .select("property unit startDate endDate leaseType primaryTenant coTenants createdBy")
      .populate("createdBy", "name")
      .populate({
        path: "organization",
        select: "owner",
        populate: {
          path: "owner",
          select: "email",
        },
      })
      .populate("property", "name")
      .populate("unit", "unitNumber")
      .populate("coTenants", "name email countryCode mobileNumber")
      .populate("primaryTenant", "name email countryCode mobileNumber")
      .cursor()
  }

  static async batchUpdates(updates: any) {
    await this.model.bulkWrite(updates);
  }
}