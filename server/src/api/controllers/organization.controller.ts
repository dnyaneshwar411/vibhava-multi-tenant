import { Request, Response } from "express";
import httpStatus from "http-status";
import catchAsync from "../utils/catchAsync.js";
import OrganizationRepository from "../../infrastructure/database/repositories/organization.repository.js";
import { ApiError } from "../utils/apiError.js";
import AuditLogService from "../../core/services/auditLog.service.js";

export default class OrganizationController {
  static retrieve = catchAsync(
    async function (req: Request, res: Response) {
      const { success, message, data } = await OrganizationRepository.findById(req.organization as string);
      if (!success) throw new ApiError(httpStatus.NOT_FOUND, message!);
      res.status(httpStatus.OK).json({ code: httpStatus.OK, data });
    }
  )

  static updateOrganization = catchAsync(
    async function (req: Request, res: Response) {
      const { success, message } = await OrganizationRepository.updateById(req.organization!, req.body);
      if (!success) throw new ApiError(httpStatus.BAD_REQUEST, message);
      AuditLogService.addLogMeta(req, {
        action: "UPDATE",
        resource: "Organization",
        resourceId: req.organization,
      })
      res.status(httpStatus.OK).json({ code: httpStatus.OK, message: "Successfully Updated" });
    }
  )
}