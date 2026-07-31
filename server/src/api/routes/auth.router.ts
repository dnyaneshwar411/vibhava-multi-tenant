import express from "express";
import AuthController from "../controllers/auth.controller.js";
import { authenticate } from "../middlewares/auth.middleware.js";
import { validate } from "../middlewares/validate.middleware.js";
import AuthSchema from "../schemas/auth.schema.js";

const router: express.Router = express.Router();

router.route("/login").post(validate(AuthSchema.login), AuthController.login);

router.route("/logout").post(AuthController.logout);

router.route("/refresh-token").post(AuthController.refreshToken);

router
  .route("/profile")
  .get(authenticate(["user:read"]), AuthController.profile)
  .put(
    validate(AuthSchema.update),
    authenticate(["user:update:own"]),
    AuthController.update,
  );

export { router as authRouter };
