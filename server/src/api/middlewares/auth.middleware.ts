import { NextFunction, Request, Response } from "express";
import { Scope } from "../../config/scopes.js";
import { ApiError } from "../utils/apiError.js";
import { env } from "../../config/envVars.js";
import httpStatus from "http-status";
import AuthService from "../../core/services/auth.service.js";

const validateTenant: (req: Request) => {
  success: boolean;
  message?: string;
  subdomain?: string;
} = function (req: Request) {
  const origin = req.headers.origin as string;
  if (!URL.canParse(origin)) {
    return { success: false, message: "Not Found!" };
  }

  const hostname = new URL(origin).hostname;
  const subdomain = hostname.split(".")[0] as string;
  if (["localhost", env.CLIENT_BASE_HOSTNAME].includes(subdomain)) {
    return { success: false, message: "Not Found!" };
  }

  return { success: true, subdomain };
};

export const authenticate = function (scopes: Scope[] = []) {
  return async function (req: Request, res: Response, next: NextFunction) {
    const { success, message, subdomain } = validateTenant(req);
    if (!success || !subdomain)
      throw new ApiError(httpStatus.BAD_REQUEST, message || "Bad Request");

    const {
      success: tokenValidationSuccess,
      message: tokenValidationMessage,
      data,
    } = await AuthService.validateWithToken(req.cookies.access);
    if (!tokenValidationSuccess || !data) {
      throw new ApiError(
        httpStatus.NOT_FOUND,
        tokenValidationMessage || "Not Found",
      );
    }

    if (data.organization?.subdomain !== subdomain) {
      throw new ApiError(httpStatus.UNAUTHORIZED, "Invalid Request!");
    }

    const scopeMap = data?.scopeMap || {};
    const grantedScopes = scopes.filter((scope) => scopeMap[scope]);
    if (grantedScopes.length === 0 && scopes.length !== 0) {
      throw new ApiError(
        httpStatus.UNAUTHORIZED,
        `Either of - '${scopes.join(", ")}' is required for this action.`,
      );
    }

    const map = AuthService.mapValidatedUser(data);
    if (!map.success || !map.user || !map.organization) {
      throw new ApiError(httpStatus.UNAUTHORIZED, map.message || "Bad Request");
    }

    req.organization = String(map.user?.organization);
    req.subdomain = subdomain;
    req.user = map.user;
    req.grantedScopes = grantedScopes;
    req.userType = data.userType;
    req.userModel = data.userModel;

    next();
  };
};
