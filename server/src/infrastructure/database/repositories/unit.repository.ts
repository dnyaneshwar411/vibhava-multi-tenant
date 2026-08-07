import { ObjectIdQueryTypeCasting, QueryFilter } from "mongoose";
import Unit from "../models/unit.model.js";
import { CreateUnitInput, UpdateUnitInput } from "../../../api/schemas/unit.schema.js";

export default class UnitRepository {
  private static model = Unit

  static async findPropertyUnits(
    organizationId: ObjectIdQueryTypeCasting,
    propertyId: ObjectIdQueryTypeCasting
  ) {
    return await this.model
      .find({ organization: organizationId, property: propertyId, isDeleted: false })
      .select("-specifications -media.gallery -media.coverImage -updatedAt -__v -finance")
      .lean()
  }

  static async createOrganizationPropertyUnit(
    payload: CreateUnitInput["body"] & {
      organization: ObjectIdQueryTypeCasting,
      property: ObjectIdQueryTypeCasting
    }
  ) {
    return !!await this.model.create(payload)
  }

  static async findById(
    organizationId: ObjectIdQueryTypeCasting,
    unitId: ObjectIdQueryTypeCasting
  ) {
    return await this.model
      .findOne({ organization: organizationId, _id: unitId })
      .select("-updatedAt -__v")
      .populate("createdBy", "name avatar countryCode mobileNumber")
      .populate("property", "name propertyType status media.primaryImage")
      .lean()
  }

  static async update(
    organizationId: ObjectIdQueryTypeCasting,
    unitId: ObjectIdQueryTypeCasting,
    payload: UpdateUnitInput["body"]
  ) {
    return !! await this.model
      .findOneAndUpdate({ organization: organizationId, _id: unitId }, {
        $set: payload
      }, {
        returnDocument: "after"
      })
  }

  static async delete(
    organizationId: ObjectIdQueryTypeCasting,
    unitId: ObjectIdQueryTypeCasting,
  ) {
    return await this.model.findOneAndUpdate({ _id: unitId, organization: organizationId }, {
      $set: { isDeleted: true }
    }, {
      returnDocument: "after"
    })
  }

  static async paginate(organizationId: ObjectIdQueryTypeCasting, filters: Record<string, any>) {
      const dbQuery: QueryFilter<{}> = {
        organization: organizationId
      }
  
      if(filters.status) {
        dbQuery.status = filters.status;
      }
  
      if(filters.unitType) {
        dbQuery.unitType = { $in: filters.unitType.split(",") };
      }
  
      if(filters.floor) {
        dbQuery.floor = { $in: filters.floor.split(",") };
      }

      if(filters.property) {
        dbQuery.property = filters.property;
      }
  
      if (filters.searchByLocation && typeof filters.query === "string" && filters.query.length > 3) {
        dbQuery["address.street1"] = { $regex: filters.query, $options: "i" };
        dbQuery["address.street2"] = { $regex: filters.query, $options: "i" };
        dbQuery["address.city"] = { $regex: filters.query, $options: "i" };
        dbQuery["address.country"] = { $regex: filters.query, $options: "i" };
      }
  
      const [units, total] = await Promise.all([
        this.model
          .find(dbQuery)
          .select("unitNumber floor unitType status")
          .populate("property", "name")
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
        units
      }
    }
}