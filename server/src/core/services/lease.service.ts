import { endOfDay, startOfDay } from "date-fns";
import Logger from "../../common/logger/index.js"
import LeaseRepository from "../../infrastructure/database/repositories/lease.repository.js"
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
}