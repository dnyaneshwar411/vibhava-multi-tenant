import { Router } from "express";
import { authenticate } from "../middlewares/auth.middleware.js";
import LeaseController from "../controllers/lease.controller.js";
import { validate } from "../middlewares/validate.middleware.js";
import LeaseSchema from "../schemas/lease.schema.js";

const router: Router = Router()

router
  .route("/tenants")
  .get(authenticate(["tenant:read"]), LeaseController.getTenants)

router
  .route("/tenants/:tenantId")
  .get(authenticate(["tenant:read:pii"]), LeaseController.getTenantById)

router
  .route("/")
  .get(authenticate(["lease:read"]), LeaseController.getLeases)
  .post(validate(LeaseSchema.create), authenticate(["lease:create"]), LeaseController.createLease)

router
  .route("/:leaseId")
  .get(authenticate(["lease:read"]), LeaseController.getLeaseById)
  .put(validate(LeaseSchema.update), authenticate(["lease:update"]), LeaseController.updateLeasesById)
  .delete(authenticate(["lease:delete"]), LeaseController.deleteLeaseById)

router
  .route("tenants/invite")
  .post(authenticate(["tenant:create"]), LeaseController.createTenant)

export { router as leaseRouter }