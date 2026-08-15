import z from "zod";
import { TENANT_COMMUNICATION_CHANNELS, TENANT_STATUS } from "../config";

export const tenantCreationOverview = z.object({
  firstName: z.string().trim().min(1, "First name is required"),
  lastName: z.string().trim().min(1, "Last name is required"),
  email: z.string().email("Invalid email address").trim(),
  countryCode: z.string(),
  mobileNumber: z.string(),
  // avatar: imageSchema,
  status: z.enum(TENANT_STATUS.map(item => item.value)),
})

export const tenantCreationResidence = z.object({
  currentResidence: z.object({
    property: z.string(),
    unit: z.string(),
    activeLease: z.string(),
    moveInDate: z.string(),
  }),
})

export const tenantCreationCommunicationChannel = z.object({
  communicationPreferences: z.object({
    preferredChannel: z.enum(TENANT_COMMUNICATION_CHANNELS),
    allowSmsNotifications: z.boolean(),
    allowEmailNotifications: z.boolean(),
  })
})

export const tenantCreation = tenantCreationOverview
  .merge(tenantCreationResidence)
  .merge(tenantCreationCommunicationChannel)


export type TenantCreationInput = z.infer<typeof tenantCreation>;
export type TenantCreationOverviewInput = z.infer<typeof tenantCreationOverview>;
export type TenantCreationResidenceInput = z.infer<typeof tenantCreationResidence>;
export type TenantCreationCommunicationChannelInput = z.infer<typeof tenantCreationCommunicationChannel>;