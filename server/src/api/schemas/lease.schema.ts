import z from "zod";
import { CONSTANTS } from "../../config/constants.js";
import { objectIdSchema } from "./common.schema.js";

export default class LeaseSchema {
  // Finance Sub-Schema (Create)
  static createFinanceSchema = z.object({
    rentAmount: z
      .number({ message: "Base rent amount is required" })
      .min(0, "Rent amount cannot be negative"),
    paymentDueDay: z
      .number({ message: "Payment due day is required" })
      .int()
      .min(1, "Payment due day must be between 1 and 31")
      .max(31, "Payment due day must be between 1 and 31")
      .default(1),
    billingCycle: z
      .enum(CONSTANTS.LEASE_BILLING_CYCLE)
      .default("Monthly"),
  });

  // Finance Sub-Schema (Update)
  static updateFinanceSchema = z.object({
    rentAmount: z.number().min(0, "Rent amount cannot be negative").optional(),
    paymentDueDay: z
      .number()
      .int()
      .min(1, "Payment due day must be between 1 and 31")
      .max(31, "Payment due day must be between 1 and 31")
      .optional(),
    billingCycle: z.enum(CONSTANTS.LEASE_BILLING_CYCLE).optional(),
  });

  // Security Deposit Sub-Schema (Create)
  static createSecuritySchema = z.object({
    amountRequired: z
      .number({ message: "Security deposit required amount is required" })
      .min(0, "Amount required cannot be negative"),
    amountPaid: z
      .number()
      .min(0, "Amount paid cannot be negative")
      .default(0),
    status: z
      .enum(CONSTANTS.LEASE_SECURITY_DEPOSIT_STATUS)
      .default("Unpaid"),
    heldInAccount: z.string().trim().nullable().optional(),
  });

  // Security Deposit Sub-Schema (Update)
  static updateSecuritySchema = z.object({
    amountRequired: z.number().min(0, "Amount required cannot be negative").optional(),
    amountPaid: z.number().min(0, "Amount paid cannot be negative").optional(),
    status: z.enum(CONSTANTS.LEASE_SECURITY_DEPOSIT_STATUS).optional(),
    heldInAccount: z.string().trim().nullable().optional(),
  });

  // ============================================================================
  // CREATE LEASE SCHEMA
  // ============================================================================
  static create = z.object({
    params: z
      .object({
        propertyId: objectIdSchema.optional(),
        unitId: objectIdSchema.optional(),
      })
      .optional(),
    body: z
      .object({
        property: objectIdSchema,
        unit: objectIdSchema,
        primaryTenant: objectIdSchema.optional(),
        coTenants: z.array(objectIdSchema).optional().default([]),
        leaseType: z.enum(CONSTANTS.LEASE_TYPE).default("Fixed Term"),
        status: z.enum(CONSTANTS.LEASE_STATUS).default("Draft"),

        startDate: z.coerce.date({ message: "Start date is required" }),
        endDate: z.coerce.date({ message: "End date is required" }),
        moveInDate: z.coerce.date().nullable().optional(),
        moveOutDate: z.coerce.date().nullable().optional(),

        finance: this.createFinanceSchema,
        security: this.createSecuritySchema,

        leaseAgreementDocument: objectIdSchema.nullable().optional(),
      })
      .refine(
        (data) => data.endDate > data.startDate,
        {
          message: "End date must be after start date",
          path: ["endDate"],
        }
      ),
  });

  // ============================================================================
  // UPDATE LEASE SCHEMA
  // ============================================================================
  static update = z.object({
    params: z
      .object({
        leaseId: objectIdSchema,
      })
      .optional(),
    body: z
      .object({
        property: objectIdSchema,
        unit: objectIdSchema,
        primaryTenant: objectIdSchema.nullable().optional(),
        coTenants: z.array(objectIdSchema).optional(),
        leaseType: z.enum(CONSTANTS.LEASE_TYPE).optional(),
        status: z.enum(CONSTANTS.LEASE_STATUS).optional(),

        startDate: z.coerce.date().optional(),
        endDate: z.coerce.date().optional(),
        moveInDate: z.coerce.date().nullable().optional(),
        moveOutDate: z.coerce.date().nullable().optional(),

        finance: this.updateFinanceSchema.optional(),
        security: this.updateSecuritySchema.optional(),

        leaseAgreementDocument: objectIdSchema.nullable().optional(),
      })
      .refine(
        (data) => {
          if (data.startDate && data.endDate) {
            return data.endDate > data.startDate;
          }
          return true;
        },
        {
          message: "End date must be after start date",
          path: ["endDate"],
        }
      ),
  });
}

// Inferred TypeScript types
export type CreateLeaseInput = z.infer<typeof LeaseSchema.create>;
export type UpdateLeaseInput = z.infer<typeof LeaseSchema.update>;