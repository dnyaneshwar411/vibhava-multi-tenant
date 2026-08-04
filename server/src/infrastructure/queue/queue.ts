import { env } from "../../config/envVars.js";
import { Redis } from "ioredis";
import { JobsOptions, Queue } from "bullmq";

export const redisConnection = new Redis(env.REDIS_URL as string, {
  maxRetriesPerRequest: null,
  connectTimeout: 10000,
  retryStrategy: () => null,
});

export const retryAndBackOff: JobsOptions = {
  attempts: env.QUEUE_RETRY_COUNT,
  backoff: {
    type: "exponential",
    delay: 1000,
  },
};

export const paymentsWebhookQueue = new Queue("PAYMENT_WEBHOOK", { connection: redisConnection });