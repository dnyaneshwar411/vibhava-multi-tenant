import {
  LEASE_BILLING_CYCLES,
  LEASE_SECURITY_DEPOSIT_STATUSES,
  LEASE_STATUSES,
  LEASE_TYPES,
} from "../config";

export const createLeaseDefaultValue = {
  property: "",
  unit: "",
  primaryTenant: "",
  coTenants: "",
  leaseType: LEASE_TYPES[0],
  status: LEASE_STATUSES[0],
  startDate: "",
  endDate: "",
  moveInDate: "",
  moveOutDate: "",
  rentAmount: "",
  paymentDueDay: "",
  billingCycle: LEASE_BILLING_CYCLES[0],
  amountRequired: "",
  amountPaid: "",
  securityStatus: LEASE_SECURITY_DEPOSIT_STATUSES[0],
  heldInAccount: "",
  leaseAgreementDocument: "",
  notes: "",
}