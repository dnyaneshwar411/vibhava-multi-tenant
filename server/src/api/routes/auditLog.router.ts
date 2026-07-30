import { Router } from "express";
import { authenticate } from "../middlewares/auth.middleware.js";
import AuditLogsController from "../controllers/auditLog.controller.js";

const router: Router = Router();

router.route("/")
  .get(authenticate(["user:read"]), AuditLogsController.getLogs)

router.route("/resource/:resourceId")
  .get(authenticate(["user:read"]), AuditLogsController.getResourceLogs)

export { router as auditLogsRouter }