import "dotenv/config";
import { writeFile } from "node:fs/promises";
import mongoose, { Types } from "mongoose";
import { hashString } from "../../common/utils/hash.js";
import { CONSTANTS } from "../../config/constants.js";
import { OPERATOR_SCOPES, TENANT_SCOPES, USER_SCOPES, VENDOR_SCOPES } from "../../config/scopes.js";
import AuditLog from "./models/auditLog.model.js";
import CompanyPage from "./models/companyPages.model.js";
import Document from "./models/document.model.js";
import File from "./models/file.model.js";
import Lease from "./models/lease.model.js";
import LedgerEntry from "./models/ledger.model.js";
import MaintenanceTicket from "./models/maintenanceTicket.model.js";
import Membership from "./models/membership.model.js";
import MembershipInvoice from "./models/membershipInvoice.model.js";
import Operator from "./models/operator.model.js";
import Organization from "./models/organization.model.js";
import OTP from "./models/otp.model.js";
import PaymentGateway from "./models/paymentGateway.model.js";
import Property from "./models/property.model.js";
import Scope from "./models/scopesMap.model.js";
import Tenant from "./models/tenant.model.js";
import Unit from "./models/unit.model.js";
import User from "./models/user.model.js";
import Vendor from "./models/vendor.model.js";

const args = new Set(process.argv.slice(2));
const value = (name: string, fallback: number) => {
  const argument = process.argv.find((item) => item.startsWith(`--${name}=`));
  const parsed = argument ? Number(argument.slice(name.length + 3)) : fallback;
  return Number.isFinite(parsed) && parsed >= 0 ? Math.floor(parsed) : fallback;
};

const scale = {
  organizations: value("organizations", 25),
  propertiesPerOrganization: value("properties", 6),
  unitsPerProperty: value("units", 30),
  tenantsPerOrganization: value("tenants", 150),
  vendorsPerOrganization: value("vendors", 20),
  staffPerOrganization: value("staff", 10),
  ticketsPerUnit: value("tickets-per-unit", 1),
  ledgerEntriesPerLease: value("ledger-per-lease", 3),
  documentsPerProperty: value("documents-per-property", 2),
  auditsPerOrganization: value("audits", 10),
};

const runId = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
const seedPassword = "SeedPassword123!";
const password = await hashString(seedPassword);
const randomBetween = (minimum: number, maximum: number) => minimum + Math.floor(Math.random() * (maximum - minimum + 1));
const pick = <T>(items: readonly T[], index: number) => items[index % items.length];
const id = () => new Types.ObjectId();
const image = (key: string) => ({ private: false, key: `seed/${runId}/${key}.jpg` });
const dateOffset = (days: number) => new Date(Date.now() + days * 86_400_000);
const firstNames = ["Aarav", "Ananya", "Arjun", "Diya", "Ishaan", "Kavya", "Meera", "Nikhil", "Priya", "Rohan", "Sana", "Vikram", "Zoya"];
const lastNames = ["Sharma", "Mehta", "Iyer", "Kapoor", "Patel", "Nair", "Bose", "Malhotra", "Reddy", "Menon", "Desai", "Chatterjee"];
const organizationNames = ["Harborstone Residential", "Maple & Main Properties", "Bluebell Estates", "Cedarline Living", "Northstar Realty", "Oakridge Communities", "Parkview Asset Group", "Summit Key Properties", "UrbanNest Management", "Willowbrook Homes"];
const slugify = (text: string) => text.toLowerCase().replace(/&/g, "and").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
const identity = (organizationIndex: number, actorIndex: number) => ({
  firstName: pick(firstNames, organizationIndex * 3 + actorIndex)!,
  lastName: pick(lastNames, organizationIndex + actorIndex)!,
});
const actorEmail = (actor: string, organizationIndex: number, actorIndex: number, domain: string) => {
  const person = identity(organizationIndex, actorIndex);
  return `${person.firstName.toLowerCase()}.${person.lastName.toLowerCase()}.${actor}${organizationIndex + 1}${actorIndex + 1}@${domain}`;
};
const scopeMap = (scopes: readonly string[]) => Object.fromEntries(scopes.map((scope) => [scope, true]));

