import { Request, Response } from "express";
import catchAsync from "../utils/catchAsync.js";
import httpStatus from "http-status";
import MaintenanceRepository from "../../infrastructure/database/repositories/maintenance.repository.js";
import { buildPaginationFilters, PaginationQueryOptions } from "../../common/utils/pagination.js";
import AuditLogService from "../../core/services/auditLog.service.js";

export default class MaintenanceController {
  static getTickets = catchAsync(
    async function (req: Request, res: Response) {
      const pagination = buildPaginationFilters<{}, { total?: number }>(req.query as PaginationQueryOptions);
      const { total, aggregate } = await MaintenanceRepository.paginate(req.organization!, pagination)
      pagination.total = total
      res.status(httpStatus.OK).json({ code: httpStatus.OK, data: aggregate, pagination });
    }
  );

  static createTicket = catchAsync(
    async function (req: Request, res: Response) {
      const payload = {
        ...req.body,
        organization: req.organization,
        reportedBy: {
          user: req.user._id,
          role: req.userType
        }
      }
      const ticket = await MaintenanceRepository.create(payload);

      AuditLogService.addLogMeta(req, {
        action: "CREATE",
        resource: "MaintenanceTicket",
        resourceId: ticket._id,
        description: `${req.user.name} created the ticket with ticketId = ${ticket._id}!`
      })
      res.status(httpStatus.CREATED).json({ code: httpStatus.CREATED, message: "Ticket created successfully" });
    }
  );

  static getTicketById = catchAsync(
    async function (req: Request, res: Response) {
      const { ticketId } = req.params as { ticketId: string }
      const ticket = await MaintenanceRepository.findOne({ organization: req.organization!, _id: ticketId });
      res.status(httpStatus.OK).json({ code: httpStatus.OK, data: ticket });
    }
  );

  static updateTicket = catchAsync(
    async function (req: Request, res: Response) {
      const { ticketId } = req.params as { ticketId: string }
      const ticket = await MaintenanceRepository.updateOne({ organization: req.organization!, _id: ticketId }, req.body);
      if (ticket) {
        AuditLogService.addLogMeta(req, {
          action: "UPDATE",
          resource: "MaintenanceTicket",
          resourceId: ticket._id,
          description: `${req.user.name} updated the ticket with ticketId = ${ticket._id}!`
        })
      }
      res.status(httpStatus.OK).json({ code: httpStatus.OK, message: "Ticket updated successfully" });
    }
  );

  static deleteTicket = catchAsync(
    async function (req: Request, res: Response) {
      const { ticketId } = req.params as { ticketId: string }
      const ticket = await MaintenanceRepository.updateOne({ organization: req.organization!, _id: ticketId }, { isDeleted: true });
      if (ticket) {
        AuditLogService.addLogMeta(req, {
          action: "DELETE",
          resource: "MaintenanceTicket",
          resourceId: ticket._id,
          description: `${req.user.name} deleted the ticket with ticketId = ${ticket._id}!`
        })
      }
      res.status(httpStatus.OK).json({ code: httpStatus.OK, message: "Ticket deleted successfully" });
    }
  );

  static assignTicket = catchAsync(
    async function (req: Request, res: Response) {
      const { ticketId } = req.params as { ticketId: string }
      const ticket = await MaintenanceRepository.updateOne({ organization: req.organization!, _id: ticketId }, req.body);
      if (ticket) {
        AuditLogService.addLogMeta(req, {
          action: "UPDATE",
          resource: "MaintenanceTicket",
          resourceId: ticket._id,
          description: `${req.user.name} assigned the maintenance ticket with ticketId = ${ticket._id} to vendor with vendorId = ${req.body?.vendor}!`
        })
      }
      res.status(httpStatus.OK).json({ code: httpStatus.OK, message: "Ticket assigned successfully" });
    }
  );

  static completeTicket = catchAsync(
    async function (req: Request, res: Response) {
      const { ticketId } = req.params as { ticketId: string }
      await MaintenanceRepository.updateOne({ organization: req.organization!, _id: ticketId }, req.body);
      res.status(httpStatus.OK).json({ code: httpStatus.OK, message: "Ticket completed successfully" });
    }
  );

  static addFeedback = catchAsync(
    async function (req: Request, res: Response) {
      const { ticketId } = req.params as { ticketId: string }
      await MaintenanceRepository.updateOne({ organization: req.organization!, _id: ticketId }, req.body);
      res.status(httpStatus.OK).json({ code: httpStatus.OK, message: "Feedback added successfully" });
    }
  );

  static updateStatus = catchAsync(
    async function (req: Request, res: Response) {
      const { ticketId } = req.params as { ticketId: string }
      const ticket = await MaintenanceRepository.updateOne({ organization: req.organization!, _id: ticketId }, req.body);
      if (ticket) {
        AuditLogService.addLogMeta(req, {
          action: "UPDATE",
          resource: "MaintenanceTicket",
          resourceId: ticket._id,
          description: `${req.user.name} updated the status of the maintenance ticket with ticketId = ${ticket._id} to vendor ${req.body.status}!`
        })
      }
      res.status(httpStatus.OK).json({ code: httpStatus.OK, message: "Successfull" })
    }
  )
}