import { Request, Response } from "express";
import httpStatus from "http-status";
import catchAsync from "../utils/catchAsync.js";
import OrganizationRepository from "../../infrastructure/database/repositories/organization.repository.js";
import { ApiError } from "../utils/apiError.js";
import AuditLogService from "../../core/services/auditLog.service.js";
import CompanyPageRepository from "../../infrastructure/database/repositories/companyPage.repository.js";
import { CONSTANTS_TYPE } from "../../common/types/index.js";
import { validateTenant } from "../middlewares/auth.middleware.js";
import { EventOrchestrator } from "../../core/events/eventBus.js";

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

  static retrieveCompanyPages = catchAsync(
    async function (req: Request, res: Response) {
      const data = await CompanyPageRepository.retrieveOrganiationPages(req.organization!)
      res.status(httpStatus.OK).json({ code: httpStatus.OK, data })
    }
  )

  static updateCompanyPage = catchAsync(
    async function (req: Request, res: Response) {
      await CompanyPageRepository.updateOrganiationPages(req.organization!, req.body)
      EventOrchestrator.publish("ISRPages", {
        type: "ISRPages",
        organization: req.organization!
      })
      res.status(httpStatus.OK).json({ code: httpStatus.OK, message: "Successfull" })
    }
  )

  static retrieveCompanyPageType = catchAsync(
    async function (req: Request, res: Response) {
      const { success: validRequest, subdomain } = validateTenant(req);
      if (!validRequest) throw new ApiError(httpStatus.NOT_FOUND, "Not Available");

      const { type } = req.params as { type: CONSTANTS_TYPE["ORGANIZATION_COMPANY_PAGE"] };
      const { success, message, html } = await OrganizationRepository.retrieveCompanyPageType(subdomain!, type)
      if (!success) throw new ApiError(httpStatus.NOT_FOUND, message || "Not Available");

      res.status(httpStatus.OK).json({ code: httpStatus.OK, data: html })
    }
  )

  static updateCompanyPageType = catchAsync(
    async function (req: Request, res: Response) {
      res.status(httpStatus.OK).json({ code: httpStatus.OK, message: "Successfull" })
    }
  )
}