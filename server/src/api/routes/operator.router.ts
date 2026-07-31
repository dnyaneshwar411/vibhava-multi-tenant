import { Router } from "express";
import { validate } from "../middlewares/validate.middleware.js";
import OperatorController from "../controllers/operator.controller.js";
import { authenticate } from "../middlewares/auth.middleware.js";
import OperatorSchema from "../schemas/operator.schema.js";

const router: Router = Router();

router
  .route("/")
  .get(authenticate(["operator:read"]), OperatorController.getOperators)
  .post(
    validate(OperatorSchema.create),
    authenticate(["operator:create"]),
    OperatorController.createOperator,
  );

router
  .route("/:operatorId")
  .get(authenticate(["operator:read"]), OperatorController.getOperatorById)
  .put(
    validate(OperatorSchema.update),
    authenticate(["operator:update"]),
    OperatorController.updateOperator,
  )
  .delete(authenticate(["operator:delete"]), OperatorController.deleteOperator);

router
  .route("/:operatorId/scopes")
  .put(
    validate(OperatorSchema.manageScopes),
    authenticate(["operator:scopes:assign", "operator:scopes:manage"]),
    OperatorController.assignScopes,
  )
  .delete(
    validate(OperatorSchema.manageScopes),
    authenticate(["operator:scopes:unassign", "operator:scopes:manage"]),
    OperatorController.unassignScopes,
  );

export { router as operatorRouter };
