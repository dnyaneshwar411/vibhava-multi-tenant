export
  type LedgerLine = {
    _id?: string;
    accountId?: string;
    accountName?: string;
    type?: "DEBIT" | "CREDIT";
    amount?: number;
    description?: string;
  };

export type Party = {
  _id?: string;
  name?: string;
  email?: string;
  countryCode?: number | string;
  mobileNumber?: number | string;
};

export type LedgerEntry = {
  _id?: string;
  property?: {
    _id?: string;
    name?: string;
    propertyType?: string;
    status?: string;
    address?: {
      street1?: string;
      city?: string;
      state?: string;
      zipCode?: string;
      country?: string;
    };
  };
  unit?: {
    _id?: string;
    unitNumber?: string;
    floor?: number;
    unitType?: string;
    status?: string;
  };
  tenant?: Party;
  vendor?: Party;
  createdBy?: string;
  entryType?: string;
  status?: string;
  finance?: {
    currency?: string;
    totalAmount?: number;
    paymentGateway?: string;
  };
  period?: {
    startDate?: string;
    endDate?: string;
    billingCycle?: string;
  };
  lines?: LedgerLine[];
  memo?: string;
  isDeleted?: boolean;
  createdAt?: string;
};

export type LedgerResponse = {
  code?: number;
  message?: string;
  data?: LedgerEntry;
};