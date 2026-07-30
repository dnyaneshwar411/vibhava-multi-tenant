import Vendor from "../models/vendor.model.js";
import { CreateVendorInput, UpdateVendorInput } from "../../../api/schemas/vendor.schema.js";
import { ObjectIdQueryTypeCasting } from "mongoose";
import { PaginationOptions } from "../../../common/utils/pagination.js";
import MaintenanceRepository from "./maintenance.repository.js";

export default class VendorRepository {
  private static model = Vendor;

  static async paginate(organizationId: ObjectIdQueryTypeCasting, filters: PaginationOptions) {
    const dbQuery: Record<string, object | string | boolean> = { organization: organizationId };
    if (typeof filters.query === "string" && filters.query.length > 3) {
      dbQuery.name = { $regex: filters.query, $options: "i" };
    }

    const [vendors, total] = await Promise.all([
      this.model
        .find(dbQuery)
        .limit(filters.limitNumber)
        .skip(filters.pageNumber - 1)
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

  static async create(payload: CreateVendorInput["body"] & { organization: ObjectIdQueryTypeCasting }) {
    return await this.model.create(payload);
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
}