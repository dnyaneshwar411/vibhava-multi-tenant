
export const AUDIT_LOG_ACTOR_MODEL = ["Tenant", "Vendor", "User", "Operator"]
export const AUDIT_LOG_ACTION = [
  "CREATE", "UPDATE", "DELETE", "SOFT_DELETE", "LOGIN_FAILED",
  "RESTORE", "LOGIN_SUCCESS", "PASSWORD_RESET", "EXPORT_DATA", "OTHER"
]

export const AUDIT_LOG_RESOURCE = [
  "User", "Property", "Unit", "Tenant", "Lease", "LedgerEntry",
  "MaintenanceTicket", "Vendor", "Subscription", "Document",
  "Organization", "Scope", "Other",
]

export const ACTION_BADGE_VARIANTS: Record<string, "default" | "secondary" | "destructive" | "outline"> = {
  CREATE: "default",
  LOGIN_SUCCESS: "default",
  RESTORE: "default",
  UPDATE: "secondary",
  PASSWORD_RESET: "secondary",
  EXPORT_DATA: "outline",
  DELETE: "destructive",
  SOFT_DELETE: "destructive",
  LOGIN_FAILED: "destructive",
  OTHER: "outline",
}