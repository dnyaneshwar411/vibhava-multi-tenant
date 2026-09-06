export const TemplateMembershipRenewalReminder = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Membership Renewal Reminder</title>
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
              <div style="display: inline-block; background-color: #fef3c7; color: #92400e; font-size: 12px; font-weight: 700; padding: 4px 10px; border-radius: 9999px; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 12px;">
                Action Required: Renewal Notice
              </div>
              <h1 style="margin: 0; font-size: 24px; font-weight: 700; color: #111827; line-height: 1.3;">
                Your Membership is Expiring Soon
              </h1>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding: 0 40px 30px 40px; font-size: 15px; line-height: 1.6; color: #4b5563;">
              <p style="margin-top: 0;">Hi <strong>{{memberName}}</strong>,</p>
              
              <p>Your <strong>{{tierName}}</strong> membership with <strong>{{organizationName}}</strong> is scheduled to end on <strong>{{dueDate}}</strong>. Renew today to maintain uninterrupted access to all your tier privileges.</p>

              <!-- Renewal Overview Box -->
              <div style="background-color: #f9fafb; border: 1px solid #e5e7eb; border-radius: 6px; padding: 20px; margin: 24px 0;">
                <p style="margin: 0 0 12px 0; font-weight: 600; color: #111827; font-size: 14px; text-transform: uppercase; letter-spacing: 0.05em;">
                  Membership Renewal Details
                </p>
                <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="font-size: 14px; color: #374151;">
                  <tr>
                    <td style="padding: 4px 0; font-weight: 500; width: 160px;">Membership Tier:</td>
                    <td style="padding: 4px 0; font-weight: 600; color: #111827;">{{tierName}}</td>
                  </tr>
                  <tr>
                    <td style="padding: 4px 0; font-weight: 500;">Renewal Amount:</td>
                    <td style="padding: 4px 0; font-weight: 700; color: #059669;">{{pricing}} / {{duration}}</td>
                  </tr>
                  <tr>
                    <td style="padding: 4px 0; font-weight: 500;">Expiration Date:</td>
                    <td style="padding: 4px 0; font-weight: 600; color: #dc2626;">{{dueDate}}</td>
                  </tr>
                </table>
              </div>

              <!-- Benefits List -->
              <div style="background-color: #eff6ff; border: 1px solid #bfdbfe; border-radius: 6px; padding: 20px; margin-bottom: 24px;">
                <p style="margin: 0 0 8px 0; font-weight: 600; color: #1e40af; font-size: 14px; text-transform: uppercase; letter-spacing: 0.05em;">
                  Keep Enjoying Your Benefits:
                </p>
                <ul style="margin: 0; padding-left: 20px; color: #1e3a8a; font-size: 14px;">
                  <li style="margin-bottom: 4px;">Unrestricted access to premium platform tools and features.</li>
                  <li style="margin-bottom: 4px;">Priority support and account assistance.</li>
                  <li>Exclusive member pricing on add-ons and events.</li>
                </ul>
              </div>

              <!-- CTA Button -->
              <table role="presentation" border="0" cellpadding="0" cellspacing="0" style="margin: 28px 0;">
                <tr>
                  <td align="center" style="border-radius: 6px; background-color: #2563eb;">
                    <a href="{{renewalUrl}}" target="_blank" style="display: inline-block; padding: 12px 28px; font-size: 15px; font-weight: 600; color: #ffffff; text-decoration: none; border-radius: 6px;">
                      Renew Membership Now
                    </a>
                  </td>
                </tr>
              </table>

              <p style="font-size: 13px; color: #6b7280; margin-bottom: 0;">
                Need assistance or want to adjust your membership settings? Contact our team at <strong>{{supportEmail}}</strong>.
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding: 24px 40px; background-color: #f9fafb; border-top: 1px solid #f3f4f6; text-align: center; font-size: 12px; color: #9ca3af;">
              <p style="margin: 0;">
                Sent on behalf of <strong>{{organizationName}}</strong>.
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

export const TemplateMembershipOverdue = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Membership Overdue Notice</title>
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
              <div style="display: inline-block; background-color: #fee2e2; color: #991b1b; font-size: 12px; font-weight: 700; padding: 4px 10px; border-radius: 9999px; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 12px;">
                Immediate Action Required
              </div>
              <h1 style="margin: 0; font-size: 24px; font-weight: 700; color: #111827; line-height: 1.3;">
                Your Membership is Past Due
              </h1>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding: 0 40px 30px 40px; font-size: 15px; line-height: 1.6; color: #4b5563;">
              <p style="margin-top: 0;">Hi <strong>{{memberName}}</strong>,</p>
              
              <p>Your <strong>{{tierName}}</strong> membership with <strong>{{organizationName}}</strong> expired on <strong>{{dueDate}}</strong> and is now overdue. To restore full access to your account services and privileges, please renew your plan immediately.</p>

              <!-- Overdue Alert Box -->
              <div style="background-color: #fef2f2; border: 1px solid #fecaca; border-radius: 6px; padding: 20px; margin: 24px 0;">
                <p style="margin: 0 0 12px 0; font-weight: 600; color: #991b1b; font-size: 14px; text-transform: uppercase; letter-spacing: 0.05em;">
                  Overdue Account Details
                </p>
                <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="font-size: 14px; color: #7f1d1d;">
                  <tr>
                    <td style="padding: 4px 0; font-weight: 500; width: 160px;">Membership Tier:</td>
                    <td style="padding: 4px 0; font-weight: 600; color: #111827;">{{tierName}}</td>
                  </tr>
                  <tr>
                    <td style="padding: 4px 0; font-weight: 500;">Renewal Amount:</td>
                    <td style="padding: 4px 0; font-weight: 700;">{{pricing}} / {{duration}}</td>
                  </tr>
                  <tr>
                    <td style="padding: 4px 0; font-weight: 500;">Expiration Date:</td>
                    <td style="padding: 4px 0; font-weight: 700; color: #dc2626;">{{dueDate}}</td>
                  </tr>
                </table>
              </div>

              <!-- Impact Statement -->
              <p style="color: #374151;">
                <strong>What happens next?</strong><br/>
                Continued delay may result in the temporary suspension of your account services, member benefits, and administrative access.
              </p>

              <!-- CTA Button -->
              <table role="presentation" border="0" cellpadding="0" cellspacing="0" style="margin: 28px 0;">
                <tr>
                  <td align="center" style="border-radius: 6px; background-color: #dc2626;">
                    <a href="{{renewalUrl}}" target="_blank" style="display: inline-block; padding: 12px 28px; font-size: 15px; font-weight: 600; color: #ffffff; text-decoration: none; border-radius: 6px;">
                      Pay Now & Restore Access
                    </a>
                  </td>
                </tr>
              </table>

              <p style="font-size: 13px; color: #6b7280; margin-bottom: 0;">
                If you have already processed this payment or need assistance with your account, please contact support at <strong>{{supportEmail}}</strong>.
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding: 24px 40px; background-color: #f9fafb; border-top: 1px solid #f3f4f6; text-align: center; font-size: 12px; color: #9ca3af;">
              <p style="margin: 0;">
                Sent on behalf of <strong>{{organizationName}}</strong>.
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