import path from "path";
import crypto from "crypto";
import multer from "multer";
import httpStatus from "http-status";
import { ApiError } from "../utils/apiError.js";
import { NextFunction, Request, RequestHandler, Response } from "express";
import { unlink } from "fs";

const allowedMimeTypes = [
  "image/jpg",
  "image/jpeg",
  "image/png",
  "image/gif",
  "image/webp",
  "image/svg+xml",
  "application/pdf",
  "application/msword",
  "application/octet-stream",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "text/plain"
];

const storage = multer.diskStorage({
  destination(req, file, callback) {
    const uploadPath = path.join(process.cwd()) + "/public/uploads"
    callback(null, uploadPath);
  },
  filename(req, file, callback) {
    const randomId = crypto.randomBytes(16).toString("hex");
    const ext = path.extname(file.originalname);
    callback(null, `${randomId}${ext}`);
  },
});

export const upload = multer({
  storage,
  fileFilter(req, file, callback) {
    if (allowedMimeTypes.includes(file.mimetype)) {
      callback(null, true);
    } else {
      callback(new ApiError(httpStatus.BAD_REQUEST, "Invalid mime type uploaded!"));
    }
  },
});

export const cleanUpMiddleware = function (fn: RequestHandler): RequestHandler {
  return function (req: Request, res: Response, next: NextFunction) {
    fn(req, res, (err) => {
      if (err) return next(err);
      res.on('finish', async () => {
        if (req.file) {
          try {
            unlink(req.file.path, () => { });
          } catch (e) { }
        }
      });
      next()
    })
  }
}