import { Request, Response } from "express";
import catchAsync from "../utils/catchAsync.js";
import httpStatus from "http-status";
import WebhookService from "../../core/services/webhook.service.js";

export default class WebhookController {
  static paymentWebhook = catchAsync(
    async function (req: Request, res: Response) {
      await WebhookService.paymentWebhook(req.body, req.headers["x-razorpay-signature"] as string)
      res.send(httpStatus.OK)
    }
  )
}