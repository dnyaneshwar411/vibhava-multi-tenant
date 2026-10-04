import LedgerEntry from "../models/ledger.model.js";
import { CreateLedgerInput, UpdateLedgerInput } from "../../../api/schemas/ledger.schema.js";
import { ObjectIdQueryTypeCasting, QueryFilter } from "mongoose";
import { PaginationOptions } from "../../../common/utils/pagination.js";
import PaymentService from "../../../core/services/payment.service.js";
import { EventPaymentsType } from "../../../core/events/types.js";
import { CONSTANTS_TYPE } from "../../../common/types/index.js";
import LeaseRepository from "./lease.repository.js";

export default class LedgerRepository {
  private static model = LedgerEntry;

  static async paginate(
    organizationId: ObjectIdQueryTypeCasting,
    filters: PaginationOptions,
    actor?: {
      model: CONSTANTS_TYPE["USER_MODELS"],
      id: ObjectIdQueryTypeCasting
    }
  ) {
    const dbQuery: Record<string, object | string> = { organization: organizationId };

    if (actor && actor.model === "Tenant") {
      const activeLease = await LeaseRepository.getTenantActiveLease(actor.id)
      if (!activeLease) return {
        entries: [],
        total: 0
      }
      dbQuery.unit = activeLease.unit
    } else if (actor && actor.model === "Vendor") {
      dbQuery.vendor = actor.id
    }

    const [entries, total] = await Promise.all([
      this.model
        .find(dbQuery)
        .limit(filters.limitNumber)
        .select("-reference -createdAt -__v -updatedAt -createdBy -organization -tenant -lease")
        .populate("property", "name")
        .populate("unit", "unitNumber")
        .skip(filters.pageNumber - 1)
        .lean(),
      this.model.countDocuments(dbQuery)
    ]);

    return { entries, total };
  }

  static async findById(organizationId: ObjectIdQueryTypeCasting, entryId: string) {
    return await this.model
      .findOne({ organization: organizationId, _id: entryId })
      .select("-reference -updatedAt -createdAt -organization -__v")
      .populate("property", "name propertyType status address")
      .populate("unit", "unitNumber floor status unitType")
      .populate("vendor", "name email mobileNumber countryCode")
      .populate("tenant", "name email mobileNumber countryCode")
      .lean();
  }

  static async create(payload: CreateLedgerInput["body"] & { organization: ObjectIdQueryTypeCasting, createdBy?: ObjectIdQueryTypeCasting }) {
    return await this.model.create(payload);
  }

  static async updateOne(
    query: { organization: ObjectIdQueryTypeCasting, _id: string },
    payload: UpdateLedgerInput["body"]
  ) {
    return await this.model.findOneAndUpdate(query, { $set: payload }, { new: true });
  }

  // Placeholder methods for upcoming features
  static async reverseEntry(organizationId: ObjectIdQueryTypeCasting, entryId: string) {
    return { success: true };
  }

  static async updateTenantBalance(organizationId: ObjectIdQueryTypeCasting, tenantId: string) {
    return { success: true };
  }

  static async chargeRent(organizationId: ObjectIdQueryTypeCasting) {
    return { success: true };
  }

  static async profitLoss(organizationId: ObjectIdQueryTypeCasting) {
    return { success: true };
  }

  static async rentRoll(organizationId: ObjectIdQueryTypeCasting) {
    return { success: true };
  }

  static async exists(filters: QueryFilter<{}>) {
    return await this.model.exists(filters)
  }

  static async latestPayableRent(filters: QueryFilter<{}>) {
    return await this.model
      .findOne(filters)
      .sort({ "period.startDate": -1 })
      .select("period")
      .lean()
  }

  static async createLedgerOrder(
    organizationId: ObjectIdQueryTypeCasting,
    ledgerId: ObjectIdQueryTypeCasting,
    tenantId: ObjectIdQueryTypeCasting,
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
    const ledgerEntry = await this.model.findOne({ _id: ledgerId, organization: organizationId })
    console.log(ledgerEntry, {
      organizationId,
      ledgerEntry,
      tenantId
    })
    if (!ledgerEntry) return {
      success: false,
      message: "No such ledger entry found!"
    }

    if (ledgerEntry.status === "Cleared") return {
      success: false,
      message: "This Ledger Entry is already Cleared."
    }

    const payableAmount = (ledgerEntry.finance?.totalAmount || 100) * 100;

    const options = {
      amount: payableAmount,
      currency: ledgerEntry.finance?.currency || "INR",
      notes: {
        resource: "ORGANIZATION_FINANCE",
        organizationId: String(organizationId),
        entity: "LEDGER",
        ledger: String(ledgerEntry._id),
        actor: String(tenantId),
      }
    }

    const { success, ...session } = await PaymentService.createOrganizationOrder({
      organizationId: String(organizationId),
      gateway: "RAZORPAY",
      options
    }!)

    if (!success) return {
      success: false,
      message: session.message!
    }

    return {
      success: true,
      credentials: session.credentials,
      order: session.order
    }
  }

  static async processLedgerPayment(payload: EventPaymentsType) {
    const { notes, webhookSignature, stringifiedPayload, ...reference } = payload
    await this.model.findByIdAndUpdate(payload.notes.ledger, {
      $set: {
        status: "Cleared",
        reference
      }
    })
  }
}