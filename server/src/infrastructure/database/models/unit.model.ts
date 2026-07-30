import { model, Schema } from "mongoose";
import { CONSTANTS } from "../../../config/constants.js";
import { imageSchema } from "./common.schemas.js";

const specificationSchema = new Schema({
  squareFeet: {
    type: Number,
    min: 0
  },
  bedrooms: {
    type: Number,
    default: 0, min: 0
  },
  bathrooms: {
    type: Number,
    default: 1,
    min: 0
  },
  halfBathrooms: {
    type: Number,
    default: 0,
    min: 0
  },
  balconies: {
    type: Number,
    default: 0,
    min: 0
  },
  maxOccupancy: {
    type: Number,
    min: 1
  },

  furnishingStatus: {
    type: String,
    enum: CONSTANTS.UNIT_FURNISH_STATUS,
    default: 'Unfurnished',
  },
  flooringType: {
    type: String,
    enum: CONSTANTS.UNIT_FLOORING_TYPE,
  },

  heatingType: {
    type: String,
    enum: CONSTANTS.UNIT_HEATING_TYPE,
  },
  coolingType: {
    type: String,
    enum: CONSTANTS.UNIT_COOLING_TYPE,
  },
  utilityMeters: {
    electricMeterNumber: {
      type: String,
      trim: true
    },
    waterMeterNumber: {
      type: String,
      trim: true
    },
    gasMeterNumber: {
      type: String,
      trim: true
    },
  },

  // parking: {
  //   type: {
  //     type: String,
  //     enum: CONSTANTS.UNIT_PROPERTY_PARKEING_TYPE,
  //     //['None', 'Attached Garage', 'Detached Garage', 'Carport', 'Assigned Spot', 'Street']
  //     default: 'None',
  //   },
  //   spaces: { type: Number, default: 0 },
  //   spotNumber: { type: String, trim: true }, // e.g., "Bay #24"
  // },

  isPetFriendly: {
    type: Boolean,
    default: false
  },
  petPolicyDetails: {
    type: String,
    trim: true
  },
  isAdaAccessible: {
    type: Boolean,
    default: false
  },
  isSmokingAllowed: {
    type: Boolean,
    default: false
  },

  keyCodes: {
    smartLockId: {
      type: String,
      trim: true
    },
    keypadCode: {
      type: String
    },
    keyTagNumber: {
      type: String,
      trim: true
    },
  },
}, {
  timestamps: true
})

const galleryImageSchema = new Schema({
  caption: {
    type: String,
    trim: true, maxlength: 200
  },
  altText: {
    type: String,
    trim: true, maxlength: 200
  },
  sortOrder: {
    type: Number,
    default: 0
  },
  uploadedAt: {
    type: Date,
    default: Date.now
  },
}, {
  _id: true
})

galleryImageSchema.add(imageSchema)

const unitSchema = new Schema({
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
  unitNumber: {
    type: String,
    required: [true, "Unit number or name is required"],
    trim: true, // e.g., "4B", "Suite 102", "Building A - 12"
  },
  floor: {
    type: Number,
    default: 1,
  },

  specifications: {
    type: specificationSchema,
    required: true
  },

  finance: {
    marketRent: {
      type: Number,
      required: true,
      min: 0,
    },
    currentRent: {
      type: Number,
      default: 0,
      min: 0,
    },
    securityDeposit: {
      type: Number,
      default: 0,
      min: 0,
    },
    currency: {
      type: String,
      enum: CONSTANTS.AVAILABLE_CURRENCY,
      default: "INR",
      uppercase: true,
    },
  },

  unitType: {
    type: String,
    required: true,
    enum: CONSTANTS.UNIT_TYPE,
    default: "Other",
  },
  status: {
    type: String,
    required: true,
    enum: CONSTANTS.UNIT_STATUS,
    default: "Vacant",
    index: true,
  },

  occupant: {
    type: Schema.Types.ObjectId,
    ref: "Tenant"
  },

  media: {
    type: new Schema({
      primaryImage: {
        type: imageSchema,
        required: true
      },
      coverImage: {
        type: imageSchema
      },
      gallery: {
        type: [galleryImageSchema],
        default: []
      }
    })
  },

  amenities: {
    type: [String],
    trim: true,
    enum: CONSTANTS.UNIT_AMENITIES
  },

  createdBy: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  isDeleted: {
    type: Boolean,
    default: false,
    required: true
  }
}, {
  timestamps: true
});

unitSchema.index(
  { property: 1, unitNumber: 1 },
  { unique: true }
);

unitSchema.index({ organization: 1, property: 1, status: 1, isDeleted: 1 });

unitSchema.index({ property: 1, status: 1, "finance.marketRent": 1 });

const Unit = model("Unit", unitSchema);

export default Unit;