import { Request, Response } from "express";
import catchAsync from "../utils/catchAsync.js";
import httpStatus from "http-status";
import AuditLogRepository from "../../infrastructure/database/repositories/auditLog.repository.js";
import { buildPaginationFilters, PaginationQueryOptions } from "../../common/utils/pagination.js";

export default class AuditLogsController {
  static getLogs = catchAsync(async (req: Request, res: Response) => {
    const pagination = buildPaginationFilters<{}, { total?: number }>(req.query as PaginationQueryOptions);
    const { logs, total } = await AuditLogRepository.paginate(req.organization!, pagination);
    pagination.total = total;
    res.status(httpStatus.OK).json({ code: httpStatus.OK, data: logs, pagination });
  });

  static getResourceLogs = catchAsync(async (req: Request, res: Response) => {
    const { resourceId } = req.params as { resourceId: string };
    const logs = await AuditLogRepository.getByResourceId(req.organization!, resourceId);
    res.status(httpStatus.OK).json({ code: httpStatus.OK, data: logs });
  });
}
