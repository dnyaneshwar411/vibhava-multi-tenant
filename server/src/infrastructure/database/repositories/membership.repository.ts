import { QueryFilter } from "mongoose";
import Membership from "../models/membership.model.js";


export default class MembershipRepository {
  private static model = Membership;

  static async find(options: QueryFilter<{}>) {
    return await this.model
      .findOne(options)
      .select("organization tier status billingCycle currentPeriodStart currentPeriodEnd")
      .lean()
  }

  static async update(options: QueryFilter<{}>, payload: any) {
    return await this.model
      .findOneAndUpdate(options, {
        $set: payload
      }, {
        returnDocument: "after"
      })
  }
}