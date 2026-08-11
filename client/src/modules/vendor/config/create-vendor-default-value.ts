import { AVAILABLE_COUNTRIES, VENDOR_STATUS, VENDOR_TRADE_CATEGORIES } from ".";
import type { CreateVendorFormValues } from "../types";

export const createVendorDefaultValues: CreateVendorFormValues = {
  name: "",
  email: "",
  password: "",
  countryCode: "",
  mobileNumber: "",
  status: VENDOR_STATUS[0],
  tradeCategory: VENDOR_TRADE_CATEGORIES[0],
  street1: "",
  street2: "",
  city: "",
  state: "",
  zipCode: "",
  country: AVAILABLE_COUNTRIES[0],
};
