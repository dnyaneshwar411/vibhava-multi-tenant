import { Router } from "express";
import ReportsController from "../controllers/reports.controller.js";
import { authenticate } from "../middlewares/auth.middleware.js";

const router: Router = Router();

router.route("/profit-loss")
  .get(authenticate([], ["Active"], ["User", "Tenant", "Vendor"]), ReportsController.profitLoss);

router.route("/rent-roll")
  .get(authenticate([], ["Active"], ["User", "Tenant"]), ReportsController.rentRoll);

export { router as reportsRouter };