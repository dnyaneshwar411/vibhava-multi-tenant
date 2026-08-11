import type { LeaseDetailsForForm, UpdateLeaseFormValues } from "../types";
import {
  LEASE_BILLING_CYCLES,
  LEASE_SECURITY_DEPOSIT_STATUSES,
  LEASE_STATUSES,
  LEASE_TYPES,
} from ".";

export function getUpdateLeaseDefaultValues(
  lease?: LeaseDetailsForForm
): UpdateLeaseFormValues {
  return {
    property: lease?.property?._id ?? "",
    unit: lease?.unit?._id ?? "",
    primaryTenant:
      typeof lease?.primaryTenant === "object"
        ? lease.primaryTenant?._id ?? ""
        : "",
    coTenants: Array.isArray(lease?.coTenants)
      ? lease.coTenants
          .map((item) => (typeof item === "string" ? item : item?._id ?? ""))
          .filter(Boolean)
          .join(", ")
      : "",
    leaseType: lease?.leaseType ?? LEASE_TYPES[0],
    status: lease?.status ?? LEASE_STATUSES[0],
    startDate: lease?.startDate ? new Date(lease.startDate).toISOString().slice(0, 10) : "",
    endDate: lease?.endDate ? new Date(lease.endDate).toISOString().slice(0, 10) : "",
    moveInDate: lease?.moveInDate ? new Date(lease.moveInDate).toISOString().slice(0, 10) : "",
    moveOutDate: lease?.moveOutDate ? new Date(lease.moveOutDate).toISOString().slice(0, 10) : "",
    rentAmount: lease?.finance?.rentAmount !== undefined ? String(lease.finance.rentAmount) : "",
    paymentDueDay:
      lease?.finance?.paymentDueDay !== undefined ? String(lease.finance.paymentDueDay) : "",
    billingCycle: lease?.finance?.billingCycle ?? LEASE_BILLING_CYCLES[0],
    amountRequired:
      lease?.security?.amountRequired !== undefined ? String(lease.security.amountRequired) : "",
    amountPaid: lease?.security?.amountPaid !== undefined ? String(lease.security.amountPaid) : "",
    securityStatus: lease?.security?.status ?? LEASE_SECURITY_DEPOSIT_STATUSES[0],
    heldInAccount: lease?.security?.heldInAccount ?? "",
    leaseAgreementDocument:
      typeof lease?.leaseAgreementDocument === "object"
        ? lease.leaseAgreementDocument?._id ?? ""
        : lease?.leaseAgreementDocument ?? "",
    notes: lease?.notes ?? "",
  };
}
