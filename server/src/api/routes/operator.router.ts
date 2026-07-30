import { Router } from "express";
import { validate } from "../middlewares/validate.middleware.js";
import OperatorController from "../controllers/operator.controller.js";
import { authenticate } from "../middlewares/auth.middleware.js";

const router: Router = Router();

router.route("/")
  .get(authenticate(["operator:read"]), OperatorController)
  .post(authenticate(["operator:create"]), OperatorController)

router.route("/:operatorId")
  .get(authenticate(["operator:read"]), OperatorController)
  .put(authenticate(["operator:update"]), OperatorController)
  .delete(authenticate(["operator:delete"]), OperatorController)

router.route("/:operatorId")
  .put(authenticate(["operator:scopes:assign", "operator:scopes:manage"]), OperatorController)
  .delete(authenticate(["operator:scopes:unassign", "operator:scopes:manage"]), OperatorController)

export { router as operatorRouter }