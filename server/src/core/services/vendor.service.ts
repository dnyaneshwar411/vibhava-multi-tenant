import mongoose, { ObjectIdQueryTypeCasting } from "mongoose";
import { hashString } from "../../common/utils/hash.js";
import Vendor from "../../infrastructure/database/models/vendor.model.js";
import { ManageScopesSchema } from "../../api/schemas/user.schema.js";
import VendorRepository from "../../infrastructure/database/repositories/vendor.repository.js";
import { CreateVendorInput } from "../../api/schemas/vendor.schema.js";
import ScopeService from "./scope.service.js";
import { VENDOR_SCOPES } from "../../config/scopes.js";
import { IUser } from "../../infrastructure/database/models/user.model.js";

export default class VendorService {
  private static model = Vendor;

  static buildScopesList() {
    return VENDOR_SCOPES.reduce((acc, curr) => {
      acc[curr] = true;
      return acc;
    }, {} as Record<string, boolean>)
  }

  static async paginate(organizationId: ObjectIdQueryTypeCasting, filters: Record<string, any>) {
    const { total, vendors } = await VendorRepository.paginate(organizationId, filters as any)
    return {
      pagination: {
        total,
        pageNumber: filters.pageNumber || 1,
        limitNumber: filters.limitNumber || 10
      },
      vendors
    }
  }

  static async create(payload: CreateVendorInput["body"] & { organization: ObjectIdQueryTypeCasting }) {
    const session = await mongoose.startSession();
    session.startTransaction();
    let data: any = {};

    try {
      if (payload.password) payload.password = await hashString(payload.password)
      data.vendor = (await VendorRepository.createWithSession(payload, session))[0]
      if (!data.vendor) throw new Error("Unable to create vendor")

      const scopePayload = {
        actor: data.vendor?._id,
        actorModel: "Vendor",
        organization: data.vendor?.organization,
        scopeMap: this.buildScopesList()
      }

      data.scope = (await ScopeService.createWithSession(scopePayload, session))[0];
      if (!data.scope) throw new Error("Unable to assign scopes to vendor.")

      await session.commitTransaction();
      return data
    } catch (error) {
      await session.abortTransaction();
      const errorMessage = error instanceof Error ? error.message : "Something went wrong"
      return { success: false, message: errorMessage }
    }

    return { success: true, data }
  }

  static async updateById(id: string, data: any) {
    if (data.password) data.password = await hashString(data.password);
    await this.model.findByIdAndUpdate(id, data);
  }

  static async unassignScopes(
    organizationId: ObjectIdQueryTypeCasting,
    vendorId: ObjectIdQueryTypeCasting,
    payload: ManageScopesSchema["body"],
    organizationOwner: ObjectIdQueryTypeCasting,
    user: IUser
  ) {
    if (String(organizationOwner) === String(user._id)) return {
      success: false,
      message: "Roles cannot be assigned to self"
    };
    const updates = await VendorRepository.manageScopes({ organization: organizationId, _id: vendorId }, {
      $pull: payload
    });
    return {
      success: true,
      updates
    }
  }

  static async assignScopes(
    organizationId: ObjectIdQueryTypeCasting,
    vendorId: ObjectIdQueryTypeCasting,
    payload: ManageScopesSchema["body"],
    organizationOwner: ObjectIdQueryTypeCasting,
    user: IUser
  ) {
    if (String(organizationOwner) === String(user._id)) return {
      success: false,
      message: "Roles cannot be assigned to self"
    };

    const updates = await VendorRepository.manageScopes({ organization: organizationId, _id: vendorId }, {
      $addToSet: payload
    });

    return {
      success: true,
      updates
    }
  }
}
