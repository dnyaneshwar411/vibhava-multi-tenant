import LedgerEntry from "../models/ledger.model.js";
import { CreateLedgerInput, UpdateLedgerInput } from "../../../api/schemas/ledger.schema.js";
import { ObjectIdQueryTypeCasting, QueryFilter } from "mongoose";
import { PaginationOptions } from "../../../common/utils/pagination.js";

export default class LedgerRepository {
  private static model = LedgerEntry;

  static async paginate(organizationId: ObjectIdQueryTypeCasting, filters: PaginationOptions) {
    const dbQuery: Record<string, object | string> = { organization: organizationId };
    
    const [entries, total] = await Promise.all([
      this.model
        .find(dbQuery)
        .limit(filters.limitNumber)
        .skip(filters.pageNumber - 1)
        .lean(),
      this.model.countDocuments(dbQuery)
    ]);

    return { entries, total };
  }

  static async findById(organizationId: ObjectIdQueryTypeCasting, entryId: string) {
    return await this.model.findOne({ organization: organizationId, _id: entryId }).lean();
  }

  static async create(payload: CreateLedgerInput["body"] & { organization: ObjectIdQueryTypeCasting, createdBy: ObjectIdQueryTypeCasting }) {
    return await this.model.create(payload);
  }

  static async updateOne(
    query: { organization: ObjectIdQueryTypeCasting, _id: string },
    payload: UpdateLedgerInput["body"]
  ) {
    return await this.model.findOneAndUpdate(query, { $set: payload }, { new: true });
  }

  // Placeholder methods for upcoming features
  static async reverseEntry(organizationId: ObjectIdQueryTypeCasting, entryId: string) {
    return { success: true };
  }

  static async updateTenantBalance(organizationId: ObjectIdQueryTypeCasting, tenantId: string) {
    return { success: true };
  }

  static async chargeRent(organizationId: ObjectIdQueryTypeCasting) {
    return { success: true };
  }

  static async profitLoss(organizationId: ObjectIdQueryTypeCasting) {
    return { success: true };
  }

  static async rentRoll(organizationId: ObjectIdQueryTypeCasting) {
    return { success: true };
  }

  static async exists(filters: QueryFilter<{}>) {
    return await this.model.exists(filters)
  }

  static async latestPayableRent(filters: QueryFilter<{}>) {
    return await this.model
      .findOne(filters, { sort: { "period.startDate": -1 }, })
      .select("period")
      .lean()
  }
}