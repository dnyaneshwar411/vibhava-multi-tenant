import { Request, Response } from "express";
import httpStatus from "http-status";
import catchAsync from "../utils/catchAsync.js";
import PaymentGatewayRepository from "../../infrastructure/database/repositories/paymentGateway.repository.js";

export default class PaymentGatewayController {
  static retrieve = catchAsync(
    async function (req: Request, res: Response) {
      const gateways = await PaymentGatewayRepository.find({ organization: req.organization })
      res.status(httpStatus.OK).json({ code: httpStatus.OK, data: gateways })
    }
  )

  static create = catchAsync(
    async function (req: Request, res: Response) {
      const gateways = await PaymentGatewayRepository.create(req.organization!, req.body)
      res.status(httpStatus.OK).json({ code: httpStatus.OK, data: gateways })
    }
  )

  static udpate = catchAsync(
    async function (req: Request, res: Response) {
      const { gatewayType } = req.params as { gatewayType: string }
      const gateways = await PaymentGatewayRepository.update({ organization: req.organization, type: gatewayType }, req.body)
      res.status(httpStatus.OK).json({ code: httpStatus.OK, data: gateways })
    }
  )

  static delete = catchAsync(
    async function (req: Request, res: Response) {
      const { gatewayType } = req.params as { gatewayType: string }
      const gateways = await PaymentGatewayRepository.delete({ organization: req.organization, type: gatewayType })
      res.status(httpStatus.OK).json({ code: httpStatus.OK, data: gateways })
    }
  )
}