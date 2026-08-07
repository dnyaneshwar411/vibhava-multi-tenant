import { Router } from "express";
import DirectoryController from "../controllers/directory.controller.js";
import { validate } from "../middlewares/validate.middleware.js";
import { authenticate } from "../middlewares/auth.middleware.js";
import DirectorySchema from "../schemas/directory.schema.js";

const router: Router = Router();

router.route("/user")
  .get(validate(DirectorySchema.user), authenticate(["user:read"]), DirectoryController.listUsers)

router.route("/tenant")
  .get(validate(DirectorySchema.tenant), authenticate(["tenant:read"]), DirectoryController.listTenants)

router.route("/vendor")
  .get(validate(DirectorySchema.vendor), authenticate(["vendor:read"]), DirectoryController.listVendors)

router.route("/property")
  .get(validate(DirectorySchema.property), authenticate(["property:read"]), DirectoryController.listProperties)

router.route("/unit")
  .get(validate(DirectorySchema.unit), authenticate(["unit:read"]), DirectoryController.listUnits)

export { router as directoryRouter };