import { model, Schema } from "mongoose";
import { CONSTANTS } from "../../config/constants.js";

const entitlementsSchema = new Schema(
  {
    maxProperties: {
      type: Number,
      default: 5
    },
    maxUnits: {
      type: Number,
      default: 25
    },
    maxUsers: {
      type: Number,
      default: 3
    },
    maxStorageInGB: {
      type: Number,
      default: 5
    },

    hasKanbanMaintenance: {
      type: Boolean,
      default: false
    },
    hasLateFeeEngine: {
      type: Boolean,
      default: false
    },
    hasUnifiedInbox: {
      type: Boolean,
      default: false
    },
    hasVendorPortal: {
      type: Boolean,
      default: false
    },
    hasAuditLogs: {
      type: Boolean,
      default: false
    },
    hasApiAccess: {
      type: Boolean,
      default: false
    },
    hasCustomBranding: {
      type: Boolean,
      default: false
    },
  },
  { _id: false }
);

const membershipSchema = new Schema({
  organization: {
    type: Schema.Types.ObjectId,
    ref: "Organization",
    required: true,
    unique: true,
    index: true,
  },
  tier: {
    type: String,
    required: true,
    enum: CONSTANTS.MEMBERSHIP_TIER,
    default: "Starter",
    index: true,
  },
  status: {
    type: String,
    required: true,
    enum: CONSTANTS.MEMBERSHIP_STATUS,
    default: "Active",
    index: true,
  },
  billingCycle: {
    type: String,
    enum: CONSTANTS.MEMBERSHIP_BILLING_CYCLES,
    default: "Monthly",
  },
  currentPeriodStart: {
    type: Date,
    required: true,
    default: Date.now,
  },
  currentPeriodEnd: {
    type: Date,
    required: true,
    index: true,
  },

  entitlements: {
    type: entitlementsSchema,
    required: true,
    default: {},
  },

  stripe: {},
  razorpay: {}
});

const Membership = model("Membership", membershipSchema);

export default Membership;