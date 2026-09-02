import { ObjectIdQueryTypeCasting } from "mongoose";
import { PaginationOptions } from "../../../common/utils/pagination.js";
import MembershipInvoice from "../models/membershipInvoice.model.js";

export default class MembershipInvoiceRepository {
  private static model = MembershipInvoice;

  static async paginate(organizationId: ObjectIdQueryTypeCasting, filters: PaginationOptions) {
    const dbQuery = { organization: organizationId }

    const [invoices, total] = await Promise.all([
      this.model
        .find(dbQuery)
        .select("-organization -paymentDetails -updatedAt -__v")
        .limit(filters.limitNumber)
        .skip(filters.skip)
        .lean(),
      this.model
        .countDocuments(dbQuery)
    ])

    return {
      invoices,
      pagination: {
        ...filters,
        total
      }
    }
  }
}