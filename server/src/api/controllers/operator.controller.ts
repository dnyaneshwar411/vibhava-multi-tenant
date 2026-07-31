import { Request, Response } from "express";
import httpStatus from "http-status";
import catchAsync from "../utils/catchAsync.js";
import OperatorRepository from "../../infrastructure/database/repositories/operator.repository.js";
import { ApiError } from "../utils/apiError.js";
import { buildPaginationFilters, PaginationQueryOptions } from "../../common/utils/pagination.js";
import OperatorService from "../../core/services/operator.service.js";

export default class OperatorController {
  static getOperators = catchAsync(
    async (req: Request, res: Response): Promise<void> => {
      const pagination = buildPaginationFilters<{}, { total?: number }>(req.query as PaginationQueryOptions);
      const { total, operators } = await OperatorService.paginate(pagination);
      pagination.total = total;
      res.status(httpStatus.OK).json({ code: httpStatus.OK, data: operators, pagination });
    },
  );

  static createOperator = catchAsync(
    async (req: Request, res: Response): Promise<void> => {
      const operator = await OperatorService.create(req.body);
      res
        .status(httpStatus.CREATED)
        .json({ code: httpStatus.CREATED, data: operator });
    },
  );

  static getOperatorById = catchAsync(
    async (req: Request, res: Response): Promise<void> => {
      const { operatorId } = req.params as { operatorId: string };
      const operator = await OperatorRepository.findById(operatorId);
      if (!operator)
        throw new ApiError(httpStatus.NOT_FOUND, "Operator not found");
      res.status(httpStatus.OK).json({ code: httpStatus.OK, data: operator });
    },
  );

  static updateOperator = catchAsync(
    async (req: Request, res: Response): Promise<void> => {
      const { operatorId } = req.params as { operatorId: string };
      const operator = await OperatorRepository.update(operatorId, req.body);
      if (!operator)
        throw new ApiError(httpStatus.NOT_FOUND, "Operator not found");
      res
        .status(httpStatus.OK)
        .json({ code: httpStatus.OK, message: "Operator updated" });
    },
  );

  static deleteOperator = catchAsync(
    async (req: Request, res: Response): Promise<void> => {
      const { operatorId } = req.params as { operatorId: string };
      const operator = await OperatorRepository.delete(operatorId);
      if (!operator)
        throw new ApiError(httpStatus.NOT_FOUND, "Operator not found");
      res
        .status(httpStatus.OK)
        .json({ code: httpStatus.OK, message: "Operator deleted" });
    },
  );

  static assignScopes = catchAsync(
    async (req: Request, res: Response): Promise<void> => {
      const { operatorId } = req.params as { operatorId: string };
      const { scopes } = req.body;
      await OperatorRepository.assignScopes(
        req.organization!,
        operatorId,
        scopes,
      );
      res
        .status(httpStatus.OK)
        .json({ code: httpStatus.OK, message: "Scopes assigned" });
    },
  );

  static unassignScopes = catchAsync(
    async (req: Request, res: Response): Promise<void> => {
      const { operatorId } = req.params as { operatorId: string };
      const { scopes } = req.body;
      await OperatorRepository.unassignScopes(
        req.organization!,
        operatorId,
        scopes,
      );
      res
        .status(httpStatus.OK)
        .json({ code: httpStatus.OK, message: "Scopes unassigned" });
    },
  );
}
