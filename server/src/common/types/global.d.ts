const { POSSIBLE_USERS } = require("./index.ts");

const { USER_TYPE } = require("./index.ts");
const { Scope } = require("../../config/scopes.ts");
const IUser = require("../../api/models/user.model.ts");

declare namespace Express {
  export interface Request {
    grantedScopes?: Scope[]
    organization?: string
    organizationOwner?: string
    subdomain?: string
    userType?: USER_TYPE
    userModel?: POSSIBLE_USERS
    user?: IUser

    auditLogContext?: any
    addAuditLog?: boolean
    auditLogMeta?: any
  }
}