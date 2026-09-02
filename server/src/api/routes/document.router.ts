import { Router } from "express";
import { validate } from "../middlewares/validate.middleware.js";
import DocumentSchema from "../schemas/document.schema.js";
import { authenticate } from "../middlewares/auth.middleware.js";
import DocumentController from "../controllers/document.controller.js";
import { cleanUpMiddleware, upload } from "../middlewares/multer.middleware.js";

const router: Router = Router();

router.route("/")
  .post(
    authenticate([]),
    cleanUpMiddleware(upload.single("file")),
    validate(DocumentSchema.create),
    DocumentController.create
  )

export { router as documentRouter }