import { ObjectIdQueryTypeCasting } from "mongoose";
import { CreatePropertySchema, UpdatePropertySchema } from "../../../api/schemas/property.schema.js";
import Property from "../models/property.model.js";
import { PaginationOptions } from "../../../common/utils/pagination.js";

export default class PropertyRepository {
  private static model = Property;

  static async OrganizationPropertiesPaginate(organization: ObjectIdQueryTypeCasting, filters: PaginationOptions) {
    const dbQuery: Record<string, object | string | boolean> = { organization, isDeleted: false }
    if (typeof filters.query === "string" && filters.query.length > 3) {
      dbQuery.name = { $regex: filters.query, $options: "i" }
    }

    const [properties, total] = await Promise.all([
      this.model
        .find(dbQuery)
        .select("-updatedAt -__v -address -createdBy -finance -media.gallery -media.coverImage -organization")
        // .select("")
        .limit(filters.limitNumber)
        .skip(filters.pageNumber - 1)
        .lean(),
      this.model.countDocuments(dbQuery)
    ]);

    // tbd s3 key mapping s3 service in infrastructure.

    return {
      properties,
      total
    };
  }

  static create: (payload: CreatePropertySchema["body"] & { manager: ObjectIdQueryTypeCasting }) => Promise<
    { success: boolean }
  > = async (payload) => {
    const property = await this.model.create(payload);
    if (!property) return { success: false };
    return { success: true };
  }

  static async findOrganizationProperty(organization: ObjectIdQueryTypeCasting, propertyId: ObjectIdQueryTypeCasting) {
    const property = await this.model
      .findOne({ organization, _id: propertyId, isDeleted: false })
      .select("-updatedAt -__v")
      .populate("createdBy", "name avatar countryCode mobileNumber")
      .populate("manager", "name avatar countryCode mobileNumber")
      .lean()
    return property;
  }

  static update: (
    organizationId: ObjectIdQueryTypeCasting,
    propertyId: ObjectIdQueryTypeCasting,
    payload: UpdatePropertySchema["body"]
  ) => Promise<{ success: boolean }> = async (organizationId, propertyId, payload) => {
    const property = await this.model.findOneAndUpdate({
      organization: organizationId,
      _id: propertyId
    }, {
      $set: payload
    }, { returnDocument: "after" });
    if (!property) return { success: false };
    return { success: true };
  }

  static async delete(
    organizationId: ObjectIdQueryTypeCasting,
    propertyId: ObjectIdQueryTypeCasting
  ) {
    return !!await this.model.findOneAndUpdate({
      organization: organizationId,
      _id: propertyId
    }, {
      $set: { isDeleted: true }
    }, { returnDocument: "after" });
  }
}