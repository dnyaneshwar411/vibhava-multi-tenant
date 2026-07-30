import { USER_TYPE } from "../../common/types/index.js";

export interface IAuthInstance { }

export interface IAuth {
  new(): IAuthInstance;
  findByIdWithScopes(id: string, userType: USER_TYPE): Promise<{
    success: boolean;
    message: string;
    data?: never
  } | {
    success: boolean;
    message?: never
    data: Record<string, any>
  }>;
}