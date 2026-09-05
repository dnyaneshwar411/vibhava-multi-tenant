import { model, Schema } from "mongoose";
import { CONSTANTS } from "../../../config/constants.js";

const paymentGatewaySchema = new Schema({
  organization: {
    type: Schema.Types.ObjectId,
    ref: "Organization"
  },
  type: {
    type: String,
    enum: CONSTANTS.PAYMENT_GATEWAY
  },
  credentials: {
    type: Schema.Types.Mixed,
    default: {}
    /**
     * STRIPE = { publishableKey: "", stripeKeyId: "", stripeSignature: "" }
     * RAZORPAY = { razorpayKeyId: "", razorpayKeySecret: "", razorpaySignature: "" }
     */
  }
}, {
  timestamps: true
});

const PaymentGateway = model("PaymentGateway", paymentGatewaySchema);

paymentGatewaySchema.index({ organization: 1, type: 1 }, { unique: true })

export default PaymentGateway;