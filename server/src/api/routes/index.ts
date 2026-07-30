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
];

routes.forEach(route => router.use(route.path, route.router));

export { router as v1Router };