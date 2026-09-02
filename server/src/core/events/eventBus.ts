import EventEmitter from "node:events";
import { EventPayload, EventTypes } from "./types.js";
import { auditLogsQueue, paymentsWebhookQueue } from "../../infrastructure/queue/queue.js";
import { generateJobId } from "./utils.js";
import Logger from "../../common/logger/index.js";

class EventOrchestratorImplementation extends EventEmitter {
  constructor() {
    super();
    this.setMaxListeners(50);
  }

  init() {
    this.handler("WEBHOOK_PAYMENTS", async function (payload: EventPayload) {
      if (payload.type !== "WEBHOOK_PAYMENTS") return;
      const jobId = generateJobId("webhook-payment", {
        organizationId: payload.organizationId,
        transactionId: payload.transactionId,
        webhookId: payload.webhookId
      })
      paymentsWebhookQueue.add(jobId, payload)
    })

    this.handler("AUDIT_LOGS", async function (payload: EventPayload) {
      if (payload.type !== "AUDIT_LOGS") return
      const jobId = generateJobId("audit", `jobs-batch-${Date.now()}`)
      auditLogsQueue.add(jobId, payload)
    })
  }

  publish(event: EventTypes, payload: EventPayload) {
    try {
      return this.emit(event, payload);
    } catch (error: any) {
      Logger.error(error.message || "", error)
    }
  }

  async handler(
    event: EventTypes,
    callback: (payload: EventPayload) => void | Promise<void>
  ) {
    this.on(event, callback);
  }
}

export const EventOrchestrator = new EventOrchestratorImplementation();

EventOrchestrator.init();