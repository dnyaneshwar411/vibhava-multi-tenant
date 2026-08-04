import { model, Schema } from "mongoose";
import { CONSTANTS } from "../../../config/constants.js";

const membershipInvoiceSchema = new Schema({
  organization: {
    type: Schema.Types.ObjectId,
    ref: "Organization",
    required: true
  },
  membership: {
    type: Schema.Types.ObjectId,
    ref: "Membership"
  },
  type: {
    type: String,
    enum: CONSTANTS.MEMBERSHIP_TYPE
  },
  amount: {
    type: Number,
    required: true
  },
  transactionReference: {
    type: String
  },
  processedAt: {
    type: Date,
    default: Date.now
  },

  paymentDetails: {
    type: Schema.Types.Mixed
  }
});

const MembershipInvoice = model("MembershipInvoice", membershipInvoiceSchema);

export default MembershipInvoice;