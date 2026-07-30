import { Schema } from "mongoose";

export const imageSchema = new Schema({
  private: {
    type: Boolean,
    default: false
  },
  key: {
    type: String
  }
}, { _id: false })