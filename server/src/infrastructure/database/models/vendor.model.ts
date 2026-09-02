import { model, Schema } from "mongoose";
import { CONSTANTS } from "../../../config/constants.js";
import { imageSchema } from "./common.schemas.js";

const vendorSchema = new Schema({
  organization: {
    type: Schema.Types.ObjectId,
    ref: "Organization",
    required: true,
    index: true
  },
  name: {
    type: String,
    trim: true,
    required: true
  },
  countryCode: {
    type: Number,
  },
  mobileNumber: {
    type: Number,
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  avatar: {
    type: imageSchema
  },
  status: {
    type: String,
    required: true,
    enum: CONSTANTS.VENDOR_STATUS,
    default: "Active",
    index: true,
  },
  password: {
    type: String,
    required: true,
    trim: true,
    select: false
  },
  tradeCategory: {
    type: String,
    required: true,
    enum: CONSTANTS.VENDOR_TRADE_CATEGORIES,
    index: true,
  },

  address: {
    street1: {
      type: String,
      trim: true
    },
    street2: {
      type: String,
      trim: true
    },
    city: {
      type: String,
      trim: true
    },
    state: {
      type: String,
      trim: true
    },
    zipCode: {
      type: String,
      trim: true
    },
    country: {
      type: String,
      enum: CONSTANTS.AVAILABLE_COUNTRIES
    },
  },

  createdBy: {
    type: Schema.Types.ObjectId,
    ref: "User"
  },

  isDeleted: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

const Vendor = model("Vendor", vendorSchema);

export default Vendor;

// tbd
// need to implement the payment options and the payment details