import { Option } from "@/components/ui/multi-select";
import { TenantCreationInput } from "../schema/create";

export const TENANT_STATUS: Option<{ _id: string }>[] = [
  { label: "Applicant", value: "Applicant", _id: "Applicant" },
  { label: "Active", value: "Active", _id: "Active" },
  { label: "Past", value: "Past", _id: "Past" },
  { label: "Evicted", value: "Evicted", _id: "Evicted" },
  { label: "Rejected", value: "Rejected", _id: "Rejected" },
];

export const TENANT_COMMUNICATION_CHANNELS = ["Email", "SMS", "Portal"];

export const STAGE_FIELDS: Record<number, (keyof TenantCreationInput)[]> = {
  0: ["firstName", "lastName", "email", "countryCode", "mobileNumber", "status"],
  1: ["currentResidence"],
  2: ["communicationPreferences"],
};