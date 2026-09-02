import { model, Schema } from "mongoose";
import { imageSchema } from "./common.schemas.js";
import { CONSTANTS } from "../../../config/constants.js";

const maintenanceTicketSchema = new Schema({
  organization: {
    type: Schema.Types.ObjectId,
    ref: "Organization",
    required: true,
    index: true,
  },
  property: {
    type: Schema.Types.ObjectId,
    ref: "Property",
    required: true,
    index: true,
  },
  unit: {
    type: Schema.Types.ObjectId,
    ref: "Unit",
    required: true,
    index: true,
  },

  reportedBy: {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    role: {
      type: String,
      enum: CONSTANTS.USER_ROLE,
      required: true,
    },
  },
  assignedVendor: {
    type: Schema.Types.ObjectId,
    ref: "Vendor",
    index: true,
  },
  assignedStaff: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },

  // ticketNumber: {
  //   type: String,
  //   required: true,
  //   trim: true,
  // },
  title: {
    type: String,
    required: [true, "Ticket title is required"],
    trim: true,
    maxlength: 150,
  },
  description: {
    type: String,
    required: [true, "Detailed description is required"],
    trim: true,
  },
  category: {
    type: String,
    required: true,
    enum: CONSTANTS.VENDOR_TRADE_CATEGORIES,
    index: true,
  },
  priority: {
    type: String,
    required: true,
    enum: CONSTANTS.MAINTENANCE_TICKET_PRIORITY,
    default: "Medium",
    index: true,
  },
  status: {
    type: String,
    required: true,
    enum: CONSTANTS.MAINTENANCE_TICKET_STATUS,
    default: "Open",
    index: true,
  },

  permissionToEnter: {
    type: Boolean,
    required: true,
    default: false,
  },
  entryNotes: {
    type: String,
    trim: true,
  },
  preferredSchedule: {
    type: String,
    enum: CONSTANTS.MAINTENANCE_TICKET_PREFERRED_SCHEDULE,
    default: "Anytime",
  },

  attachments: [imageSchema],

  scheduledDate: {
    type: Date,
  },
  completedAt: {
    type: Date,
  },

  estimatedCost: {
    type: Number,
    default: 0,
    min: 0
  },
  actualCost: {
    type: Number,
    default: 0,
    min: 0
  },
  isBillableToTenant: {
    type: Boolean,
    default: false,
  },
  ledgerEntry: {
    type: Schema.Types.ObjectId,
    ref: "LedgerEntry",
  },

  feedback: {
    rating: {
      type: Number,
      min: 1,
      max: 5,
    },
    comment: {
      type: String,
      trim: true
    },
    submittedAt: {
      type: Date,
    },
  },

  isDeleted: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true,
});

maintenanceTicketSchema.index({
  organization: 1,
  property: 1,
  status: 1,
  priority: 1,
});

maintenanceTicketSchema.index({
  organization: 1,
  "reportedBy.user": 1,
  status: 1,
});

maintenanceTicketSchema.index({
  organization: 1,
  assignedVendor: 1,
  status: 1,
});

const MaintenanceTicket = model("MaintenanceTicket", maintenanceTicketSchema);

export default MaintenanceTicket;