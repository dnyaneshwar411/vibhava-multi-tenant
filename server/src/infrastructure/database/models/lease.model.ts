import { model, Schema } from "mongoose";
import { CONSTANTS } from "../../../config/constants.js";

const leaseSchema = new Schema({
  organization: {
    type: Schema.Types.ObjectId,
    ref: "Organization",
    required: true,
    index: true,
  },
  property: {
    type: Schema.Types.ObjectId,
    ref: "Property",
    required: true,
    index: true,
  },
  unit: {
    type: Schema.Types.ObjectId,
    ref: "Unit",
    required: true,
    index: true,
  },
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: "User"
  },
  primaryTenant: {
    type: Schema.Types.ObjectId,
    ref: "Tenant"
  },
  coTenants: {
    type: [Schema.Types.ObjectId],
    ref: "Tenant",
  },
  leaseType: {
    type: String,
    required: true,
    enum: CONSTANTS.LEASE_TYPE,
    default: "Fixed Term",
  },
  status: {
    type: String,
    required: true,
    enum: CONSTANTS.LEASE_STATUS,
    default: "Draft",
  },

  startDate: {
    type: Date,
    required: true,
    index: true
  },
  endDate: {
    type: Date,
    required: true,
    index: true
  },
  moveInDate: {
    type: Date,
  },
  moveOutDate: {
    type: Date,
  },

  finance: {
    rentAmount: {
      type: Number,
      required: [true, "Base rent amount is required"],
      min: 0,
    },
    paymentDueDay: {
      type: Number,
      required: true,
      min: 1,
      max: 31,
      default: 1,
    },
    billingCycle: {
      type: String,
      enum: CONSTANTS.LEASE_BILLING_CYCLE,
      default: "Monthly",
    },
  },

  security: {
    amountRequired: {
      type: Number,
      required: true,
      min: 0
    },
    amountPaid: {
      type: Number,
      default: 0,
      min: 0
    },
    status: {
      type: String,
      enum: CONSTANTS.LEASE_SECURITY_DEPOSIT_STATUS,
      default: "Unpaid",
    },
    heldInAccount: {
      type: String,
      trim: true
    },
  },

  leaseAgreementDocument: {
    type: Schema.Types.ObjectId,
    ref: "Document",
  },

  isDeleted: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

leaseSchema.index({ organization: 1, status: 1 });
leaseSchema.index(
  { unit: 1, status: 1 },
  { partialFilterExpression: { status: "Active" } }
);
leaseSchema.index({ organization: 1, endDate: 1, status: 1 });
leaseSchema.index({ primaryTenant: 1, status: 1 });

const Lease = model("Lease", leaseSchema);

export default Lease;