import { env } from "../../config/envVars.js";
// import IORedis from "ioredis";
// import { JobsOptions, Queue } from "bullmq";

// export const redisConnection = new IORedis(env.REDIS_URL as string, {
//   maxRetriesPerRequest: null,
//   connectTimeout: 10000,
//   retryStrategy: () => null,
// });

// export const retryAndBackOff: JobsOptions = {
//   attempts: env.QUEUE_RETRY_COUNT,
//   backoff: {
//     type: "exponential",
//     delay: 1000,
//   },
// };

// export const pushQueue = new Queue("[queue-name]", { connection: redisConnection });