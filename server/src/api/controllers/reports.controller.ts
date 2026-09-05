import { Request, Response } from "express";
import httpStatus from "http-status";
import catchAsync from "../utils/catchAsync.js";
import ReportsService from "../../core/services/reports.service.js";
import { ApiError } from "../utils/apiError.js";

export default class ReportsController {
  static profitLoss = catchAsync(
    async function (req: Request, res: Response) {
      const data = await ReportsService.getProfitLoss(
        req.organization!,
        req.userModel,
        req.user?._id ? String(req.user._id) : undefined,
        req.query
      );
      res.status(httpStatus.OK).json({
        code: httpStatus.OK,
        data,
        pagination: data?.pagination,
        message: "Profit & Loss calculated successfully",
      });
    }
  );

  static rentRoll = catchAsync(
    async function (req: Request, res: Response) {
      const data = await ReportsService.getRentRoll(
        req.organization!,
        req.userModel,
        req.user?._id ? String(req.user._id) : undefined,
        req.query
      );
      res.status(httpStatus.OK).json({
        code: httpStatus.OK,
        data,
        pagination: data?.pagination,
        message: "Rent roll report calculated successfully",
      });
    }
  );

  static payRent = catchAsync(
    async function (req: Request, res: Response) {
      const { unitId } = req.params as { unitId: string };

      const { success, data } = await ReportsService.resolveUnitUpcomingRent(req.organization!, unitId, req.user._id)
      if (!success || !data) throw new ApiError(httpStatus.BAD_REQUEST, "Unable to resolve the next due date")
      res.status(httpStatus.OK).json({
        code: httpStatus.OK,
        data,
        message: "Payment details fetched successfully",
      });
    }
  );

  static createOrder = catchAsync(
    async function (req: Request, res: Response) {
      const { unitId } = req.params as { unitId: string };
      const { success, message, order, credentials } = await ReportsService.createRentOrder(req.organization!, unitId, req.user._id, req.body);
      if (!success) throw new ApiError(httpStatus.BAD_REQUEST, message!)
      res.status(httpStatus.OK).json({
        code: httpStatus.OK,
        order,
        credentials,
        message: "Payment order created successfully",
      });
    }
  );
}