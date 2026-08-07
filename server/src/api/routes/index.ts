import express from "express";
import { authRouter } from "./auth.router.js";
import { organizationRouter } from "./organization.router.js";
import { propertyRouter } from "./property.router.js";
import { leaseRouter } from "./lease.router.js";
import { maintenanceRouter } from "./maintenance.router.js";
import { vendorRouter } from "./vendor.router.js";
import { userRouter } from "./user.router.js";
import { operatorRouter } from "./operator.router.js";
import { fileRouter } from "./file.router.js";
import { membershipRouter } from "./membership.router.js";
import { webhookRouter } from "./webhook.router.js";
import { dashboardRouter } from "./dashboard.router.js";

const router: express.Router = express.Router();

const routes: { path: string, router: express.Router }[] = [
  { path: "/auth", router: authRouter },
  { path: "/organization", router: organizationRouter },
  { path: "/property", router: propertyRouter },
  { path: "/lease", router: leaseRouter },
  { path: "/maintenance", router: maintenanceRouter },
  { path: "/vendor", router: vendorRouter },
  { path: "/user", router: userRouter },
  { path: "/operator", router: operatorRouter },
  { path: "/files", router: fileRouter },
  { path: "/memberships", router: membershipRouter },
  { path: "/webhook", router: webhookRouter },
  { path: "/dashboard", router: dashboardRouter },
];

routes.forEach(route => router.use(route.path, route.router));

export { router as v1Router };