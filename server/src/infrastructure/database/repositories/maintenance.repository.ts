import { CreateMaintenanceInput, FeedbackMaintenanceInput, UpdateMaintenanceInput } from "../../../api/schemas/maintenance.schema.js";
import { PaginationOptions } from "../../../common/utils/pagination.js";
import MaintenanceTicket from "../models/maintenanceTicket.model.js";
import { ObjectIdQueryTypeCasting, Types } from "mongoose";

export default class MaintenanceRepository {
  private static model = MaintenanceTicket;

  static async paginate(organizationId: ObjectIdQueryTypeCasting, filters: PaginationOptions) {
    const dbQuery: Record<string, object | string | boolean> = { organization: organizationId, isDeleted: false }
    if (typeof filters.query === "string" && filters.query.length > 3) {
      dbQuery.title = { $regex: filters.query, $options: "i" }
    }

    const [tickets, total] = await Promise.all([
      this.model
        .find(dbQuery)
        .populate("property", "name status media.primaryImage")
        .populate("unit", "unitType unitNumber status media.primaryImage")
        .populate("reportedBy.user", "name avatar countryCode mobileNumber")
        .select("-updatedAt -__v -permissionToEnter -preferredSchedule -attachments -estimatedCost -actualCost -isDeleted -isBillableToTenant -organization")
        .limit(filters.limitNumber)
        .skip(filters.pageNumber - 1)
        .lean(),
      this.model.countDocuments(dbQuery)
    ]);

    // tbd s3 key mapping s3 service in infrastructure.

    return {
      tickets,
      total
    };
  }

  static async findOne(query: { organization: ObjectIdQueryTypeCasting, _id: ObjectIdQueryTypeCasting }) {
    return await this.model
      .findOne(query)
      .populate("property", "name status media.primaryImage")
      .populate("unit", "unitType unitNumber status media.primaryImage")
      .populate("reportedBy.user", "name avatar countryCode mobileNumber")
      .populate("assignedVendor", "name avatar countryCode mobileNumber")
      .populate("assignedStaff", "name avatar countryCode mobileNumber")
      .select("-updatedAt -__v -isDeleted -organization")
      .lean();
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