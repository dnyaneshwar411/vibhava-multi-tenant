import MembershipInvoice from "../../infrastructure/database/models/membershipInvoice.model.js";

export default class MembershipInvoiceRepository {
  private static model = MembershipInvoice;

  static async create(payload: any) {
    return await this.model.create(payload);
  }
}