import { Router } from "express";
import { authenticate } from "../middlewares/auth.middleware.js";
import PropertyController from "../controllers/property.controller.js";
import { validate } from "../middlewares/validate.middleware.js";
import PropertySchema from "../schemas/property.schema.js";
import UnitSchema from "../schemas/unit.schema.js";

const router: Router = Router();

router
  .route("/")
  .get(authenticate(["property:read", "property:read:assigned"]), PropertyController.getAllProperties)
  .post(validate(PropertySchema.create), authenticate(["property:create"]), PropertyController.createProperty)

router
  .route("/:propertyId")
  .get(authenticate(["property:read", "property:read:assigned"]), PropertyController.getPropertyById)
  .put(validate(PropertySchema.update), authenticate(["property:update"]), PropertyController.updateProperty)
  .delete(authenticate(["property:delete"]), PropertyController.deleteProperty)

router
  .route("/units/import")
  .post(PropertyController.importUnits) // tbdl

router
  .route("/:propertyId/units")
  .get(authenticate(["unit:read"]), PropertyController.getAllUnitsByProperty)
  .post(validate(UnitSchema.create), authenticate(["unit:create"]), PropertyController.createUnitForProperty)

router
  .route("/units/:unitId")
  .get(authenticate(["unit:read"]), PropertyController.getUnitById)
  .put(validate(UnitSchema.update), authenticate(["unit:update"]), PropertyController.updateUnit)
  .delete(authenticate(["unit:delete"]), PropertyController.deleteUnit)

export { router as propertyRouter };