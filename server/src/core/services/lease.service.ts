import { addDays, endOfDay, startOfDay } from "date-fns";
import Logger from "../../common/logger/index.js"
import LeaseRepository from "../../infrastructure/database/repositories/lease.repository.js"
import LedgerRepository from "../../infrastructure/database/repositories/ledger.repository.js";
import { EventOrchestrator } from "../events/eventBus.js";

/**
 * processing multiple entities in batching would be a good step in scaling
 * the worker, as it frees up memory after fixed batch size.
 */

export default class LeaseService {
  static async processExpiringLeases() {
    try {
      const now = new Date();

      const cursor: any = LeaseRepository.processExpiringLeasesCursor({
        status: "Active",
        endDate: {
          $gte: startOfDay(now),
          $lte: endOfDay(now),
        },
      })

      const updates = []

      for await (const lease of cursor) {
        updates.push({
          updateOne: {
            filter: { _id: lease._id },
            update: { $set: { status: "Expired" } }
          }
        })

        const propertyInfo = lease.property?.name
          ? `${lease.property?.name}${lease.unit.unitNumber
            ? `, Unit ${lease.unit.unitNumber}` : ""}`
          : "Your Unit";

        EventOrchestrator.publish("EMAILS", {
          type: "EMAILS",
          entity: "LEASE_EXPIRATION",
          payload: {
            subject: `Important Notice: Lease Expiration for ${propertyInfo}`,
            to: lease.primaryTenant.email,
            cc: lease.coTenants.map((tenant: any) => tenant.email),
            bcc: lease.createdBy.email
          }
        })
      }

      await LeaseRepository.batchUpdates(updates)

      Logger.info("Scheduler executed successfully")
    } catch (error) {
      Logger.error("", error)
    }
  }

  static async processRentReminders() {
    try {
      const tomorrow = addDays(new Date(), 1);
      const day = tomorrow.getDate();

      const cursor: any = LeaseRepository.getLeasesDueOnDayCursor(day);

      for await (const lease of cursor) {
        const hasPayment = await LedgerRepository.exists({
          lease: lease._id,
          entryType: "Rent Payment",
          "period.startDate": { $lte: tomorrow },
          "period.endDate": { $gte: tomorrow }
        });

        if (!hasPayment) {
          EventOrchestrator.publish("EMAILS", {
            type: "EMAILS",
            entity: "RENT_PAYMENT_DUE",
            payload: {
              subject: `Rent Payment Reminder: Due Tomorrow for ${lease.property?.name || "Property"}`,
              to: lease.primaryTenant.email,
              cc: lease.coTenants.map((tenant: any) => tenant.email),
              ...lease,
              dueDate: tomorrow
            }
          });
        }
      }
      Logger.info("Rent reminder job triggered successfully")
    } catch (error) {
      Logger.error("Error in processRentReminders", error)
    }
  }
}