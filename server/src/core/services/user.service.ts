import mongoose, { ObjectIdQueryTypeCasting } from "mongoose";
import { hashString } from "../../common/utils/hash.js";
import User from "../../infrastructure/database/models/user.model.js";
import UserRepository from "../../infrastructure/database/repositories/user.repository.js";
import ScopeService from "./scope.service.js";
import { USER_SCOPES } from "../../config/scopes.js";

export default class UserService {
  private static model = User;

  static async updateById(id: string, data: any) {
    if (data.password) data.password = await hashString(data.password);
    await this.model.findByIdAndUpdate(id, data);
  }

  static buildScopesList() {
    return USER_SCOPES.reduce((acc, curr) => {
      acc[curr] = true;
      return acc;
    }, {} as Record<string, boolean>)
  }

  static async create(organizationId: ObjectIdQueryTypeCasting, payload: any) {
    if (payload.password) payload.password = await hashString(payload.password);
    payload.organization = organizationId
    const data: any = {}

    const session = await mongoose.startSession()
    session.startTransaction();

    try {
      data.user = (await UserRepository.createWithSession(payload, session))[0]
      if (!data.user) throw new Error("Unable to create user.");

      const scopePayload = {
        actor: data.user?._id,
        actorModel: "User",
        organization: data.user?.organization,
        scopeMap: this.buildScopesList()
      }

      data.scope = (await ScopeService.createWithSession(scopePayload, session))[0];
      if(!data.scope) throw new Error("Unable to assunc scopes to user");

      await session.commitTransaction();
    } catch (error) {
      await session.abortTransaction();
      const errorMessage = error instanceof Error ? error.message : "Something went wrong";
      return { success: false, message: errorMessage }
    }

    return { success: true, data }
  }
}
