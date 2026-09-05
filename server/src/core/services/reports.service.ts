import { ObjectIdQueryTypeCasting, Types } from "mongoose";
import LedgerEntry from "../../infrastructure/database/models/ledger.model.js";
import Unit from "../../infrastructure/database/models/unit.model.js";
import Lease from "../../infrastructure/database/models/lease.model.js";
import Tenant from "../../infrastructure/database/models/tenant.model.js";
import Vendor from "../../infrastructure/database/models/vendor.model.js";
import { ApiError } from "../../api/utils/apiError.js";
import httpStatus from "http-status";
import LedgerRepository from "../../infrastructure/database/repositories/ledger.repository.js";
import LeaseRepository from "../../infrastructure/database/repositories/lease.repository.js";
import PaymentService from "./payment.service.js";
import { addMonths, addWeeks, addYears, setDate, startOfDay } from "date-fns";
import { OrganizationFinanceRentRollNotes, PaymentOrderSession } from "../../common/types/payment.js";
import { PayRentInput } from "../../api/schemas/reports.schema.js";
import PaymentGatewayRepository from "../../infrastructure/database/repositories/paymentGateway.repository.js";
import { ALL_STRIPE_PAYMENT_METHOD_TYPES } from "../../infrastructure/providers/stripe/config.js";

const safeNumber = (val: any, fallback: number = 0): number => {
  if (val === null || val === undefined || isNaN(Number(val))) return fallback;
  return Number(val);
};

const safeString = (val: any, fallback: string = "N/A"): string => {
  if (!val || typeof val !== "string" || val.trim() === "") return fallback;
  return val.trim();
};

const safeDate = (val: any): Date | null => {
  if (!val) return null;
  const d = new Date(val);
  return isNaN(d.getTime()) ? null : d;
};

const parseArrayQuery = (val: any): string[] => {
  if (!val) return [];
  if (Array.isArray(val)) return val.map((v) => String(v).trim()).filter(Boolean);
  if (typeof val === "string") return val.split(",").map((v) => v.trim()).filter(Boolean);
  return [];
};

export default class ReportsService {
  static async getProfitLoss(
    organizationId: string,
    actorModel: string,
    actorId?: string,
    query: any = {}
  ) {
    if (!organizationId || !Types.ObjectId.isValid(organizationId)) {
      throw new ApiError(httpStatus.BAD_REQUEST, "Valid Organization ID is required.");
    }
    const orgId = new Types.ObjectId(organizationId);

    switch (actorModel) {
      case "User":
        return await this.getUserProfitLoss(orgId, query);
      case "Tenant":
        return await this.getTenantProfitLoss(orgId, actorId, query);
      case "Vendor":
        return await this.getVendorProfitLoss(orgId, actorId, query);
      default:
        throw new ApiError(httpStatus.FORBIDDEN, `Profit & Loss report is restricted for actor model: ${safeString(actorModel)}`);
    }
  }

  static async getRentRoll(
    organizationId: string,
    actorModel: string,
    actorId?: string,
    query: any = {}
  ) {
    if (!organizationId || !Types.ObjectId.isValid(organizationId)) {
      throw new ApiError(httpStatus.BAD_REQUEST, "Valid Organization ID is required.");
    }
    const orgId = new Types.ObjectId(organizationId);

    switch (actorModel) {
      case "User":
        return await this.getUserRentRoll(orgId, query);
      case "Tenant":
        return await this.getTenantRentRoll(orgId, actorId, query);
      default:
        throw new ApiError(httpStatus.FORBIDDEN, `Rent Roll report is restricted for actor model: ${safeString(actorModel)}`);
    }
  }

  private static buildLedgerMatchQuery(orgId: Types.ObjectId, query: any) {
    const matchQuery: Record<string, any> = {
      organization: orgId,
      isDeleted: { $ne: true },
    };

    if (query.propertyId && Types.ObjectId.isValid(query.propertyId)) {
      matchQuery.property = new Types.ObjectId(query.propertyId);
    }

    if (query.unit) {
      const unitIds = parseArrayQuery(query.unit)
        .filter((id) => Types.ObjectId.isValid(id))
        .map((id) => new Types.ObjectId(id));
      if (unitIds.length > 0) {
        matchQuery.unit = { $in: unitIds };
      }
    }

    const entryTypes = parseArrayQuery(query.entryTypes || query.entryType);
    if (entryTypes.length > 0) {
      matchQuery.entryType = { $in: entryTypes };
    }

    const statuses = parseArrayQuery(query.statuses || query.status);
    if (statuses.length > 0) {
      matchQuery.status = { $in: statuses };
    }

    const fromDate = safeDate(query.from || query.startDate || query.rentAfter);
    const toDate = safeDate(query.to || query.endDate || query.rentBefore);
    if (fromDate || toDate) {
      matchQuery.createdAt = {};
      if (fromDate) matchQuery.createdAt.$gte = fromDate;
      if (toDate) matchQuery.createdAt.$lte = toDate;
    }

    const amountFrom = query.amountFrom ?? query.fromAmount ?? query.minAmount;
    const amountTo = query.amountTo ?? query.toAmount ?? query.maxAmount;
    if (amountFrom !== undefined || amountTo !== undefined) {
      matchQuery["finance.totalAmount"] = {};
      if (amountFrom !== undefined && !isNaN(Number(amountFrom))) {
        matchQuery["finance.totalAmount"].$gte = Number(amountFrom);
      }
      if (amountTo !== undefined && !isNaN(Number(amountTo))) {
        matchQuery["finance.totalAmount"].$lte = Number(amountTo);
      }
    }

    return matchQuery;
  }