type OrgState = {
  organization: Types.ObjectId;
  owner: Types.ObjectId;
  users: Types.ObjectId[];
  properties: Types.ObjectId[];
  units: Types.ObjectId[];
  unitProperties: Types.ObjectId[];
  tenants: Types.ObjectId[];
  vendors: Types.ObjectId[];
  leases: Types.ObjectId[];
  organizationName: string;
  subdomain: string;
};

const states: OrgState[] = [];
const credentials: Record<string, unknown>[] = [];

async function clearDatabase() {
  const models = [AuditLog, CompanyPage, Document, File, Lease, LedgerEntry, MaintenanceTicket,
    Membership, MembershipInvoice, Operator, Organization, OTP, PaymentGateway, Property, Scope,
    Tenant, Unit, User, Vendor];
  await Promise.all(models.map((seedModel) => seedModel.collection.deleteMany({})));
}

async function seed() {
  const connectionString = process.env.MONGOOSE_DB_URL;
  if (!connectionString) throw new Error("MONGOOSE_DB_URL is required");
  await mongoose.connect(connectionString);
  if (args.has("--reset")) await clearDatabase();

  const operators = Array.from({ length: 3 }, (_, index) => ({
    _id: id(), name: `${identity(20, index).firstName} ${identity(20, index).lastName}`, email: actorEmail("operator", 20, index, "platform-operations.test"),
    password, role: pick(CONSTANTS.OPERATOR_ROLES, index), status: "Active", mfa: { enabled: false },
  }));
  await Operator.insertMany(operators);

  const users: Record<string, unknown>[] = [];
  const organizations: Record<string, unknown>[] = [];
  for (let organizationIndex = 0; organizationIndex < scale.organizations; organizationIndex += 1) {
    const organizationId = id();
    const ownerId = id();
    const organizationName = `${pick(organizationNames, organizationIndex)} ${organizationIndex >= organizationNames.length ? organizationIndex + 1 : ""}`.trim();
    const subdomain = `${slugify(organizationName)}-${runId.slice(-6)}-${organizationIndex + 1}`;
    const emailDomain = `${slugify(organizationName)}.test`;
    const staffCount = randomBetween(Math.max(1, scale.staffPerOrganization - 4), scale.staffPerOrganization + 8);
    const organizationUsers = [ownerId, ...Array.from({ length: staffCount }, () => id())];
    users.push(...organizationUsers.map((userId, userIndex) => ({
      _id: userId, name: `${identity(organizationIndex, userIndex).firstName} ${identity(organizationIndex, userIndex).lastName}`,
      email: actorEmail("user", organizationIndex, userIndex, emailDomain), password,
      mobileNumber: 9000000000 + organizationIndex * 100 + userIndex, countryCode: 91,
      organization: organizationId, status: "Active",
    })));
    organizations.push({
      _id: organizationId, name: organizationName,
      subdomain, owner: ownerId, status: "Active",
      meta: { title: organizationName, description: "Generated development data" },
      branding: { colors: { primary: pick(["#1E3A8A", "#7C3AED", "#047857"], organizationIndex) } },
    });
    states.push({ organization: organizationId, owner: ownerId, users: organizationUsers,
      properties: [], units: [], unitProperties: [], tenants: [], vendors: [], leases: [], organizationName, subdomain });
  }
  await User.insertMany(users);
  await Organization.insertMany(organizations);

  for (let organizationIndex = 0; organizationIndex < states.length; organizationIndex += 1) {
    const state = states[organizationIndex];
    if (!state) throw new Error(`Missing state for organization ${organizationIndex}`);
    const propertyCount = randomBetween(Math.max(1, scale.propertiesPerOrganization - 2), scale.propertiesPerOrganization + 4);
    const properties: Record<string, unknown>[] = [];
    for (let propertyIndex = 0; propertyIndex < propertyCount; propertyIndex += 1) {
      const propertyId = id(); state.properties.push(propertyId);
      properties.push({ _id: propertyId, organization: state.organization, name: `Property ${organizationIndex + 1}-${propertyIndex + 1}`,
        createdBy: state.owner, manager: pick(state.users, propertyIndex), propertyType: pick(CONSTANTS.PROPERTY_TYPE, propertyIndex), status: "Active",
        address: { street1: `${100 + propertyIndex} Market Street`, city: pick(["Mumbai", "Pune", "Bengaluru", "Delhi"], propertyIndex), state: "Maharashtra", zipCode: `4000${propertyIndex}`, country: "India", location: { type: "Point", coordinates: [72.87 + propertyIndex / 100, 19.07 + propertyIndex / 100] } },
        amenities: [pick(CONSTANTS.PROPERTY_AMENITIES, propertyIndex), pick(CONSTANTS.PROPERTY_AMENITIES, propertyIndex + 1)],
        media: { primaryImage: image(`property-${organizationIndex}-${propertyIndex}`) }, finance: { currency: "INR", defaultLateFeeAmount: 500, defaultGracePeriodDays: 7 }, isDeleted: false });
    }
    await Property.insertMany(properties);

    const units: Record<string, unknown>[] = [];
    for (let propertyIndex = 0; propertyIndex < state.properties.length; propertyIndex += 1) {
      const propertyId = state.properties[propertyIndex];
      if (!propertyId) throw new Error(`Missing property ${propertyIndex}`);
      const unitsForProperty = randomBetween(Math.max(1, scale.unitsPerProperty - 10), scale.unitsPerProperty + 20);
      for (let unitIndex = 0; unitIndex < unitsForProperty; unitIndex += 1) {
        const unitId = id(); state.units.push(unitId);
        state.unitProperties.push(propertyId);
        const rent = 18000 + (unitIndex % 8) * 3500;
        const unitLabel = `${String.fromCharCode(65 + unitIndex % 26)}${String(Math.floor(unitIndex / 26) + 1).padStart(2, "0")}`;
        units.push({ _id: unitId, organization: state.organization, property: propertyId, unitNumber: `${propertyIndex + 1}${unitLabel}`,
          floor: Math.floor(unitIndex / 4) + 1, specifications: { squareFeet: 450 + unitIndex * 35, bedrooms: unitIndex % 4, bathrooms: 1 + unitIndex % 2, maxOccupancy: 2 + unitIndex % 4, furnishingStatus: pick(CONSTANTS.UNIT_FURNISH_STATUS, unitIndex), flooringType: pick(CONSTANTS.UNIT_FLOORING_TYPE, unitIndex), heatingType: pick(CONSTANTS.UNIT_HEATING_TYPE, unitIndex), coolingType: pick(CONSTANTS.UNIT_COOLING_TYPE, unitIndex), isPetFriendly: unitIndex % 3 === 0 },
          finance: { marketRent: rent, currentRent: rent, securityDeposit: rent * 2, currency: "INR" }, unitType: pick(CONSTANTS.UNIT_TYPE, unitIndex), status: unitIndex % 5 === 0 ? "Occupied" : "Vacant", media: { primaryImage: image(`unit-${organizationIndex}-${propertyIndex}-${unitIndex}`) }, amenities: [pick(CONSTANTS.UNIT_AMENITIES, unitIndex)], createdBy: state.owner, isDeleted: false });
      }
    }
    await Unit.insertMany(units);

    const tenants: Record<string, unknown>[] = [];
    const tenantCount = randomBetween(Math.max(1, scale.tenantsPerOrganization - 50), scale.tenantsPerOrganization + 100);
    for (let tenantIndex = 0; tenantIndex < tenantCount; tenantIndex += 1) {
      const tenantId = id(); state.tenants.push(tenantId);
      tenants.push({ _id: tenantId, organization: state.organization, name: `${identity(organizationIndex + 2, tenantIndex).firstName} ${identity(organizationIndex + 2, tenantIndex).lastName}`, countryCode: 91, mobileNumber: 8000000000 + organizationIndex * 1000 + tenantIndex, email: actorEmail("tenant", organizationIndex, tenantIndex, `${slugify(state.organizationName)}.test`), password, status: pick(CONSTANTS.TENANT_STATUS, tenantIndex), communicationPreferences: { preferredChannel: pick(CONSTANTS.TENANT_COMMUNICATION_CHANNELS, tenantIndex), allowSmsNotifications: tenantIndex % 4 !== 0, allowEmailNotifications: true }, isDeleted: false });
    }
    await Tenant.insertMany(tenants);

    const vendors: Record<string, unknown>[] = [];
    const vendorCount = randomBetween(Math.max(1, scale.vendorsPerOrganization - 8), scale.vendorsPerOrganization + 15);
    for (let vendorIndex = 0; vendorIndex < vendorCount; vendorIndex += 1) {
      const vendorId = id(); state.vendors.push(vendorId);
      vendors.push({ _id: vendorId, organization: state.organization, name: `${identity(organizationIndex + 4, vendorIndex).firstName} ${identity(organizationIndex + 4, vendorIndex).lastName} Services`, email: actorEmail("vendor", organizationIndex, vendorIndex, `${slugify(state.organizationName)}.test`), password, countryCode: 91, mobileNumber: 7000000000 + organizationIndex * 100 + vendorIndex, status: pick(CONSTANTS.VENDOR_STATUS, vendorIndex), tradeCategory: pick(CONSTANTS.VENDOR_TRADE_CATEGORIES, vendorIndex), createdBy: state.owner, address: { street1: `${vendorIndex + 1} Service Road`, city: "Mumbai", state: "Maharashtra", zipCode: "400001", country: "India" }, isDeleted: false });
    }
    await Vendor.insertMany(vendors);

    const membershipId = id();
    await Membership.create({ _id: membershipId, organization: state.organization, tier: pick(CONSTANTS.MEMBERSHIP_TIER, organizationIndex), status: "Active", billingCycle: organizationIndex % 2 ? "Annually" : "Monthly", currentPeriodStart: dateOffset(-30), currentPeriodEnd: dateOffset(335), entitlements: { maxProperties: 100, maxUnits: 500, maxUsers: 50, hasVendorPortal: true, hasAuditLogs: true } });
    await MembershipInvoice.insertMany(Array.from({ length: 3 }, (_, index) => ({ organization: state.organization, membership: membershipId, type: "Subscription Renewal", tier: pick(CONSTANTS.MEMBERSHIP_TIER, organizationIndex), billingCycle: "Monthly", amount: 4999 + index * 1000, transactionReference: `seed-invoice-${runId}-${organizationIndex}-${index}`, processedAt: dateOffset(-index * 30), paymentDetails: { provider: index % 2 ? "STRIPE" : "RAZORPAY", sandbox: true } })));
    await PaymentGateway.insertMany(CONSTANTS.PAYMENT_GATEWAY.map((type) => ({ organization: state.organization, type, credentials: { sandbox: true, seeded: true } })));
    await CompanyPage.insertMany(CONSTANTS.ORGANIZATION_COMPANY_PAGE.map((page) => ({ organization: state.organization, page, html: `<h1>${page}</h1><p>Generated seed content for testing.</p>` })));

    const leases: Record<string, unknown>[] = [];
    const occupiedUnits = state.units.filter((_, unitIndex) => unitIndex % 5 === 0);
    occupiedUnits.forEach((unitId, leaseIndex) => { const leaseId = id(); state.leases.push(leaseId); const tenantId = state.tenants[leaseIndex % state.tenants.length]; const startDate = dateOffset(-365 + leaseIndex); leases.push({ _id: leaseId, organization: state.organization, property: state.unitProperties[state.units.indexOf(unitId)], unit: unitId, createdBy: state.owner, primaryTenant: tenantId, coTenants: [state.tenants[(leaseIndex + 1) % state.tenants.length]], leaseType: pick(CONSTANTS.LEASE_TYPE, leaseIndex), status: pick(CONSTANTS.LEASE_STATUS, leaseIndex), startDate, endDate: dateOffset(365 + leaseIndex), moveInDate: startDate, finance: { rentAmount: 22000 + leaseIndex * 100, paymentDueDay: (leaseIndex % 28) + 1, billingCycle: "Monthly" }, security: { amountRequired: 44000, amountPaid: leaseIndex % 3 === 0 ? 44000 : 22000, status: leaseIndex % 3 === 0 ? "Paid in Full" : "Partially Paid", heldInAccount: "HDFC-ESCROW-SEED" }, isDeleted: false, isActive: true }); });
    await Lease.insertMany(leases);
    await Tenant.bulkWrite(state.leases.map((leaseId, leaseIndex) => { const occupiedUnit = occupiedUnits[leaseIndex]; const propertyId = occupiedUnit ? state.unitProperties[state.units.indexOf(occupiedUnit)] : undefined; return { updateOne: { filter: { _id: state.tenants[leaseIndex % state.tenants.length] }, update: { $set: { status: "Active", currentResidence: { property: propertyId, unit: occupiedUnit, activeLease: leaseId, moveInDate: dateOffset(-365 + leaseIndex) } } } } }; }));
    await Unit.bulkWrite(state.leases.map((leaseId, leaseIndex) => ({ updateOne: { filter: { _id: occupiedUnits[leaseIndex] }, update: { $set: { status: "Occupied", occupant: state.tenants[leaseIndex % state.tenants.length] } } }})));

    const ledgerEntries: Record<string, unknown>[] = [];
    for (let leaseIndex = 0; leaseIndex < state.leases.length; leaseIndex += 1) for (let entryIndex = 0; entryIndex < scale.ledgerEntriesPerLease; entryIndex += 1) { const amount = 22000 + leaseIndex * 100; ledgerEntries.push({ organization: state.organization, property: state.properties[leaseIndex % state.properties.length], unit: occupiedUnits[leaseIndex], tenant: state.tenants[leaseIndex % state.tenants.length], lease: state.leases[leaseIndex], createdBy: state.owner, entryType: pick(CONSTANTS.LEDGER_ENTRY_TYPE, entryIndex), status: pick(CONSTANTS.LEDGER_ENTRY_STATUS, entryIndex), finance: { currency: "INR", totalAmount: amount, paymentGateway: "RAZORPAY" }, period: { startDate: dateOffset(-30), endDate: dateOffset(0), billingCycle: "Monthly" }, lines: [{ accountId: "RENT", accountName: "Rental income", type: entryIndex % 2 ? "CREDIT" : "DEBIT", amount, description: "Generated seed transaction" }], reference: { seedRun: runId }, memo: "Generated development ledger entry", isDeleted: false }); }
    const ledgers = await LedgerEntry.insertMany(ledgerEntries);
    const ticketRows: Record<string, unknown>[] = [];
    let ticketIndex = 0;
    state.units.forEach((unitId, unitIndex) => { for (let unitTicketIndex = 0; unitTicketIndex < randomBetween(0, Math.max(0, scale.ticketsPerUnit * 2)); unitTicketIndex += 1) { const status = pick(CONSTANTS.MAINTENANCE_TICKET_STATUS, ticketIndex); ticketRows.push({ organization: state.organization, property: state.unitProperties[unitIndex], unit: unitId, reportedBy: { user: state.users[ticketIndex % state.users.length], role: "Staff" }, assignedVendor: state.vendors[ticketIndex % state.vendors.length], assignedStaff: state.users[ticketIndex % state.users.length], title: `Maintenance request ${organizationIndex + 1}-${ticketIndex + 1}`, description: "Generated maintenance scenario with varied status and priority.", category: pick(CONSTANTS.VENDOR_TRADE_CATEGORIES, ticketIndex), priority: pick(CONSTANTS.MAINTENANCE_TICKET_PRIORITY, ticketIndex), status, permissionToEnter: ticketIndex % 2 === 0, preferredSchedule: pick(CONSTANTS.MAINTENANCE_TICKET_PREFERRED_SCHEDULE, ticketIndex), scheduledDate: dateOffset(ticketIndex % 7), completedAt: status === "Completed" ? dateOffset(-2) : undefined, estimatedCost: 500 + ticketIndex * 25, actualCost: status === "Completed" ? 600 + ticketIndex * 20 : 0, isBillableToTenant: ticketIndex % 3 === 0, isDeleted: false }); ticketIndex += 1; } });
    const tickets = await MaintenanceTicket.insertMany(ticketRows);
    const firstLedger = ledgers[0];
    if (tickets.length && firstLedger) await MaintenanceTicket.updateMany({ _id: { $in: tickets.slice(0, Math.min(tickets.length, ledgers.length)).map((ticket) => ticket._id) } }, { $set: { ledgerEntry: firstLedger._id } });
    await Document.insertMany(Array.from({ length: state.properties.length * scale.documentsPerProperty }, (_, documentIndex) => ({ organization: state.organization, property: state.properties[documentIndex % state.properties.length], title: `Seed document ${organizationIndex + 1}-${documentIndex + 1}`, entityType: "Property", entityId: state.properties[documentIndex % state.properties.length], status: pick(CONSTANTS.DOCUMENT_STATUS, documentIndex), visibility: pick(CONSTANTS.DOCUMENT_VISIBILITY, documentIndex), category: pick(CONSTANTS.DOCUMENT_CATEGORY, documentIndex), meta: { name: `document-${documentIndex}.pdf`, size: 1024 + documentIndex * 100 }, cloud: image(`document-${organizationIndex}-${documentIndex}`), user: state.owner })));
    await AuditLog.insertMany(Array.from({ length: scale.auditsPerOrganization }, (_, auditIndex) => ({ organization: state.organization, actorId: state.owner, actorModel: "User", action: pick(CONSTANTS.AUDIT_LOG_ACTION, auditIndex), resource: "Property", resourceId: state.properties[auditIndex % state.properties.length], actorSnapshot: { fullName: `${identity(organizationIndex, 0).firstName} ${identity(organizationIndex, 0).lastName}`, email: actorEmail("user", organizationIndex, 0, `${slugify(state.organizationName)}.test`), role: "Owner" }, context: { ipAddress: "127.0.0.1", userAgent: "seed-script", requestUrl: "/seed", httpMethod: "POST" }, description: "Generated audit event", createdAt: dateOffset(-auditIndex) })));
    await File.insertMany(state.tenants.slice(0, Math.min(10, state.tenants.length)).map((tenantId, fileIndex) => ({ meta: { name: `avatar-${fileIndex}.jpg`, size: 2048 }, object: { private: false, key: `seed/${runId}/avatar-${fileIndex}.jpg`, resource: "profiles/tenant" }, provider: { sandbox: true }, uploaderId: tenantId, uploaderModel: "Tenant" })));
    await Scope.insertMany([
      ...state.users.map((actor) => ({ organization: state.organization, actor, actorModel: "User", scopeMap: scopeMap(USER_SCOPES) })),
      ...state.tenants.map((actor) => ({ organization: state.organization, actor, actorModel: "Tenant", scopeMap: scopeMap(TENANT_SCOPES) })),
      ...state.vendors.map((actor) => ({ organization: state.organization, actor, actorModel: "Vendor", scopeMap: scopeMap(VENDOR_SCOPES) })),
      ...operators.map((operator) => ({ organization: state.organization, actor: operator._id, actorModel: "Operator", scopeMap: scopeMap(OPERATOR_SCOPES) })),
    ]);
    await OTP.insertMany(state.users.slice(0, 2).map((actor) => ({ actor, actorModel: "User", entity: "PASSWORD_RESET", otp: 100000 + organizationIndex, isVerified: false, expiresAt: dateOffset(1) })));
    credentials.push({ organization: { name: state.organizationName, subdomain: state.subdomain }, user: { email: actorEmail("user", organizationIndex, 0, `${slugify(state.organizationName)}.test`), password: seedPassword }, tenant: { email: actorEmail("tenant", organizationIndex, 0, `${slugify(state.organizationName)}.test`), password: seedPassword }, vendor: { email: actorEmail("vendor", organizationIndex, 0, `${slugify(state.organizationName)}.test`), password: seedPassword } });
  }
  const credentialsFile = process.argv.find((item) => item.startsWith("--credentials-file="))?.slice("--credentials-file=".length) || "seed-credentials.json";
  await writeFile(credentialsFile, JSON.stringify({ generatedAt: new Date().toISOString(), password: seedPassword, organizations: credentials }, null, 2));
  console.log(`Credentials written to ${credentialsFile}`);
  console.log(`Seeded ${states.length} organizations (${runId}).`);
  await mongoose.disconnect();
}

seed().catch(async (error) => { console.error(error); await mongoose.disconnect(); process.exitCode = 1; });
