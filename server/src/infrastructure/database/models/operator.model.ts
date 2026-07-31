import { model, Schema } from "mongoose";
import { CONSTANTS } from "../../../config/constants.js";

const operatorSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    select: false,
  },

  role: {
    type: String,
    enum: CONSTANTS.OPERATOR_ROLES,
    required: true,
    default: 'SUPPORT',
    index: true,
  },

  status: {
    type: String,
    enum: CONSTANTS.OPERATOR_STATUS,
    default: "Active",
    index: true,
  },

  mfa: {
    enabled: { type: Boolean, default: false },
    secret: { type: String, select: false },
  },
}, {
  timestamps: true,
  versionKey: false,
});

// operatorSchema.index({ email: 1 });

const Operator = model("Operator", operatorSchema);
export default Operator;