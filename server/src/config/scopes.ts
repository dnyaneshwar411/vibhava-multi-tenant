export const ALL_SCOPES = [
  // --- Organization ---
  'organization:read',
  'organization:update',

  // --- Property ---
  'property:create',
  'property:read',
  'property:read:assigned',
  'property:update',
  'property:delete',

  // --- Unit ---
  'unit:create',
  'unit:read',
  'unit:update',
  'unit:delete',

  // --- Tenant ---
  'tenant:create',
  'tenant:read',
  'tenant:read:pii',
  'tenant:update',
  'tenant:delete',

  // --- Lease ---
  'lease:create',
  'lease:read',
  'lease:update',
  'lease:delete',

  // --- Ticket ---
  'ticket:create',
  'ticket:read',
  'ticket:read:all',
  'ticket:read:own',
  'ticket:update',
  'ticket:delete',
  'ticket:approve',
  'ticket:assign',

  // --- Ledger ---
  'ledger:create',
  'ledger:read',
  'ledger:update',
  'ledger:pay',
  'ledger:approve',
  'ledger:approve:final',

  // --- Vendor ---
  'vendor:create',
  'vendor:read',
  'vendor:update',
  'vendor:delete',
  "vendor:role:assign",
  "vendor:role:unassign",
  "vendor:role:manage",

  // --- User ---
  'user:create',
  'user:read',
  'user:update',
  'user:update:all',
  'user:update:own',
  'user:delete',
  'user:scopes:manage',
  'user:scopes:assign',
  'user:scopes:unassign',

  // --- Report ---
  'report:read',

  // --- Document ---
  'document:create',
  'document:read',
  'document:delete',


  // --- Operator ---
  'operator:read',
  'operator:create',
  'operator:update',
  'operator:delete',
  'operator:scopes:manage',
  'operator:scopes:assign',
  'operator:scopes:unassign',

] as const;

export type Scope = typeof ALL_SCOPES[number];

// Tenant, Vendor, User, Operator

export const TENANT_SCOPES = [
  'tenant:read',
  'tenant:read:pii',
  'lease:read',
  'ticket:create',
  'ticket:read:own',
  'ticket:update',
  'ledger:read',
  'ledger:pay',
  'document:read',
] as const;

export const VENDOR_SCOPES = [
  'property:read',
  'ticket:read:own',
  'ticket:update',
  'document:read',
] as const;

export const USER_SCOPES = [
  'organization:read',
  'property:create',
  'property:read',
  'property:read:assigned',
  'property:update',
  'property:delete',
  'unit:create',
  'unit:read',
  'unit:update',
  'unit:delete',
  'tenant:create',
  'tenant:read',
  'tenant:read:pii',
  'tenant:update',
  'tenant:delete',
  'lease:create',
  'lease:read',
  'lease:update',
  'lease:delete',
  'ticket:create',
  'ticket:read',
  'ticket:read:all',
  'ticket:read:own',
  'ticket:update',
  'ticket:delete',
  'ticket:approve',
  'ticket:assign',
  'ledger:create',
  'ledger:read',
  'ledger:update',
  'ledger:pay',
  'ledger:approve',
  'vendor:create',
  'vendor:read',
  'vendor:update',
  'vendor:delete',
  'user:read',
  'user:update:own',
  'report:read',
  'document:create',
  'document:read',
  'document:delete',
] as const;

export const OPERATOR_SCOPES = [
  ...ALL_SCOPES,
] as const;