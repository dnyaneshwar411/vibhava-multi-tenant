import { InferRawDocTypeFromSchema, model, Schema } from "mongoose";
import { CONSTANTS } from "../../../config/constants.js";

const userSchema = new Schema({
  name: {
    type: String,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  mobileNumber: {
    type: Number,
  },
  countryCode: {
    type: Number
  },
  organization: {
    type: Schema.Types.ObjectId,
    ref: "Organization"
  },
  status: {
    type: String,
    enum: CONSTANTS.USER_STATUS
  },
  password: {
    type: String,
    required: true,
    trim: true,
    select: false
  },
  avatar: {
    private: {
      type: Boolean,
      default: false
    },
    key: {
      type: String
    }
  }
}, {
  timestamps: true
});

const User = model("User", userSchema);

export default User;

export type IUser = InferRawDocTypeFromSchema<typeof userSchema>;