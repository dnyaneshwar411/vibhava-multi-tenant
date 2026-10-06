import { CONSTANTS_TYPE } from "../../../common/types/index.js";
import { EventEmailType } from "../../../core/events/types.js";
import { TemplateLeaseCreated, TemplateLeaseExpiration } from "./templates/leaseCreated.js";
import { format, isValid } from "date-fns";
import { sendMail } from "./mailer.js";
import { env } from "../../../config/envVars.js";
import { TemplatePasswordReset } from "./templates/passwordReset.js";
import {
  TemplateOperatorOnboarding, TemplateTenantOnboarding,
  TemplateUserOnboarding, TemplateVendorOnboarding
} from "./templates/actorOnboarding.js";
import { TemplatePaymentDueTomorrow, TemplateRentPaymentOverdue, TemplateRentPaymentSuccess } from "./templates/rentPaymentSuccess.js";
import { TemplateOrgMembershipExpiration, TemplateOrgOnboardingSuccess } from "./templates/organizationOnboarding.js";
import { TemplateMembershipOverdue, TemplateMembershipRenewalReminder } from "./templates/membershipReminder.js";
import { TemplateLedgerEntryCreated } from "./templates/ledger.js";

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

  private static buildUserOnboardingTemplate(payload: any): string {
    if (!payload) return TemplateUserOnboarding;

    const orgName = payload.organizationName || "Our Platform";

    const logoBlock = payload.organizationLogo
      ? `<img src="${payload.organizationLogo}" alt="${orgName} Logo" style="max-height: 48px; width: auto; margin-bottom: 24px;" />`
      : "";

    const formattedMobile = payload.mobileNumber
      ? `${payload.countryCode ? `+${payload.countryCode} ` : ""}${payload.mobileNumber}`
      : "N/A";

    return TemplateUserOnboarding
      .replace(/{{organizationName}}/g, orgName)
      .replace("{{organizationLogoBlock}}", logoBlock)
      .replace(/{{recipientName}}/g, payload.recipientName || "User")
      .replace("{{email}}", payload.to || "N/A")
      .replace("{{mobileNumber}}", formattedMobile)
      .replace("{{loginUrl}}", payload.loginUrl || "#");
  }

  private static buildVendorOnboardingTemplate(payload: any): string {
    if (!payload) return TemplateVendorOnboarding;

    const orgName = payload.organizationName || "Our Platform";

    const logoBlock = payload.organizationLogo
      ? `<img src="${payload.organizationLogo}" alt="${orgName} Logo" style="max-height: 48px; width: auto; margin-bottom: 24px;" />`
      : "";

    const formattedMobile = payload.mobileNumber
      ? `${payload.countryCode ? `+${payload.countryCode} ` : ""}${payload.mobileNumber}`
      : "N/A";

    return TemplateVendorOnboarding
      .replace(/{{organizationName}}/g, orgName)
      .replace("{{organizationLogoBlock}}", logoBlock)
      .replace(/{{recipientName}}/g, payload.recipientName || "Vendor")
      .replace("{{email}}", payload.to || "N/A")
      .replace("{{mobileNumber}}", formattedMobile)
      .replace("{{loginUrl}}", payload.loginUrl || "#");
  }

  private static buildOperatorOnboardingTemplate(payload: any): string {
    if (!payload) return TemplateOperatorOnboarding;

    const orgName = payload.organizationName || "Vibhava";

    const logoBlock = payload.organizationLogo
      ? `<img src="${payload.organizationLogo}" alt="${orgName} Logo" style="max-height: 48px; width: auto; margin-bottom: 24px;" />`
      : "";

    const formattedMobile = payload.mobileNumber
      ? `${payload.countryCode ? `+${payload.countryCode} ` : ""}${payload.mobileNumber}`
      : "N/A";

    return TemplateOperatorOnboarding
      .replace(/{{organizationName}}/g, orgName)
      .replace("{{organizationLogoBlock}}", logoBlock)
      .replace(/{{recipientName}}/g, payload.recipientName || "Operator")
      .replace("{{email}}", payload.to || "N/A")
      .replace("{{mobileNumber}}", formattedMobile)
      .replace("{{loginUrl}}", payload.loginUrl || "#");
  }

  private static buildTenantOnboardingTemplate(payload: any): string {
    if (!payload) return TemplateTenantOnboarding;

    const orgName = payload.organizationName || "Our Platform";

    const logoBlock = payload.organizationLogo
      ? `<img src="${payload.organizationLogo}" alt="${orgName} Logo" style="max-height: 48px; width: auto; margin-bottom: 24px;" />`
      : "";

    const formattedMobile = payload.mobileNumber
      ? `${payload.countryCode ? `+${payload.countryCode} ` : ""}${payload.mobileNumber}`
      : "N/A";

    return TemplateTenantOnboarding
      .replace(/{{organizationName}}/g, orgName)
      .replace("{{organizationLogoBlock}}", logoBlock)
      .replace(/{{recipientName}}/g, payload.recipientName || "Tenant")
      .replace("{{email}}", payload.to || "N/A")
      .replace("{{mobileNumber}}", formattedMobile)
      .replace("{{loginUrl}}", payload.loginUrl || "#");
  }

  private static buildRentPaymentSuccessTemplate(payload: any): string {
    if (!payload) return TemplateRentPaymentSuccess;

    const orgName = payload.organizationName || payload.property?.name || "Our Platform";

    const logoBlock = payload.organizationLogo
      ? `<img src="${payload.organizationLogo}" alt="${orgName} Logo" style="max-height: 48px; width: auto; margin-bottom: 24px;" />`
      : "";

    const addr = payload.property?.address;
    const formattedAddress = addr
      ? `${addr.street1}${addr.street2 ? `, ${addr.street2}` : ""}, ${addr.city}, ${addr.state} ${addr.zipCode}, ${addr.country}`
      : "N/A";

    const startDate = payload.startDate ? new Date(payload.startDate).toLocaleDateString("en-US", { year: 'numeric', month: 'short', day: 'numeric' }) : "N/A";
    const endDate = payload.endDate ? new Date(payload.endDate).toLocaleDateString("en-US", { year: 'numeric', month: 'short', day: 'numeric' }) : "N/A";

    const rentFormatted = payload.finance?.rentAmount
      ? `₹${payload.finance.rentAmount.toLocaleString("en-IN")}`
      : "N/A";

    const pt = payload.primaryTenant;
    const primaryTenantInfo = pt
      ? `${pt.name} (${pt.email || "No email"}${pt.mobileNumber ? `, +${pt.countryCode || 91} ${pt.mobileNumber}` : ""})`
      : "N/A";

    let coTenantsBlock = "";
    if (Array.isArray(payload.coTenants) && payload.coTenants.length > 0) {
      const coTenantList = payload.coTenants
        .map((ct: any) => `${ct.name} (${ct.email}${ct.mobileNumber ? `, +${ct.countryCode || 1} ${ct.mobileNumber}` : ""})`)
        .join("<br/>");

      coTenantsBlock = `
      <tr>
        <td style="padding: 4px 0; font-weight: 500; vertical-align: top;">Co-Tenant(s):</td>
        <td style="padding: 4px 0;">${coTenantList}</td>
      </tr>
    `;
    }

    return TemplateRentPaymentSuccess
      .replace(/{{organizationName}}/g, orgName)
      .replace("{{organizationLogoBlock}}", logoBlock)
      .replace("{{recipientName}}", payload.recipientName || pt?.name || "Valued Tenant")
      .replace(/{{propertyName}}/g, payload.property?.name || "N/A")
      .replace(/{{unitNumber}}/g, payload.unit?.unitNumber || "N/A")
      .replace("{{unitType}}", payload.unit?.unitType || "Standard")
      .replace("{{propertyAddress}}", formattedAddress)
      .replace("{{rentAmount}}", rentFormatted)
      .replace("{{billingCycle}}", payload.finance?.billingCycle || "Monthly")
      .replace("{{paymentDueDay}}", payload.finance?.paymentDueDay || 1)
      .replace("{{leaseType}}", payload.leaseType || "N/A")
      .replace("{{leasePeriod}}", `${startDate} to ${endDate}`)
      .replace("{{primaryTenantInfo}}", primaryTenantInfo)
      .replace("{{coTenantsBlock}}", coTenantsBlock);
  }

  private static resolveActorOnboardingHTML(payload: any) {
    switch (payload.actor) {
      case "User":
        return this.buildUserOnboardingTemplate(payload);
      case "Vendor":
        return this.buildVendorOnboardingTemplate(payload);
      case "Operator":
        return this.buildOperatorOnboardingTemplate(payload);
    }
    return this.buildTenantOnboardingTemplate(payload);
  }

  private static buildOrgOnboardingSuccessTemplate(payload: any): string {
    if (!payload) return TemplateOrgOnboardingSuccess;

    const orgName = payload.organizationName || payload.name || "Your Organization";

    const logoBlock = payload.organizationLogo
      ? `<img src="${payload.organizationLogo}" alt="${orgName} Logo" style="max-height: 48px; width: auto; margin-bottom: 24px;" />`
      : "";

    const guideFileName = payload.guideFileName || "Organization_Onboarding_Guide.pdf";
    const dashboardUrl = payload.dashboardUrl || "https://admin.yourplatform.com";
    const supportEmail = payload.supportEmail || "contact@vibhava.xyz";

    return TemplateOrgOnboardingSuccess
      .replace(/{{organizationName}}/g, orgName)
      .replace("{{organizationLogoBlock}}", logoBlock)
      .replace("{{recipientName}}", payload.recipientName || payload.createdBy?.name || "Admin")
      .replace(/{{email}}/g, payload.email || payload.createdBy?.email || "N/A")
      .replace("{{guideFileName}}", guideFileName)
      .replace("{{dashboardUrl}}", dashboardUrl)
      .replace("{{organizationId}}", payload._id || payload.organizationId || "N/A")
      .replace("{{supportEmail}}", supportEmail);
  }

  private static buildMembershipRenewalTemplate(payload: any): string {
    if (!payload) return TemplateMembershipRenewalReminder;

    const orgName = payload.organizationName || "Our Platform";

    const logoBlock = payload.organizationLogo
      ? `<img src="${payload.organizationLogo}" alt="${orgName} Logo" style="max-height: 48px; width: auto; margin-bottom: 24px;" />`
      : "";

      const dueDateFormatted = payload.dueDate
      ? new Date(payload.dueDate).toLocaleDateString("en-US", { year: 'numeric', month: 'short', day: 'numeric' })
      : "N/A";

    return TemplateMembershipRenewalReminder
      .replace(/{{organizationName}}/g, orgName)
      .replace("{{organizationLogoBlock}}", logoBlock)
      .replace("{{memberName}}", payload.memberName || payload.user?.name || "Valued Member")
      .replace("{{tierName}}", payload.tierName || payload.tier || "Standard")
      .replace("{{pricing}}", payload.pricing || "N/A")
      .replace("{{duration}}", payload.duration || "Annual")
      .replace("{{dueDate}}", dueDateFormatted)
      .replace("{{renewalUrl}}", payload.renewalUrl || "https://yourplatform.com/account/billing")
      .replace("{{supportEmail}}", payload.supportEmail || "contact@vibhava.xyz");
  }

  private static buildMembershipOverdueTemplate(payload: any): string {
    if (!payload) return TemplateMembershipOverdue;

    const orgName = payload.organizationName || "Our Platform";

    const logoBlock = payload.organizationLogo
      ? `<img src="${payload.organizationLogo}" alt="${orgName} Logo" style="max-height: 48px; width: auto; margin-bottom: 24px;" />`
      : "";

    const dueDateFormatted = payload.dueDate
      ? new Date(payload.dueDate).toLocaleDateString("en-US", { year: 'numeric', month: 'short', day: 'numeric' })
      : "N/A";

    return TemplateMembershipOverdue
      .replace(/{{organizationName}}/g, orgName)
      .replace("{{organizationLogoBlock}}", logoBlock)
      .replace("{{memberName}}", payload.memberName || payload.user?.name || "Valued Member")
      .replace(/{{tierName}}/g, payload.tierName || payload.tier || "Standard")
      .replace("{{pricing}}", payload.pricing || "N/A")
      .replace("{{duration}}", payload.duration || "Annual")
      .replace(/{{dueDate}}/g, dueDateFormatted)
      .replace("{{renewalUrl}}", payload.renewalUrl || "https://yourplatform.com/account/billing")
      .replace("{{supportEmail}}", payload.supportEmail || "contact@vibhava.xyz");
  }

  private static buildLeaseExpirationTemplate(payload: any): string {
    if (!payload) return TemplateLeaseExpiration;

    const orgName = payload.organizationName || payload.property?.name || "Our Platform";

    const logoBlock = payload.organizationLogo
      ? `<img src="${payload.organizationLogo}" alt="${orgName} Logo" style="max-height: 48px; width: auto; margin-bottom: 24px;" />`
      : "";

    const startDate = payload.startDate
      ? new Date(payload.startDate).toLocaleDateString("en-US", { year: 'numeric', month: 'short', day: 'numeric' })
      : "N/A";

    const endDate = payload.endDate
      ? new Date(payload.endDate).toLocaleDateString("en-US", { year: 'numeric', month: 'short', day: 'numeric' })
      : "N/A";

    const pt = payload.primaryTenant;
    const primaryTenantInfo = pt
      ? `${pt.name} (${pt.email || "No email"}${pt.mobileNumber ? `, +${pt.countryCode || 91} ${pt.mobileNumber}` : ""})`
      : "N/A";

    let coTenantsBlock = "";
    if (Array.isArray(payload.coTenants) && payload.coTenants.length > 0) {
      const coTenantList = payload.coTenants
        .map((ct: any) => `${ct.name} (${ct.email}${ct.mobileNumber ? `, +${ct.countryCode || 1} ${ct.mobileNumber}` : ""})`)
        .join("<br/>");

      coTenantsBlock = `
      <tr>
        <td style="padding: 4px 0; font-weight: 500; vertical-align: top;">Co-Tenant(s):</td>
        <td style="padding: 4px 0;">${coTenantList}</td>
      </tr>
    `;
    }

    return TemplateLeaseExpiration
      .replace(/{{organizationName}}/g, orgName)
      .replace("{{organizationLogoBlock}}", logoBlock)
      .replace("{{recipientName}}", payload.recipientName || pt?.name || "Valued Tenant")
      .replace(/{{propertyName}}/g, payload.property?.name || "N/A")
      .replace(/{{unitNumber}}/g, payload.unit?.unitNumber || "N/A")
      .replace("{{leaseType}}", payload.leaseType || "N/A")
      .replace("{{startDate}}", startDate)
      .replace(/{{endDate}}/g, endDate)
      .replace("{{primaryTenantInfo}}", primaryTenantInfo)
      .replace("{{coTenantsBlock}}", coTenantsBlock)
      .replace("{{portalUrl}}", payload.portalUrl || payload.loginUrl || "#");
  }

  private static buildOrgMembershipExpirationTemplate(payload: any): string {
    if (!payload) return TemplateOrgMembershipExpiration;

    const orgName = payload.organization?.name || "Your Organization";

    const logoBlock = payload.organizationLogo
      ? `<img src="${payload.organizationLogo}" alt="${orgName} Logo" style="max-height: 48px; width: auto; margin-bottom: 24px;" />`
      : "";

    const periodStart = payload.currentPeriodStart
      ? new Date(payload.currentPeriodStart).toLocaleDateString("en-US", { year: 'numeric', month: 'short', day: 'numeric' })
      : "N/A";

    const periodEnd = payload.currentPeriodEnd
      ? new Date(payload.currentPeriodEnd).toLocaleDateString("en-US", { year: 'numeric', month: 'short', day: 'numeric' })
      : "N/A";

    const billingUrl = payload.billingUrl || (payload.organization?.subdomain
      ? `https://${payload.organization.subdomain}.yourplatform.com/admin/billing`
      : "https://yourplatform.com/admin/billing");

    return TemplateOrgMembershipExpiration
      .replace(/{{organizationName}}/g, orgName)
      .replace("{{organizationLogoBlock}}", logoBlock)
      .replace("{{recipientName}}", payload.recipientName || payload.organization?.owner?.email || "Organization Admin")
      .replace("{{tier}}", payload.tier || "Standard")
      .replace("{{currentPeriodStart}}", periodStart)
      .replace(/{{currentPeriodEnd}}/g, periodEnd)
      .replace("{{billingUrl}}", billingUrl)
      .replace("{{supportEmail}}", payload.supportEmail || "contact@vibhava.xyz");
  }

  private static buildPaymentDueTomorrowTemplate(payload: any): string {
    if (!payload) return TemplatePaymentDueTomorrow;

    const orgName = payload.organizationName || payload.property?.name || "Our Platform";

    const logoBlock = payload.organizationLogo
      ? `<img src="${payload.organizationLogo}" alt="${orgName} Logo" style="max-height: 48px; width: auto; margin-bottom: 24px;" />`
      : "";

    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const dueDateFormatted = payload.dueDate
      ? new Date(payload.dueDate).toLocaleDateString("en-US", { year: 'numeric', month: 'short', day: 'numeric' })
      : tomorrow.toLocaleDateString("en-US", { year: 'numeric', month: 'short', day: 'numeric' });

      const pt = payload.primaryTenant;
    const primaryTenantInfo = typeof pt === 'object' && pt !== null
      ? `${pt.name || "N/A"} (${pt.email || "No email"}${pt.mobileNumber ? `, +${pt.countryCode || 91} ${pt.mobileNumber}` : ""})`
      : (payload.primaryTenantName || "N/A");

    let coTenantsBlock = "";
    if (Array.isArray(payload.coTenants) && payload.coTenants.length > 0 && typeof payload.coTenants[0] === 'object') {
      const coTenantList = payload.coTenants
        .map((ct: any) => `${ct.name || "N/A"} (${ct.email || "No email"})`)
        .join("<br/>");

      coTenantsBlock = `
      <tr>
        <td style="padding: 4px 0; font-weight: 500; vertical-align: top;">Co-Tenant(s):</td>
        <td style="padding: 4px 0;">${coTenantList}</td>
      </tr>
    `;
    }

    return TemplatePaymentDueTomorrow
      .replace(/{{organizationName}}/g, orgName)
      .replace("{{organizationLogoBlock}}", logoBlock)
      .replace("{{recipientName}}", payload.recipientName || pt?.name || "Valued Tenant")
      .replace(/{{propertyName}}/g, payload.property?.name || payload.propertyName || "N/A")
      .replace(/{{unitNumber}}/g, payload.unit?.unitNumber || payload.unitNumber || "N/A")
      .replace("{{leaseType}}", payload.leaseType || "N/A")
      .replace("{{billingCycle}}", payload.finance?.billingCycle || payload.billingCycle || "Monthly")
      .replace(/{{dueDate}}/g, dueDateFormatted)
      .replace("{{primaryTenantInfo}}", primaryTenantInfo)
      .replace("{{coTenantsBlock}}", coTenantsBlock)
      .replace("{{portalUrl}}", payload.portalUrl || payload.loginUrl || "https://yourplatform.com/portal/payments")
      .replace("{{supportEmail}}", payload.supportEmail || "contact@vibhava.xyz");
  }

  private static buildRentPaymentOverdueTemplate(payload: any): string {
    if (!payload) return TemplateRentPaymentOverdue;

    const orgName = payload.organizationName || payload.property?.name || "Our Platform";

    const logoBlock = payload.organizationLogo
      ? `<img src="${payload.organizationLogo}" alt="${orgName} Logo" style="max-height: 48px; width: auto; margin-bottom: 24px;" />`
      : "";

    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const dueDateFormatted = payload.dueDate
      ? new Date(payload.dueDate).toLocaleDateString("en-US", { year: 'numeric', month: 'short', day: 'numeric' })
      : yesterday.toLocaleDateString("en-US", { year: 'numeric', month: 'short', day: 'numeric' });

    const pt = payload.primaryTenant || payload.tenant;
    const primaryTenantInfo = typeof pt === 'object' && pt !== null
      ? `${pt.name || "N/A"} (${pt.email || "No email"}${pt.mobileNumber ? `, +${pt.countryCode || 91} ${pt.mobileNumber}` : ""})`
      : (payload.primaryTenantName || "N/A");

    let coTenantsBlock = "";
    if (Array.isArray(payload.coTenants) && payload.coTenants.length > 0 && typeof payload.coTenants[0] === 'object') {
      const coTenantList = payload.coTenants
        .map((ct: any) => `${ct.name || "N/A"} (${ct.email || "No email"})`)
        .join("<br/>");

      coTenantsBlock = `
      <tr>
        <td style="padding: 4px 0; font-weight: 500; vertical-align: top;">Co-Tenant(s):</td>
        <td style="padding: 4px 0;">${coTenantList}</td>
      </tr>
    `;
    }

    return TemplateRentPaymentOverdue
      .replace(/{{organizationName}}/g, orgName)
      .replace("{{organizationLogoBlock}}", logoBlock)
      .replace("{{recipientName}}", payload.recipientName || pt?.name || "Valued Tenant")
      .replace(/{{propertyName}}/g, payload.property?.name || payload.propertyName || "N/A")
      .replace(/{{unitNumber}}/g, payload.unit?.unitNumber || payload.unitNumber || "N/A")
      .replace("{{leaseType}}", payload.leaseType || "N/A")
      .replace(/{{dueDate}}/g, dueDateFormatted)
      .replace("{{primaryTenantInfo}}", primaryTenantInfo)
      .replace("{{coTenantsBlock}}", coTenantsBlock)
      .replace("{{portalUrl}}", payload.portalUrl || payload.loginUrl || "https://yourplatform.com/portal/payments")
      .replace("{{supportEmail}}", payload.supportEmail || "contact@vibhava.xyz");
  }

  private static buildLedgerEntryCreatedTemplate(payload: any): string {
    if (!payload) return TemplateLedgerEntryCreated;

    const orgName = payload.organization?.name || payload.organizationName || "Our Platform";

    const logoBlock = payload.organizationLogo
      ? `<img src="${payload.organizationLogo}" alt="${orgName} Logo" style="max-height: 48px; width: auto; margin-bottom: 24px;" />`
      : "";

    const currency = payload.finance?.currency || "INR";
    const totalAmount = typeof payload.finance?.totalAmount === 'number'
      ? payload.finance.totalAmount.toFixed(2)
      : "0.00";

    let periodBlock = "";
    if (payload.period?.startDate || payload.period?.endDate) {
      const start = payload.period.startDate
        ? new Date(payload.period.startDate).toLocaleDateString("en-US", { year: 'numeric', month: 'short', day: 'numeric' })
        : "";
      const end = payload.period.endDate
        ? new Date(payload.period.endDate).toLocaleDateString("en-US", { year: 'numeric', month: 'short', day: 'numeric' })
        : "";

      periodBlock = `
      <tr>
        <td style="padding: 4px 0; font-weight: 500;">Billing Period:</td>
        <td style="padding: 4px 0;">${start} ${end ? `to ${end}` : ""}</td>
      </tr>
    `;
    }

    const memoBlock = payload.memo
      ? `<tr>
        <td style="padding: 4px 0; font-weight: 500;">Memo / Note:</td>
        <td style="padding: 4px 0; font-style: italic;">${payload.memo}</td>
       </tr>`
      : "";

    let transactionLinesRows = "";
    if (Array.isArray(payload.lines) && payload.lines.length > 0) {
      transactionLinesRows = payload.lines
        .map(
          (line: any) => `
        <tr style="border-bottom: 1px solid #f3f4f6;">
          <td style="padding: 8px 0; font-weight: 500;">${line.accountName || line.accountId}</td>
          <td style="padding: 8px 0; font-size: 12px; font-weight: 600; color: ${line.type === 'DEBIT' ? '#dc2626' : '#059669'};">${line.type}</td>
          <td style="padding: 8px 0; text-align: right; font-weight: 600;">${currency} ${(line.amount || 0).toFixed(2)}</td>
        </tr>
      `
        )
        .join("");
    } else {
      transactionLinesRows = `
      <tr>
        <td colspan="3" style="padding: 8px 0; text-align: center; color: #9ca3af;">No line item details available.</td>
      </tr>
    `;
    }

    return TemplateLedgerEntryCreated
      .replace(/{{organizationName}}/g, orgName)
      .replace("{{organizationLogoBlock}}", logoBlock)
      .replace("{{recipientName}}", payload.recipientName || payload.tenant?.name || payload.primaryTenant?.name || "Valued Tenant")
      .replace(/{{propertyName}}/g, payload.property?.name || payload.propertyName || "N/A")
      .replace(/{{unitNumber}}/g, payload.unit?.unitNumber || payload.unitNumber || "N/A")
      .replace("{{entryType}}", payload.entryType || "N/A")
      .replace("{{status}}", payload.status || "Posted")
      .replace("{{currency}}", currency)
      .replace("{{totalAmount}}", totalAmount)
      .replace("{{periodBlock}}", periodBlock)
      .replace("{{memoBlock}}", memoBlock)
      .replace("{{transactionLinesRows}}", transactionLinesRows)
      .replace("{{portalUrl}}", payload.portalUrl || payload.loginUrl || "https://yourplatform.com/portal/ledger")
      .replace("{{supportEmail}}", payload.supportEmail || "contact@vibhava.xyz");
  }

  private static buildEmailHTML(type: CONSTANTS_TYPE["EMAIL_ENTITIES"], payload?: any) {
    switch (type) {
      case "LEASE_CREATED": 
        return this.buildLeaseCreatedTemplate(payload)
      case "PASSWORD_RESET":
        return this.buildPasswordResetTemplate(payload)
      case "ACTOR_ONBOARDING":
        return this.resolveActorOnboardingHTML(payload)
      case "RENT_PAYMENT_SUCCESS":
        return this.buildRentPaymentSuccessTemplate(payload)
      case "ORGANIZATION_ONBOARDING":
        return this.buildOrgOnboardingSuccessTemplate(payload)
      case "MEMBERSHIP_RENEWAL_REMINDER":
        return this.buildMembershipRenewalTemplate(payload)
      case "MEMBERSHIP_OVERDUE":
        return this.buildMembershipOverdueTemplate(payload)
      case "LEASE_EXPIRATION":
        return this.buildLeaseExpirationTemplate(payload)
      case "ORGANIZATION_MEMBERSHIP_EXPIRATION":
        return this.buildOrgMembershipExpirationTemplate(payload);
      case "RENT_PAYMENT_DUE":
        return this.buildPaymentDueTomorrowTemplate(payload);
      case "RENT_PAYMENT_OVERDUE":
        return this.buildRentPaymentOverdueTemplate(payload);
      case "LEDGER_CREATED":
        return this.buildLedgerEntryCreatedTemplate(payload);
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