import { Request, Response } from "express";
import httpStatus from "http-status";
import catchAsync from "../utils/catchAsync.js";
import TenantService from "../../core/services/tenant.service.js";
import { UnitTenantList } from "../schemas/tenant.schema.js";
import { ApiError } from "../utils/apiError.js";
import { buildPaginationFilters, PaginationQueryOptions } from "../../common/utils/pagination.js";
import { ObjectIdQueryTypeCasting } from "mongoose";
import ScopeService from "../../core/services/scope.service.js";
import AuditLogService from "../../core/services/auditLog.service.js";

export default class TenantController {
  static getUnitTenant = catchAsync(
    async function (req: Request, res: Response) {
      const { unitId } = req.params as UnitTenantList["params"]
      const response = await TenantService.getUnitTenants(req.organization!, unitId)
      if (!response.success) throw new ApiError(httpStatus.NOT_FOUND, response.message)
      res.status(httpStatus.OK).json({ code: httpStatus.OK, data: response.data })
    }
  )

  static create = catchAsync(
    async function (req: Request, res: Response) {
      const tenant = await TenantService.createOrganizationTenant(req.organization!, req.body)
      if (tenant) {
        AuditLogService.addLogMeta(req, {
          action: "CREATE",
          resource: "Tenant",
          resourceId: tenant?._id
        })
      }
      res.status(httpStatus.OK).json({ code: httpStatus.OK, message: "Successfull" })
    }
  )

  static update = catchAsync(
    async function (req: Request, res: Response) {
      const { tenantId } = req.params as { tenantId: ObjectIdQueryTypeCasting }
      const tenant = await TenantService.updateOrganizationTenant(req.organization!, tenantId, req.body)
      if (tenant) {
        AuditLogService.addLogMeta(req, {
          action: "UPDATE",
          resource: "Tenant",
          resourceId: tenant?._id
        })
      }
      res.status(httpStatus.OK).json({ code: httpStatus.OK, message: "Successfull" })
    }
  )

  static delete = catchAsync(
    async function (req: Request, res: Response) {
      const { tenantId } = req.params as { tenantId: ObjectIdQueryTypeCasting }
      const tenant = await TenantService.deleteOrganizationTenant(req.organization!, tenantId)
      if (tenant) {
        AuditLogService.addLogMeta(req, {
          action: "DELETE",
          resource: "Tenant",
          resourceId: tenant?._id
        })
      }
      res.status(httpStatus.OK).json({ code: httpStatus.OK, message: "Successfull" })
    }
  )

  static getTenantScopes = catchAsync(
    async function (req: Request, res: Response) {
      const { tenantId } = req.params as { tenantId: ObjectIdQueryTypeCasting }
      const scopes = await ScopeService.getTenantScopes(req.organization!, tenantId)
      res.status(httpStatus.OK).json({ code: httpStatus.OK, data: scopes });
    }
  )

  static paginate = catchAsync(
    async function (req: Request, res: Response) {
      const filters = buildPaginationFilters(req.query as PaginationQueryOptions);
      const { pagination, tenants } = await TenantService.listTenant(req.organization!, filters)
      res.status(httpStatus.OK).json({ code: httpStatus.OK, pagination, data: tenants })
    }
  )

  static updateScopes = catchAsync(
    async function (req: Request, res: Response) {
      const { tenantId } = req.params as { tenantId: ObjectIdQueryTypeCasting }
      const scopes = await ScopeService.updateTenantScopes(req.organization!, tenantId, req.body)
      if(scopes) {
        AuditLogService.addLogMeta(req, {
          action: "UPDATE",
          resource: "Scope",
          resourceId: scopes._id
        })
      }
      res.status(httpStatus.OK).json({ code: httpStatus.OK, message: "Successfull" })
    }
  )
}