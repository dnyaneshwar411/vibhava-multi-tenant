import z from "zod";
import * as CONSTANTS from "../config";

export const createLeaseSchema = z.object({
  property: z.string().min(1, "Property is required"),
  unit: z.string().min(1, "Unit is required"),
  primaryTenant: z.string().min(1, "Primary tenant is required"),
  coTenants: z.string(),
  leaseType: z.enum(CONSTANTS.LEASE_TYPES),
  status: z.enum(CONSTANTS.LEASE_STATUSES),
  startDate: z.string().min(1, "Start date is required"),
  endDate: z.string().min(1, "End date is required"),
  moveInDate: z.string().min(1, "Move-in date is required"),
  moveOutDate: z.string().min(1, "Move-out date is required"),
  rentAmount: z.string().min(1, "Rent amount is required"),
  paymentDueDay: z.string().min(1, "Payment due day is required"),
  billingCycle: z.enum(CONSTANTS.LEASE_BILLING_CYCLES),
  amountRequired: z.string().min(1, "Security deposit amount is required"),
  amountPaid: z.string().min(1, "Amount paid is required"),
  securityStatus: z.enum(CONSTANTS.LEASE_SECURITY_DEPOSIT_STATUSES),
  heldInAccount: z.string().min(1, "Held in account is required"),
  leaseAgreementDocument: z.string().min(1, "Lease agreement document is required"),
  notes: z.string().min(1, "Notes are required"),
});