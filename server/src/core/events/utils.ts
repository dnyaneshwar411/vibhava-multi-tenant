import { createHash } from 'node:crypto';
export type JobNamespace = 'webhook-payment' | 'payment' | 'maintenance'
  | 'audit' | 'lease-parsing' | "email" | "isrPages";

/**
 * Generates a deterministic, unique jobId.
 * @param namespace - The type of operation/queue (prevents collisions)
 * @param identifier - A unique domain ID (e.g., paymentId) OR an object of unique keys
 */
export const generateJobId = function (namespace: JobNamespace, identifier: string | Record<string, any>): string {
  if (typeof identifier === 'string') {
    return `${namespace}:${identifier}`;
  }

  const sortedKeys = Object.keys(identifier).sort();
  const serialized = JSON.stringify(identifier, sortedKeys);

  const hash = createHash('sha256')
    .update(serialized)
    .digest('hex')
    .slice(0, 16);

  return `${namespace}:${hash}`;
}