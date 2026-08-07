import Vendor from "../models/vendor.model.js";
import { CreateVendorInput, UpdateVendorInput } from "../../../api/schemas/vendor.schema.js";
import mongoose, { ClientSession, ObjectIdQueryTypeCasting, QueryFilter, UpdateQuery } from "mongoose";
import { PaginationOptions } from "../../../common/utils/pagination.js";
import MaintenanceRepository from "./maintenance.repository.js";
import Scope from "../models/scopesMap.model.js";

export default class VendorRepository {
  private static model = Vendor;

  static async paginate(organizationId: ObjectIdQueryTypeCasting, filters: Record<string, any>) {
    const dbQuery: Record<string, object | string | boolean> = { organization: organizationId };
    if (typeof filters.query === "string" && filters.query.length > 3) {
      dbQuery.name = { $regex: filters.query, $options: "i" };
    }

    if(filters.status) {
      dbQuery.status = filters.status;
    }

    if(filters.tradeCategory) {
      dbQuery.tradeCategory = { $in: filters.tradeCategory.split(",") };
    }

    if (filters.searchByLocation && typeof filters.query === "string" && filters.query.length > 3) {
      dbQuery["address.street1"] = { $regex: filters.query, $options: "i" };
      dbQuery["address.street2"] = { $regex: filters.query, $options: "i" };
      dbQuery["address.city"] = { $regex: filters.query, $options: "i" };
      dbQuery["address.country"] = { $regex: filters.query, $options: "i" };
    }

    const [vendors, total] = await Promise.all([
      this.model
        .find(dbQuery)
        .limit(filters.limitNumber)
        .skip(filters.skip)
        .lean(),
      this.model.countDocuments(dbQuery)
    ]);

    return {
      vendors,
      total
    };
  }

  static async findById(organizationId: ObjectIdQueryTypeCasting, vendorId: string) {
    return await this.model.findOne({ organization: organizationId, _id: vendorId }).lean();
  }

  static async createWithSession(
    payload: CreateVendorInput["body"] & { organization: ObjectIdQueryTypeCasting },
    session: ClientSession,
  ) {
    return await this.model.create([payload], { session });
  }

  static async updateOne(
    query: { organization: ObjectIdQueryTypeCasting, _id: string },
    payload: UpdateVendorInput["body"] |
    { isDeleted: boolean }
  ) {
    return await this.model.findOneAndUpdate(query, { $set: payload }, { new: true });
  }

  static async deleteOne(query: { organization: ObjectIdQueryTypeCasting, _id: string }) {
    return await this.model.findOneAndDelete(query);
  }

  static async getPerformance(organizationId: ObjectIdQueryTypeCasting, vendorId: string) {
    return await MaintenanceRepository.getVendorPerformanceMetrics(organizationId, vendorId);
  }

  static async manageScopes(
    filter: QueryFilter<{}>,
    updateQuery: UpdateQuery<{}>
  ) {
    return this.model.findOneAndUpdate(filter, updateQuery);
  }

  static async getVendorFilter(filter: QueryFilter<{}>) {
    return await this.model
      .findOne(filter)
      .populate("organization", "owner subdomain")
      .select("+password")
      // .select("-updatedAt -__v")
      .lean();
  }
}