import { AVAILABLE_COUNTRIES, VENDOR_STATUS, VENDOR_TRADE_CATEGORIES } from "../config";

export type VendorStatus = (typeof VENDOR_STATUS)[number];
export type VendorTradeCategory = (typeof VENDOR_TRADE_CATEGORIES)[number];
export type VendorCountry = (typeof AVAILABLE_COUNTRIES)[number];

export type CreateVendorFormValues = {
  name: string;
  email: string;
  password: string;
  countryCode: string;
  mobileNumber: string;
  status: VendorStatus;
  tradeCategory: VendorTradeCategory;
  street1: string;
  street2: string;
  city: string;
  state: string;
  zipCode: string;
  country: VendorCountry;
};

export type UpdateVendorFormValues = {
  name: string;
  email: string;
  countryCode: string;
  mobileNumber: string;
  status: VendorStatus;
  tradeCategory: VendorTradeCategory;
  street1: string;
  street2: string;
  city: string;
  state: string;
  zipCode: string;
  country: VendorCountry;
};

export type VendorDetailsForForm = {
  _id: string;
  name?: string;
  email?: string;
  countryCode?: number;
  mobileNumber?: number;
  status?: VendorStatus;
  tradeCategory?: VendorTradeCategory;
  address?: {
    street1?: string;
    street2?: string;
    city?: string;
    state?: string;
    zipCode?: string;
    country?: VendorCountry;
  };
};

export type Vendor = {
  _id: string;
  name?: string;
  email?: string;
  status?: string;
  tradeCategory?: string;
  countryCode?: string;
  mobileNumber?: string;
  organization?: string;
  createdBy?: string;
  address?: {
    street1?: string;
    street2?: string;
    city?: string;
    state?: string;
    zipCode?: string;
    country?: string;
  };
  isDeleted?: boolean;
}