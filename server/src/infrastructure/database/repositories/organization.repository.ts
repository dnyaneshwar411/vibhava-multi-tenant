import { UpdateOrganizationInput } from "../../../api/schemas/organization.schema.js";
import Organization from "../models/organization.model.js";

export default class OrganizationRepository {
  private static model = Organization;

  static async findById(organizationId: string) {
    const organiztion = await this.model
      .findById(organizationId)
      .select("-updatedAt -subscription")
      .lean()
    if (!organiztion) return { success: false, message: "Organization Not found!" }
    return { success: true, data: organiztion }
  }

  static updateById: (organizationId: string, payload: UpdateOrganizationInput) => Promise<
    { success: false, message: string } |
    { success: true, message?: never }
  > = async (organizationId, payload) => {
    const organizationDoc = await this.model.findByIdAndUpdate(organizationId, {
      $set: payload
    }, { returnDocument: "after" })
    if (!organizationDoc) return { success: false, message: "Invalid Request" }
    return { success: true }
  }
}