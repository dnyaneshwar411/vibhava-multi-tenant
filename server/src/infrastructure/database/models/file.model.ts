import { model, Schema } from "mongoose";
import { CONSTANTS } from "../../../config/constants.js";

const fileSchema = new Schema({
  meta: {
    type: Schema.Types.Mixed
  },
  object: {
    private: {
      type: Boolean,
      default: false
    },
    key: {
      type: String
    },
    resource: {
      type: String,
      enum: CONSTANTS.FILE_UPLOAD_DIRECTORIES
    }
  },
  provider: {
    type: Schema.Types.Mixed,
    default: {}
  },
  uploaderId: {
    type: Schema.Types.ObjectId,
    refPath: "uploaderModel"
  },
  uploaderModel: {
    type: String,
    enum: ["Tenant", "User", "Vendor", "Operator"]
  }
}, { timestamps: true });

const File = model("File", fileSchema);

export default File;