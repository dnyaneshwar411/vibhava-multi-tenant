import { Router } from "express";
import { authenticate } from "../middlewares/auth.middleware.js";
import { validate } from "../middlewares/validate.middleware.js";
import MaintenanceController from "../controllers/maintenance.controller.js";
import MaintenanceSchema from "../schemas/maintenance.schema.js";

const router: Router = Router();

router
  .route("/tickets")
  .get(
    validate(MaintenanceSchema.paginate),
    authenticate(["ticket:read:all", "ticket:read:own"]),
    MaintenanceController.getTickets
  )
  .post(
    authenticate(["ticket:create"]),
    validate(MaintenanceSchema.create),
    MaintenanceController.createTicket
  );

router
  .route("/tickets/:ticketId")
  .get(
    authenticate(["ticket:read:all", "ticket:read:own"]),
    MaintenanceController.getTicketById
  )
  .put(
    authenticate(["ticket:update"]),
    validate(MaintenanceSchema.update),
    MaintenanceController.updateTicket
  )
  .delete(
    authenticate(["ticket:delete"]),
    MaintenanceController.deleteTicket
  );

router
  .route("/tickets/:ticketId/assign")
  .patch(
    authenticate(["ticket:assign"]),
    validate(MaintenanceSchema.assign),
    MaintenanceController.assignTicket
  );

router
  .route("/tickets/:ticketId/complete")
  .patch(
    authenticate(["ticket:approve"]),
    validate(MaintenanceSchema.complete),
    MaintenanceController.completeTicket
  );

router
  .route("/tickets/:ticketId/feedback")
  .post(
    authenticate(["ticket:approve"]),
    validate(MaintenanceSchema.feedback),
    MaintenanceController.addFeedback
  );

router
  .route("/tickets/:ticketId/status/:status")
  .patch(
    validate(MaintenanceSchema.updateStatus),
    authenticate(["ticket:approve"]),
    MaintenanceController.updateStatus
  );

export { router as maintenanceRouter };