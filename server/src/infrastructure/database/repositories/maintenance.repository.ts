import { CreateMaintenanceInput, FeedbackMaintenanceInput, UpdateMaintenanceInput } from "../../../api/schemas/maintenance.schema.js";
import { PaginationOptions } from "../../../common/utils/pagination.js";
import { CONSTANTS } from "../../../config/constants.js";
import S3 from "../../providers/aws/s3.js";
import MaintenanceTicket from "../models/maintenanceTicket.model.js";
import mongoose, { isValidObjectId, ObjectIdQueryTypeCasting, QueryFilter, Schema, Types } from "mongoose";

export default class MaintenanceRepository {
  private static model = MaintenanceTicket;

  private static async getKanbanTicketsAggregation(organizationId: ObjectIdQueryTypeCasting, filters: QueryFilter<{}>) {
    const {
      priority,
      propertyId,
      status,
      skip = 0,
      limitNumber = 20,
    } = filters;

    const matchStage: QueryFilter<{}> = {
      isDeleted: false,
      organization: new mongoose.Types.ObjectId(organizationId as string)
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
            { $sort: { createdAt: -1, _id: -1 } },
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

  static async paginate(organizationId: ObjectIdQueryTypeCasting, filters: PaginationOptions) {
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
    return await this.model.create(payload);
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
}