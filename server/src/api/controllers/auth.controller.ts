import { Request, Response } from "express";
import catchAsync from "../utils/catchAsync.js";
import httpStatus from "http-status";
import { env } from "../../config/envVars.js";
import ScopeService from "../../core/services/scope.service.js";
import AuthService from "../../core/services/auth.service.js";
import { UpdateAuthInput } from "../schemas/auth.schema.js";
import { USER_MODELS } from "../../common/types/index.js";
import UserService from "../../core/services/user.service.js";
import VendorService from "../../core/services/vendor.service.js";
import TenantService from "../../core/services/tenant.service.js";
import TokenService from "../../core/services/token.service.js";

const userServiceMap: Record<
  USER_MODELS,
  (id: string, data: any) => Promise<any>
> = {
  Tenant: (id: string, data: any) => TenantService.updateById(id, data),
  User: (id: string, data: any) => UserService.updateById(id, data),
  Vendor: (id: string, data: any) => VendorService.updateById(id, data),
} as const;
export default class AuthController {
  static login = catchAsync(async function(req: Request, res: Response) {
    const data = await AuthService.login({});
    res.cookie("access", await TokenService.createToken({ _id: "6a5f467f19a932ac63909285", userType: "Staff", userModel: "Operator" }), {
      httpOnly: true,
      secure: env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: env.JWT_ACCESS_EXPIRATION,
    });
    res.status(httpStatus.OK).json({
      code: httpStatus.OK,
      message: "Logged In Successfully!",
    });
  });

  static logout = catchAsync(async function(req: Request, res: Response) {
    res
      .status(httpStatus.OK)
      .json({ code: httpStatus.OK, message: "Logged In Successfully!" });
  });

  static refreshToken = catchAsync(async function(
    req: Request,
    res: Response,
  ) {
    res
      .status(httpStatus.OK)
      .json({ code: httpStatus.OK, message: "Logged In Successfully!" });
  });

  static profile = catchAsync(async function(req: Request, res: Response) {
    const scopeMap = await ScopeService.findScopeByUserIdRole(
      req.user._id,
      req.userType,
    );
    res.status(httpStatus.OK).json({
      code: httpStatus.OK,
      data: {
        user: req.user,
        scopeMap: scopeMap?.data?.scopeMap,
      },
    });
  });

  static update = catchAsync(async (req: Request, res: Response) => {
    const body: UpdateAuthInput["body"] = req.body;
    const updateService = userServiceMap[body.type];

    if (!updateService) {
      return res.status(httpStatus.BAD_REQUEST).json({
        code: httpStatus.BAD_REQUEST,
        message: `Unsupported user type: ${body.type}`,
      });
    }

    await updateService(req.user._id, body);
    res.status(httpStatus.OK).json({
      code: httpStatus.OK,
      message: "Successfully Updated",
    });
  });
}
