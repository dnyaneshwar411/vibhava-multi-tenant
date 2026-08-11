import {
  LEASE_BILLING_CYCLES,
  LEASE_SECURITY_DEPOSIT_STATUSES,
  LEASE_STATUSES,
  LEASE_TYPES,
} from "../config";

export type LeaseType = (typeof LEASE_TYPES)[number];
export type LeaseStatus = (typeof LEASE_STATUSES)[number];
export type LeaseBillingCycle = (typeof LEASE_BILLING_CYCLES)[number];
export type LeaseSecurityDepositStatus =
  (typeof LEASE_SECURITY_DEPOSIT_STATUSES)[number];

export type CreateLeaseFormValues = {
  property: string;
  unit: string;
  primaryTenant: string;
  coTenants: string;
  leaseType: LeaseType;
  status: LeaseStatus;
  startDate: string;
  endDate: string;
  moveInDate: string;
  moveOutDate: string;
  rentAmount: string;
  paymentDueDay: string;
  billingCycle: LeaseBillingCycle;
  amountRequired: string;
  amountPaid: string;
  securityStatus: LeaseSecurityDepositStatus;
  heldInAccount: string;
  leaseAgreementDocument: string;
  notes: string;
};
