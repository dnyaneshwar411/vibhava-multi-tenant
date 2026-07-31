import { QueryFilter } from "mongoose";
import { PaginationOptions } from "../../common/utils/pagination.js";
import OperatorRepository from "../../infrastructure/database/repositories/operator.repository.js";
import { hashString } from "../../common/utils/hash.js";
import S3 from "../../infrastructure/providers/aws/s3.js";

export default class OperatorService {
  private static async resolveS3Image(operator: any) {
    if (operator.avatar && operator.avatar.key) {
      operator.avatar = await S3.getObjectUrl({ isPrivate: operator.avatar.private, key: operator.avatar.key })
    }
    return operator
  }

  static async paginate(filters: PaginationOptions) {
    const dbQuery: QueryFilter<{}> = {}
    if (filters.query) {
      dbQuery.$or = [
        { name: { $regex: filters.query, $options: "i" } },
        { email: { $regex: filters.query, $options: "i" } }
      ]
    }

    const [result, total] = await Promise.all([
      OperatorRepository.find(dbQuery),
      OperatorRepository.countDocuments(dbQuery)
    ])

    const operators = await Promise.all(
      result.map(user => this.resolveS3Image(user))
    )

    return { operators, total }
  }

  static async create(payload: any) {
    if (payload.password) payload.password = await hashString(payload.password);
    const { password, updatedAt, ...operator } = await OperatorRepository.create(payload);
    return operator;
  }
}