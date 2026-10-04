import { addDays, addMonths, addWeeks, endOfDay, startOfDay } from "date-fns";
import Logger from "../../common/logger/index.js"
import LeaseRepository from "../../infrastructure/database/repositories/lease.repository.js"
import LedgerRepository from "../../infrastructure/database/repositories/ledger.repository.js";
import { EventOrchestrator } from "../events/eventBus.js";
import { EventPaymentsType } from "../events/types.js";
import { isValidObjectId } from "mongoose";
import { CONSTANTS_TYPE } from "../../common/types/index.js";
import OrganizationRepository from "../../infrastructure/database/repositories/organization.repository.js";

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

  static calculateEndDate(startDate: Date, period: CONSTANTS_TYPE["LEASE_BILLING_CYCLE"]): {
    startDate: Date,
    endDate: Date
  } {
    let endDate: Date;

    switch (period) {
      case "Bi-Weekly":
        // 2 weeks (14 days), subtracting 1 day if it's inclusive, or just add 2 weeks
        endDate = addWeeks(startDate, 2);
        break;
      case "Monthly":
        endDate = addMonths(startDate, 1);
        break;
      case "Quarterly":
        endDate = addMonths(startDate, 3);
        break;
      case "Annually":
        endDate = addMonths(startDate, 12);
        break;
    }

    return {
      startDate,
      endDate,
    };
  }

  static async processRentPayment(payload: EventPaymentsType) {
    try {
      console.log("processRentPayment condition hit")
      const notes = payload.notes || {};
      if (!isValidObjectId(notes.leaseId)) return
console.log("correct leaseId ", notes.leaseId)
      // find the lease
      const lease: any = await LeaseRepository.findOne({ _id: notes.leaseId })
      if (!lease) return
console.log("condition hit lease found")
      // calcuate the startDate and the end Date.
      const billingCycle = lease.finance?.billingCycle || "Monthly"
      const { startDate, endDate } = this.calculateEndDate(notes.startDate, billingCycle)

      // create the ledger entry
      const dbPayload = {
        organization: notes.organizationId,
        unit: lease.unit,
        tenant: notes.actor,

        property: lease.property,
        lease: lease._id,

        entryType: "Rent Payment",
        status: "Cleared",
        finance: {
          currency: payload.currency,
          totalAmount: payload.amount,
          paymentGateway: payload.gateway
        },
        period: {
          startDate,
          endDate,
          billingCycle
        },
        lines: []
      }

      const entry = await LedgerRepository.create(dbPayload as any);
      console.log("lease created")
      const { success, data: organization } = await OrganizationRepository.findById(notes.organizationId)
      console.log("organization data", success, organization._id)
      if(!success) return

      const emailPayload = {
        organizationName: organization.name,
        organizationLogo: organization.branding?.logo ||
          organization.branding?.favicon ||
          organization.branding?.darkLogo ||
          organization.branding?.banner,
        property: lease.property,
        startDate,
        endDate,
        finance: {
          rentAmount: 25000,
        },
        unit: lease.unit,
        primaryTenant: lease.primaryTenant,
        coTenants: lease.coTenants,
      };


      // notify the users via email
      EventOrchestrator.publish("EMAILS", {
        type: "EMAILS",
        entity: "RENT_PAYMENT_SUCCESS",
        payload: {
          subject: `Payment Successful: Rent Receipt for ${lease.unit.unitNumber || "Unit" + ", " + lease?.property?.title || "Property"}`,
          to: lease.primaryTenant.email,
          cc: lease.coTenants.map((tenant: any) => tenant.email),
          ...emailPayload
        }
      })

    } catch (error) {
      Logger.error("error", error)
    }
  }
}