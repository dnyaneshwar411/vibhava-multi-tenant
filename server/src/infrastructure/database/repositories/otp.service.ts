import { UpdateQuery, QueryOptions, Types, QueryFilter } from "mongoose";
import OTP, { IOTP } from "../models/otp.model.js";

export default class OTPRepository {
  private static model = OTP;

  static async findOne(
    filters: QueryFilter<IOTP>,
    options?: QueryOptions
  ) {
    return this.model
      .findOne(filters, null, options)
      .lean()
  }

  static async create(payload: Partial<IOTP>) {
    return await this.model.create(payload);
  }

  static async update(
    filters: QueryFilter<IOTP>,
    update: UpdateQuery<IOTP>,
    options: QueryOptions = { new: true, upsert: true }
  ) {
    return this.model
      .findOneAndUpdate(filters, update, { ...options, runValidators: true })
  }

  static async deleteOne(id: Types.ObjectId | string) {
    return this.model.findByIdAndDelete(id)
  }
}