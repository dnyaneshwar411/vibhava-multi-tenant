import { Request, Response } from "express";
import httpStatus from "http-status";
import catchAsync from "../utils/catchAsync.js";
import ReportsService from "../../core/services/reports.service.js";

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
}