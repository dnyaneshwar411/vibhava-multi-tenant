import { Building, Crown, Sparkles } from "lucide-react";
import { Tier } from "../types";

export const MEMBERSHIP_TIER = ["Starter", "Professional", "Enterprise"];
export const MEMBERSHIP_BILLING_CYCLES = ["Monthly", "Annually"];

export const TIER_DETAILS: Record<Tier, { description: string; icon: React.ElementType }> = {
  Starter: {
    description: "Essential tools for small teams getting started.",
    icon: Building,
  },
  Professional: {
    description: "Advanced controls & higher throughput limits.",
    icon: Sparkles,
  },
  Enterprise: {
    description: "Dedicated infrastructure and 24/7 priority support.",
    icon: Crown,
  },
}