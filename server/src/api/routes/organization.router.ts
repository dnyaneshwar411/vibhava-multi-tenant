import { Router } from "express";
import OrganizationController from "../controllers/organization.controller.js";
import { authenticate } from "../middlewares/auth.middleware.js";
import OrganizationSchema from "../schemas/organization.schema.js";
import { validate } from "../middlewares/validate.middleware.js";

const router: Router = Router()

router.route("/")
  .get(authenticate(["organization:read"]), OrganizationController.retrieve)
  // .post() tbd onboarding of an organization
  .put(
    validate(OrganizationSchema.update),
    authenticate(["organization:update"]),
    OrganizationController.updateOrganization
  )

router.route("/pages")
  .get(authenticate(["organization:pages:manage"]), OrganizationController.retrieveCompanyPages)
  .post(
    validate(OrganizationSchema.updateCompanyPages),
    authenticate(["organization:pages:manage"]),
    OrganizationController.updateCompanyPage
  )

router.route("/pages/html/:type")
  .get(OrganizationController.retrieveCompanyPageType)


export { router as organizationRouter }