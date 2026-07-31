import { Request, Response } from "express";
import catchAsync from "../utils/catchAsync.js";
import httpStatus from "http-status";
import VendorRepository from "../../infrastructure/database/repositories/vendor.repository.js";
import { buildPaginationFilters, PaginationQueryOptions } from "../../common/utils/pagination.js";
import VendorService from "../../core/services/vendor.service.js";
import { ApiError } from "../utils/apiError.js";
export default class VendorController {
  static getVendors = catchAsync(
    async function (req: Request, res: Response) {
      const pagination = buildPaginationFilters<{}, { total?: number }>(req.query as PaginationQueryOptions);
      const { vendors, total } = await VendorRepository.paginate(req.organization!, pagination);
      pagination.total = total;
      res.status(httpStatus.OK).json({ code: httpStatus.OK, data: vendors, pagination });
    }
  );

  static createVendor = catchAsync(
    async function (req: Request, res: Response) {
      const { success, message } = await VendorService.create({
        ...req.body,
        organization: req.organization!,
        createdBy: req.user._id
      })
      if (!success) throw new ApiError(httpStatus.BAD_REQUEST, message || "")
      res.status(httpStatus.CREATED).json({ code: httpStatus.CREATED, message: "Vendor created successfully" });
    }
  );

  static getVendorById = catchAsync(
    async function (req: Request, res: Response) {
      const { vendorId } = req.params as { vendorId: string };
      const vendor = await VendorRepository.findById(req.organization!, vendorId);
      res.status(httpStatus.OK).json({ code: httpStatus.OK, message: "Successfully retrieved vendor", data: vendor });
    }
  );

  static updateVendor = catchAsync(
    async function (req: Request, res: Response) {
      const { vendorId } = req.params as { vendorId: string };
      await VendorRepository.updateOne({ organization: req.organization!, _id: vendorId }, req.body);
      res.status(httpStatus.OK).json({ code: httpStatus.OK, message: "Vendor updated successfully" });
    }
  );

  static deleteVendor = catchAsync(
    async function (req: Request, res: Response) {
      const { vendorId } = req.params as { vendorId: string };
      await VendorRepository.deleteOne({ organization: req.organization!, _id: vendorId });
      res.status(httpStatus.OK).json({ code: httpStatus.OK, message: "Vendor deleted successfully" });
    }
  );

  static getVendorPerformance = catchAsync(
    async function (req: Request, res: Response) {
      const { vendorId } = req.params as { vendorId: string };
      const performance = await VendorRepository.getPerformance(req.organization!, vendorId);
      res.status(httpStatus.OK).json({ code: httpStatus.OK, message: "Successfully retrieved vendor performance", data: performance });
    }
  );

  static assignScopes = catchAsync(
    async function (req: Request, res: Response) {
      const { vendorId } = req.params as { vendorId: string };
      await VendorService.assignScopes(req.organization!, vendorId, req.body, req.organizationOwner!, req.user);
      res.status(httpStatus.OK).json({ code: httpStatus.OK, message: "Scopes assigned successfully" });
    }
  );

  static unassignScopes = catchAsync(
    async function (req: Request, res: Response) {
      const { vendorId } = req.params as { vendorId: string };
      await VendorService.unassignScopes(req.organization!, vendorId, req.body, req.organizationOwner!, req.user);
      res.status(httpStatus.OK).json({ code: httpStatus.OK, message: "Scopes unassigned successfully" });
    }
  );
}
