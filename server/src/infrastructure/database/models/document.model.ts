import { model, Schema } from "mongoose";
import { CONSTANTS } from "../../config/constants.js";
import { imageSchema } from "./common.schemas.js";

const documentMetaSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  size: {
    type: Number,
    required: true
  },
  mimeType: {
    type: String,
    enum: CONSTANTS.DOCUMENT_MIME_TYPES
  }
}, {
  _id: false
})

const documentSchema = new Schema({
  organization: {
    type: Schema.Types.ObjectId,
    ref: "Organization",
    index: true,
  },
  property: {
    type: Schema.Types.ObjectId,
    ref: "Property"
  },
  title: {
    type: String,
    required: true,
    trim: true
  },
  entityType: {
    type: String,
    required: true,
    enum: CONSTANTS.DOCUMENT_ENTITIES,
    index: true,
  },
  entityId: {
    type: Schema.Types.ObjectId,
    required: true,
    index: true,
  },
  status: {
    type: String,
    enum: CONSTANTS.DOCUMENT_STATUS,
    default: "Pending Review"
  },
  visibility: {
    type: String,
    enum: CONSTANTS.DOCUMENT_VISIBILITY,
    default: 'Internal Only',
  },
  category: {
    type: String,
    required: true,
    enum: CONSTANTS.DOCUMENT_CATEGORY,
    default: "Other"
  },
  meta: {
    type: documentMetaSchema,
    required: true
  },
  cloud: {
    type: imageSchema
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User"
  },
  tenant: {
    type: Schema.Types.ObjectId,
    ref: "Tenant"
  },
}, {
  timestamps: true
});

documentSchema.index({ organization: 1, entityType: 1, entityId: 1, isDeleted: 1 });

documentSchema.index({ organization: 1, property: 1, isDeleted: 1 });

documentSchema.index(
  { organization: 1, expiresAt: 1, status: 1 },
  { partialFilterExpression: { expiresAt: { $ne: null }, isDeleted: false } }
);

const Document = model("Document", documentSchema);

export default Document;