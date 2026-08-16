import z from "zod";
import { LEASE_BILLING_CYCLES, LEASE_SECURITY_DEPOSIT_STATUSES, LEASE_STATUSES, LEASE_TYPES } from "../config";

export const leaseCreationSpacePeopleSchema = z.object({
  property: z.string().min(1, "Please select Property"),
  unit: z.string().min(1, "Please select Unit."),
  primaryTenant: z.string().min(1, "Please select Primary Tenant."),
  coTenants: z.array(z.string()),
})

export const leaseCreationDatesDurationSchema = z.object({
  leaseType: z.enum(LEASE_TYPES),
  startDate: z.string(),
  endDate: z.string(),
  moveInDate: z.string(),
  moveOutDate: z.string(),
  status: z.enum(LEASE_STATUSES),
})

export const leaseCreationFinanceAgreement = z.object({
  finance: z.object({
    rentAmount: z
      .string({ message: "Base rent amount is required" })
      .trim()
      .min(1, "Base rent amount is required")
      .regex(/^\d+(\.\d{1,2})?$/, "Rent amount must be a valid positive number"),

    paymentDueDay: z
      .string({ message: "Payment due day is required" })
      .trim()
      .min(1, "Payment due day is required")
      .regex(/^(0?[1-9]|[12][0-9]|3[01])$/, "Payment due day must be a valid day between 1 and 31"),

    billingCycle: z
      .enum(LEASE_BILLING_CYCLES),

  }),
  security: z.object({
    amountRequired: z.string(),
    amountPaid: z.string(),
    status: z.enum(LEASE_SECURITY_DEPOSIT_STATUSES),
    heldInAccount: z.string()
  })
});

export const leaseCreationDocument = z.object({
  leaseAgreementDocument: z.string().optional()
})

export const leaseCreationSchema = leaseCreationSpacePeopleSchema
  .merge(leaseCreationDatesDurationSchema)
  .merge(leaseCreationFinanceAgreement)
  .merge(leaseCreationDocument)

export type LeaseCreationInput = z.infer<typeof leaseCreationSchema>
export type LeaseCreationSpacePeopleInput = z.infer<typeof leaseCreationSpacePeopleSchema>
export type LeaseCreationDatesDurationInput = z.infer<typeof leaseCreationDatesDurationSchema>
export type LeaseCreationFinanceAgreementInput = z.infer<typeof leaseCreationFinanceAgreement>
export type LeaseCreationDocumentInput = z.infer<typeof leaseCreationDocument>