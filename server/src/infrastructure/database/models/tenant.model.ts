import { model, Schema } from "mongoose";
import { imageSchema } from "./common.schemas.js";
import { CONSTANTS } from "../../../config/constants.js";

const tenantSchema = new Schema({
  organization: {
    type: Schema.Types.ObjectId,
    ref: "Organization",
    required: true,
    index: true,
  },
   name: {
    type: String,
    required: true,
    trim: true
  },
  countryCode: {
    type: Number,
  },
  mobileNumber: {
    type: Number,
  },
  email: {
    type: String,
    required: true
  },
  avatar: {
    type: imageSchema
  },
  status: {
    type: String,
    required: true,
    enum: CONSTANTS.TENANT_STATUS,
    default: "Applicant",
    index: true,
  },
  currentResidence: {
    property: {
      type: Schema.Types.ObjectId,
      ref: "Property",
      index: true
    },
    unit: {
      type: Schema.Types.ObjectId,
      ref: "Unit",
      index: true
    },
    activeLease: {
      type: Schema.Types.ObjectId,
      ref: "Lease",
    },
    moveInDate: {
      type: Date,
    },
  },

  communicationPreferences: {
    preferredChannel: {
      type: String,
      enum: CONSTANTS.TENANT_COMMUNICATION_CHANNELS,
      default: "Email",
    },
    allowSmsNotifications: {
      type: Boolean,
      default: true
    },
    allowEmailNotifications: {
      type: Boolean,
      default: true
    },
  },
  isDeleted: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

tenantSchema.index({ organization: 1, status: 1 });
tenantSchema.index({ organization: 1, mobileNumber: 1 });
tenantSchema.index({ organization: 1, name: "text", email: "text" });

const Tenant = model("Tenant", tenantSchema);

export default Tenant;