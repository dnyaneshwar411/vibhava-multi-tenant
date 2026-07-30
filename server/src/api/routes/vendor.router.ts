import { Router } from "express";
import { authenticate } from "../middlewares/auth.middleware.js";
import { validate } from "../middlewares/validate.middleware.js";
import VendorController from "../controllers/vendor.controller.js";
import VendorSchema from "../schemas/vendor.schema.js";

const router: Router = Router();

router
  .route("/")
  .get(
    authenticate(["vendor:read"]),
    VendorController.getVendors
  )
  .post(
    authenticate(["vendor:create"]),
    validate(VendorSchema.create),
    VendorController.createVendor
  );

router
  .route("/:vendorId")
  .get(
    authenticate(["vendor:read"]),
    VendorController.getVendorById
  )
  .put(
    authenticate(["vendor:update"]),
    validate(VendorSchema.update),
    VendorController.updateVendor
  )
  .delete(
    authenticate(["vendor:delete"]),
    VendorController.deleteVendor
  );

router
  .route("/:vendorId/performance")
  .get(
    authenticate(["vendor:read"]),
    VendorController.getVendorPerformance
  );

export { router as vendorRouter };
