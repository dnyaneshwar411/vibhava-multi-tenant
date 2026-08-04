import { MEMBERSHIP_TIER, MEMBERSHIP_TIER_CONFIG } from "../common/types/payment.js";

export const MEMBERSHIPS: Record<MEMBERSHIP_TIER, MEMBERSHIP_TIER_CONFIG> = {
  "Starter": {
    pricing: {
      monthly: {
        INR: { amount: 2000, discount: { available: false, quantity: 0 } },
        USD: { amount: 25, discount: { available: false, quantity: 0 } },
      },
      yearly: {
        INR: { amount: 20000, discount: { available: true, quantity: 16 } },
        USD: { amount: 250, discount: { available: true, quantity: 16 } },
      },
    },
  },
  "Professional": {
    pricing: {
      monthly: {
        INR: { amount: 10000, discount: { available: false, quantity: 0 } },
        USD: { amount: 125, discount: { available: false, quantity: 0 } },
      },
      yearly: {
        INR: { amount: 100000, discount: { available: true, quantity: 16 } },
        USD: { amount: 1250, discount: { available: true, quantity: 16 } },
      },
    },
  },
  "Enterprise": {
    pricing: {
      monthly: {
        INR: { amount: 25000, discount: { available: false, quantity: 0 } },
        USD: { amount: 300, discount: { available: false, quantity: 0 } },
      },
      yearly: {
        INR: { amount: 250000, discount: { available: true, quantity: 16 } },
        USD: { amount: 3000, discount: { available: true, quantity: 16 } },
      },
    },
  },
  "Custom": {
    pricing: {
      monthly: {
        INR: { amount: 0, discount: { available: false, quantity: 0 } }, // Contact Sales
        USD: { amount: 0, discount: { available: false, quantity: 0 } },
      },
      yearly: {
        INR: { amount: 0, discount: { available: false, quantity: 0 } },
        USD: { amount: 0, discount: { available: false, quantity: 0 } },
      },
    },
  },
};

export const MEMBERSHIP_DURATION = ["monthly", "yearly"];

export const MEMBERSHIP_ENTITLEMENTS: Record<MEMBERSHIP_TIER, {
  maxProperties: number;
  maxUnits: number;
  maxUsers: number;
  maxStorageInGB: number;
  hasKanbanMaintenance: boolean;
  hasLateFeeEngine: boolean;
  hasUnifiedInbox: boolean;
  hasVendorPortal: boolean;
  hasAuditLogs: boolean;
  hasApiAccess: boolean;
  hasCustomBranding: boolean;
}> = {
  "Starter": {
    maxProperties: 5,
    maxUnits: 25,
    maxUsers: 3,
    maxStorageInGB: 5,
    hasKanbanMaintenance: true,
    hasLateFeeEngine: false,
    hasUnifiedInbox: false,
    hasVendorPortal: false,
    hasAuditLogs: false,
    hasApiAccess: false,
    hasCustomBranding: false,
  },
  "Professional": {
    maxProperties: 25,
    maxUnits: 150,
    maxUsers: 10,
    maxStorageInGB: 50,
    hasKanbanMaintenance: true,
    hasLateFeeEngine: true,
    hasUnifiedInbox: true,
    hasVendorPortal: true,
    hasAuditLogs: false,
    hasApiAccess: false,
    hasCustomBranding: false,
  },
  "Enterprise": {
    maxProperties: 100,
    maxUnits: 1000,
    maxUsers: 50,
    maxStorageInGB: 500,
    hasKanbanMaintenance: true,
    hasLateFeeEngine: true,
    hasUnifiedInbox: true,
    hasVendorPortal: true,
    hasAuditLogs: true,
    hasApiAccess: true,
    hasCustomBranding: true,
  },
  "Custom": {
    maxProperties: 10000,
    maxUnits: 100000,
    maxUsers: 1000,
    maxStorageInGB: 10000,
    hasKanbanMaintenance: true,
    hasLateFeeEngine: true,
    hasUnifiedInbox: true,
    hasVendorPortal: true,
    hasAuditLogs: true,
    hasApiAccess: true,
    hasCustomBranding: true,
  },
};
