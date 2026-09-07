import { model, Schema } from "mongoose";
import { CONSTANTS } from "../../../config/constants.js";

const companyPageSchema = new Schema({
  organization: {
    type: Schema.Types.ObjectId,
    ref: "Organization",
    required: true
  },
  page: {
    type: String,
    enum: CONSTANTS.ORGANIZATION_COMPANY_PAGE
  },
  html: {
    type: String,
    required: true
  }
}, {
  timestamps: true
});

const CompanyPage = model("CompanyPage", companyPageSchema);

export default CompanyPage;