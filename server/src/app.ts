import express, { Express, NextFunction, Request, Response } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import httpStatus from "http-status";
import { ApiError } from "./api/utils/apiError.js";
import { errorConverter, errorHandler } from "./api/middlewares/error.middleware.js";
import { v1Router } from "./api/routes/index.js";
import helmet from "helmet";
import Logger from "./common/logger/index.js";
import { env } from "./config/envVars.js";
import "./infrastructure/database/models/document.model.js";
import AuditLogService from "./core/services/auditLog.service.js";

const app: Express = express();

app.use(cors());
app.use(cookieParser());
app.use(bodyParser.json());

app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: true, limit: "10kb" }));

app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'"],
        styleSrc: ["'self'", "'unsafe-inline'"],
        imgSrc: ["'self'", "data:", "https:"],
      },
    },
    crossOriginEmbedderPolicy: false,
  })
);

/**
    Implement mongo sanitize carefully.
    app.use(
      mongoSanitize({
        replaceWith: "_",
        onSanitize: ({ req, key }) => {
          Logger.warn(`NoSQL injection attempt sanitized on key: ${key}`, {
            path: req.path,
            ip: req.ip,
          });
        },
      })
    );
 */

app.options("", cors());

app.use("/", function (
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const timeStart = performance.now();
  res.on("finish", async () => {
    const duration = (performance.now() - timeStart).toFixed(2);
    const { method, originalUrl } = req;
    const { statusCode } = res;

    const meta = !env.LOGER_API_META ? {} : {
      method,
      url: originalUrl,
      status: statusCode,
      duration: `${duration}ms`,
      ip: req.ip || req.headers["x-forwarded-for"],
    };

    const message = `${method} ${originalUrl} ${statusCode} - ${duration}ms`;

    if (statusCode >= 500) {
      Logger.error(message, undefined, meta);
    } else if (statusCode >= 400) {
      Logger.warn(message, meta);
    } else {
      Logger.info(message, meta);
    }

    if (req.addAuditLog) {
      AuditLogService.create(req)
    }
  });
  next();
})

app.use("/api/v1", v1Router);

app.use((_, __, next) => {
  next(new ApiError(httpStatus.NOT_FOUND, "Not found"));
});

app.use(errorConverter);

app.use(errorHandler);

export default app;
