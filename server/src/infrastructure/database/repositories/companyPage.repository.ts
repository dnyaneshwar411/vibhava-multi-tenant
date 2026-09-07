import { ObjectIdQueryTypeCasting } from "mongoose";
import CompanyPage from "../models/companyPages.model.js";
import { UpdateOrganizationPagesInput } from "../../../api/schemas/organization.schema.js";
import { CONSTANTS_TYPE } from "../../../common/types/index.js";

export default class CompanyPageRepository {
  private static model = CompanyPage;

  static async retrieveOrganiationPages(organizationId: ObjectIdQueryTypeCasting) {
    return this.model
      .find({ organization: organizationId })
      .select("-updatedAt -createdAt -organization")
      .lean()
  }

  static async updateOrganiationPages(
    organizationId: ObjectIdQueryTypeCasting,
    payload: UpdateOrganizationPagesInput["body"]
  ) {
    const queries: any[] = []

    payload.pages.forEach(page => queries.push({
      updateOne: {
        filter: { organization: organizationId, page: page.page },
        update: { html: page.html }
      }
    }))

    await this.model.bulkWrite(queries);
  }

  static async retrieveCompanyPageType(organizationId: ObjectIdQueryTypeCasting, type: CONSTANTS_TYPE["ORGANIZATION_COMPANY_PAGE"]) {
    return this.model
      .findOne({ organization: organizationId, page: type })
      .select("html")
      .lean()
  }
}