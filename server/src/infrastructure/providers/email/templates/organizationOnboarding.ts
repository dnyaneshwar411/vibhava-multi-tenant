export const TemplateOrgOnboardingSuccess = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Organization Onboarding Complete</title>
</head>
<body style="margin: 0; padding: 0; background-color: #f4f5f7; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #333333; -webkit-font-smoothing: antialiased;">
  <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: #f4f5f7; padding: 40px 0;">
    <tr>
      <td align="center">
        <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.06);">
          
          <!-- Header -->
          <tr>
            <td style="padding: 40px 40px 20px 40px; text-align: left;">
              {{organizationLogoBlock}}
              <div style="display: inline-block; background-color: #e0e7ff; color: #3730a3; font-size: 12px; font-weight: 700; padding: 4px 10px; border-radius: 9999px; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 12px;">
                Onboarding Complete
              </div>
              <h1 style="margin: 0; font-size: 24px; font-weight: 700; color: #111827; line-height: 1.3;">
                Welcome, {{organizationName}}!
              </h1>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding: 0 40px 30px 40px; font-size: 15px; line-height: 1.6; color: #4b5563;">
              <p style="margin-top: 0;">Hi <strong>{{recipientName}}</strong>,</p>
              
              <p>Congratulations! Your organization account for <strong>{{organizationName}}</strong> has been successfully configured and is ready for use.</p>

              <!-- PDF Attachment Highlight Box -->
              <div style="background-color: #eff6ff; border: 1px solid #bfdbfe; border-radius: 6px; padding: 20px; margin: 24px 0;">
                <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%">
                  <tr>
                    <td style="width: 40px; vertical-align: top;">
                      <div style="background-color: #2563eb; color: #ffffff; border-radius: 6px; width: 32px; height: 32px; display: flex; align-items: center; justify-content: center; font-weight: bold; font-size: 12px; text-align: center; line-height: 32px;">
                        PDF
                      </div>
                    </td>
                    <td style="padding-left: 12px; vertical-align: top;">
                      <p style="margin: 0; font-weight: 600; color: #1e40af; font-size: 15px;">
                        Comprehensive Product Guide Attached
                      </p>
                      <p style="margin: 4px 0 0 0; font-size: 13px; color: #1e3a8a;">
                        We’ve attached <strong>{{guideFileName}}</strong> to this email. It covers full system capabilities, team setup steps, workflows, and best practices.
                      </p>
                    </td>
                  </tr>
                </table>
              </div>

              <p>Here is a quick overview of what you can accomplish in your new portal:</p>

              <!-- Core Capabilities Grid -->
              <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="margin: 20px 0; font-size: 14px; color: #374151;">
                <tr>
                  <td style="padding: 12px; background-color: #f9fafb; border-radius: 6px; margin-bottom: 8px;">
                    <strong style="color: #111827;">🏢 Property & Unit Management</strong><br/>
                    Structure your portfolios, manage leases, track unit statuses, and keep records up to date.
                  </td>
                </tr>
                <tr><td style="height: 8px;"></td></tr>
                <tr>
                  <td style="padding: 12px; background-color: #f9fafb; border-radius: 6px; margin-bottom: 8px;">
                    <strong style="color: #111827;">👥 Tenant & Co-Tenant Directory</strong><br/>
                    Onboard tenants, manage communications, and review active lease profiles effortlessly.
                  </td>
                </tr>
                <tr><td style="height: 8px;"></td></tr>
                <tr>
                  <td style="padding: 12px; background-color: #f9fafb; border-radius: 6px;">
                    <strong style="color: #111827;">💳 Automated Billing & Finances</strong><br/>
                    Track rent collection, manage security deposits, and streamline payment workflows.
                  </td>
                </tr>
              </table>

              <!-- Quick Start Steps -->
              <div style="border-left: 3px solid #2563eb; padding-left: 16px; margin: 28px 0;">
                <p style="margin: 0 0 8px 0; font-weight: 600; color: #111827; font-size: 15px;">
                  3 Steps to get started today:
                </p>
                <ol style="margin: 0; padding-left: 18px; color: #4b5563;">
                  <li style="margin-bottom: 6px;">Download and review the attached PDF guide.</li>
                  <li style="margin-bottom: 6px;">Log in to invite your team members and assign roles.</li>
                  <li>Configure your property listings and billing parameters.</li>
                </ol>
              </div>

              <!-- CTA Button -->
              <table role="presentation" border="0" cellpadding="0" cellspacing="0" style="margin: 28px 0;">
                <tr>
                  <td align="center" style="border-radius: 6px; background-color: #2563eb;">
                    <a href="{{dashboardUrl}}" target="_blank" style="display: inline-block; padding: 12px 28px; font-size: 15px; font-weight: 600; color: #ffffff; text-decoration: none; border-radius: 6px;">
                      Go to Organization Admin Portal
                    </a>
                  </td>
                </tr>
              </table>

              <!-- Account Summary Box -->
              <div style="background-color: #f9fafb; border: 1px solid #e5e7eb; border-radius: 6px; padding: 20px; margin: 24px 0;">
                <p style="margin: 0 0 12px 0; font-weight: 600; color: #111827; font-size: 14px; text-transform: uppercase; letter-spacing: 0.05em;">
                  Organization Details
                </p>
                <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="font-size: 14px; color: #374151;">
                  <tr>
                    <td style="padding: 4px 0; font-weight: 500; width: 160px;">Organization Name:</td>
                    <td style="padding: 4px 0;">{{organizationName}}</td>
                  </tr>
                  <tr>
                    <td style="padding: 4px 0; font-weight: 500;">Admin Account:</td>
                    <td style="padding: 4px 0;">{{recipientName}} ({{email}})</td>
                  </tr>
                  <tr>
                    <td style="padding: 4px 0; font-weight: 500;">Account ID:</td>
                    <td style="padding: 4px 0;">{{organizationId}}</td>
                  </tr>
                </table>
              </div>

              <p style="font-size: 13px; color: #6b7280; margin-bottom: 0;">
                Need help onboarding your team or migrating existing data? Reach out to your dedicated account specialist or contact support at <strong>{{supportEmail}}</strong>.
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding: 24px 40px; background-color: #f9fafb; border-top: 1px solid #f3f4f6; text-align: center; font-size: 12px; color: #9ca3af;">
              <p style="margin: 0;">
                This onboarding confirmation was sent to {{email}}.
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
`;