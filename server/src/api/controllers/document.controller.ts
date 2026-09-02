import { Request, Response } from "express";
import httpStatus from "http-status";
import catchAsync from "../utils/catchAsync.js";
import DocumentService from "../../core/services/document.service.js";

export default class DocumentController {
  static create = catchAsync(
    async function (req: Request, res: Response) {
      const document = await DocumentService.create(req.organization!, req.file!, req.body, {
        uploaderId: req.user._id,
        uploaderModel: req.userModel
      });
      res.status(httpStatus.CREATED).json({
        code: httpStatus.CREATED,
        message: "Successfull",
        data: document,
      })
    }
  )
}