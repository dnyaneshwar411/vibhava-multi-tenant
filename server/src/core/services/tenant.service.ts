import { ObjectIdQueryTypeCasting } from "mongoose";
import { hashString } from "../../common/utils/hash.js";
import Tenant from "../../infrastructure/database/models/tenant.model.js";
import { CONSTANTS_TYPE } from "../../common/types/index.js";
import TenantRepository from "../../infrastructure/database/repositories/tenant.repository.js";
import { PaginationOptions } from "../../common/utils/pagination.js";
import UnitRepository from "../../infrastructure/database/repositories/unit.repository.js";
import LeaseRepository from "../../infrastructure/database/repositories/lease.repository.js";
import { CONSTANTS } from "../../config/constants.js";

export default class TenantService {
  private static model = Tenant;
  static async updateById(id: string, data: any) {
    if (data.password) data.password = await hashString(data.password);
    await this.model.findByIdAndUpdate(id, data);
  }

  static async listTenant(
    organizationId: ObjectIdQueryTypeCasting,
    query: PaginationOptions & {
      status?: CONSTANTS_TYPE["TENANT_STATUS"];
      unit?: ObjectIdQueryTypeCasting
    }
  ) {
    if(typeof query.status === "string") {
      query.status = query.status.split(",")
        .filter((status: string) => CONSTANTS.TENANT_STATUS.includes(status as any)) as any
    }
    const { total, tenants } = await TenantRepository.paginate(organizationId, query)
    return {
      pagination: {
        total,
        pageNumber: query.pageNumber || 1,
        limitNumber: query.limitNumber || 10,
      },
      tenants
    }
  }

  static async getUnitTenants(
    organizationId: ObjectIdQueryTypeCasting,
    unitId: ObjectIdQueryTypeCasting
  ) {
    const dbQuery = {
      isDeleted: false,
      organization: organizationId,
      unit: unitId,
      isActive: true
    }
    return await LeaseRepository.getActiveUnitLeaseTenants(dbQuery)
  }

  static async createOrganizationTenant(organizationId: ObjectIdQueryTypeCasting, payload: any) {
    return await this.model.create({
      organization: organizationId,
      ...payload
    })
  }

  static async updateOrganizationTenant(organizationId: ObjectIdQueryTypeCasting, tenantId: ObjectIdQueryTypeCasting, payload: any) {
    return await this.model.findOneAndUpdate({ organization: organizationId, _id: tenantId }, {
      $set: payload
    }, {
      returnDocument: "after"
    })
  }

  static async deleteOrganizationTenant(organizationId: ObjectIdQueryTypeCasting, tenantId: ObjectIdQueryTypeCasting) {
    return await this.model.findOneAndUpdate({ organization: organizationId, _id: tenantId }, {
      $set: {
        isDeleted: true
      }
    }, {
      returnDocument: "after"
    })
  }
}
