import { QueryFilter } from "mongoose";
import { PaginationOptions } from "../../common/utils/pagination.js";
import OperatorRepository from "../../infrastructure/database/repositories/operator.repository.js";
import { hashString } from "../../common/utils/hash.js";

export default class OperatorService {
  static async paginate(filters: PaginationOptions) {
    const dbQuery: QueryFilter<{}> = {}
    if (filters.query) {
      dbQuery.$or = [
        { name: { $regex: filters.query, $options: "i" } },
        { email: { $regex: filters.query, $options: "i" } }
      ]
    }

    const [operators, total] = await Promise.all([
      OperatorRepository.find(dbQuery),
      OperatorRepository.countDocuments(dbQuery)
    ])

    return { operators, total }
  }

  static async create(payload: any) {
    if (payload.password) payload.password = await hashString(payload.password);
    const { password, updatedAt, ...operator } = await OperatorRepository.create(payload);
    return operator;
  }
}