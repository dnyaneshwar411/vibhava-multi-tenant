import { ObjectIdQueryTypeCasting, QueryFilter } from "mongoose";
import Membership from "../models/membership.model.js";
import { PaginationOptions } from "../../../common/utils/pagination.js";
import MembershipInvoiceRepository from "./membershipInvoice.repository.js";


export default class MembershipRepository {
  private static model = Membership;

  static async find(options: QueryFilter<{}>) {
    return await this.model
      .findOne(options)
      .select("organization tier status billingCycle currentPeriodStart currentPeriodEnd")
      .lean()
  }

  static async update(options: QueryFilter<{}>, payload: any) {
    return await this.model
      .findOneAndUpdate(options, {
        $set: payload
      }, {
        returnDocument: "after"
      })
  }

  static async retrieveOrganizationMemberships(
    organizationId: ObjectIdQueryTypeCasting,
    filters: PaginationOptions
  ) {
    const [membershipConfig, { pagination, invoices }] = await Promise.all([
      this.model
        .findOne({ organization: organizationId })
        .select("-__v -updatedAt -createdAt -entitlements -razorpay -stripe")
        .lean(),
      MembershipInvoiceRepository.paginate(organizationId, filters)
    ])

    return {
      config: membershipConfig,
      invoices,
      pagination,
    }
  }

  static processExpiringMembershipCursor(filters: QueryFilter<{}>) {
    return this.model
      .find(filters)
      .select("endDate organization tier currentPeriodEnd currentPeriodStart")
      .populate({
        path: "organization",
        select: "name owner subdomain",
        populate: {
          path: "owner",
          select: "email",
        },
      })
      .cursor()
  }

  static async batchUpdates(updates: any) {
    await this.model.bulkWrite(updates);
  }
}