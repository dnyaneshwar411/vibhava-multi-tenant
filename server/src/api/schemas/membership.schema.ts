import z from "zod";
import { MEMBERSHIP_DURATION } from "../../config/payment.js";
import { CONSTANTS } from "../../config/constants.js";

export default class MembershipSchema {
  static create = z.object({
    body: z.object({
      duration: z.enum(MEMBERSHIP_DURATION),
      tier: z.enum(CONSTANTS.MEMBERSHIP_TIER),
      currency: z.enum(CONSTANTS.AVAILABLE_CURRENCY).default("INR")
    })
  })
}