import { Router } from "express";
import WebhookController from "../controllers/webhook.controller.js";

const router: Router = Router();

router
  .route("/payments")
  .post(WebhookController.paymentWebhook);

export { router as webhookRouter };