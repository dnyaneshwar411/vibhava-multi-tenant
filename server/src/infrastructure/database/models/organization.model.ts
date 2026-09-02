import { model, Schema } from "mongoose";
import { CONSTANTS } from "../../../config/constants.js";
import { imageSchema } from "./common.schemas.js";

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
    title: {
      type: String,
      trim: true,
      maxlength: 70
    },
    description: {
      type: String,
      trim: true,
      maxlength: 160
    },
    keywords: [
      {
        type: String,
        trim: true
      }
    ],
    ogImage: {
      type: String,
      trim: true
    },
    ogTitle: {
      type: String,
      trim: true
    },
    ogDescription: {
      type: String,
      trim: true
    },
    twitterCardType: {
      type: String,
      enum: ["summary", "summary_large_image"],
      default: "summary_large_image",
    },
    twitterHandle: {
      type: String,
      trim: true
    },
    canonicalUrl: {
      type: String,
      trim: true
    },
    noIndex: {
      type: Boolean,
      default: false
    },
  },
  branding: {
    // should be details related to the branding
    logo: imageSchema,
    darkLogo: imageSchema,
    favicon: imageSchema,
    banner: imageSchema,
    colors: {
      primary: {
        type: String,
        default: "#1E3A8A"
      },
      secondary: {
        type: String,
        default: "#0D9488"
      },
      accent: {
        type: String,
        default: "#F59E0B"
      },
      background: {
        type: String,
        default: "#FFFFFF"
      },
      darkBackground: {
        type: String,
        default: "#0F172A"
      },
    },
    emailFooterText: {
      type: String,
      trim: true
    },
    supportEmail: {
      type: String,
      trim: true
    },
    supportPhone: {
      type: String,
      trim: true
    },
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