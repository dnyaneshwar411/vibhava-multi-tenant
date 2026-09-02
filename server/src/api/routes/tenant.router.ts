import { Router } from "express";
import { authenticate } from "../middlewares/auth.middleware.js";
import TenantController from "../controllers/tenant.controller.js";
import { validate } from "../middlewares/validate.middleware.js";
import TenantSchema from "../schemas/tenant.schema.js";

const router: Router = Router();

router.route("/")
  .get(
    validate(TenantSchema.filtering),
    authenticate(["tenant:read"]),
    TenantController.paginate
  )
  .post(
    validate(TenantSchema.create),
    authenticate(["tenant:create"]),
    TenantController.create
  )

router.route("/:tenantId")
  .put(
    validate(TenantSchema.update),
    authenticate(["tenant:update"]),
    TenantController.update
  )
  .delete(authenticate(["tenant:read"]), TenantController.delete)

router.route("/scope/:tenantId")
  .get(
    validate(TenantSchema.tenantId),
    authenticate(["tenant:read"]),
    TenantController.getTenantScopes
  )
  .put(
    validate(TenantSchema.updateScopes),
    authenticate(["user:scopes:manage"]),
    TenantController.updateScopes
  )

router.route("/unit/:unitId")
  .get(
    validate(TenantSchema.getUnitTenant),
    authenticate(["tenant:read"]),
    TenantController.getUnitTenant
  )

export { router as tenantRouter }