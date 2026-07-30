import { Router } from "express";
import { authenticate } from "../middlewares/auth.middleware.js";
import { validate } from "../middlewares/validate.middleware.js";
import UserController from "../controllers/user.controller.js";

const router: Router = Router();

router
  .route("/")
  .get(authenticate(["user:read"]), UserController)
  .post(authenticate(["user:create"]))

router
  .route("/:userId")
  .get(authenticate(["user:read"]), UserController)
  .put(authenticate(["user:update"]), UserController)
  .delete(authenticate(["user:delete"]), UserController)

router
  .route("/:userId/scopes")
  .put(authenticate(["user:scopes:assign", "user:scopes:manage"]), UserController)
  .delete(authenticate(["user:scopes:unassign", "user:scopes:manage"]), UserController)


export { router as userRouter }