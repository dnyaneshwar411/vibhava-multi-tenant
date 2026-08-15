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