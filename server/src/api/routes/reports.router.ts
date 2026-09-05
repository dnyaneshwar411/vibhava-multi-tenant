import { Router } from "express";
import ReportsController from "../controllers/reports.controller.js";
import { authenticate } from "../middlewares/auth.middleware.js";
import { validate } from "../middlewares/validate.middleware.js";
import ReportsSchema from "../schemas/reports.schema.js";

const router: Router = Router();

router.route("/profit-loss")
  .get(authenticate([], ["Active"], ["User", "Tenant", "Vendor"]), ReportsController.profitLoss);

router.route("/rent-roll")
  .get(authenticate([], ["Active"], ["User", "Tenant"]), ReportsController.rentRoll);

router.route("/rent-roll/:unitId/pay")
  .get(
    authenticate([], ["Active"], ["Tenant"]),
    validate(ReportsSchema.getUnitRentPaySchema),
    ReportsController.payRent
  );

router.route("/rent-roll/:unitId/pay/order")
  .post(
    authenticate([], ["Active"], ["Tenant"]),
    validate(ReportsSchema.payRentSchema),
    ReportsController.createOrder
  );

export { router as reportsRouter };