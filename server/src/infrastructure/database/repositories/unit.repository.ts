import { ObjectIdQueryTypeCasting } from "mongoose";
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
}