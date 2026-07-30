# API Endpoints & RBAC Scopes Reference

This document maps all backend REST API endpoints to their corresponding modules, HTTP methods, and required RBAC authorization scopes.

---

| Status | Module | Endpoint | Method | Required Scope(s) | Description |
| :---  | :--- | :--- | :---: | :--- | :--- |
| `[x]` | **Authentication** | `/api/v1/auth/login` | `POST` | *Public* | Authenticate user & issue JWT/session |
| `[x]` | **Authentication** | `/api/v1/auth/logout` | `POST` | *Public* | Invalidate current user session |
| `[x]` | **Authentication** | `/api/v1/auth/me` | `GET` | `user:update:own` | Fetch authenticated user profile & permissions |
| `[x]` | **Authentication** | `/api/v1/auth/me` | `PATCH` | `user:update:own` | Update current user profile or password |
| `[ ]` | **Authentication** | `/api/v1/auth/me/notifications` | `GET` | `user:update:own` | Fetch unread user notifications |
<br /><br /><br />
| Status | Module | Endpoint | Method | Required Scope(s) | Description |
| :---  | :--- | :--- | :---: | :--- | :--- |
| `[x]` | **Organization** | `/api/v1/organization/` | `GET` | `organization:read` | Get organization details & subscription status |
| `[x]` | **Organization** | `/api/v1/organization/` | `PATCH` | `organization:update` | Update organization settings & branding |
| `[ ]` | **Organization** | `/api/v1/organization/subscription/checkout` | `POST` | `organization:update` | Create Stripe Checkout Session for subscription |
| `[ ]` | **Organization** | `/api/v1/organization/subscription/portal` | `POST` | `organization:update` | Create Stripe Billing Portal session |
| `[ ]` | **Organization** | `/api/v1/organization/subscription` | `DELETE` | `organization:update` | Cancel subscription at period end |
<br /><br /><br />
| Status | Module | Endpoint | Method | Required Scope(s) | Description |
| :---  | :--- | :--- | :---: | :--- | :--- |
| `[x]` | **Property** | `/api/v1/properties/` | `GET` | `property:read` \| `property:read:assigned` | List all properties for an organization |
| `[x]` | **Property** | `/api/v1/properties/` | `POST` | `property:create` | Create a new property |
| `[x]` | **Property** | `/api/v1/properties/:propertyId` | `GET` | `property:read` \| `property:read:assigned` | Get detailed property breakdown |
| `[x]` | **Property** | `/api/v1/properties/:propertyId` | `PATCH` | `property:update` | Edit property details or settings |
| `[x]` | **Property** | `/api/v1/properties/:propertyId` | `DELETE` | `property:delete` | Soft-delete a property record |
<br /><br /><br />
| Status | Module | Endpoint | Method | Required Scope(s) | Description |
| :---  | :--- | :--- | :---: | :--- | :--- |
| `[x]` | **Unit** | `/api/v1/properties/:propertyId/units` | `GET` | `unit:read` | List all units under a specific property |
| `[x]` | **Unit** | `/api/v1/properties/:propertyId/units` | `POST` | `unit:create` | Add a new unit to a property |
| `[x]` | **Unit** | `/api/v1/properties/units/:unitId` | `GET` | `unit:read` | Get unit information & active lease |
| `[x]` | **Unit** | `/api/v1/properties/units/:unitId` | `PATCH` | `unit:update` | Edit unit attributes (rent, beds, baths) |
| `[x]` | **Unit** | `/api/v1/properties/units/:unitId` | `DELETE` | `unit:delete` | Soft-delete a unit |
| `[ ]` | **Unit** | `/api/v1/properties/units/bulk-import` | `POST` | `property:create`, `unit:create` | Batch upload properties and units via CSV |
<br /><br /><br />
| Status | Module | Endpoint | Method | Required Scope(s) | Description |
| :---  | :--- | :--- | :---: | :--- | :--- |
| `[ ]` | **Property** | `/api/v1/properties/occupancy-summary` | `GET` | `property:read` | Portfolio occupancy metrics for dashboard |
<br /><br /><br />
| Status | Module | Endpoint | Method | Required Scope(s) | Description |
| :---  | :--- | :--- | :---: | :--- | :--- |
| `[x]` | **Tenant** | `/api/v1/leases/tenants` | `GET` | `tenant:read` | List all tenants across organization |
| `[x]` | **Tenant** | `/api/v1/leases/tenants/:tenantId` | `GET` | `tenant:read:pii` | Fetch full tenant profile & sensitive PII |
| `[ ]` | **Tenant** | `/api/v1/leases/tenants/invite` | `POST` | `tenant:create` | Send tenant portal onboarding invite |
<br /><br /><br />
| Status | Module | Endpoint | Method | Required Scope(s) | Description |
| :---  | :--- | :--- | :---: | :--- | :--- |
| `[x]` | **Lease** | `/api/v1/leases/` | `GET` | `lease:read` | List active, upcoming, and expired leases |
| `[x]` | **Lease** | `/api/v1/leases/` | `POST` | `lease:create` | Create a new lease agreement |
| `[x]` | **Lease** | `/api/v1/leases/:leaseId` | `GET` | `lease:read` | Get detailed lease terms & documents |
| `[x]` | **Lease** | `/api/v1/leases/:leaseId` | `PATCH` | `lease:update` | Update lease terms or extend lease duration |
| `[x]` | **Lease** | `/api/v1/leases/:leaseId/terminate` | `POST` | `lease:update` | Process lease termination & move-out |
| `[x]` | **Lease** | `/api/v1/leases/:leaseId` | `DELETE` | `lease:delete` | Soft-delete a draft lease agreement |
<br /><br /><br />
| Status | Module | Endpoint | Method | Required Scope(s) | Description |
| :---  | :--- | :--- | :---: | :--- | :--- |
| `[x]` | **Ledger** | `/api/v1/ledger/entries` | `GET` | `ledger:read` | Query double-entry ledger records |
| `[x]` | **Ledger** | `/api/v1/ledger/entries` | `POST` | `ledger:create` | Post a manual double-entry transaction |
| `[x]` | **Ledger** | `/api/v1/ledger/entries/:entryId` | `GET` | `ledger:read` | Get single ledger transaction breakdown |
| `[x]` | **Ledger** | `/api/v1/ledger/entries/:entryId/reverse` | `POST` | `ledger:approve:final` | Issue an immutable reversing entry |
| `[x]` | **Ledger** | `/api/v1/ledger/tenant-balance/:tenantId` | `GET` | `ledger:read`, `tenant:read` | Fetch real-time outstanding balance for tenant |
| `[x]` | **Ledger** | `/api/v1/ledger/payments/charge-rent` | `POST` | `ledger:create`, `ledger:approve` | Trigger automated monthly rent charges |
<br /><br /><br />
| Status | Module | Endpoint | Method | Required Scope(s) | Description |
| :---  | :--- | :--- | :---: | :--- | :--- |
| `[ ]` | **Report** | `/api/v1/ledger/reports/profit-loss` | `GET` | `report:read` | Generate P&L statement by property |
| `[ ]` | **Report** | `/api/v1/ledger/reports/rent-roll` | `GET` | `report:read` | Generate Rent Roll report by billing cycle |
<br /><br /><br />
| Status | Module | Endpoint | Method | Required Scope(s) | Description |
| :---  | :--- | :--- | :---: | :--- | :--- |
| `[x]` | **Ticket** | `/api/v1/maintenance/tickets` | `GET` | `ticket:read:all` \| `ticket:read:own` | Fetch maintenance tickets for Kanban/List |
| `[x]` | **Ticket** | `/api/v1/maintenance/tickets` | `POST` | `ticket:create` | Create a new maintenance request ticket |
| `[x]` | **Ticket** | `/api/v1/maintenance/tickets/:ticketId` | `GET` | `ticket:read:all` \| `ticket:read:own` | Fetch full ticket context & media attachments |
| `[x]` | **Ticket** | `/api/v1/maintenance/tickets/:ticketId` | `PATCH` | `ticket:update` | Update ticket details, notes, or status |
| `[x]` | **Ticket** | `/api/v1/maintenance/tickets/:ticketId/assign` | `PATCH` | `ticket:assign` | Assign/dispatch ticket to vendor or staff |
| `[x]` | **Ticket** | `/api/v1/maintenance/tickets/:ticketId/complete` | `PATCH` | `ticket:approve` | Complete ticket & approve actual work cost |
| `[x]` | **Ticket** | `/api/v1/maintenance/tickets/:ticketId/feedback` | `POST` | `ticket:read:own` | Submit tenant satisfaction rating & review |
| `[x]` | **Ticket** | `/api/v1/maintenance/tickets/:ticketId` | `DELETE` | `ticket:delete` | Soft-delete a maintenance ticket |
| `[ ]` | **Ticket** | `/api/v1/maintenance/vendor-view` | `GET` | `ticket:read:own`, `vendor:read` | Filtered ticket portal view for vendors |
<br /><br /><br />
| Status | Module | Endpoint | Method | Required Scope(s) | Description |
| :---  | :--- | :--- | :---: | :--- | :--- |
| `[ ]` | **Document** | `/api/v1/maintenance/tickets/:ticketId/attachments` | `POST` | `document:create`, `ticket:update` | Upload damage photos or repair invoices |
<br /><br /><br />
| Status | Module | Endpoint | Method | Required Scope(s) | Description |
| :---  | :--- | :--- | :---: | :--- | :--- |
| `[x]` | **Vendor** | `/api/v1/vendors/` | `GET` | `vendor:read` | List vendors by trade category or property |
| `[x]` | **Vendor** | `/api/v1/vendors/` | `POST` | `vendor:create` | Create a new vendor profile |
| `[x]` | **Vendor** | `/api/v1/vendors/:vendorId` | `GET` | `vendor:read` | Get vendor details, ratings, & active tickets |
| `[x]` | **Vendor** | `/api/v1/vendors/:vendorId` | `PATCH` | `vendor:update` | Update vendor contact or property assignments |
| `[x]` | **Vendor** | `/api/v1/vendors/:vendorId` | `DELETE` | `vendor:delete` | Soft-delete a vendor record |
| `[ ]` | **Vendor** | `/api/v1/vendors/:vendorId/insurance` | `PATCH` | `vendor:update`, `document:create` | Upload and verify COI document |
| `[ ]` | **Vendor** | `/api/v1/vendors/compliance/expiring-insurance` | `GET` | `vendor:read` | List vendors with expired or expiring COIs |
| `[x]` | **Vendor** | `/api/v1/vendors/:vendorId/performance` | `GET` | `vendor:read` | View vendor performance & rating metrics |
<br /><br /><br />
| Status | Module | Endpoint | Method | Required Scope(s) | Description |
| :---  | :--- | :--- | :---: | :--- | :--- |
| `[ ]` | **Audit Logs** | `/api/v1/audit-logs/` | `GET` | `user:read` | Query system audit trail logs |
| `[ ]` | **Audit Logs** | `/api/v1/audit-logs/resource/:resourceId` | `GET` | `user:read` | Fetch full change history for a single record |
| `[ ]` | **Audit Logs** | `/api/v1/audit-logs/export` | `POST` | `report:read` | Export audit trail reports to CSV |
<br /><br /><br />
| Status | Module | Endpoint | Method | Required Scope(s) | Description |
| :---  | :--- | :--- | :---: | :--- | :--- |
| `[ ]` | **Webhooks** | `/api/v1/webhooks/stripe` | `POST` | *Webhook Signature* | Stripe billing & subscription lifecycle hook |
| `[ ]` | **Webhooks** | `/api/v1/webhooks/stripe/payouts` | `POST` | *Webhook Signature* | Stripe Connected Vendor ACH payouts hook |

---

## 🔑 Key Authorization Policies

1. **Self/Ownership Scope Fallbacks:**
   * Endpoints featuring `ticket:read:all | ticket:read:own` allow property managers with `ticket:read:all` to view the full queue, while tenants or vendors with `ticket:read:own` only receive tickets linked to their account ID.
2. **PII Protection (`tenant:read:pii`):**
   * General list views (`/tenants`) require `tenant:read` and omit SSN, Tax ID, and bank details.
   * Specific profile queries (`/tenants/:tenantId`) require `tenant:read:pii` to unmask sensitive identity data.
3. **Financial Authorization Hierarchy:**
   * Standard payment and charge posting requires `ledger:create` + `ledger:approve`.
   * Reversing historical ledger transactions requires the high-level `ledger:approve:final` scope.