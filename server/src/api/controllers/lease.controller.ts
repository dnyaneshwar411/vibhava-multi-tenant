import { Request, Response } from "express";
import httpStatus from "http-status";
import TenantRepository from "../../infrastructure/database/repositories/tenant.repository.js";
import { ApiError } from "../utils/apiError.js";
import { buildPaginationFilters, PaginationQueryOptions } from "../../common/utils/pagination.js";
import LeaseRepository from "../../infrastructure/database/repositories/lease.repository.js";
import catchAsync from "../utils/catchAsync.js";
import { ObjectIdQueryTypeCasting } from "mongoose";
import AuditLogService from "../../core/services/auditLog.service.js";
import { EventOrchestrator } from "../../core/events/eventBus.js";

export default class LeaseController {
  static async getTenantById(req: Request, res: Response) {
    const { tenantId } = req.params as { tenantId: string };
    const tenant = await TenantRepository.getOrganizationTenant(req.organization!, tenantId)
    if (!tenant) throw new ApiError(httpStatus.NOT_FOUND, "Not Found")
    res.status(httpStatus.OK).json({ code: httpStatus.OK, data: tenant })
  }

  static async createTenant(req: Request, res: Response) {
    const payload = req.body;
    res.status(httpStatus.CREATED).json({ code: httpStatus.CREATED, message: "Successfully Created!" })
  }

  static async getLeases(req: Request, res: Response) {
    const pagination = buildPaginationFilters<{}, { total?: number }>(req.query as PaginationQueryOptions);
    const { leases, total } = await LeaseRepository.organizationLeasesPaginate(req.organization!, {
      ...pagination,
      status: req.query.status as string,
      leaseType: req.query.leaseType as string,
    });
    pagination.total = total;
    res.status(httpStatus.OK).json({ code: httpStatus.OK, data: leases, pagination });
  }

  static async createLease(req: Request, res: Response) {
    const payload = req.body
    payload.organization = req.organization
    payload.createdBy = req.user._id
    const lease = await LeaseRepository.create(payload)
    if (!lease) throw new ApiError(httpStatus.BAD_REQUEST, "Bad Request")
    LeaseRepository.notify(req.organization!, lease._id)
    AuditLogService.addLogMeta(req, {
      action: "CREATE",
      resource: "Lease",
      resourceId: lease._id,
      description: `${req.user.name} created a lease (${lease._id})!`
    })
    res.status(httpStatus.OK).json({ code: httpStatus.OK, message: "Successfully Created" })
  }

  static async getLeaseById(req: Request, res: Response) {
    const { leaseId } = req.params as { leaseId: string };
    const lease = await LeaseRepository.getOrganizationLeaseById(req.organization!, leaseId)
    if (!lease) throw new ApiError(httpStatus.NOT_FOUND, "Not Found")
    res.status(httpStatus.OK).json({ code: httpStatus.OK, data: lease })
  }

  static async updateLeasesById(req: Request, res: Response) {
    const { leaseId } = req.params as { leaseId: string };
    const lease = await LeaseRepository.findUpdateOrganizationLease(req.organization!, leaseId, req.body)
    if (!lease) throw new ApiError(httpStatus.BAD_REQUEST, "Bad Request")
    AuditLogService.addLogMeta(req, {
      action: "UPDATE",
      resource: "Lease",
      resourceId: lease._id,
      description: `${req.user.name} updated the lease with leaseId = ${lease._id}!`
    })
    res.status(httpStatus.OK).json({ code: httpStatus.OK, message: "Successfully Updated" })
  }

  static async deleteLeaseById(req: Request, res: Response) {
    const { leaseId } = req.params as { leaseId: string };
    const lease = await LeaseRepository.findUpdateOrganizationLease(req.organization!, leaseId, { isDeleted: true })
    if (!lease) throw new ApiError(httpStatus.BAD_REQUEST, "Bad Request")
    AuditLogService.addLogMeta(req, {
      action: "DELETE",
      resource: "Lease",
      resourceId: lease._id,
      description: `${req.user.name} delete the lease with leaseId = ${lease._id}!`
    })
    res.status(httpStatus.OK).json({ code: httpStatus.OK, message: "Successfully Deleted" })
  }

  static  getLeaseByUnitId = catchAsync(
    async function (req: Request, res: Response) {
      const { unitId } = req.params as { unitId: ObjectIdQueryTypeCasting };
      const dbQuery = {
        organization: req.organization!,
        unit: unitId
      }
      const lease = await LeaseRepository.getUnitActiveLeae(dbQuery)
      res.status(httpStatus.OK).json({ code: httpStatus.OK, message: "Successfull", lease })
    }
  )

  static async getTenants(req: Request, res: Response) {
    const { leaseId } = req.params as { leaseId: string };
    const tenants = await LeaseRepository.findLeaseTenants(req.organization!, leaseId)
    if (!tenants) throw new ApiError(httpStatus.NOT_FOUND, "Not Found")
    res.status(httpStatus.OK).json({ code: httpStatus.OK, data: tenants })
  }

  static async controller(req: Request, res: Response) {
    res.status(httpStatus.OK).json({ code: httpStatus.OK, data: {} })
  }
}