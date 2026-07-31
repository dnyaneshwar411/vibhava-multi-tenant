import { ClientSession, ObjectIdQueryTypeCasting, Query } from "mongoose";
import User, { IUser } from "../models/user.model.js";
import Scope from "../models/scopesMap.model.js";
import { PaginationOptions } from "../../../common/utils/pagination.js";
import { QueryFilter } from "mongoose";

export default class UserRepository {
  private static userModel = User;
  private static scopeModel = Scope;

  static async paginate(organizationId: ObjectIdQueryTypeCasting, filters: PaginationOptions) {
    const dbQuery: QueryFilter<{}> = { organization: organizationId }
    if (filters.query) {
      dbQuery.$or = [
        { name: { $regex: filters.query, $options: "i" } },
        { email: { $regex: filters.query, $options: "i" } }
      ]
    }

    // tbd map the avatar of each of the user
    const [users, total] = await Promise.all([
      this.userModel
        .find(dbQuery)
        .select("-organization -updatedAt -__v")
        .lean(),
      this.userModel
        .countDocuments(dbQuery)
    ])

    return { users, total }
  }

  static async findById(
    organizationId: ObjectIdQueryTypeCasting,
    userId: ObjectIdQueryTypeCasting,
  ) {
    return await this.userModel
      .findOne({ organization: organizationId, _id: userId })
      .lean();
  }

  static async getUserFilter(filter: QueryFilter<{}>) {
    return await this.userModel
      .findOne(filter)
      .populate("organization", "owner subdomain")
      .select("+password")
      // .select("-updatedAt -__v")
      .lean();
  }

  static async createWithSession(payload: any, session: ClientSession) {
    const user = await this.userModel.create([payload], { session })
    return user
  }

  static async update(
    organizationId: ObjectIdQueryTypeCasting,
    userId: ObjectIdQueryTypeCasting,
    payload: any,
  ) {
    return await this.userModel.findOneAndUpdate(
      { organization: organizationId, _id: userId },
      { $set: payload },
      { returnDocument: "after" },
    );
  }

  static async delete(
    organizationId: ObjectIdQueryTypeCasting,
    userId: ObjectIdQueryTypeCasting,
  ) {
    return await this.userModel.findOneAndDelete({
      organization: organizationId,
      _id: userId,
    });
  }

  static async assignScopes(
    organizationId: ObjectIdQueryTypeCasting,
    userId: ObjectIdQueryTypeCasting,
    scopes: string[],
    organizationOwner: ObjectIdQueryTypeCasting,
    user: IUser
  ) {
    if (String(organizationOwner) === String(userId)) return {
      success: false,
      message: "Cannot assign roles to organization owner!"
    }

    if (String(userId) === String(user._id)) return {
      success: false,
      message: "Roles cannot be assigned to self"
    };

    const updateObj: Record<string, boolean> = {};
    scopes.forEach((scope) => {
      updateObj[`scopeMap.${scope}`] = true;
    });

    const updates = await this.scopeModel.findOneAndUpdate(
      { organization: organizationId, actor: userId },
      { $set: updateObj },
      { upsert: true, returnDocument: "after" },
    );

    return {
      success: true,
      updates
    }
  }

  static async unassignScopes(
    organizationId: ObjectIdQueryTypeCasting,
    userId: ObjectIdQueryTypeCasting,
    scopes: string[],
    organizationOwner: ObjectIdQueryTypeCasting,
    user: IUser
  ) {
    if (String(organizationOwner) === String(userId)) return {
      success: false,
      message: "Cannot assign roles to organization owner!"
    }

    if (String(userId) === String(user._id)) return {
      success: false,
      message: "Roles cannot be assigned to self"
    };

    const unsetObj: Record<string, string> = {};
    scopes.forEach((scope) => {
      unsetObj[`scopeMap.${scope}`] = "";
    });

    const updates = await this.scopeModel.findOneAndUpdate(
      { organization: organizationId, actor: userId },
      { $unset: unsetObj },
      { returnDocument: "after" },
    );

    return {
      success: true,
      updates
    }
  }
}
