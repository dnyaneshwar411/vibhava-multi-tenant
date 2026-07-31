import { Router } from "express";
import { authenticate } from "../middlewares/auth.middleware.js";
import { validate } from "../middlewares/validate.middleware.js";
import UserController from "../controllers/user.controller.js";
import UserSchema from "../schemas/user.schema.js";

const router: Router = Router();

router
  .route("/")
  .get(authenticate(["user:read"]), UserController.getUsers)
  .post(authenticate(["user:create"]), UserController.createUser);

router
  .route("/:userId")
  .get(authenticate(["user:read"]), UserController.getUserById)
  .put(
    validate(UserSchema.update),
    authenticate(["user:update"]),
    UserController.updateUser,
  )
  .delete(authenticate(["user:delete"]), UserController.deleteUser);

router
  .route("/:userId/scopes")
  .put(
    validate(UserSchema.manageScopes),
    authenticate(["user:scopes:assign", "user:scopes:manage"]),
    UserController.assignScopes,
  )
  .delete(
    validate(UserSchema.manageScopes),
    authenticate(["user:scopes:unassign", "user:scopes:manage"]),
    UserController.unassignScopes,
  );

export { router as userRouter };
