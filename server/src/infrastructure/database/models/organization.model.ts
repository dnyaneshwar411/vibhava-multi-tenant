import { model, Schema } from "mongoose";
import { CONSTANTS } from "../../../config/constants.js";

const organizationSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  subdomain: {
    type: String,
    required: true,
    unique: true,
    index: 1
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  meta: {
    // should be SEO meta
  },
  branding: {
    // should be details related to the branding
  },
  subscription: {
    type: Schema.Types.ObjectId,
    ref: "Subscription"
  },
  status: {
    type: String,
    enum: CONSTANTS.ORGANIZATION_STATUS,
    required: true,
    default: "In Active"
  }
}, {
  timestamps: true
});

const Organization = model("Organization", organizationSchema);

export default Organization;