import { ObjectIdQueryTypeCasting } from "mongoose";
import { hashString } from "../../common/utils/hash.js";
import Tenant from "../../infrastructure/database/models/tenant.model.js";
import { CONSTANTS_TYPE } from "../../common/types/index.js";
import TenantRepository from "../../infrastructure/database/repositories/tenant.repository.js";
import { PaginationOptions } from "../../common/utils/pagination.js";

export default class TenantService {
  private static model = Tenant;
  static async updateById(id: string, data: any) {
    if (data.password) data.password = await hashString(data.password);
    await this.model.findByIdAndUpdate(id, data);
  }

  static async listTenant(
    organizationId: ObjectIdQueryTypeCasting,
    query: PaginationOptions & { status: CONSTANTS_TYPE["TENANT_STATUS"] }
  ) {
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
}
