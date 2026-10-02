import { CreateMaintenanceInput, FeedbackMaintenanceInput, ReorderKanbanBoardInput, UpdateMaintenanceInput } from "../../../api/schemas/maintenance.schema.js";
import { PaginationOptions } from "../../../common/utils/pagination.js";
import S3 from "../../providers/aws/s3.js";
import MaintenanceTicket from "../models/maintenanceTicket.model.js";
import mongoose, { isValidObjectId, ObjectIdQueryTypeCasting, QueryFilter, Schema, Types } from "mongoose";
import LeaseRepository from "./lease.repository.js";

export default class MaintenanceRepository {
  private static model = MaintenanceTicket;
  private static PUNCTUATION = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
  private static ticketsNoData = [
    {
      columnSummaries: [],
      totalCount: [{ count: 0 }],
      tickets: []
    }
  ]

  static generateKeyBetween(
    prevKey: string | null | undefined,
    nextKey: string | null | undefined,
    middleChar = 'V'
  ): string {
    const safePrev = prevKey ?? "";
    const safeNext = nextKey ?? "";

    if (!safePrev && !safeNext) {
      return "V";
    }

    if (!safePrev) {
      const firstChar = safeNext.charAt(0);
      if (!firstChar) {
        return middleChar;
      }
      const index = this.PUNCTUATION.indexOf(firstChar);
      if (index > 0) {
        return this.PUNCTUATION.charAt(index - 1);
      }
      return safeNext + middleChar;
    }

    if (!safeNext) {
      const lastChar = safePrev.charAt(safePrev.length - 1);
      if (!lastChar) {
        return middleChar;
      }
      const index = this.PUNCTUATION.indexOf(lastChar);
      if (index < this.PUNCTUATION.length - 1 && index !== -1) {
        return safePrev.slice(0, -1) + this.PUNCTUATION.charAt(index + 1);
      }
      return safePrev + middleChar;
    }

    let p = 0, n = 0;
    let result = "";

    while (p < safePrev.length || n < safeNext.length) {
      const prevChar = safePrev.charAt(p);
      const nextChar = safeNext.charAt(n);

      const pc = p < safePrev.length && prevChar ? this.PUNCTUATION.indexOf(prevChar) : 0;
      const nc = n < safeNext.length && nextChar ? this.PUNCTUATION.indexOf(nextChar) : this.PUNCTUATION.length - 1;

      if (pc === nc) {
        result += this.PUNCTUATION.charAt(pc) || middleChar;
        p++;
        n++;
      } else {
        const mid = Math.floor((pc + nc) / 2);
        if (mid > pc) {
          result += this.PUNCTUATION.charAt(mid) || middleChar;
          return result;
        } else {
          result += this.PUNCTUATION.charAt(pc) || middleChar;
          p++;
        }
      }
    }

    return result + middleChar;
  }

  private static async getKanbanTicketsAggregation(
    organizationId: ObjectIdQueryTypeCasting,
    filters: QueryFilter<{}>
  ) {
    const {
      priority,
      propertyId,
      status,
      skip = 0,
      limitNumber = 20,
      assignedVendor,
      unit
    } = filters;

    const matchStage: QueryFilter<{}> = {
      isDeleted: false,
      organization: new mongoose.Types.ObjectId(organizationId as string),
      ...(assignedVendor && { assignedVendor }),
      ...(unit && { unit })
    };

    if (isValidObjectId(propertyId)) {
      matchStage.property = new mongoose.Types.ObjectId(propertyId);
    }

    if (status) {
      const statusArray = typeof status === "string"
        ? status.split(",").map((s) => s.trim())
        : status;
      matchStage.status = { $in: statusArray };
    }

    if (priority) {
      const priorityArray = typeof priority === "string"
        ? priority.split(",").map((p) => p.trim())
        : priority;
      matchStage.priority = { $in: priorityArray };
    }

    const result: any = await this.model.aggregate([
      { $match: matchStage },
      {
        $facet: {
          columnSummaries: [
            {
              $group: {
                _id: "$status",
                totalCount: { $sum: 1 },
                totalEstimatedCost: { $sum: "$estimatedCost" },
                totalActualCost: { $sum: "$actualCost" },
                urgentCount: {
                  $sum: { $cond: [{ $eq: ["$priority", "Urgent"] }, 1, 0] },
                },
              },
            },
          ],

          totalCount: [{ $count: "count" }],

          tickets: [
            {
              $sort: {
                kanbanRank: 1
                //  createdAt: -1, _id: -1
              }
            },
            { $skip: Number(skip) },
            { $limit: Number(limitNumber) },

            {
              $lookup: {
                from: "properties",
                localField: "property",
                foreignField: "_id",
                as: "property",
              },
            },
            { $unwind: { path: "$property", preserveNullAndEmptyArrays: true } },

            {
              $lookup: {
                from: "units",
                localField: "unit",
                foreignField: "_id",
                as: "unit",
              },
            },
            { $unwind: { path: "$unit", preserveNullAndEmptyArrays: true } },

            {
              $lookup: {
                from: "vendors",
                localField: "assignedVendor",
                foreignField: "_id",
                as: "assignedVendor",
              },
            },
            { $unwind: { path: "$assignedVendor", preserveNullAndEmptyArrays: true } },

            {
              $project: {
                _id: 1,
                title: 1,
                description: 1,
                category: 1,
                priority: 1,
                status: 1,
                permissionToEnter: 1,
                isBillableToTenant: 1,
                estimatedCost: 1,
                actualCost: 1,
                scheduledDate: 1,
                createdAt: 1,
                "property._id": 1,
                "property.name": 1,
                "unit._id": 1,
                "unit.unitNumber": 1,
                "assignedVendor._id": 1,
                "assignedVendor.name": 1,
                attachmentCount: { $size: { $ifNull: ["$attachments", []] } },
              },
            },
          ],
        },
      },
    ]);

    return result;
  };

