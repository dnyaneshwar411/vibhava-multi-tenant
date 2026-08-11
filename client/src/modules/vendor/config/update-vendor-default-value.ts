import { AVAILABLE_COUNTRIES, VENDOR_STATUS, VENDOR_TRADE_CATEGORIES } from ".";
import type { UpdateVendorFormValues, VendorDetailsForForm } from "../types";

export function getUpdateVendorDefaultValues(
  vendor?: VendorDetailsForForm
): UpdateVendorFormValues {
  return {
    name: vendor?.name ?? "",
    email: vendor?.email ?? "",
    countryCode: vendor?.countryCode !== undefined ? String(vendor.countryCode) : "",
    mobileNumber: vendor?.mobileNumber !== undefined ? String(vendor.mobileNumber) : "",
    status: vendor?.status ?? VENDOR_STATUS[0],
    tradeCategory: vendor?.tradeCategory ?? VENDOR_TRADE_CATEGORIES[0],
    street1: vendor?.address?.street1 ?? "",
    street2: vendor?.address?.street2 ?? "",
    city: vendor?.address?.city ?? "",
    state: vendor?.address?.state ?? "",
    zipCode: vendor?.address?.zipCode ?? "",
    country: vendor?.address?.country ?? AVAILABLE_COUNTRIES[0],
  };
}
