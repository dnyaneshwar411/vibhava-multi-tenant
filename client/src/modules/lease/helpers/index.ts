import { parse } from "date-fns"
import { LeaseCreationInput } from "../schemas/lease-creation"

export const buildLeaseRequestBody = function (data: LeaseCreationInput) {
  return {
    property: data.property,
    unit: data.unit,
    primaryTenant: data.primaryTenant,
    coTenants: data.coTenants,

    status: data.status,
    leaseType: data.leaseType,
    startDate: parse(data.startDate, "yyyy-MM-dd", new Date()).toString(),
    endDate: parse(data.endDate, "yyyy-MM-dd", new Date()).toString(),
    ...(data.moveInDate && { moveInDate: parse(data.moveInDate, "yyyy-MM-dd", new Date()).toString() }),
    ...(data.moveOutDate && { moveOutDate: parse(data.moveOutDate, "yyyy-MM-dd", new Date()).toString() }),
    finance: {
      rentAmount: data.finance?.rentAmount,
      paymentDueDay: data.finance?.paymentDueDay,
      billingCycle: data.finance?.billingCycle,
    },
    security: {
      status: data.security?.status,
      amountRequired: data.security?.amountRequired,
      amountPaid: data.security?.amountPaid,
      heldInAccount: data.security?.heldInAccount,
    },
    leaseAgreementDocument: data.leaseAgreementDocument as string,
  }
}