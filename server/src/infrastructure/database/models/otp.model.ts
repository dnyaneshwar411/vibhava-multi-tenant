import { InferRawDocTypeFromSchema, model, Schema } from "mongoose";
import { CONSTANTS } from "../../../config/constants.js";

const otpSchema = new Schema({
  actor: {
    type: Schema.Types.ObjectId,
    refPath: "actorModel",
    required: true
  },
  actorModel: {
    type: String,
    enum: ["Tenant", "Vendor", "User", "Operator"],
    required: true
  },
  entity: {
    type: String,
    enum: CONSTANTS.OTP_ENTITIES,
    required: true
  },
  otp: {
    type: Number,
    required: true
  },
  isVerified: {
    type: Boolean,
    default: false
  },
  expiresAt: {
    type: Date,
    required: true,
    index: { expires: 0 }
  }
}, {
  timestamps: true
});

otpSchema.index({ actor: 1, entity: 1, isVerified: 1 });
otpSchema.index({ actor: 1, entity: 1 }, { unique: true });

const OTP = model("OTP", otpSchema);

export default OTP;
export type IOTP = InferRawDocTypeFromSchema<typeof otpSchema>