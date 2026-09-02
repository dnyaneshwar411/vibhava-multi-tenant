import Vendor from "../models/vendor.model.js";
import { CreateVendorInput, UpdateVendorInput } from "../../../api/schemas/vendor.schema.js";
import { ClientSession, ObjectIdQueryTypeCasting, QueryFilter, UpdateQuery } from "mongoose";
import MaintenanceRepository from "./maintenance.repository.js";
import S3 from "../../providers/aws/s3.js";

export default class VendorRepository {
  private static model = Vendor;

  static async paginate(organizationId: ObjectIdQueryTypeCasting, filters: Record<string, any>) {
    const dbQuery: Record<string, object | string | boolean> = { organization: organizationId };

    if (filters.status && filters.status.length > 3) {
      dbQuery.status = { $in: filters.status.split(",") };
    }

    if(filters.tradeCategory) {
      dbQuery.tradeCategory = { $in: filters.tradeCategory.split(",") };
    }

    if (filters.searchByLocation && typeof filters.query === "string" && filters.query.length > 3) {
      dbQuery.$or = [
        { name: { $regex: filters.query, $options: "i" } },
        { "address.street1": { $regex: filters.query, $options: "i" } },
        { "address.street2": { $regex: filters.query, $options: "i" } },
        { "address.city": { $regex: filters.query, $options: "i" } },
        { "address.country": { $regex: filters.query, $options: "i" } },
      ];
    } else if (typeof filters.query === "string" && filters.query.length > 3) {
      dbQuery.name = { $regex: filters.query, $options: "i" };
    }

    const [vendorsList, total] = await Promise.all([
      this.model
        .find(dbQuery)
        .limit(filters.limitNumber)
        .skip(filters.skip)
        .select("-__v -isDeleted -updatedAt")
        .lean(),
      this.model.countDocuments(dbQuery)
    ]);

    const vendors = await Promise.all(
      vendorsList.map(async vendor => ({
        ...vendor,
        avatar: await S3.getObjectUrl({
          isPrivate: vendor.avatar?.private,
          key: vendor.avatar?.key!
         })
      }))
    )

    return {
      vendors,
      total
    };
  }

  static async findById(organizationId: ObjectIdQueryTypeCasting, vendorId: string) {
    const vendor: any = await this.model
    .findOne({ organization: organizationId, _id: vendorId })
    .select("-__v -isDeleted -organization")
    .lean();

    if(!vendor) return null

    if(vendor?.avatar && vendor.avatar?.key) {
      vendor.avatar = await S3.getObjectUrl({
        isPrivate: vendor.avatar.private,
        key: vendor.avatar.key,
      })
    }

    return vendor
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
    return await this.updateOne(query, { isDeleted: true });
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