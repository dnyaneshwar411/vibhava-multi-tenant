import { ObjectIdQueryTypeCasting } from "mongoose";
import OrganizationRepository from "../../infrastructure/database/repositories/organization.repository.js";
import Cipher from "./cipher.service.js";
import { env } from "../../config/envVars.js";

export default class ISRService {
  static async processRevalidationWebhook(payload: { organization: ObjectIdQueryTypeCasting }) {
    try {
      const { success, data: organization } = await OrganizationRepository.findById(payload.organization as string)
      if (!success) return

      const cipheredSubdomain = Cipher.encrypt(organization.subdomain, env.ISR_CIPHER_SECRET)

      const response = await fetch(`${env.APPLICATION_CLIENT}/api/revalidate`, {
        method: "POST",
        body: JSON.stringify({
          subdomain: cipheredSubdomain
        })
      })
      const data = await response.json()
      if (data.code !== 200) {
        throw new Error(data.message || "Something went wrong!");
      }
    } catch (error: any) {
      throw new Error(error)
    }
  }
}