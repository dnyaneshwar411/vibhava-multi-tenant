import { ObjectIdQueryTypeCasting, QueryFilter } from "mongoose";
import PaymentGateway from "../models/paymentGateway.model.js";
import Cipher from "../../../core/services/cipher.service.js";
import { CreatePaymentGatewayInput } from "../../../api/schemas/paymentGateway.schema.js";

export default class PaymentGatewayRepository {
  private static model = PaymentGateway;

  private static decipherCredentials(gateway: any) {
    if (gateway.type === "RAZORPAY") {
      return ({
        ...gateway,
        credentials: {
          razorpayKeyId: Cipher.decrypt(gateway.credentials?.razorpayKeyId),
          razorpayKeySecret: Cipher.decrypt(gateway.credentials?.razorpayKeySecret),
          razorpaySignature: Cipher.decrypt(gateway.credentials?.razorpaySignature),
        }
      })
    }
    if (gateway.type === "STRIPE") {
      return ({
        ...gateway,
        credentials: {
          stripeKeyId: Cipher.decrypt(gateway.credentials?.stripeKeyId),
          stripeSignature: Cipher.decrypt(gateway.credentials?.stripeSignature),
        }
      })
    }

    return gateway
  }

  static async findOne(query: QueryFilter<{}>){
    const gateways = await this.model
      .findOne(query)
      .select("-__v -createdAt -updatedAt -organization")
      .lean();

    const decryptedResponGateways = this.decipherCredentials(gateways)

    return decryptedResponGateways;
  }

  static async find(query: QueryFilter<{}>) {
    const gateways = await this.model
      .find(query)
      .select("-__v -createdAt -updatedAt -organization")
      .lean();

    const decryptedResponGateways = gateways.map(this.decipherCredentials)

    return decryptedResponGateways;
  }

  static async create(organizationId: ObjectIdQueryTypeCasting, payload: CreatePaymentGatewayInput["body"]) {
    const gateway = await this.model.create({
      ...payload,
      organization: organizationId
    })
    return gateway
  }

  static async update(query: QueryFilter<{}>, payload: any) {
    return this.model.findOneAndUpdate(query, {
      $set: payload
    })
  }

  static async delete(query: QueryFilter<{}>) {
    return this.model.findOneAndDelete(query)
  }
}