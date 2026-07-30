import { Router } from "express";
import { authenticate } from "../middlewares/auth.middleware.js";
import { validate } from "../middlewares/validate.middleware.js";
import LedgerController from "../controllers/ledger.controller.js";
import LedgerSchema from "../schemas/ledger.schema.js";

const router: Router = Router();

router
  .route("/entries")
  .get(
    authenticate(["ledger:read"]),
    LedgerController.getEntries
  )
  .post(
    authenticate(["ledger:create"]),
    validate(LedgerSchema.create),
    LedgerController.createEntry
  );

router
  .route("/entries/:entryId")
  .get(
    authenticate(["ledger:read"]),
    LedgerController.getEntryById
  )
  .put(
    authenticate(["ledger:update"]),
    validate(LedgerSchema.update),
    LedgerController.updateEntry
  );

router
  .route("/entries/:entryId/reverse")
  .get(
    authenticate(["ledger:approve:final"]),
    LedgerController.reverseEntry
  );

router
  .route("/tenant-balance/:tenantId")
  .put(
    authenticate(["ledger:read", "tenant:read"]),
    LedgerController.updateTenantBalance
  );

router
  .route("/payments/charge-rent")
  .post(
    authenticate(["ledger:create", "ledger:approve"]),
    LedgerController.chargeRent
  );

router.route("/reports/profit-loss")
  .get(authenticate(["report:read"]), LedgerController.profitLoss)

router.route("/reports/rent-roll")
  .get(authenticate(["report:read"]), LedgerController.rentRoll)


export { router as ledgerRouter };