import { ObjectIdQueryTypeCasting, QueryFilter } from "mongoose";
import Operator from "../models/operator.model.js";
import Scope from "../models/scopesMap.model.js";

export default class OperatorRepository {
  private static operatorModel = Operator;
  private static scopeModel = Scope;

  static async find(dbQuery: QueryFilter<{}>) {
    return await this.operatorModel
      .find(dbQuery)
      .select("-organization -updatedAt -__v")
      .lean();
  }

  static async countDocuments(dbQuery: QueryFilter<{}>){
    return await this.operatorModel
      .countDocuments(dbQuery);
  }

  static async findById(operatorId: ObjectIdQueryTypeCasting) {
    return await this.operatorModel.findById(operatorId).lean();
  }
  static async getOperatorFilter(filter: QueryFilter<{}>) {
    return await this.operatorModel
      .findOne(filter)
      .select("+password")
      // .select("-updatedAt -__v")
      .lean();
  }

  static async create(payload: any) {
    const operator = await this.operatorModel.create(payload);
    return operator.toObject();
  }

  static async update(operatorId: ObjectIdQueryTypeCasting, payload: any) {
    return await this.operatorModel.findByIdAndUpdate(
      operatorId,
      { $set: payload },
      { returnDocument: "after" }
    );
  }

  static async delete(operatorId: ObjectIdQueryTypeCasting) {
    return await this.operatorModel.findByIdAndDelete(operatorId);
  }

  static async assignScopes(
    organizationId: ObjectIdQueryTypeCasting,
    operatorId: ObjectIdQueryTypeCasting,
    scopes: string[]
  ) {
    const updateObj: Record<string, boolean> = {};
    scopes.forEach((scope) => {
      updateObj[`scopeMap.${scope}`] = true;
    });

    return await this.scopeModel.findOneAndUpdate(
      { organization: organizationId, operator: operatorId },
      { $set: updateObj },
      { upsert: true, returnDocument: "after" }
    );
  }

  static async unassignScopes(
    organizationId: ObjectIdQueryTypeCasting,
    operatorId: ObjectIdQueryTypeCasting,
    scopes: string[]
  ) {
    const unsetObj: Record<string, string> = {};
    scopes.forEach((scope) => {
      unsetObj[`scopeMap.${scope}`] = "";
    });

    return await this.scopeModel.findOneAndUpdate(
      { organization: organizationId, operator: operatorId },
      { $unset: unsetObj },
      { returnDocument: "after" }
    );
  }
}
