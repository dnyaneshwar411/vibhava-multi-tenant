import { CONSTANTS_TYPE } from "../../../common/types/index.js";
import { EventEmailType } from "../../../core/events/types.js";
import { TemplateLeaseCreated } from "./templates/leaseCreated.js";
import { format, parseISO, isValid } from "date-fns";
import { sendMail } from "./mailer.js";
import { env } from "../../../config/envVars.js";
import { TemplatePasswordReset } from "./templates/passwordReset.js";
import { EventOrchestrator } from "../../../core/events/eventBus.js";

export default class EmailService {
  private static injectConditional(template: string, key: string, value: string | null) {
    const startTag = `{{#if ${key}}}`;
    const endTag = `{{/if}}`;
    if (value) {
      return template.replace(startTag, "").replace(endTag, "").replace(`{{${key}}}`, value);
    } else {
      const regex = new RegExp(`${startTag}[\\s\\S]*?${endTag}`, "g");
      return template.replace(regex, "");
    }
  }


  private static formatDate = function (dateStr?: string) {

    return (isValid(dateStr) && dateStr) ? format(dateStr, "MMM dd, yyyy") : null;
  };

  private static buildLeaseCreatedTemplate(payload?: any) {
    try {
      if (!payload) return TemplateLeaseCreated;

      const addr = payload.property?.address;
      const formattedAddress = addr
        ? [addr.street1, addr.street2, addr.city, addr.state, addr.zipCode, addr.country].filter(Boolean).join(", ")
        : "";

      const formattedStart = this.formatDate(payload.startDate);
      const formattedEnd = this.formatDate(payload.endDate);
      let termDuration = "";
      if (formattedStart && formattedEnd) {
        termDuration = `${formattedStart} to ${formattedEnd}`;
      } else if (formattedStart) {
        termDuration = `From ${formattedStart}`;
      } else if (formattedEnd) {
        termDuration = `Until ${formattedEnd}`;
      }

      const unitDetails = [payload.unit?.unitNumber, payload.unit?.unitType].filter(Boolean).join(" - ") || "N/A";

      const rentAmount = payload.finance?.rentAmount !== undefined
        ? `₹${payload.finance.rentAmount.toLocaleString("en-IN")} / ${payload.finance.billingCycle || "Monthly"}`
        : null;

      const paymentDueDay = payload.finance?.paymentDueDay
        ? `Day ${payload.finance.paymentDueDay} of every month`
        : null;

      const securityDeposit = payload.security?.amountRequired !== undefined
        ? `₹${payload.security.amountRequired.toLocaleString("en-IN")} (${payload.security.status || "N/A"})`
        : null;

      let template = TemplateLeaseCreated;


      template = template
        .replace("{{primaryTenantName}}", payload.primaryTenant?.name || "Tenant")
        .replace("{{propertyName}}", payload.property?.name || "N/A")
        .replace("{{unitDetails}}", unitDetails);

      template = this.injectConditional(template, "propertyAddress", formattedAddress);
      template = this.injectConditional(template, "leaseType", payload.leaseType || null);
      template = this.injectConditional(template, "status", payload.status || null);
      template = this.injectConditional(template, "termDuration", termDuration || null);
      template = this.injectConditional(template, "moveInDate", this.formatDate(payload.moveInDate));
      template = this.injectConditional(template, "rentAmount", rentAmount);
      template = this.injectConditional(template, "paymentDueDay", paymentDueDay);
      template = this.injectConditional(template, "securityDeposit", securityDeposit);

      return template;
    } catch (error) { }
  }

  private static buildPasswordResetTemplate(payload: any): string {
    if (!payload) return TemplatePasswordReset;
    const mobileNumber = payload.mobileNumber
      ? `${payload.countryCode ? `+${payload.countryCode} ` : ""}${payload.mobileNumber}`
      : null;
    let template = TemplatePasswordReset
      .replace(/{{userName}}/g, payload.name || "User")
      .replace("{{otp}}", String(payload.otp || "------"));
    template = this.injectConditional(template, "mobileNumber", mobileNumber);
    return template;
  }

  private static buildEmailHTML(type: CONSTANTS_TYPE["EMAIL_ENTITIES"], payload?: any) {
    switch (type) {
      case "LEASE_CREATED": {
        return this.buildLeaseCreatedTemplate(payload)
      }
      case "PASSWORD_RESET":
        return this.buildPasswordResetTemplate(payload)
      default:
        return "";
    }
  }

  private static resolveFrom(from?: string) {
    return `${from || env.EMAIL_USER || env.EMAIL_FROM}`
  }

  static async process(payload: EventEmailType) {
    const html = this.buildEmailHTML(payload.entity, payload.payload)
    await sendMail({
      from: this.resolveFrom(payload.payload.from as string),
      to: payload.payload.to,
      cc: payload.payload.cc,
      subject: payload.payload.subject,
      html
    })
  }
}