  private static async paginateForUser(organizationId: ObjectIdQueryTypeCasting, filters: PaginationOptions) {
    const dbQuery: Record<string, object | string | boolean> = { organization: organizationId, isDeleted: false }
    if (typeof filters.query === "string" && filters.query.length > 3) {
      dbQuery.title = { $regex: filters.query, $options: "i" }
    }

    const [total, aggregate] = await Promise.all([
      this.model.countDocuments(dbQuery),
      this.getKanbanTicketsAggregation(organizationId, filters)
    ]);

    return {
      aggregate,
      total
    };
  }

  private static async paginateForTenant(organizationId: ObjectIdQueryTypeCasting, filters: any, tenantId: string) {
    const dbQuery: Record<string, object | string | boolean> = { organization: organizationId, isDeleted: false }
    if (typeof filters.query === "string" && filters.query.length > 3) {
      dbQuery.title = { $regex: filters.query, $options: "i" }
    }
    
    const activeUnit = await LeaseRepository.getTenantActiveLease(tenantId)
    if (!activeUnit || !activeUnit.unit) return {
      aggregate: this.ticketsNoData,
      total: 0
    }

    filters.unit = activeUnit.unit

    const [total, aggregate] = await Promise.all([
      this.model.countDocuments(dbQuery),
      this.getKanbanTicketsAggregation(organizationId, filters)
    ]);

    return {
      aggregate,
      total
    };
  }

  private static async paginateForVendor(organizationId: ObjectIdQueryTypeCasting, filters: any, assignedVendor: string) {
    const dbQuery: Record<string, object | string | boolean> = { organization: organizationId, isDeleted: false }
    if (typeof filters.query === "string" && filters.query.length > 3) {
      dbQuery.title = { $regex: filters.query, $options: "i" }
    }
    filters.assignedVendor = assignedVendor;

    const [total, aggregate] = await Promise.all([
      this.model.countDocuments(dbQuery),
      this.getKanbanTicketsAggregation(organizationId, filters)
    ]);

    return {
      aggregate,
      total
    };
  }

  static async paginate(organizationId: ObjectIdQueryTypeCasting, filters: PaginationOptions, user: any) {
    switch (user.actorModel) {
      case "User":
        return this.paginateForUser(organizationId, filters);
      case "Tenant":
        return this.paginateForTenant(organizationId, filters, user._id);
      case "Vendor":
        return this.paginateForVendor(organizationId, filters, user._id);
      default:
        return {
          aggregate: this.ticketsNoData,
          total: 0
        };
    }
  }

  static async findOne(query: { organization: ObjectIdQueryTypeCasting; _id: ObjectIdQueryTypeCasting }) {
    const ticket: any = await this.model
      .findOne(query)
      .populate("property", "name status media.primaryImage")
      .populate("unit", "unitType unitNumber status media.primaryImage")
      .populate("reportedBy.user", "name avatar countryCode mobileNumber")
      .populate("assignedVendor", "name avatar countryCode mobileNumber")
      .populate("assignedStaff", "name avatar countryCode mobileNumber")
      .select("-updatedAt -__v -isDeleted -organization")
      .lean();

    if (!ticket) return null;

    const resolveAndSetUrl = async (
      parent: Record<string, any> | undefined,
      field: string
    ) => {
      if (!parent) return
      const mediaObj = parent?.[field];
      if (mediaObj?.key) {
        parent[field] = await S3.getObjectUrl({
          isPrivate: mediaObj.private ?? false,
          key: mediaObj.key,
        });
      }
    };

    const imagePromises: Promise<void>[] = [];

    if (ticket.property?.media?.primaryImage) {
      imagePromises.push(resolveAndSetUrl(ticket.property.media, "primaryImage"));
    }

    if (ticket.unit?.media?.primaryImage) {
      imagePromises.push(resolveAndSetUrl(ticket.unit.media, "primaryImage"));
    }

    if (ticket.reportedBy?.user?.avatar) {
      imagePromises.push(resolveAndSetUrl(ticket.reportedBy.user, "avatar"));
    }

    if (ticket.assignedVendor?.avatar) {
      imagePromises.push(resolveAndSetUrl(ticket.assignedVendor, "avatar"));
    }

    if (ticket.assignedStaff?.avatar) {
      imagePromises.push(resolveAndSetUrl(ticket.assignedStaff, "avatar"));
    }

    if (Array.isArray(ticket.attachments) && ticket.attachments.length > 0) {
      ticket.attachments.forEach((_: any, index: number) => {
        imagePromises.push(resolveAndSetUrl(ticket.attachments, index.toString()));
      });
    }

    await Promise.all(imagePromises);

    return ticket;
  }

