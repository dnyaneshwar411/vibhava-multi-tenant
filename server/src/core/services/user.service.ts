import { hashString } from "../../common/utils/hash.js";
import User from "../../infrastructure/database/models/user.model.js";

export default class UserService {
  private static model = User;

  static async updateById(id: string, data: any) {
    if (data.password) data.password = await hashString(data.password);
    await this.model.findByIdAndUpdate(id, data);
  }
}
