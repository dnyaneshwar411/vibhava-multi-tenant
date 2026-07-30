import { hashString } from "../../common/utils/hash.js";
import Tenant from "../../infrastructure/database/models/tenant.model.js";

export default class TenantService {
  private static model = Tenant;
  static async updateById(id: string, data: any) {
    if (data.password) data.password = await hashString(data.password);
    await this.model.findByIdAndUpdate(id, data);
  }
}