  static async create(payload: CreateMaintenanceInput["body"]) {
    const topTicket = await this.model
      .findOne({
        organization: (payload as any).organization,
        property: payload.property,
        status: "Open",
        isDeleted: false,
      })
      .sort({ kanbanRank: 1 })
      .lean();

    const nextKey = topTicket ? (topTicket as any).kanbanRank : null;
    const kanbanRank = this.generateKeyBetween(null, nextKey);

    return await this.model.create({
      ...payload,
      kanbanRank,
    });
  }

  static async updateOne(
    query: { organization: ObjectIdQueryTypeCasting, _id: ObjectIdQueryTypeCasting },
    payload: UpdateMaintenanceInput["body"] |
      FeedbackMaintenanceInput["body"] |
    { isDeleted: boolean }
  ) {
    return await this.model.findOneAndUpdate(query, {
      $set: payload
    }, { returnDocument: "after" });
  }

  static async getVendorPerformanceMetrics(organizationId: ObjectIdQueryTypeCasting, vendorId: string) {
    const metrics = await this.model.aggregate([
      {
        $match: {
          organization: organizationId,
          assignedVendor: new Types.ObjectId(vendorId),
          status: "Completed"
        }
      },
      {
        $group: {
          _id: "$assignedVendor",
          avgRating: { $avg: "$feedback.rating" },
          totalTickets: { $sum: 1 }
        }
      }
    ]);

    return metrics.length > 0 ? metrics[0] : { totalTickets: 0, avgRating: 0 };
  }

  private static async resolveAdjacentRanks(
    organization: ObjectIdQueryTypeCasting,
    status: string,
    ticketId: ObjectIdQueryTypeCasting,
    prevTicketId?: string | null,
    nextTicketId?: string | null
  ): Promise<{ prevRank: string | null; nextRank: string | null }> {
    let prevRank: string | null = null;
    let nextRank: string | null = null;

    const [prevDoc, nextDoc] = await Promise.all([
      prevTicketId ? this.model.findOne({ _id: prevTicketId, organization }).lean() : null,
      nextTicketId ? this.model.findOne({ _id: nextTicketId, organization }).lean() : null,
    ]);

    if (prevDoc) prevRank = (prevDoc as any).kanbanRank;
    if (nextDoc) nextRank = (nextDoc as any).kanbanRank;

    if (prevTicketId && !nextTicketId) {
      const nextInDb = await this.model
        .findOne({
          organization,
          status,
          isDeleted: false,
          _id: { $ne: ticketId },
          kanbanRank: { $gt: prevRank },
        } as any)
        .sort({ kanbanRank: 1 })
        .lean();

      if (nextInDb) {
        nextRank = (nextInDb as any).kanbanRank;
      }
    }

    if (!prevTicketId && nextTicketId) {
      const prevInDb = await this.model
        .findOne({
          organization,
          status,
          isDeleted: false,
          _id: { $ne: ticketId },
          kanbanRank: { $lt: nextRank },
        } as any)
        .sort({ kanbanRank: -1 })
        .lean();

      if (prevInDb) {
        prevRank = (prevInDb as any).kanbanRank;
      }
    }

    if (!prevTicketId && !nextTicketId) {
      const firstInCol = await this.model
        .findOne({ organization, status, isDeleted: false, _id: { $ne: ticketId } } as any)
        .sort({ kanbanRank: 1 })
        .lean();
      if (firstInCol) {
        nextRank = (firstInCol as any).kanbanRank;
      }
    }

    return { prevRank, nextRank };
  }

  static async reorderKanban(
    organization: ObjectIdQueryTypeCasting,
    ticketId: ObjectIdQueryTypeCasting,
    input: ReorderKanbanBoardInput["body"]
  ) {
    const { status: newStatus, prevTicketId, nextTicketId } = input;

    const { nextRank, prevRank } = await this.resolveAdjacentRanks(
      organization,
      input.status,
      ticketId,
      input.prevTicketId,
      input.nextTicketId
    )

    const kanbanRank = (prevTicketId && nextTicketId)
      ? this.generateKeyBetween(prevRank, nextRank)
      : undefined;

    const updateData: any = { kanbanRank };

    if (newStatus) {
      updateData.status = newStatus;
      if (newStatus === "Completed" || newStatus === "Canceled") {
        updateData.completedAt = new Date();
      }
    }

    const updatedTicket = await this.model.findOneAndUpdate(
      { _id: ticketId, organization },
      { $set: updateData },
      { returnDocument: "after" }
    );

    if (!updatedTicket) {
      throw new Error("Ticket not found");
    }

    return updatedTicket;
  }
}