  private static async getUserProfitLoss(orgId: Types.ObjectId, query: any) {
    const matchQuery = this.buildLedgerMatchQuery(orgId, query);

    const pageNumber = Math.max(1, safeNumber(query.page || query.pageNumber, 1));
    const limitNumber = Math.max(1, safeNumber(query.limit || query.limitNumber, 10));
    const skip = (pageNumber - 1) * limitNumber;

    const [total, entries, aggregatedSums, monthlyTrend] = await Promise.all([
      LedgerEntry.countDocuments(matchQuery),

      LedgerEntry.find(matchQuery)
        .populate("property", "name")
        .populate("unit", "unitNumber")
        .populate("tenant", "firstName lastName email")
        .populate("vendor", "companyName name")
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limitNumber)
        .lean(),

      LedgerEntry.aggregate([
        { $match: matchQuery },
        {
          $group: {
            _id: { entryType: "$entryType", status: "$status" },
            totalAmount: { $sum: "$finance.totalAmount" },
          },
        },
      ]),

      LedgerEntry.aggregate([
        { $match: matchQuery },
        {
          $group: {
            _id: {
              year: { $year: { $ifNull: ["$createdAt", new Date()] } },
              month: { $month: { $ifNull: ["$createdAt", new Date()] } },
              entryType: "$entryType",
            },
            total: { $sum: "$finance.totalAmount" },
          },
        },
        { $sort: { "_id.year": 1, "_id.month": 1 } },
      ]),
    ]);

    let totalRevenue = 0;
    let totalExpenses = 0;

    const revenueBreakdown = {
      rentPayments: 0,
      lateFees: 0,
      securityDepositsIn: 0,
      otherIncome: 0,
    };

    const expenseBreakdown = {
      maintenanceExpenses: 0,
      securityDepositRefunds: 0,
      ownerDistributions: 0,
      otherExpenses: 0,
    };

    aggregatedSums.forEach((item: any) => {
      const amount = safeNumber(item.totalAmount);
      const type = safeString(item._id?.entryType, "Other");

      switch (type) {
        case "Rent Payment":
          revenueBreakdown.rentPayments += amount;
          totalRevenue += amount;
          break;
        case "Late Fee Charge":
          revenueBreakdown.lateFees += amount;
          totalRevenue += amount;
          break;
        case "Security Deposit In":
          revenueBreakdown.securityDepositsIn += amount;
          totalRevenue += amount;
          break;
        case "Maintenance Expense":
          expenseBreakdown.maintenanceExpenses += amount;
          totalExpenses += amount;
          break;
        case "Security Deposit Refund":
          expenseBreakdown.securityDepositRefunds += amount;
          totalExpenses += amount;
          break;
        case "Owner Distribution":
          expenseBreakdown.ownerDistributions += amount;
          totalExpenses += amount;
          break;
        default:
          if (type.includes("Charge") || type.includes("Payment")) {
            revenueBreakdown.otherIncome += amount;
            totalRevenue += amount;
          } else {
            expenseBreakdown.otherExpenses += amount;
            totalExpenses += amount;
          }
          break;
      }
    });

    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const monthMap: Record<string, { month: string; revenue: number; expenses: number; net: number }> = {};

    monthlyTrend.forEach((item: any) => {
      const year = safeNumber(item._id?.year, new Date().getFullYear());
      const monthIdx = Math.max(1, Math.min(12, safeNumber(item._id?.month, 1)));
      const key = `${year}-${monthIdx}`;
      const label = `${monthNames[monthIdx - 1]} ${year}`;

      if (!monthMap[key]) {
        monthMap[key] = { month: label, revenue: 0, expenses: 0, net: 0 };
      }

      const type = safeString(item._id?.entryType);
      const totalAmt = safeNumber(item.total);
      if (["Rent Payment", "Late Fee Charge", "Security Deposit In"].includes(type)) {
        monthMap[key].revenue += totalAmt;
      } else {
        monthMap[key].expenses += totalAmt;
      }
      monthMap[key].net = monthMap[key].revenue - monthMap[key].expenses;
    });

