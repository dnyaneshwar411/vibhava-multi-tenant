import { Request, Response } from "express"
import catchAsync from "../utils/catchAsync.js"
import httpStatus from "http-status";
import MembershipService from "../../core/services/membership.service.js";
import { ApiError } from "../utils/apiError.js";
import MembershipRepository from "../../infrastructure/database/repositories/membership.repository.js";
import { buildPaginationFilters, PaginationQueryOptions } from "../../common/utils/pagination.js";

export default class MembershipController {
  static retrieve = catchAsync(
    async function (req: Request, res: Response) {
      const pagination = buildPaginationFilters(req.query as PaginationQueryOptions);
      const data = await MembershipRepository.retrieveOrganizationMemberships(req.organization!, pagination)
      res.status(httpStatus.OK).json({ code: httpStatus.OK, data })
    }
  )

  static createMembership = catchAsync(
    async function (req: Request, res: Response) {
      const result = await MembershipService.createMembership(req.organization!, req.user._id, req.body);
      if (!result.success) throw new ApiError(httpStatus.BAD_REQUEST, result.message);
      res.status(httpStatus.CREATED).json({ code: httpStatus.CREATED, order: result.order });
    }
  )
}