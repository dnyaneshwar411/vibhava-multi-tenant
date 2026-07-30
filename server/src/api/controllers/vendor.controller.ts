import { Request, Response } from "express";
import catchAsync from "../utils/catchAsync.js";
import httpStatus from "http-status";
import VendorRepository from "../../infrastructure/database/repositories/vendor.repository.js";
import { buildPaginationFilters, PaginationQueryOptions } from "../../common/utils/pagination.js";

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
      await VendorRepository.create({ ...req.body, organization: req.organization!, createdBy: req.user._id });
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
}
