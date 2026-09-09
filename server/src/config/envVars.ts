import * as zod from "zod";
import dotenv from "dotenv";

const envSchema = zod.object({
  NODE_ENV: zod.string(),
  EXPRESS_PORT: zod.coerce.number().default(1993),

  APPLICATION_CLIENT: zod.string(),

  REDIS_URL: zod.string(),
  REDIS_ENABLED: zod.string().transform((val) => val.toLowerCase() === "true"),

  FIREBASE_PROJECT_ID: zod.string(),
  FIREBASE_PRIVATE_KEY_ID: zod.string(),
  FIREBASE_PRIVATE_KEY: zod.string(),
  FIREBASE_CLIENT_EMAIL: zod.string(),
  FIREBASE_CLIENT_ID: zod.string(),
  FIREBASE_CLIENT_X509_CERT_URL: zod.string(),

  EMAIL: zod.string(),
  EMAIL_HOST: zod.string(),
  EMAIL_PORT: zod.string(),
  EMAIL_USER: zod.string(),
  EMAIL_PASSWORD: zod.string(),
  EMAIL_FROM: zod.string(),

  DLT_AUTHORIZATION_KEY: zod.string(),
  DLT_SENDER_ID: zod.string(),
  DLT_MESSAGE_ID: zod.string(),
  DLT_BASE_URL: zod.string(),

  QUEUE_RETRY_COUNT: zod.coerce.number(),

  MONGOOSE_DB_URL: zod.string(),

  MONGOOSE_MAX_POOL_SIZE: zod.coerce.number(),
  MONGOOSE_MIN_POOL_SIZE: zod.coerce.number(),

  JWT_SECRET_TOKEN: zod.string(),

  LOGER_API_META: zod.string().transform((val) => val.toLowerCase() === "true"),

  CLIENT_BASE_HOSTNAME: zod.string(),
  APP_SUPPORT_EMAIL: zod.string(),

  JWT_ACCESS_EXPIRATION: zod.coerce.number(),
  JWT_REFRESH_EXPIRATION: zod.coerce.number(),

  AWS_ACCESS_KEY_ID: zod.string(),
  AWS_SECRET_ACCESS_KEY: zod.string(),
  AWS_S3_REGION: zod.string(),
  AWS_S3_PRIVATE_BUCKET: zod.string(),
  AWS_S3_PUBLIC_BUCKET: zod.string(),

  COMPANY_DEFAULT_STRIPE_KEY: zod.string(),
  COMPANY_DEFAULT_RAZORPAY_KEY_ID: zod.string(),
  COMPANY_DEFAULT_RAZORPAY_KEY_SECRET: zod.string(),
  COMPANY_DEFAULT_RAZORPAY_SIGNATURE: zod.string(),

  CIPHER_SECRET_KEY: zod.string(),
  ISR_CIPHER_SECRET: zod.string(),
});

const validateEnv = function () {
  try {
    dotenv.config();
    return envSchema.parse(process.env);
  } catch (error) {
    process.exit(1);
  }
};

export const env = validateEnv();
