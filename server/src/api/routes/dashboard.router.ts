import { Router } from "express";
import { authenticate } from "../middlewares/auth.middleware.js";
import DashboardController from "../controllers/dashboard.controller.js";

const router: Router = Router();

router.route("/")
  .get(authenticate([]), DashboardController.getMetrics);

export { router as dashboardRouter };
