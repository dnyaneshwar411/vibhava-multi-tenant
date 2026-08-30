import { MEMBERSHIP_BILLING_CYCLES, MEMBERSHIP_TIER } from "../config"

export type Tier = (typeof MEMBERSHIP_TIER)[number]
export type BillingCycle = (typeof MEMBERSHIP_BILLING_CYCLES)[number]