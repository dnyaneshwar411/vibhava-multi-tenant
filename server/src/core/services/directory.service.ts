import { ObjectIdQueryTypeCasting } from "mongoose";
import UserRepository from "../../infrastructure/database/repositories/user.repository.js";
import { CONSTANTS_TYPE } from "../../common/types/index.js";
import { PaginationOptions } from "../../common/utils/pagination.js";

export default class DirectoryService {
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