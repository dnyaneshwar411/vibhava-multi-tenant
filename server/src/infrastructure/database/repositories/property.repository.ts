import { ObjectIdQueryTypeCasting, QueryFilter } from "mongoose";
import { CreatePropertySchema, UpdatePropertySchema } from "../../../api/schemas/property.schema.js";
import Property from "../models/property.model.js";
import { PaginationOptions } from "../../../common/utils/pagination.js";
import S3 from "../../providers/aws/s3.js";

export default class PropertyRepository {
  private static model = Property;

  static async resolveS3Image(property: any) {
    if (!property?.media) return property;

    const doc = typeof property.toObject === 'function' ? property.toObject() : property;

    const { primaryImage, coverImage, gallery } = doc.media;

    const [primaryUrl, coverUrl, galleryUrls] = await Promise.all([
      primaryImage?.key
        ? S3.getObjectUrl({ isPrivate: primaryImage.private, key: primaryImage.key })
        : null,
      coverImage?.key
        ? S3.getObjectUrl({ isPrivate: coverImage.private, key: coverImage.key })
        : null,
      Array.isArray(gallery) && gallery.length > 0
        ? Promise.all(
          gallery.map((item: any) =>
            item?.key
              ? S3.getObjectUrl({ isPrivate: item.private, key: item.key }).then((url) => ({
                ...item,
                url,
              }))
              : item
          )
        )
        : [],
    ]);

    if (primaryImage) doc.media.primaryImage = primaryUrl;
    if (coverImage) doc.media.coverImage = coverUrl;
    if (Array.isArray(gallery)) doc.media.gallery = galleryUrls;

    return doc;
  }

  static async paginate(organizationId: ObjectIdQueryTypeCasting, filters: Record<string, any>) {
    const dbQuery: QueryFilter<{}> = {
      organization: organizationId
    }

    if (filters.status) {
      dbQuery.status = filters.status;
    }

    if (filters.amenities) {
      dbQuery.amenities = { $in: filters.amenities.split(",") };
    }

    if (filters.propertyType) {
      dbQuery.propertyType = filters.propertyType;
    }

    if (filters.searchByLocation && typeof filters.query === "string" && filters.query.length > 3) {
      dbQuery["address.street1"] = { $regex: filters.query, $options: "i" };
      dbQuery["address.street2"] = { $regex: filters.query, $options: "i" };
      dbQuery["address.city"] = { $regex: filters.query, $options: "i" };
      dbQuery["address.country"] = { $regex: filters.query, $options: "i" };
    }

    const [properties, total] = await Promise.all([
      this.model
        .find(dbQuery)
        .select("name status propertyType")
        .limit(filters.limitNumber)
        .skip(filters.skip)
        .lean(),
      this.model.countDocuments(dbQuery),
    ])

    return {
      pagination: {
        total,
        page: filters.pageNumber || 1,
        limit: filters.limitNumber || 10,
      },
      properties
    }
  }

  static async OrganizationPropertiesPaginate(organization: ObjectIdQueryTypeCasting, filters: PaginationOptions) {
    const dbQuery: Record<string, object | string | boolean> = { organization, isDeleted: false }
    if (typeof filters.query === "string" && filters.query.length > 3) {
      dbQuery.name = { $regex: filters.query, $options: "i" }
    }

    const [properties, total] = await Promise.all([
      this.model
        .find(dbQuery)
        .select("-updatedAt -__v -address -finance -media.gallery -media.coverImage -organization")
        // .select("")
        .limit(filters.limitNumber)
        .skip(filters.pageNumber - 1)
        .populate("createdBy", "name")
        .lean(),
      this.model.countDocuments(dbQuery)
    ]);

    const resultProperties = await Promise.all(properties.map(property => this.resolveS3Image(property)))
    // tbd s3 key mapping s3 service in infrastructure.

    return {
      properties,
      total
    };
  }

  static create: (payload: CreatePropertySchema["body"] & { manager: ObjectIdQueryTypeCasting }) => Promise<
    { success: boolean, property?: any }
  > = async (payload) => {
    const property = await this.model.create(payload);
    if (!property) return { success: false };
    return { success: true, property };
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
  ) => Promise<{ success: boolean, property?: any }> = async (organizationId, propertyId, payload) => {
    const property = await this.model.findOneAndUpdate({
      organization: organizationId,
      _id: propertyId
    }, {
      $set: payload
    }, { returnDocument: "after" });
    if (!property) return { success: false };
    return { success: true, property };
  }

  static async delete(
    organizationId: ObjectIdQueryTypeCasting,
    propertyId: ObjectIdQueryTypeCasting
  ) {
    return await this.model.findOneAndUpdate({
      organization: organizationId,
      _id: propertyId
    }, {
      $set: { isDeleted: true }
    }, { returnDocument: "after" });
  }
}