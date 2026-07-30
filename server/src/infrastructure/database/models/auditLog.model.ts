import { model, Schema } from "mongoose";
import { CONSTANTS } from "../../../config/constants.js";

const auditLogSchema = new Schema({
  organization: {
    type: Schema.Types.ObjectId,
    ref: "Organization",
    required: false,
    index: true,
  },

  actorId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
    index: true,
    refPath: "actorModel"
  },
  actorModel: {
    type: String,
    required: true,
    enum: CONSTANTS.AUDIT_LOG_ACTOR_MODEL,
  },

  actorSnapshot: {
    fullName: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    },
    role: {
      type: String,
      required: true
    },
  },

  action: {
    type: String,
    required: true,
    enum: CONSTANTS.AUDIT_LOG_ACTION,
    index: true,
  },
  resource: {
    type: String,
    required: true,
    enum: CONSTANTS.AUDIT_LOG_RESOURCE,
    index: true,
  },
  resourceId: {
    type: Schema.Types.ObjectId,
    required: true,
    index: true,
  },

  changes: {
    before: {
      type: Schema.Types.Mixed,
    },
    after: {
      type: Schema.Types.Mixed,
    },
  },

  context: {
    ipAddress: {
      type: String,
      trim: true
    },
    userAgent: {
      type: String,
      trim: true
    },
    requestUrl: {
      type: String,
      trim: true
    },
    httpMethod: {
      type: String,
      enum: ["GET", "POST", "PUT", "PATCH", "DELETE"]
    },
  },

  description: {
    type: String,
    required: true,
    trim: true,
  },

  createdAt: {
    type: Date,
    default: Date.now,
    immutable: true,
    index: true,
  },
}, {
  timestamps: false,
  versionKey: false,
});

auditLogSchema.index({ organization: 1, resource: 1, resourceId: 1, timestamp: -1 });
auditLogSchema.index({ organization: 1, "actorId": 1, timestamp: -1 });
auditLogSchema.index({ organization: 1, action: 1, timestamp: -1 });

const AuditLog = model("AuditLog", auditLogSchema);

export default AuditLog;