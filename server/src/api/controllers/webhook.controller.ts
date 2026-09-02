import { Request, Response } from "express";
import catchAsync from "../utils/catchAsync.js";
import httpStatus from "http-status";
import WebhookService from "../../core/services/webhook.service.js";
import { ObjectIdQueryTypeCasting } from "mongoose";

export default class WebhookController {
  static razorpayPaymentWebhook = catchAsync(
    async function (req: Request, res: Response) {
      await WebhookService.razorpayPaymentWebhook(req.body, req.headers["x-razorpay-signature"] as string)
      res.send(httpStatus.OK);
    }
  )

  static stripePaymentWebhook = catchAsync(
    async function (req: Request, res: Response) {
      const { organizationId } = req.params as { organizationId: ObjectIdQueryTypeCasting };
      await WebhookService.stripePaymentWebhook(
        req.body,
        req.headers["stripe-signature"] as string,
        organizationId
      )
      res.send(httpStatus.OK);
    }
  )
}