import { hashString } from "../../common/utils/hash.js";
import Vendor from "../../infrastructure/database/models/vendor.model.js";

export default class VendorService {
  private static model = Vendor;

  static async updateById(id: string, data: any) {
    if (data.password) data.password = await hashString(data.password);
    await this.model.findByIdAndUpdate(id, data);
  }
}
