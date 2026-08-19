import z from "zod";
import { MAINTENANCE_TICKET_CATEGORIES, MAINTENANCE_TICKET_PREFERRED_SCHEDULE, MAINTENANCE_TICKET_PRIORITY } from "../config/constants";

export const ticketCreationPropertyDetailsSchema = z.object({
  property: z.string().min(1, "Please Select Property"),
  unit: z.string().min(1, "Please Select Unit"),
  title: z.string().min(3, "Please add a title."),
  category: z.enum(MAINTENANCE_TICKET_CATEGORIES),
  description: z.string().min(3, "Please add a Description."),
})

export const ticketCreationMediaAttachmentsSchema = z.object({
  attachments: z.array(z.any())
})

export const ticketCreationAccessScheduleSchema = z.object({
  permissionToEnter: z.boolean(),
  entryNotes: z.string(),
  preferredSchedule: z.enum(MAINTENANCE_TICKET_PREFERRED_SCHEDULE),
})

export const ticketCreationCostBillingSchema = z.object({
  priority: z.enum(MAINTENANCE_TICKET_PRIORITY),
  estimatedCost: z.string(),
  isBillableToTenant: z.boolean(),
})

export const ticketCreationSchema = ticketCreationPropertyDetailsSchema
  .merge(ticketCreationMediaAttachmentsSchema)
  .merge(ticketCreationAccessScheduleSchema)
  .merge(ticketCreationCostBillingSchema)

export type TicketCreationInput = z.infer<typeof ticketCreationSchema>;
export type TicketCreationPropertyDetailsInput = z.infer<typeof ticketCreationPropertyDetailsSchema>;
export type TicketCreationAccessScheduleInput = z.infer<typeof ticketCreationAccessScheduleSchema>;
export type TicketCreationCostBillingInput = z.infer<typeof ticketCreationCostBillingSchema>;
export type TicketCreationMediaAttachmentInput = z.infer<typeof ticketCreationMediaAttachmentsSchema>;