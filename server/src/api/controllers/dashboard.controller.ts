import { Request, Response } from "express";
import httpStatus from "http-status";
import catchAsync from "../utils/catchAsync.js";
import Property from "../../infrastructure/database/models/property.model.js";
import Unit from "../../infrastructure/database/models/unit.model.js";
import Tenant from "../../infrastructure/database/models/tenant.model.js";
import Lease from "../../infrastructure/database/models/lease.model.js";
import LedgerEntry from "../../infrastructure/database/models/ledger.model.js";
import MaintenanceTicket from "../../infrastructure/database/models/maintenanceTicket.model.js";
import Vendor from "../../infrastructure/database/models/vendor.model.js";
import { Types } from "mongoose";

export default class DashboardController {
  static getMetrics = catchAsync(
    async function (req: Request, res: Response): Promise<void> {
      const orgId = req.organization ? new Types.ObjectId(req.organization) : null;
      const userModel = req.userModel; // "User", "Tenant", "Vendor", "Operator"
      const userId = req.user?._id ? new Types.ObjectId(req.user._id) : null;

      if (!orgId) {
        res.status(httpStatus.BAD_REQUEST).json({ code: httpStatus.BAD_REQUEST, message: "Organization ID is required" });
        return;
      }

      let dashboardData: any = {
        role: userModel,
      };

      if (userModel === "User" || userModel === "Operator") {
        // Staff / Admin / Owner
        const [
          totalProperties,
          totalUnits,
          occupiedUnits,
          vacantUnits,
          totalTenants,
          activeLeases,
          maintenanceTickets,
          totalVendors,
          ledgerSum,
        ] = await Promise.all([
          Property.countDocuments({ organization: orgId, isDeleted: false }),
          Unit.countDocuments({ organization: orgId, isDeleted: false }),
          Unit.countDocuments({ organization: orgId, status: "Occupied", isDeleted: false }),
          Unit.countDocuments({ organization: orgId, status: "Vacant", isDeleted: false }),
          Tenant.countDocuments({ organization: orgId, status: "Active" }),
          Lease.countDocuments({ organization: orgId, status: "Active", isDeleted: false }),
          MaintenanceTicket.aggregate([
            { $match: { organization: orgId, isDeleted: false } },
            { $group: { _id: "$status", count: { $sum: 1 } } }
          ]),
          Vendor.countDocuments({ organization: orgId, isDeleted: false }),
          LedgerEntry.aggregate([
            { $match: { organization: orgId } },
            { $group: { _id: "$entryType", total: { $sum: "$finance.totalAmount" } } }
          ]),
        ]);

        const ticketCounts = {
          open: 0,
          inProgress: 0,
          completed: 0,
          total: 0,
        };

        maintenanceTickets.forEach((item: any) => {
          ticketCounts.total += item.count;
          if (item._id === "Open") ticketCounts.open = item.count;
          else if (item._id === "In Progress") ticketCounts.inProgress = item.count;
          else if (item._id === "Completed") ticketCounts.completed = item.count;
        });

        // Let's compute simple revenues and expenses from Ledger Entries
        let totalRevenue = 0;
        let totalExpenses = 0;
        ledgerSum.forEach((item: any) => {
          if (item._id === "Rent Payment") {
            totalRevenue += item.total;
          } else if (item._id === "Maintenance Expense") {
            totalExpenses += item.total;
          }
        });

        dashboardData.metrics = {
          properties: totalProperties,
          units: {
            total: totalUnits,
            occupied: occupiedUnits,
            vacant: vacantUnits,
            occupancyRate: totalUnits > 0 ? Math.round((occupiedUnits / totalUnits) * 100) : 0,
          },
          tenants: totalTenants,
          activeLeases: activeLeases,
          maintenance: ticketCounts,
          vendors: totalVendors,
          financials: {
            totalRevenue,
            totalExpenses,
            netIncome: totalRevenue - totalExpenses,
          }
        };

      } else if (userModel === "Vendor") {
        // Vendor metrics
        const [maintenanceTickets, performance] = await Promise.all([
          MaintenanceTicket.aggregate([
            { $match: { organization: orgId, assignedVendor: userId, isDeleted: false } },
            { $group: { _id: "$status", count: { $sum: 1 } } }
          ]),
          MaintenanceTicket.aggregate([
            {
              $match: {
                organization: orgId,
                assignedVendor: userId,
                status: "Completed",
                "feedback.rating": { $exists: true }
              }
            },
            {
              $group: {
                _id: "$assignedVendor",
                avgRating: { $avg: "$feedback.rating" },
                totalRated: { $sum: 1 }
              }
            }
          ])
        ]);

        const ticketCounts = {
          open: 0,
          inProgress: 0,
          completed: 0,
          total: 0,
        };

        maintenanceTickets.forEach((item: any) => {
          ticketCounts.total += item.count;
          if (item._id === "Open") ticketCounts.open = item.count;
          else if (item._id === "In Progress") ticketCounts.inProgress = item.count;
          else if (item._id === "Completed") ticketCounts.completed = item.count;
        });

        dashboardData.metrics = {
          maintenance: ticketCounts,
          performance: performance.length > 0 ? {
            rating: Math.round(performance[0].avgRating * 10) / 10,
            totalReviews: performance[0].totalRated
          } : { rating: 0, totalReviews: 0 }
        };

      } else if (userModel === "Tenant") {
        // Tenant metrics
        const tenant = await Tenant.findOne({ organization: orgId, email: req.user?.email });
        let activeLease: any = null;
        let ledgerEntries: any[] = [];
        let outstandingBalance = 0;

        if (tenant) {
          activeLease = await Lease.findOne({
            organization: orgId,
            primaryTenant: tenant._id,
            status: "Active",
            isDeleted: false
          }).populate("property", "name").populate("unit", "unitNumber");

          const [entries, reportedTickets] = await Promise.all([
            LedgerEntry.find({ organization: orgId, tenant: tenant._id }).sort({ createdAt: -1 }).limit(10).lean(),
            MaintenanceTicket.aggregate([
              { $match: { organization: orgId, "reportedBy.user": userId, isDeleted: false } },
              { $group: { _id: "$status", count: { $sum: 1 } } }
            ])
          ]);

          ledgerEntries = entries;

          // Simple outstanding balance logic: charges vs payments
          let totalCharges = 0;
          let totalPayments = 0;
          const allTenantLedgers = await LedgerEntry.find({ organization: orgId, tenant: tenant._id }).lean();
          allTenantLedgers.forEach((entry: any) => {
            if (entry.entryType.includes("Charge") || entry.entryType.includes("Fee")) {
              totalCharges += entry.finance?.totalAmount || 0;
            } else if (entry.entryType.includes("Payment")) {
              totalPayments += entry.finance?.totalAmount || 0;
            }
          });
          outstandingBalance = Math.max(0, totalCharges - totalPayments);

          const ticketCounts = {
            open: 0,
            inProgress: 0,
            completed: 0,
            total: 0,
          };

          reportedTickets.forEach((item: any) => {
            ticketCounts.total += item.count;
            if (item._id === "Open") ticketCounts.open = item.count;
            else if (item._id === "In Progress") ticketCounts.inProgress = item.count;
            else if (item._id === "Completed") ticketCounts.completed = item.count;
          });

          dashboardData.metrics = {
            lease: activeLease ? {
              property: activeLease.property?.name,
              unitNumber: activeLease.unit?.unitNumber,
              startDate: activeLease.startDate,
              endDate: activeLease.endDate,
              rentAmount: activeLease.finance?.rentAmount,
              paymentDueDay: activeLease.finance?.paymentDueDay,
            } : null,
            outstandingBalance,
            recentTransactions: ledgerEntries.map(e => ({
              id: e._id,
              date: e.createdAt,
              type: e.entryType,
              amount: e.finance?.totalAmount,
              status: e.status
            })),
            maintenance: ticketCounts
          };
        } else {
          dashboardData.metrics = null;
        }
      }

      res.status(httpStatus.OK).json({ code: httpStatus.OK, data: dashboardData });
    }
  );
}
