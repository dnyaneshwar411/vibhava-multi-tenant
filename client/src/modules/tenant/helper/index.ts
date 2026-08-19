import { parse } from "date-fns";
import { TenantCreationInput } from "../schema/create";

export const buildTenantRequestBody = function (data: TenantCreationInput) {
  const propertyAssigned = data.currentResidence.property && data.currentResidence.unit
  return {
    name: data.name,
    email: data.email,
    countryCode: parseInt(data.countryCode),
    mobileNumber: parseInt(data.mobileNumber),
    status: data.status,
    communicationPreferences: data.communicationPreferences,
    ...(propertyAssigned && {
      currentResidence: {
        property: data.currentResidence.property,
        unit: data.currentResidence.unit,
        moveInDate: parse(data.currentResidence.moveInDate, "yyyy-MM-dd", new Date()).toString(),
        ...(data.currentResidence.activeLease && { activeLease: data.currentResidence.activeLease }),
      }
    }),
  }
}