    return {
      role: "User",
      summary: {
        totalRevenue,
        totalExpenses,
        netIncome: totalRevenue - totalExpenses,
        operatingMargin: totalRevenue > 0 ? Math.round(((totalRevenue - totalExpenses) / totalRevenue) * 100) : 0,
      },
      revenueBreakdown,
      expenseBreakdown,
      monthlyTrend: Object.values(monthMap),
      entries: entries.map((e: any) => ({
        id: e._id,
        property: safeString(e.property?.name, "N/A"),
        unit: safeString(e.unit?.unitNumber, "N/A"),
        partyName: e.tenant
          ? safeString(`${e.tenant.firstName || ""} ${e.tenant.lastName || ""}`, "Tenant")
          : safeString(e.vendor?.companyName || e.vendor?.name, "N/A"),
        entryType: safeString(e.entryType, "General Entry"),
        amount: safeNumber(e.finance?.totalAmount),
        status: safeString(e.status, "Posted"),
        date: safeDate(e.createdAt) || new Date(),
        memo: safeString(e.memo, ""),
      })),
      pagination: {
        total,
        pageNumber,
        limitNumber,
      },
    };
  }

  private static async getTenantProfitLoss(orgId: Types.ObjectId, actorId?: string, query: any = {}) {
    let tenant = null;
    if (actorId && Types.ObjectId.isValid(actorId)) {
      tenant = await Tenant.findById(actorId);
    }
    if (!tenant && query.userEmail) {
      tenant = await Tenant.findOne({ organization: orgId, email: query.userEmail });
    }

    const matchQuery = this.buildLedgerMatchQuery(orgId, query);
    if (tenant) {
      matchQuery.tenant = tenant._id;
    }

    const pageNumber = Math.max(1, safeNumber(query.page || query.pageNumber, 1));
    const limitNumber = Math.max(1, safeNumber(query.limit || query.limitNumber, 10));
    const skip = (pageNumber - 1) * limitNumber;

    const [total, entries, aggregatedSums, monthlyTrend] = await Promise.all([
      LedgerEntry.countDocuments(matchQuery),

      LedgerEntry.find(matchQuery)
        .populate("property", "name")
        .populate("unit", "unitNumber")
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limitNumber)
        .lean(),

      LedgerEntry.aggregate([
        { $match: matchQuery },
        {
          $group: {
            _id: "$entryType",
            totalAmount: { $sum: "$finance.totalAmount" },
          },
        },
      ]),

      LedgerEntry.aggregate([
        { $match: matchQuery },
        {
          $group: {
            _id: {
              year: { $year: { $ifNull: ["$createdAt", new Date()] } },
              month: { $month: { $ifNull: ["$createdAt", new Date()] } },
              entryType: "$entryType",
            },
            total: { $sum: "$finance.totalAmount" },
          },
        },
        { $sort: { "_id.year": 1, "_id.month": 1 } },
      ]),
    ]);

    let totalCharges = 0;
    let totalPaid = 0;
    let securityDepositsPaid = 0;

    aggregatedSums.forEach((item: any) => {
      const amount = safeNumber(item.totalAmount);
      const type = safeString(item._id);

      if (type === "Rent Payment") {
        totalPaid += amount;
      } else if (type === "Rent Charge" || type === "Late Fee Charge") {
        totalCharges += amount;
      } else if (type === "Security Deposit In") {
        securityDepositsPaid += amount;
      }
    });

    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const monthMap: Record<string, { month: string; revenue: number; expenses: number; net: number }> = {};

    monthlyTrend.forEach((item: any) => {
      const year = safeNumber(item._id?.year, new Date().getFullYear());
      const monthIdx = Math.max(1, Math.min(12, safeNumber(item._id?.month, 1)));
      const key = `${year}-${monthIdx}`;
      const label = `${monthNames[monthIdx - 1]} ${year}`;

      if (!monthMap[key]) {
        monthMap[key] = { month: label, revenue: 0, expenses: 0, net: 0 };
      }

      const type = safeString(item._id?.entryType);
      const totalAmt = safeNumber(item.total);

      if (type === "Rent Payment") {
        monthMap[key].revenue += totalAmt;
      } else {
        monthMap[key].expenses += totalAmt;
      }
      monthMap[key].net = monthMap[key].revenue - monthMap[key].expenses;
    });

    return {
      role: "Tenant",
      summary: {
        totalRevenue: totalPaid,
        totalExpenses: totalCharges,
        netIncome: totalPaid - totalCharges,
        operatingMargin: totalCharges > 0 ? Math.round((totalPaid / totalCharges) * 100) : 100,
      },
      revenueBreakdown: {
        rentPayments: totalPaid,
        lateFees: 0,
        securityDepositsIn: securityDepositsPaid,
        otherIncome: 0,
      },
      expenseBreakdown: {
        maintenanceExpenses: totalCharges,
        securityDepositRefunds: 0,
        ownerDistributions: 0,
        otherExpenses: 0,
      },
      monthlyTrend: Object.values(monthMap),
      entries: entries.map((e: any) => ({
        id: e._id,
        property: safeString(e.property?.name, "N/A"),
        unit: safeString(e.unit?.unitNumber, "N/A"),
        partyName: tenant ? safeString(`${tenant.name}`, "Tenant Profile") : "Tenant",
        entryType: safeString(e.entryType, "Rent Charge"),
        amount: safeNumber(e.finance?.totalAmount),
        status: safeString(e.status, "Posted"),
        date: safeDate(e.createdAt) || new Date(),
        memo: safeString(e.memo, ""),
      })),
      pagination: {
        total,
        pageNumber,
        limitNumber,
      },
    };
  }

  private static async getVendorProfitLoss(orgId: Types.ObjectId, actorId?: string, query: any = {}) {
    let vendor = null;
    if (actorId && Types.ObjectId.isValid(actorId)) {
      vendor = await Vendor.findById(actorId);
    }
    if (!vendor && query.userEmail) {
      vendor = await Vendor.findOne({ organization: orgId, email: query.userEmail });
    }

    const matchQuery = this.buildLedgerMatchQuery(orgId, query);
    if (vendor) {
      matchQuery.vendor = vendor._id;
    }

    const pageNumber = Math.max(1, safeNumber(query.page || query.pageNumber, 1));
    const limitNumber = Math.max(1, safeNumber(query.limit || query.limitNumber, 10));
    const skip = (pageNumber - 1) * limitNumber;

    const [total, entries, aggregatedSums, monthlyTrend] = await Promise.all([
      LedgerEntry.countDocuments(matchQuery),

      LedgerEntry.find(matchQuery)
        .populate("property", "name")
        .populate("unit", "unitNumber")
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limitNumber)
        .lean(),

      LedgerEntry.aggregate([
        { $match: matchQuery },
        {
          $group: {
            _id: "$status",
            totalAmount: { $sum: "$finance.totalAmount" },
          },
        },
      ]),

      LedgerEntry.aggregate([
        { $match: matchQuery },
        {
          $group: {
            _id: {
              year: { $year: { $ifNull: ["$createdAt", new Date()] } },
              month: { $month: { $ifNull: ["$createdAt", new Date()] } },
            },
            total: { $sum: "$finance.totalAmount" },
          },
        },
        { $sort: { "_id.year": 1, "_id.month": 1 } },
      ]),
    ]);

    let totalBilled = 0;
    let clearedPayouts = 0;

    aggregatedSums.forEach((item: any) => {
      const amount = safeNumber(item.totalAmount);
      const status = safeString(item._id);

      totalBilled += amount;
      if (status === "Cleared" || status === "Posted") {
        clearedPayouts += amount;
      }
    });

    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const monthMap: Record<string, { month: string; revenue: number; expenses: number; net: number }> = {};

    monthlyTrend.forEach((item: any) => {
      const year = safeNumber(item._id?.year, new Date().getFullYear());
      const monthIdx = Math.max(1, Math.min(12, safeNumber(item._id?.month, 1)));
      const key = `${year}-${monthIdx}`;
      const label = `${monthNames[monthIdx - 1]} ${year}`;

      if (!monthMap[key]) {
        monthMap[key] = { month: label, revenue: 0, expenses: 0, net: 0 };
      }
      const totalAmt = safeNumber(item.total);
      monthMap[key].revenue += totalAmt;
      monthMap[key].net = monthMap[key].revenue;
    });

    return {
      role: "Vendor",
      summary: {
        totalRevenue: clearedPayouts,
        totalExpenses: totalBilled - clearedPayouts,
        netIncome: clearedPayouts,
        operatingMargin: totalBilled > 0 ? Math.round((clearedPayouts / totalBilled) * 100) : 100,
      },
      revenueBreakdown: {
        rentPayments: clearedPayouts,
        lateFees: 0,
        securityDepositsIn: 0,
        otherIncome: 0,
      },
      expenseBreakdown: {
        maintenanceExpenses: totalBilled - clearedPayouts,
        securityDepositRefunds: 0,
        ownerDistributions: 0,
        otherExpenses: 0,
      },
      monthlyTrend: Object.values(monthMap),
      entries: entries.map((e: any) => ({
        id: e._id,
        property: safeString(e.property?.name, "N/A"),
        unit: safeString(e.unit?.unitNumber, "N/A"),
        partyName: vendor ? safeString(vendor.name, "Vendor Company") : "Vendor",
        entryType: safeString(e.entryType, "Maintenance Expense"),
        amount: safeNumber(e.finance?.totalAmount),
        status: safeString(e.status, "Posted"),
        date: safeDate(e.createdAt) || new Date(),
        memo: safeString(e.memo, ""),
      })),
      pagination: {
        total,
        pageNumber,
        limitNumber,
      },
    };
  }

  private static async getUserRentRoll(orgId: Types.ObjectId, query: any = {}) {
    const unitMatch: Record<string, any> = {
      organization: orgId,
      isDeleted: { $ne: true },
    };

    if (query.propertyId && Types.ObjectId.isValid(query.propertyId)) {
      unitMatch.property = new Types.ObjectId(query.propertyId);
    }

    if (query.unit) {
      const rawUnits = parseArrayQuery(query.unit);
      const validUnitIds = rawUnits
        .filter((id) => Types.ObjectId.isValid(id))
        .map((id) => new Types.ObjectId(id));

      if (validUnitIds.length > 0) {
        unitMatch._id = { $in: validUnitIds };
      }
    }

    const units = await Unit.find(unitMatch)
      .populate("property", "name")
      .lean();

    const unitIds = units.map((u) => u._id);

    const leaseQuery: Record<string, any> = {
      organization: orgId,
      unit: { $in: unitIds },
      status: "Active",
      isDeleted: { $ne: true },
    };

    const fromDate = safeDate(query.from || query.startDate || query.rentAfter);
    const toDate = safeDate(query.to || query.endDate || query.rentBefore);
    if (fromDate || toDate) {
      leaseQuery.startDate = {};
      if (fromDate) leaseQuery.startDate.$gte = fromDate;
      if (toDate) leaseQuery.startDate.$lte = toDate;
    }

    const [activeLeases, ledgerEntries] = await Promise.all([
      Lease.find(leaseQuery)
        .populate("primaryTenant", "firstName lastName email phone")
        .lean(),

      LedgerEntry.find({
        organization: orgId,
        unit: { $in: unitIds },
        isDeleted: { $ne: true },
      }).lean(),
    ]);

    const leaseMap = new Map();
    activeLeases.forEach((l) => leaseMap.set(String(l.unit), l));

    const ledgerMap = new Map<string, { paid: number; charges: number }>();
    ledgerEntries.forEach((e) => {
      const unitKey = String(e.unit);
      if (!ledgerMap.has(unitKey)) {
        ledgerMap.set(unitKey, { paid: 0, charges: 0 });
      }
      const item = ledgerMap.get(unitKey)!;
      const amt = safeNumber(e.finance?.totalAmount);
      const type = safeString(e.entryType);

      if (type === "Rent Payment") {
        item.paid += amt;
      } else if (type === "Rent Charge" || type === "Late Fee Charge") {
        item.charges += amt;
      }
    });

    const unitRollList = units.map((unit) => {
      const lease = leaseMap.get(String(unit._id));
      const ledger = ledgerMap.get(String(unit._id)) || { paid: 0, charges: 0 };

      const rentAmount = safeNumber(lease?.finance?.rentAmount, 0);
      const tenant = lease?.primaryTenant;
      const isOccupied = unit.status === "Occupied" || !!lease;

      const charges = ledger.charges > 0 ? ledger.charges : rentAmount;
      const paid = ledger.paid;
      const balance = Math.max(0, charges - paid);

      let paymentStatus = "Vacant";
      if (isOccupied) {
        if (balance === 0 && paid > 0) paymentStatus = "Paid";
        else if (paid > 0 && balance > 0) paymentStatus = "Partial";
        else paymentStatus = "Overdue";
      }

      return {
        unitId: unit._id,
        propertyId: unit.property?._id || null,
        propertyName: safeString((unit.property as any)?.name, "Unassigned Property"),
        unitNumber: safeString(unit.unitNumber, "N/A"),
        unitType: safeString(unit.unitType, "Standard"),
        furnishingStatus: safeString(unit.specifications?.furnishingStatus, "Unfurnished"),
        status: safeString(unit.status, "Vacant"),
        tenantName: tenant ? safeString(`${tenant.firstName || ""} ${tenant.lastName || ""}`, "N/A") : "N/A",
        tenantEmail: safeString(tenant?.email, "N/A"),
        tenantPhone: safeString(tenant?.phone, "N/A"),
        leaseStart: safeDate(lease?.startDate),
        leaseEnd: safeDate(lease?.endDate),
        monthlyRent: rentAmount,
        totalDue: charges,
        amountPaid: paid,
        outstandingBalance: balance,
        paymentStatus,
        securityDepositPaid: safeNumber(lease?.security?.amountPaid),
        securityDepositStatus: safeString(lease?.security?.status, "Unpaid"),
      };
    });

    let filteredList = unitRollList;

    const statusList = parseArrayQuery(query.paymentStatus || query.statuses || query.status);
    if (statusList.length > 0) {
      filteredList = filteredList.filter((u) => statusList.includes(u.paymentStatus));
    }

    const amountFrom = query.amountFrom ?? query.fromAmount ?? query.minAmount;
    const amountTo = query.amountTo ?? query.toAmount ?? query.maxAmount;
    if (amountFrom !== undefined || amountTo !== undefined) {
      filteredList = filteredList.filter((u) => {
        const amt = u.monthlyRent;
        if (amountFrom !== undefined && !isNaN(Number(amountFrom)) && amt < Number(amountFrom)) return false;
        if (amountTo !== undefined && !isNaN(Number(amountTo)) && amt > Number(amountTo)) return false;
        return true;
      });
    }

    let totalScheduledRent = 0;
    let totalCollectedRent = 0;
    let totalOutstanding = 0;
    let totalSecurityDeposits = 0;
    let occupiedCount = 0;
    let vacantCount = 0;

    filteredList.forEach((u) => {
      if (u.status === "Occupied" || u.tenantName !== "N/A") occupiedCount++;
      else vacantCount++;

      totalScheduledRent += u.monthlyRent;
      totalCollectedRent += u.amountPaid;
      totalOutstanding += u.outstandingBalance;
      totalSecurityDeposits += u.securityDepositPaid;
    });

    const totalUnits = filteredList.length;
    const occupancyRate = totalUnits > 0 ? Math.round((occupiedCount / totalUnits) * 100) : 0;

    const pageNumber = Math.max(1, safeNumber(query.page || query.pageNumber, 1));
    const limitNumber = Math.max(1, safeNumber(query.limit || query.limitNumber, 10));
    const skip = (pageNumber - 1) * limitNumber;

    const paginatedUnits = filteredList.slice(skip, skip + limitNumber);

    return {
      role: "User",
      summary: {
        totalUnits,
        occupiedUnits: occupiedCount,
        vacantUnits: vacantCount,
        occupancyRate,
        totalScheduledRent,
        totalCollectedRent,
        totalOutstanding,
        totalSecurityDeposits,
      },
      units: paginatedUnits,
      pagination: {
        total: totalUnits,
        pageNumber,
        limitNumber,
      },
    };
  }

  private static async getTenantRentRoll(orgId: Types.ObjectId, actorId?: string, query: any = {}) {
    let tenant = null;
    if (actorId && Types.ObjectId.isValid(actorId)) {
      tenant = await Tenant.findById(actorId);
    }
    if (!tenant && query.userEmail) {
      tenant = await Tenant.findOne({ organization: orgId, email: query.userEmail });
    }

    const pageNumber = Math.max(1, safeNumber(query.page || query.pageNumber, 1));
    const limitNumber = Math.max(1, safeNumber(query.limit || query.limitNumber, 10));

    if (!tenant) {
      return {
        role: "Tenant",
        summary: {
          totalUnits: 0,
          occupiedUnits: 0,
          vacantUnits: 0,
          occupancyRate: 0,
          totalScheduledRent: 0,
          totalCollectedRent: 0,
          totalOutstanding: 0,
          totalSecurityDeposits: 0,
        },
        units: [],
        pagination: {
          total: 0,
          pageNumber,
          limitNumber,
        },
      };
    }

    const leaseQuery: Record<string, any> = {
      organization: orgId,
      primaryTenant: tenant._id,
      status: "Active",
      isDeleted: { $ne: true },
    };

    const fromDate = safeDate(query.from || query.startDate || query.rentAfter);
    const toDate = safeDate(query.to || query.endDate || query.rentBefore);
    if (fromDate || toDate) {
      leaseQuery.startDate = {};
      if (fromDate) leaseQuery.startDate.$gte = fromDate;
      if (toDate) leaseQuery.startDate.$lte = toDate;
    }

    const lease = await Lease.findOne(leaseQuery)
      .populate("property", "name")
      .populate("unit", "unitNumber type furnishingStatus status")
      .lean();

    if (!lease) {
      return {
        role: "Tenant",
        summary: {
          totalUnits: 0,
          occupiedUnits: 0,
          vacantUnits: 0,
          occupancyRate: 0,
          totalScheduledRent: 0,
          totalCollectedRent: 0,
          totalOutstanding: 0,
          totalSecurityDeposits: 0,
        },
        units: [],
        pagination: {
          total: 0,
          pageNumber,
          limitNumber,
        },
      };
    }

    const ledgerEntries = await LedgerEntry.find({
      organization: orgId,
      tenant: tenant._id,
      isDeleted: { $ne: true },
    }).lean();

    let charges = 0;
    let paid = 0;

    ledgerEntries.forEach((e) => {
      const amt = safeNumber(e.finance?.totalAmount);
      const type = safeString(e.entryType);

      if (type === "Rent Payment") {
        paid += amt;
      } else if (type === "Rent Charge" || type === "Late Fee Charge") {
        charges += amt;
      }
    });

    const rentAmount = safeNumber(lease.finance?.rentAmount);
    const balance = Math.max(0, (charges > 0 ? charges : rentAmount) - paid);

    let paymentStatus = "Paid";
    if (balance > 0 && paid > 0) paymentStatus = "Partial";
    else if (balance > 0 && paid === 0) paymentStatus = "Overdue";

    const statusList = parseArrayQuery(query.paymentStatus || query.statuses || query.status);
    if (statusList.length > 0 && !statusList.includes(paymentStatus)) {
      return {
        role: "Tenant",
        summary: {
          totalUnits: 0,
          occupiedUnits: 0,
          vacantUnits: 0,
          occupancyRate: 0,
          totalScheduledRent: 0,
          totalCollectedRent: 0,
          totalOutstanding: 0,
          totalSecurityDeposits: 0,
        },
        units: [],
        pagination: {
          total: 0,
          pageNumber,
          limitNumber,
        },
      };
    }

    const amountFrom = query.amountFrom ?? query.fromAmount ?? query.minAmount;
    const amountTo = query.amountTo ?? query.toAmount ?? query.maxAmount;
    if (amountFrom !== undefined && !isNaN(Number(amountFrom)) && rentAmount < Number(amountFrom)) {
      return {
        role: "Tenant",
        summary: {
          totalUnits: 0,
          occupiedUnits: 0,
          vacantUnits: 0,
          occupancyRate: 0,
          totalScheduledRent: 0,
          totalCollectedRent: 0,
          totalOutstanding: 0,
          totalSecurityDeposits: 0,
        },
        units: [],
        pagination: {
          total: 0,
          pageNumber,
          limitNumber,
        },
      };
    }
    if (amountTo !== undefined && !isNaN(Number(amountTo)) && rentAmount > Number(amountTo)) {
      return {
        role: "Tenant",
        summary: {
          totalUnits: 0,
          occupiedUnits: 0,
          vacantUnits: 0,
          occupancyRate: 0,
          totalScheduledRent: 0,
          totalCollectedRent: 0,
          totalOutstanding: 0,
          totalSecurityDeposits: 0,
        },
        units: [],
        pagination: {
          total: 0,
          pageNumber,
          limitNumber,
        },
      };
    }

    const unitInfo = (lease.unit as any) || {};
    const propInfo = (lease.property as any) || {};

    const tenantUnitRoll = [
      {
        unitId: unitInfo._id || null,
        propertyId: propInfo._id || null,
        propertyName: safeString(propInfo.name, "Property"),
        unitNumber: safeString(unitInfo.unitNumber, "N/A"),
        unitType: safeString(unitInfo.type, "Standard"),
        furnishingStatus: safeString(unitInfo.furnishingStatus, "Unfurnished"),
        status: "Occupied",
        tenantName: safeString(`${tenant.name}`, "Tenant"),
        tenantEmail: safeString(tenant.email, "N/A"),
        tenantPhone: safeString(tenant.mobileNumber, "N/A"),
        leaseStart: safeDate(lease.startDate),
        leaseEnd: safeDate(lease.endDate),
        monthlyRent: rentAmount,
        totalDue: charges > 0 ? charges : rentAmount,
        amountPaid: paid,
        outstandingBalance: balance,
        paymentStatus,
        securityDepositPaid: safeNumber(lease.security?.amountPaid),
        securityDepositStatus: safeString(lease.security?.status, "Paid"),
      },
    ];

    return {
      role: "Tenant",
      summary: {
        totalUnits: 1,
        occupiedUnits: 1,
        vacantUnits: 0,
        occupancyRate: 100,
        totalScheduledRent: rentAmount,
        totalCollectedRent: paid,
        totalOutstanding: balance,
        totalSecurityDeposits: safeNumber(lease.security?.amountPaid),
      },
      units: tenantUnitRoll,
      pagination: {
        total: 1,
        pageNumber,
        limitNumber,
      },
    };
  }

  static ledgerStartDate(date: string) {
    return startOfDay(date).toString()
  }

  static resolvePaymentDueDate(
    lease: any,
    ledgerEntry: any
  ) {
    const paymentDueDate = lease.finance.paymentDueDay || 1
    if (!ledgerEntry) {
      const date = setDate(new Date(lease.startDate), paymentDueDate)
      return date
    };

    const lastPaidDate = safeDate(ledgerEntry.period.startDate) || new Date();
    switch (lease.finance.billingCycle) {
      case "Bi-Weekly":
        return addWeeks(lastPaidDate, 2);
      case "Quarterly":
        return setDate(addMonths(lastPaidDate, 3), paymentDueDate);
      case "Annually":
        return setDate(addYears(lastPaidDate, 1), paymentDueDate);
    }
    return setDate(addMonths(lastPaidDate, 1), paymentDueDate);
  }

  static resolvePaymentCycleEndDate(date: Date, lease: any) {
    switch (lease.finance.billingCycle) {
      case "Bi-Weekly":
        return addWeeks(date, 2);
      case "Quarterly":
        return addMonths(date, 3);
      case "Annually":
        return addYears(date, 1);
      }
    return addMonths(date, 1)
  }

  static async resolveUnitUpcomingRent(
    organizationId: ObjectIdQueryTypeCasting,
    unitId: ObjectIdQueryTypeCasting,
    tenantId: ObjectIdQueryTypeCasting,
  ): Promise<{
    success: false,
    message: string,
    data?: any
  } | {
    success: true,
    message?: string,
    data: any
  }> {
    // 2. if the rent is not paid resolve the next payable rent.
    const lease = await LeaseRepository.findOne({
      organization: organizationId,
      status: "Active",
      isDeleted: false,
      unit: unitId,
      $or: [
        { primaryTenant: tenantId },
        { coTenants: tenantId }
      ]
    })
    if (!lease) return {
      success: false,
      message: "No Lease Created"
    }

    const [ledgerEntry, gateways] = await Promise.all([
      LedgerRepository.exists({
        organization: organizationId,
        unit: unitId,
        status: "Cleared",
        entryType: "Rent Charge",
      }),
      PaymentGatewayRepository.find({ organization: organizationId })
    ])

    const nextDueDate = this.resolvePaymentDueDate(lease, ledgerEntry);
    const nextCycleEndDate = this.resolvePaymentCycleEndDate(nextDueDate, lease)

    return {
      success: true,
      data: {
        rentDetails: {
          ...lease,
          nextDueDate,
          nextCycleEndDate,
          rentAmount: lease.finance?.rentAmount,
          paymentDueDay: lease.finance?.paymentDueDay,
          billingCycle: lease.finance?.billingCycle,
          finance: undefined
        },
        gateway: gateways.map(gateway => gateway.type)
      }
    }
  }

  static buildRentOrderConfig(
    organizationId: ObjectIdQueryTypeCasting,
    lease: any,
    actor: ObjectIdQueryTypeCasting,
    payload: PayRentInput["body"]
  ) {
    const amount = (lease.finance?.rentAmount || 100) * 100
    const notes = {
      resource: "ORGANIZATION_FINANCE",
      organizationId: String(organizationId),
      entity: "RENT_ROLL",
      leaseId: String(lease._id),
      actor: String(actor),
      startDate: this.ledgerStartDate(payload.startDate)
    } as OrganizationFinanceRentRollNotes
    
    switch (payload.gateway) {
      case "RAZORPAY":
        return {
          amount,
          currency: "INR",
          notes
        }
      case "STRIPE":
        return {
          mode: 'payment',
          ui_mode: "embedded_page",
          redirect_on_completion: "never",
          // payment_method_types: ALL_STRIPE_PAYMENT_METHOD_TYPES,
          line_items: [
            {
              price_data: {
                currency: 'inr',
                product_data: {
                  name: `Rent Payment - ${lease.unit.unitNumber}, ${lease.property.name || "Property"}`,
                  description: 'Make a payment',
                },
                unit_amount: amount,
              },
              quantity: 1,
            },
          ],
          metadata: notes,
        }
      default: 
        throw new Error("Invalid Gateway Selected!")
    }
  }

  static resolveOrderResponse(gateway: PayRentInput["body"]["gateway"], order: any, credentials: any) {
    switch (gateway) {
      case "RAZORPAY":
        return {
          credentials,
          order: {
            gateway,
            currency: order.currency,
            amount: order.amount,
            order_id: order.id,
          },
        }
      default:
        return {
          credentials,
          order: {
            gateway,
            clientSecret: order.client_secret
          },
        }
      }
  }

  static async createRentOrder(
    organizationId: ObjectIdQueryTypeCasting,
    unitId: ObjectIdQueryTypeCasting,
    tenantId: ObjectIdQueryTypeCasting,
    payload: PayRentInput["body"]
  ): Promise<{
    success: false,
    message: string,
    order?: any
    credentials?: any
  } | {
    success: true,
    message?: string,
    order: any
    credentials: any
  }> {
    // 1. check if the rent is paid for that particular date, if yes error saying this rent was already paid.
    const rentPaidCheck = await LedgerRepository.exists({
      organization: organizationId,
      unit: unitId,
      status: "Cleared",
      entryType: "Rent Charge",
      period: {
        startDate: this.ledgerStartDate(payload.startDate)
      }
    })
    if (rentPaidCheck) return {
      success: false,
      message: "Rent Is Already paid For this cycle"
    }

    // 2. fetch the data to create the rent details and all, build the options for the same.
    const lease = await LeaseRepository.findOne({
      organization: organizationId,
      status: "Active",
      isDeleted: false,
      unit: unitId,
      $or: [
        { primaryTenant: tenantId },
        { coTenants: tenantId }
      ]
    })
    if (!lease) return {
      success: false,
      message: "No such lease found"
    }

    const config = this.buildRentOrderConfig(organizationId, lease, tenantId, payload)

    const { success, ...session } = await PaymentService.createOrganizationOrder({
      organizationId: String(organizationId),
      gateway: payload.gateway as any,
      options: config
    }!)

    if (!success) return {
      success: false,
      message: session.message!
    }

    const orderResponse = this.resolveOrderResponse(payload.gateway, session.order, session.credentials)

    return {
      success: true,
      ...orderResponse
    }
  }
}