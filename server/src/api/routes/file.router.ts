import { Router } from "express";
import { authenticate } from "../middlewares/auth.middleware.js";
import { upload, cleanUpMiddleware } from "../middlewares/multer.middleware.js";
import FileController from "../controllers/file.controller.js";
import { validate } from "../middlewares/validate.middleware.js";
import FileSchema from "../schemas/file.schema.js";

const router: Router = Router();

router.route("/image")
  .post(
    authenticate([]),
    cleanUpMiddleware(upload.single("file")),
    validate(FileSchema.upload),
    FileController.upload
  );

export { router as fileRouter };

const abc = upload.single("file")