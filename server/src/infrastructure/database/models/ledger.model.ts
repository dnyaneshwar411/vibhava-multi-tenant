import { model, Schema } from "mongoose";
import { CONSTANTS } from "../../../config/constants.js";

const transactionLineSchema = new Schema(
  {
    accountId: {
      type: String,
      required: true,
      trim: true,
    },
    accountName: {
      type: String,
      required: true,
      trim: true,
    },
    type: {
      type: String,
      required: true,
      enum: ["DEBIT", "CREDIT"],
    },
    amount: {
      type: Number,
      required: true,
      min: [0.01, "Amount must be greater than zero"],
    },
    description: {
      type: String,
      trim: true,
    },
  },
  { _id: true }
);

const ledgerEntrySchema = new Schema({
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
    index: true,
  },

  tenant: {
    type: Schema.Types.ObjectId,
    ref: "Tenant",
    index: true,
  },
  lease: {
    type: Schema.Types.ObjectId,
    ref: "Lease",
    index: true,
  },
  vendor: {
    type: Schema.Types.ObjectId,
    ref: "Vendor",
    index: true,
  },
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: "User",
    index: true,
    required: true,
  },

  entryType: {
    type: String,
    required: true,
    enum: CONSTANTS.LEDGER_ENTRY_TYPE,
    index: true,
  },
  status: {
    type: String,
    required: true,
    enum: CONSTANTS.LEDGER_ENTRY_STATUS,
    default: "Posted",
    index: true,
  },

  finance: {
    currency: {
      type: String,
      enum: CONSTANTS.AVAILABLE_CURRENCY,
      default: "INR"
    },
    totalAmount: {
      type: Number,
      required: true,
      min: 0
    },
    paymentGateway: {
      type: String,
      enum: CONSTANTS.PAYMENT_GATEWAY,
      default: "INR"
    }
  },

  lines: {
    type: [transactionLineSchema],
    required: true,
  },

  reference: {
    type: Schema.Types.Mixed,
    default: {}
  },
  memo: { type: String, trim: true, maxlength: 500 },

  // isDeleted: {
  //   type: Boolean,
  //   default: false
  // }
}, {
  timestamps: true
});

ledgerEntrySchema.index({ organization: 1, property: 1 });
ledgerEntrySchema.index({ organization: 1, tenant: 1, status: 1 });
ledgerEntrySchema.index({ organization: 1, property: 1, entryType: 1 });

const LedgerEntry = model("LedgerEntry", ledgerEntrySchema);

export default LedgerEntry;