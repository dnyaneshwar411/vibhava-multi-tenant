import { Request, Response } from "express";
import catchAsync from "../utils/catchAsync.js";
import httpStatus from "http-status";
import LedgerRepository from "../../infrastructure/database/repositories/ledger.repository.js";
import { buildPaginationFilters, PaginationQueryOptions } from "../../common/utils/pagination.js";

export default class LedgerController {
  static getEntries = catchAsync(
    async function (req: Request, res: Response) {
      const pagination = buildPaginationFilters<{}, { total?: number }>(req.query as PaginationQueryOptions);
      const { entries, total } = await LedgerRepository.paginate(req.organization!, pagination);
      pagination.total = total;
      res.status(httpStatus.OK).json({ code: httpStatus.OK, data: entries, pagination });
    }
  );

  static createEntry = catchAsync(
    async function (req: Request, res: Response) {
      const payload = { ...req.body, organization: req.organization!, createdBy: req.user._id };
      await LedgerRepository.create(payload);
      res.status(httpStatus.CREATED).json({ code: httpStatus.CREATED, message: "Ledger entry created successfully" });
    }
  );

  static getEntryById = catchAsync(
    async function (req: Request, res: Response) {
      const { entryId } = req.params as { entryId: string };
      const entry = await LedgerRepository.findById(req.organization!, entryId);
      res.status(httpStatus.OK).json({ code: httpStatus.OK, data: entry });
    }
  );

  static updateEntry = catchAsync(
    async function (req: Request, res: Response) {
      const { entryId } = req.params as { entryId: string };
      await LedgerRepository.updateOne({ organization: req.organization!, _id: entryId }, req.body);
      res.status(httpStatus.OK).json({ code: httpStatus.OK, message: "Ledger entry updated successfully" });
    }
  );

  static reverseEntry = catchAsync(
    async function (req: Request, res: Response) {
      const { entryId } = req.params as { entryId: string };
      await LedgerRepository.reverseEntry(req.organization!, entryId);
      res.status(httpStatus.OK).json({ code: httpStatus.OK, message: "Ledger entry reversed successfully" });
    }
  );

  static updateTenantBalance = catchAsync(
    async function (req: Request, res: Response) {
      const { tenantId } = req.params as { tenantId: string };
      await LedgerRepository.updateTenantBalance(req.organization!, tenantId);
      res.status(httpStatus.OK).json({ code: httpStatus.OK, message: "Tenant balance updated successfully" });
    }
  );

  static chargeRent = catchAsync(
    async function (req: Request, res: Response) {
      await LedgerRepository.chargeRent(req.organization!);
      res.status(httpStatus.OK).json({ code: httpStatus.OK, message: "Rent charged successfully" });
    }
  );

  static profitLoss = catchAsync(
    async function (req: Request, res: Response) {
      const data = await LedgerRepository.profitLoss(req.organization!);
      res.status(httpStatus.OK).json({ code: httpStatus.OK, data });
    }
  );

  static rentRoll = catchAsync(
    async function (req: Request, res: Response) {
      const data = await LedgerRepository.rentRoll(req.organization!);
      res.status(httpStatus.OK).json({ code: httpStatus.OK, data });
    }
  );
}