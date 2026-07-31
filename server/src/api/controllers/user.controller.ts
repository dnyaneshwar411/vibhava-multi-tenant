import { Request, Response } from "express";
import httpStatus from "http-status";
import catchAsync from "../utils/catchAsync.js";
import UserRepository from "../../infrastructure/database/repositories/user.repository.js";
import { ApiError } from "../utils/apiError.js";
import { buildPaginationFilters, PaginationQueryOptions } from "../../common/utils/pagination.js";
import UserService from "../../core/services/user.service.js";

export default class UserController {
  static getUsers = catchAsync(
    async (req: Request, res: Response): Promise<void> => {
      const pagination = buildPaginationFilters<{}, { total?: number }>(req.query as PaginationQueryOptions);
      const { users, total } = await UserRepository.paginate(req.organization!, pagination);
      pagination.total = total;
      res.status(httpStatus.OK).json({ code: httpStatus.OK, data: users, pagination });
    },
  );

  static createUser = catchAsync(
    async (req: Request, res: Response): Promise<void> => {
      const { success, message, data} = await UserService.create(req.organization!, req.body);
      if (!success) throw new ApiError(httpStatus.BAD_REQUEST, message || "Bad Request")
      res
        .status(httpStatus.CREATED)
        .json({
          code: httpStatus.CREATED,
          data: {
            name: data.user.name,
            email: data.user.email,
            mobileNumber: data.user.mobileNumber,
            countryCode: data.user.countryCode,
            avatar: data.user.avatar,
            scopeMap: data.scope.scopeMap,
          }
        });
    },
  );

  static getUserById = catchAsync(
    async (req: Request, res: Response): Promise<void> => {
      const { userId } = req.params as { userId: string };
      const user = await UserRepository.findById(req.organization!, userId);
      if (!user) throw new ApiError(httpStatus.NOT_FOUND, "User not found");
      res.status(httpStatus.OK).json({ code: httpStatus.OK, data: user });
    },
  );

  static updateUser = catchAsync(
    async (req: Request, res: Response): Promise<void> => {
      const { userId } = req.params as { userId: string };
      const user = await UserRepository.update(
        req.organization!,
        userId,
        req.body,
      );
      if (!user) throw new ApiError(httpStatus.NOT_FOUND, "User not found");
      res
        .status(httpStatus.OK)
        .json({ code: httpStatus.OK, message: "User updated" });
    },
  );

  static deleteUser = catchAsync(
    async (req: Request, res: Response): Promise<void> => {
      const { userId } = req.params as { userId: string };
      const user = await UserRepository.delete(req.organization!, userId);
      if (!user) throw new ApiError(httpStatus.NOT_FOUND, "User not found");
      res
        .status(httpStatus.OK)
        .json({ code: httpStatus.OK, message: "User deleted" });
    },
  );

  static assignScopes = catchAsync(
    async (req: Request, res: Response): Promise<void> => {
      const { userId } = req.params as { userId: string };
      const { scopes } = req.body;
      const { success, message } = await UserRepository.assignScopes(req.organization!, userId, scopes, req.organizationOwner!, req.user);
      if (!success) throw new ApiError(httpStatus.BAD_REQUEST, message || "Bad Request");
      res
        .status(httpStatus.OK)
        .json({ code: httpStatus.OK, message: "Scopes assigned" });
    },
  );

  static unassignScopes = catchAsync(
    async (req: Request, res: Response): Promise<void> => {
      const { userId } = req.params as { userId: string };
      const { scopes } = req.body;
      const { success, message } = await UserRepository.unassignScopes(req.organization!, userId, scopes, req.organizationOwner!, req.user);
      if (!success) throw new ApiError(httpStatus.BAD_REQUEST, message || "Bad Request");
      res
        .status(httpStatus.OK)
        .json({ code: httpStatus.OK, message: "Scopes unassigned" });
    },
  );
}
