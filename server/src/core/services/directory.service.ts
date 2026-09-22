import { ObjectIdQueryTypeCasting } from "mongoose";
import UserRepository from "../../infrastructure/database/repositories/user.repository.js";
import { CONSTANTS_TYPE } from "../../common/types/index.js";
import { PaginationOptions } from "../../common/utils/pagination.js";
import OrganizationRepository from "../../infrastructure/database/repositories/organization.repository.js";

export default class DirectoryService {
  static async listOrganiations(filters: PaginationOptions & { query: string }) {
    const { result, total } = await OrganizationRepository.paginateOpenOrganizations(filters)
    return {
      pagination: {
        total,
        pageNumber: filters.pageNumber || 1,
        limitNumber: filters.limitNumber || 10,
      },
      organizations: result
    }
  }

  static async listUsers(
    organizationId: ObjectIdQueryTypeCasting,
    query: PaginationOptions & { status: CONSTANTS_TYPE["USER_STATUS"] }
  ) {
    const { total, users } = await UserRepository.paginate(organizationId, query)
    return {
      pagination: {
        total,
        pageNumber: query.pageNumber || 1,
        limitNumber: query.limitNumber || 10,
      },
      users
    }
  }
}