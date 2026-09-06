import { Request, Response } from "express";
import catchAsync from "../utils/catchAsync.js";
import httpStatus from "http-status";
import { env } from "../../config/envVars.js";
import AuthService from "../../core/services/auth.service.js";
import { UpdateAuthInput } from "../schemas/auth.schema.js";
import { USER_MODELS } from "../../common/types/index.js";
import UserService from "../../core/services/user.service.js";
import VendorService from "../../core/services/vendor.service.js";
import TenantService from "../../core/services/tenant.service.js";
import { validateTenant } from "../middlewares/auth.middleware.js";
import { ApiError } from "../utils/apiError.js";
import ScopeService from "../../core/services/scope.service.js";
import AuditLogService from "../../core/services/auditLog.service.js";

const userServiceMap: Record<
  USER_MODELS,
  (id: string, data: any) => Promise<any>
> = {
  Tenant: (id: string, data: any) => TenantService.updateById(id, data),
  User: (id: string, data: any) => UserService.updateById(id, data),
  Vendor: (id: string, data: any) => VendorService.updateById(id, data),
} as const;
export default class AuthController {
  static login = catchAsync(async function (req: Request, res: Response) {
    const subdomainDetails = validateTenant(req)
    const { success, message, data } = await AuthService.login(req.body, subdomainDetails)

    if (!success) throw new ApiError(httpStatus.BAD_REQUEST, message);

    if (!data.tokens) throw new ApiError(httpStatus.BAD_REQUEST, "Bad Request");

    res.cookie("access", data.tokens.access, {
      httpOnly: true,
      secure: env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: env.JWT_ACCESS_EXPIRATION,
    });

    res.cookie("refresh", data.tokens.refresh, {
      httpOnly: true,
      secure: env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: env.JWT_REFRESH_EXPIRATION,
    });

    if (data.user?.organization?.subdomain) {
      res.cookie("organization", data.user?.organization?.subdomain.toString(), {
        httpOnly: true,
        secure: env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: env.JWT_REFRESH_EXPIRATION,
      })
    }

    req.user = data.user
    req.userModel = req.body.user

    AuditLogService.addLogMeta(req, {
      action: "LOGIN_SUCCESS",
      resource: "User",
      resourceId: data.user._id,
      description: "Logged In Successfully"
    })

    res.status(httpStatus.OK).json({
      code: httpStatus.OK,
      message: "Logged In Successfully!",
      data: data.user
    });
  });

  static logout = catchAsync(async function (req: Request, res: Response) {
    res.clearCookie("access")
    res.clearCookie("refresh")
    res
      .status(httpStatus.OK)
      .json({ code: httpStatus.OK, message: "Logged Out Successfully!" });
  });

  static refreshToken = catchAsync(async function (
    req: Request,
    res: Response,
  ) {
    res
      .status(httpStatus.OK)
      .json({ code: httpStatus.OK, message: "Logged In Successfully!" });
  });

  static profile = catchAsync(async function (req: Request, res: Response) {
    const { success, data, message } = await AuthService.getProfile(req.organization!, req.user._id, req.userModel!);
    if (!success) throw new ApiError(httpStatus.BAD_REQUEST, message);
    res.status(httpStatus.OK).json({ code: httpStatus.OK, data });
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

  static me = catchAsync(
    async function (req: Request, res: Response) {
      const profile = await ScopeService.me(req.user._id);
      if (!profile) throw new ApiError(httpStatus.NOT_FOUND, "Profile Not Found!");
      res.status(httpStatus.OK).json({
        code: httpStatus.OK,
        data: profile?.actor,
        actorModel: profile?.actorModel
      });
    }
  )

  static passwordReset = catchAsync(
    async function (req: Request, res: Response) {
      // validate if the user exists add to the email queue with proper payload
      const { success, message } = await AuthService.passwordReset(req.body)
      if (!success) throw new ApiError(httpStatus.BAD_REQUEST, message || "Please try again Later!")
      res.status(httpStatus.OK).json({ code: httpStatus.OK, message: "OTP Sent Successfully on your email." })
    }
  )

  static passwordVerify = catchAsync(
    async function (req: Request, res: Response) {
      const { success, message } = await AuthService.passwordVerify(req.body)
      if (!success) throw new ApiError(httpStatus.BAD_REQUEST, message || "Please try again Later!")
      res.status(httpStatus.OK).json({ code: httpStatus.OK, message: "Password updated successfully!" })
    }
  )
}