import AuditLog from "../models/auditLog.model.js";
import { ObjectIdQueryTypeCasting } from "mongoose";

export default class AuditLogRepository {
  private static model = AuditLog;

  static async paginate(organizationId: ObjectIdQueryTypeCasting, filters: any) {
    const dbQuery: Record<string, object | string> = { organization: organizationId };

    const actions = filters.action ? filters.action.split(",") : [];
    const resources = filters.resource ? filters.resource.split(",") : [];
    const actors = filters.actor ? filters.actor.split(",") : [];

    if (actions.length > 0) {
      dbQuery.action = { $in: actions }
    }

    if (resources.length > 0) {
      dbQuery.resource = { $in: resources }
    }

    if (actors.length > 0) {
      dbQuery.actorModel = { $in: actors }
    }

    if (filters.from) {
      dbQuery.createdAt = { $gte: filters.from }
    }

    if (filters.to) {
      dbQuery.createdAt = { $gte: filters.to }
    }

    const [logs, total] = await Promise.all([
      this.model
        .find(dbQuery)
        .select("-organization -context.userAgent -context.requestUrl -context.httpMethod -actorId")
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
