import { Request, Response } from "express";
import httpStatus from "http-status";
import catchAsync from "../utils/catchAsync.js";
import { buildPaginationFilters, PaginationOptions, PaginationQueryOptions } from "../../common/utils/pagination.js";
import { DirectorySchemaInterface } from "../schemas/directory.schema.js";
import DirectoryService from "../../core/services/directory.service.js";
import { CONSTANTS_TYPE } from "../../common/types/index.js";
import TenantService from "../../core/services/tenant.service.js";
import VendorService from "../../core/services/vendor.service.js";
import PropertyRepository from "../../infrastructure/database/repositories/property.repository.js";
import UnitRepository from "../../infrastructure/database/repositories/unit.repository.js";

export default class DirectoryController {
  static listUsers = catchAsync(
    async function (req: Request, res: Response) {
      const filters: PaginationOptions & { status: CONSTANTS_TYPE["USER_STATUS"] } = buildPaginationFilters(req.query as PaginationQueryOptions)
      const { pagination, users } = await DirectoryService.listUsers(req.organization!, filters);
      res.status(httpStatus.OK).json({ code: httpStatus.OK, pagination, users })
    }
  )

  static listTenants = catchAsync(
    async function (req: Request, res: Response) {
      const filters: PaginationOptions & { status: CONSTANTS_TYPE["TENANT_STATUS"] } = buildPaginationFilters(req.query as PaginationQueryOptions);
      const { pagination, tenants } = await TenantService.listTenant(req.organization!, filters)
      res.status(httpStatus.OK).json({ code: httpStatus.OK, pagination, data: tenants });
    }
  )

  static listVendors = catchAsync(
    async function (req: Request, res: Response) {
      const filters: PaginationOptions & Record<string, any> = buildPaginationFilters(req.query as PaginationQueryOptions);
      const { pagination, vendors } = await VendorService.paginate(req.organization!, filters)
      res.status(httpStatus.OK).json({ code: httpStatus.OK, pagination, data: vendors })
    }
  )

  static listProperties = catchAsync(
    async function (req: Request, res: Response) {
      const filters: PaginationOptions & Record<string, any> = buildPaginationFilters(req.query as PaginationQueryOptions);
      const { pagination, properties } = await PropertyRepository.paginate(req.organization!, filters)
      res.status(httpStatus.OK).json({ code: httpStatus.OK, pagination, data: properties })
    }
  )

  static listUnits = catchAsync(
    async function (req: Request, res: Response) {
      const filters: PaginationOptions & Record<string, any> = buildPaginationFilters(req.query as PaginationQueryOptions);
      const { pagination, units } = await UnitRepository.paginate(req.organization!, filters)
      res.status(httpStatus.OK).json({ code: httpStatus.OK, pagination, data: units })
    }
  )
}