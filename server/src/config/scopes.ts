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
