import mongoose from "mongoose";
import { env } from "../config/envVars.js";
import Logger from "../common/logger/index.js";

mongoose
  .connect(env.MONGOOSE_DB_URL)
  .then(() => {
    Logger.info("db connected");
    import("./worker.js")
  })
  .catch((error) => {
    Logger.error(error);
    process.exit(1);
  });