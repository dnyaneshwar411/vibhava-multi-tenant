import { Router } from "express";
import WebhookController from "../controllers/webhook.controller.js";

const router: Router = Router();

router
  .route("/payments/razorpay")
  .post(WebhookController.razorpayPaymentWebhook);

router
  .route("/payments/stripe/:organizationId")
  .post(WebhookController.stripePaymentWebhook);

export { router as webhookRouter };