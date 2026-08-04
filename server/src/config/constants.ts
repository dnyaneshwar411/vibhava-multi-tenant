export const CONSTANTS = {
  POSSIBLE_USERS: ["Tenant", "User", "Vendor", "Operator"],
  
  USER_MODELS: ["Tenant", "User", "Vendor"],
  PAYMENT_GATEWAY: ["RAZORPAY", "STRIPE"],
  AVAILABLE_CURRENCY: ["INR"],
  AVAILABLE_COUNTRIES: ["India"],
  USER_ROLE: ["Tenant", "Staff", "Owner", "Vendor"],

  ORGANIZATION_STATUS: ["Active", "In Active"],

  USER_STATUS: ["Active", "In Active", "Archived"],

  OPERATOR_ROLES: ["SUPER_ADMIN", "ONBOARDING_SPECIALIST", "LISTING_MODERATOR", "TRANSACTION_COORDINATOR", "SUPPORT_AGENT"],
  OPERATOR_STATUS: ["Active", "In Active", "Read Only"],

  PROPERTY_TYPE: ['Multi-Family', 'Single-Family', 'Commercial', 'Mixed-Use', 'Industrial'],
  PROPERTY_STATUS: ['Active', 'Under Maintenance', 'Archived', 'Sold', "Deleted"],
  PROPERTY_AMENITIES: ["Gym", "Pool", "Underground Parking", "EV Chargers"],

  UNIT_TYPE: ["Studio", "1BHK", "2BHK", "3BHK", "Penthouse", "Commercial Space", "Storage", "Other"],
  UNIT_STATUS: ["Occupied", "Vacant", "Under Maintenance", "Reserved", "Off Market", "DELETED"],
  UNIT_FURNISH_STATUS: ['Unfurnished', 'Semi-Furnished', 'Fully Furnished'],
  UNIT_FLOORING_TYPE: ['Hardwood', 'Carpet', 'Tile', 'Vinyl', 'Laminate', 'Concrete', 'Other'],
  UNIT_HEATING_TYPE: ['Central', 'Electric', 'Gas', 'Heat Pump', 'Radiator', 'None'],
  UNIT_COOLING_TYPE: ['Central AC', 'Window Unit', 'Split System', 'Evaporative', 'None'],
  UNIT_AMENITIES: ["Gym", "Pool", "Underground Parking", "EV Chargers"],

  DOCUMENT_ENTITIES: ['Property', 'Unit', 'Tenant', 'Lease', 'MaintenanceTicket', 'Organization'],
  DOCUMENT_STATUS: ['Pending Review', 'Active', 'Expiring Soon', 'Expired', 'Archived', 'Rejected'],
  DOCUMENT_CATEGORY: [
    'Deed', 'Tax Document', 'Insurance (COI)', 'Inspection Report',
    'Lease Agreement', 'Invoice/Receipt', 'ID/Verification', 'Other',
  ],
  DOCUMENT_VISIBILITY: ['Private', 'Internal Only', 'Shared with Tenant', 'Public'],
  DOCUMENT_MIME_TYPES: [],

  TENANT_STATUS: ["Applicant", "Active", "Past", "Evicted", "Rejected"],
  TENANT_COMMUNICATION_CHANNELS: ["Email", "SMS", "Portal"],

  LEASE_TYPE: ["Fixed Term", "Month-to-Month", "Commercial", "Short Term"],
  LEASE_STATUS: ["Draft", "Pending Signature", "Active", "Expiring Soon", "Renewed", "Terminated", "Expired"],
  LEASE_BILLING_CYCLE: ["Monthly", "Bi-Weekly", "Quarterly", "Annually"],
  LEASE_SECURITY_DEPOSIT_STATUS: ["Unpaid", "Partially Paid", "Paid in Full", "Refunded", "Forfeited"],

  LEDGER_ENTRY_TYPE: [
    "Rent Charge", "Rent Payment", "Late Fee Charge", "Security Deposit In",
    "Security Deposit Refund", "Maintenance Expense", "Owner Distribution",
    "Adjustment / Reversal"
  ],
  LEDGER_ENTRY_STATUS: ["Posted", "Cleared", "Reconciled", "Voided"],

  VENDOR_STATUS: ["Active", "Pending Approval", "Suspended", "Archived"],
  VENDOR_TRADE_CATEGORIES: [
    "Plumbing", "Electrical", "HVAC", "Carpentry", "Landscaping",
    "Cleaning & Janitorial", "Pest Control", "Roofing", "Painting",
    "Appliance Repair", "Security & Locks", "Other", "General Contracting",
  ],

  MEMBERSHIP_TIER: ["Starter", "Professional", "Enterprise", "Custom"],
  MEMBERSHIP_STATUS: ["Trialing", "Active", "Past Due", "Canceled", "Unpaid", "Incomplete"],
  MEMBERSHIP_BILLING_CYCLES: ["Monthly", "Annually", "Custom"],
  MEMBERSHIP_TYPE: ["Subscription Renewal", "Tier Upgrade", "Tier Downgrade", "Add-on Purchase"],

  AUDIT_LOG_ACTOR_MODEL: ["User", "Operator"],
  AUDIT_LOG_ACTION: [
    "CREATE", "UPDATE", "DELETE", "SOFT_DELETE", "LOGIN_FAILED",
    "RESTORE", "LOGIN_SUCCESS", "PASSWORD_RESET", "EXPORT_DATA", "OTHER"
  ],
  AUDIT_LOG_RESOURCE: [
    "User", "Property", "Unit", "Tenant", "Lease", "LedgerEntry",
    "MaintenanceTicket", "Vendor", "Subscription", "Document", "Other"
  ],

  MAINTENANCE_TICKET_PRIORITY: ["Low", "Medium", "High", "Emergency"],
  MAINTENANCE_TICKET_STATUS: [
    "Open", "In Review", "Vendor Scheduled",
    "In Progress", "Pending Parts", "Completed", "Canceled",
  ],
  MAINTENANCE_TICKET_PREFERRED_SCHEDULE: ["Anytime", "Morning (8AM - 12PM)", "Afternoon (12PM - 5PM)", "Evening (5PM - 9PM)"],

  FILE_UPLOAD_DIRECTORIES: [
    "profiles/user", "profiles/tenant",
    "profiles/vendor", "profiles/operators"
  ],

  PAYMENT_RESOURCES: ["ORGANIZATION_MEMBERSHIP"]
} as const;