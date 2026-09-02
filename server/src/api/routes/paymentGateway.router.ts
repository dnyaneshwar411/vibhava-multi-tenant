import { Router } from "express";
import { authenticate } from "../middlewares/auth.middleware.js";
import PaymentGatewayController from "../controllers/paymentGateway.controller.js";
import { validate } from "../middlewares/validate.middleware.js";
import PaymentGatewaySchema from "../schemas/paymentGateway.schema.js";

const router: Router = Router();

router.route("/")
  .get(authenticate(["payment-gateway:read"]), PaymentGatewayController.retrieve)
  .post(validate(PaymentGatewaySchema.create), authenticate(["payment-gateway:create"]), PaymentGatewayController.create);

router.route("/:gatewayType")
  .put(validate(PaymentGatewaySchema.update), authenticate(["payment-gateway:update"]), PaymentGatewayController.udpate)
  .delete(validate(PaymentGatewaySchema.delete), authenticate(["payment-gateway:delete"]), PaymentGatewayController.delete)

export { router as paymentGatewayRouter }