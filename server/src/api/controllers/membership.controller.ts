import { Request, Response } from "express"
import catchAsync from "../utils/catchAsync.js"
import httpStatus from "http-status";
import MembershipService from "../../core/services/membership.service.js";
import { ApiError } from "../utils/apiError.js";

export default class MembershipController {
  static createMembership = catchAsync(
    async function (req: Request, res: Response) {
      const result = await MembershipService.createMembership(req.organization!, req.user._id, req.body);
      if (!result.success) throw new ApiError(httpStatus.BAD_REQUEST, result.message);
      res.status(httpStatus.CREATED).json({ code: httpStatus.CREATED, order: result.order });
    }
  )
}