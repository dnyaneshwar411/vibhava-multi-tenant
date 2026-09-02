import { Request, Response } from "express";
import httpStatus from "http-status";
import catchAsync from "../utils/catchAsync.js";
import PropertyRepository from "../../infrastructure/database/repositories/property.repository.js";
import { ApiError } from "../utils/apiError.js";
import { buildPaginationFilters, PaginationQueryOptions } from "../../common/utils/pagination.js";
import UnitRepository from "../../infrastructure/database/repositories/unit.repository.js";
import AuditLogService from "../../core/services/auditLog.service.js";

export default class PropertyController {
  static getAllProperties = catchAsync(
    async function (req: Request, res: Response): Promise<void> {
      const pagination = buildPaginationFilters<{}, { total?: number }>(req.query as PaginationQueryOptions);
      const { properties, total } = await PropertyRepository.OrganizationPropertiesPaginate(req.organization!, pagination)
      pagination.total = total
      res.status(httpStatus.OK).json({ code: httpStatus.OK, data: properties, pagination });
    }
  )

  static createProperty = catchAsync(
    async function (req: Request, res: Response): Promise<void> {
      req.body.organization = req.organization;
      req.body.createdBy = req.user._id;
      const { success, property } = await PropertyRepository.create(req.body)
      if (!success) throw new ApiError(httpStatus.BAD_REQUEST, "Bad Request")
      AuditLogService.addLogMeta(req, {
        action: "CREATE",
        resource: "Property",
        resourceId: property._id
      })
      res.status(httpStatus.CREATED).json({ code: httpStatus.CREATED, message: "Successfully created!" });
    }
  )

  static getPropertyById = catchAsync(
    async function (req: Request, res: Response): Promise<void> {
      const { propertyId } = req.params as { propertyId: string }
      const property = await PropertyRepository.findOrganizationProperty(req.organization!, propertyId)
      if (!property) throw new ApiError(httpStatus.NOT_FOUND, "Not Found")
      res.status(httpStatus.OK).json({ code: httpStatus.OK, data: property });
    }
  )

  static updateProperty = catchAsync(
    async function (req: Request, res: Response): Promise<void> {
      const { propertyId } = req.params as { propertyId: string }
      const { success, property } = await PropertyRepository.update(req.organization!, propertyId, req.body)
      if (!success) throw new ApiError(httpStatus.BAD_REQUEST, "Bad Request")
      AuditLogService.addLogMeta(req, {
        action: "UPDATE",
        resource: "Property",
        resourceId: property._id
      })
      res.status(httpStatus.OK).json({ code: httpStatus.OK, message: "Successfully Updated" });
    }
  )

  static deleteProperty = catchAsync(
    async function (req: Request, res: Response): Promise<void> {
      const { propertyId } = req.params as { propertyId: string }
      const property = await PropertyRepository.delete(req.organization!, propertyId)
      if (!property) throw new ApiError(httpStatus.BAD_REQUEST, "Bad Request")
      AuditLogService.addLogMeta(req, {
        action: "DELETE",
        resource: "Property",
        resourceId: property._id
      })
      res.status(httpStatus.OK).json({ code: 200, message: "Successfully Deleted!" });
    }
  )

  static getAllUnitsByProperty = catchAsync(
    async function (req: Request, res: Response): Promise<void> {
      const { propertyId } = req.params as { propertyId: string }
      const units = await UnitRepository.findPropertyUnits(req.organization!, propertyId)
      res.status(httpStatus.OK).json({ code: httpStatus.OK, data: units });
    }
  )

  static createUnitForProperty = catchAsync(
    async function (req: Request, res: Response): Promise<void> {
      const { propertyId } = req.params as { propertyId: string }
      const payload = {
        ...req.body,
        organization: req.organization!,
        property: propertyId,
        createdBy: req.user._id
      }
      const unit = await UnitRepository.createOrganizationPropertyUnit(payload)
      if (!unit) throw new ApiError(httpStatus.BAD_REQUEST, "Bad Request")
      AuditLogService.addLogMeta(req, {
        action: "CREATE",
        resource: "Unit",
        resourceId: unit._id
      })
      res.status(httpStatus.CREATED).json({ code: httpStatus.CREATED, message: "Successfully Created!" });
    }
  )

  static getUnitById = catchAsync(
    async function (req: Request, res: Response): Promise<void> {
      const { unitId } = req.params as { unitId: string }
      const unit = await UnitRepository.findById(req.organization!, unitId)
      if (!unit) throw new ApiError(httpStatus.NOT_FOUND, "Not Found")
      res.status(httpStatus.OK).json({ code: httpStatus.OK, data: unit });
    }
  )

  static updateUnit = catchAsync(
    async function (req: Request, res: Response): Promise<void> {
      const { unitId } = req.params as { unitId: string }
      const success = await UnitRepository.update(req.organization!, unitId, req.body)
      if (!success) throw new ApiError(httpStatus.BAD_REQUEST, "Bad Request")
      AuditLogService.addLogMeta(req, {
        action: "UPDATE",
        resource: "Unit",
        resourceId: unitId
      })
      res.status(httpStatus.OK).json({ code: httpStatus.OK, message: "Successfully Updated" });
    }
  )

  static deleteUnit = catchAsync(
    async function (req: Request, res: Response): Promise<void> {
      const { unitId } = req.params as { unitId: string }
      const success = await UnitRepository.delete(req.organization!, unitId)
      if (!success) throw new ApiError(httpStatus.BAD_REQUEST, "Bad Request")
      AuditLogService.addLogMeta(req, {
        action: "DELETE",
        resource: "Unit",
        resourceId: unitId
      })
      res.status(httpStatus.OK).json({ code: httpStatus.OK, message: "Successfully Deleted!" });
    }
  )

  static importUnits = catchAsync(
    async function (req: Request, res: Response): Promise<void> {
      res.status(httpStatus.CREATED).json({ code: httpStatus.CREATED, data: {} });
    }
  )
}