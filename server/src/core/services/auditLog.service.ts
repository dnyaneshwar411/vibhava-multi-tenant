import { Request } from "express";
import AuditLog from "../../infrastructure/database/models/auditLog.model.js";
import { EventOrchestrator } from "../events/eventBus.js";
import { CONSTANTS_TYPE } from "../../common/types/index.js";
import { ObjectIdQueryTypeCasting } from "mongoose";
import { EventAuditLog } from "../events/types.js";

export default class AuditLogService {
  private static model = AuditLog;
  private static buffer: EventAuditLog[] = [];
  private static batchSize = 200;
  private static interval = 20000

  static init() {
    setInterval(() => this.flushBuffer(), this.interval);
  }

  static create(req: Request) {
    const event = this.buildLog(req);
    this.buffer.push(event)
  }

  static addScratch(payload: EventAuditLog) {
    this.buffer.push(payload)
  }

  private static flushBuffer() {
    if (this.buffer.length === 0) return;

    const eventsToEnqueue = this.buffer.splice(0, this.buffer.length);

    EventOrchestrator.publish("AUDIT_LOGS", {
      type: "AUDIT_LOGS",
      bacthSize: this.batchSize,
      logs: eventsToEnqueue
    })

    this.buffer = []
  }

  static addLogMeta(req: Request, meta: {
    action: CONSTANTS_TYPE["AUDIT_LOG_ACTION"],
    resource: CONSTANTS_TYPE["AUDIT_LOG_RESOURCE"],
    resourceId?: ObjectIdQueryTypeCasting,
    description?: string,
  }) {
    req.addAuditLog = true
    req.auditLogMeta = meta
  }

  static buildLog(req: Request): EventAuditLog {
    return {
      organization: req.organization,
      actorId: req.user._id,
      actorModel: req.userModel,
      actorSnapshot: {
        fullName: req.user.name,
        email: req.user.email
      },
      context: {
        ipAddress: req.ip,
        userAgent: req.get("user-agent"),
        requestUrl: req.url,
        httpMethod: req.method
      },
      createdAt: new Date(),
      ...req.auditLogMeta
    }
  }

  static async save(payload: any[]) {
    await this.model.create(payload)
  }
}

AuditLogService.init()