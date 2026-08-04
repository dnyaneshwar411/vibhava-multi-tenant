import { Router } from "express";
import { validate } from "../middlewares/validate.middleware.js";
import MembershipController from "../controllers/membership.controller.js";
import { authenticate } from "../middlewares/auth.middleware.js";
import MembershipSchema from "../schemas/membership.schema.js";

const router: Router = Router();

router.route("/")
  // .get(authenticate(["organization:membership:manage"]), MembershipController.crea)
  .post(
    validate(MembershipSchema.create),
    authenticate(["organization:membership:manage"]),
    MembershipController.createMembership
  )


export { router as membershipRouter };