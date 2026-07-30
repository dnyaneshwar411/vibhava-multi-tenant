import { Request, Response } from "express";
import catchAsync from "../utils/catchAsync.js";
import httpStatus from "http-status";
import FileService from "../../core/services/file.service.js";
import { ApiError } from "../utils/apiError.js";

export default class FileController {
  static upload = catchAsync(
    async function (req: Request, res: Response) {
      const uploadData = await FileService.upload(req.file!, req.body, {
        uploaderId: req.user._id,
        uploaderModel: req.userModel
      })
      if (!uploadData) throw new ApiError(httpStatus.BAD_REQUEST, "")
      res.status(httpStatus.OK).json({
        code: httpStatus.OK,
        data: {
          ...uploadData.object,
          _id: uploadData._id
        },
        message: "Successfully Uploaded the file"
      });
    }
  )
}