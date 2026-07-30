import { model, Schema } from "mongoose";
import { CONSTANTS } from "../../../config/constants.js";
import { imageSchema } from "./common.schemas.js";

const addressSchema = new Schema({
  street1: {
    type: String,
    required: true,
    trim: true
  },
  street2: {
    type: String,
    trim: true,
  },
  city: {
    type: String,
    required: true,
    trim: true,
  },
  state: {
    type: String,
    required: true,
    trim: true,
  },
  zipCode: {
    type: String,
    required: true,
    trim: true
  },
  country: {
    type: String,
    enum: CONSTANTS.AVAILABLE_COUNTRIES,
    default: 'India',
    required: true,
  },
  // GeoJSON for spatial queries (e.g., finding properties within a geographic radius
  location: {
    type: {
      type: String,
      enum: ['Point'],
      default: 'Point',
    },
    coordinates: {
      type: [Number], // [longitude, latitude]
      default: undefined,
    },
  },
}, {
  _id: false
});

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

const propertySchema = new Schema({
  organization: {
    type: Schema.Types.ObjectId,
    ref: "Organization"
  },
  name: {
    type: String,
    trim: true,
    required: true,
    maxLength: 150
  },
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: "User"
  },
  manager: {
    type: Schema.Types.ObjectId,
    ref: "User"
  },
  propertyType: {
    type: String,
    required: true,
    enum: CONSTANTS.PROPERTY_TYPE,
    default: 'Multi-Family',
  },
  status: {
    type: String,
    enum: CONSTANTS.PROPERTY_STATUS,
    default: 'Active',
    index: true,
  },
  address: {
    type: addressSchema,
    required: true
  },

  amenities: {
    type: [String],
    trim: true,
    enum: CONSTANTS.PROPERTY_AMENITIES
  },

  media: {
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
  },

  finance: {
    currency: {
      type: String,
      enum: CONSTANTS.AVAILABLE_CURRENCY
    },
    defaultLateFeeAmount: {
      type: Number,
      required: true,
      default: 0
    },
    defaultGracePeriodDays: {
      type: Number,
      default: 15
    },
  },

  isDeleted: {
    type: Boolean,
    default: false,
    required: true
  }
}, {
  timestamps: true
});

const Property = model("Property", propertySchema);

export default Property;