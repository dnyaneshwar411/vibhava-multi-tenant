import AuditLog from "../models/auditLog.model.js";
import { ObjectIdQueryTypeCasting } from "mongoose";
import { PaginationOptions } from "../../../common/utils/pagination.js";

export default class AuditLogRepository {
  private static model = AuditLog;

  static async paginate(organizationId: ObjectIdQueryTypeCasting, filters: PaginationOptions) {
    const dbQuery: Record<string, object | string> = { organization: organizationId };

    const [logs, total] = await Promise.all([
      this.model
        .find(dbQuery)
        .sort({ createdAt: -1 })
        .limit(filters.limitNumber)
        .skip(filters.pageNumber - 1)
        .lean(),
      this.model.countDocuments(dbQuery)
    ]);

    return { logs, total };
  }

  static async getByResourceId(organizationId: ObjectIdQueryTypeCasting, resourceId: string) {
    return await this.model
      .find({ organization: organizationId, resourceId: resourceId })
      .sort({ createdAt: -1 })
      .lean();
  }
}
