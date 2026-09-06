export const TemplateUserOnboarding = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Welcome to {{organizationName}}</title>
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
              <h1 style="margin: 0; font-size: 24px; font-weight: 700; color: #111827; line-height: 1.3;">
                Welcome to {{organizationName}}!
              </h1>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding: 0 40px 30px 40px; font-size: 15px; line-height: 1.6; color: #4b5563;">
              <p style="margin-top: 0;">Hi <strong>{{recipientName}}</strong>,</p>
              
              <p>Your account for <strong>{{organizationName}}</strong> has been created successfully. To get started, please log in to set up your password and access your workspace.</p>

              <!-- Login Button -->
              <table role="presentation" border="0" cellpadding="0" cellspacing="0" style="margin: 28px 0;">
                <tr>
                  <td align="center" style="border-radius: 6px; background-color: #2563eb;">
                    <a href="{{loginUrl}}" target="_blank" style="display: inline-block; padding: 12px 28px; font-size: 15px; font-weight: 600; color: #ffffff; text-decoration: none; border-radius: 6px;">
                      Log In & Set Password
                    </a>
                  </td>
                </tr>
              </table>

              <!-- Account Details Box for Verification -->
              <div style="background-color: #f9fafb; border: 1px solid #e5e7eb; border-radius: 6px; padding: 20px; margin: 24px 0;">
                <p style="margin: 0 0 12px 0; font-weight: 600; color: #111827; font-size: 14px; text-transform: uppercase; letter-spacing: 0.05em;">
                  Please verify your account information:
                </p>
                <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="font-size: 14px; color: #374151;">
                  <tr>
                    <td style="padding: 4px 0; font-weight: 500; width: 140px;">Full Name:</td>
                    <td style="padding: 4px 0;">{{recipientName}}</td>
                  </tr>
                  <tr>
                    <td style="padding: 4px 0; font-weight: 500;">Email Address:</td>
                    <td style="padding: 4px 0;">{{email}}</td>
                  </tr>
                  <tr>
                    <td style="padding: 4px 0; font-weight: 500;">Mobile Number:</td>
                    <td style="padding: 4px 0;">{{mobileNumber}}</td>
                  </tr>
                  <tr>
                    <td style="padding: 4px 0; font-weight: 500;">Organization:</td>
                    <td style="padding: 4px 0;">{{organizationName}}</td>
                  </tr>
                </table>
              </div>

              <p style="font-size: 13px; color: #6b7280; margin-bottom: 0;">
                If any of the information above is incorrect, please contact your administrator to get it updated.
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding: 24px 40px; background-color: #f9fafb; border-top: 1px solid #f3f4f6; text-align: center; font-size: 12px; color: #9ca3af;">
              <p style="margin: 0;">
                This email was sent on behalf of <strong>{{organizationName}}</strong>. If you were not expecting this invite, please contact support.
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

export const TemplateVendorOnboarding = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Vendor Portal Access - {{organizationName}}</title>
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
              <h1 style="margin: 0; font-size: 24px; font-weight: 700; color: #111827; line-height: 1.3;">
                Vendor Portal Invitation
              </h1>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding: 0 40px 30px 40px; font-size: 15px; line-height: 1.6; color: #4b5563;">
              <p style="margin-top: 0;">Hi <strong>{{recipientName}}</strong>,</p>
              
              <p>You have been onboarded as an authorized vendor for <strong>{{organizationName}}</strong>. Through the Vendor Portal, you will be able to manage work orders, track maintenance requests, and submit invoices.</p>

              <p>To access your account, please log in below to set up your password and complete your profile setup.</p>

              <!-- Login Button -->
              <table role="presentation" border="0" cellpadding="0" cellspacing="0" style="margin: 28px 0;">
                <tr>
                  <td align="center" style="border-radius: 6px; background-color: #0d9488;">
                    <a href="{{loginUrl}}" target="_blank" style="display: inline-block; padding: 12px 28px; font-size: 15px; font-weight: 600; color: #ffffff; text-decoration: none; border-radius: 6px;">
                      Log In & Set Password
                    </a>
                  </td>
                </tr>
              </table>

              <!-- Account Details Box for Verification -->
              <div style="background-color: #f9fafb; border: 1px solid #e5e7eb; border-radius: 6px; padding: 20px; margin: 24px 0;">
                <p style="margin: 0 0 12px 0; font-weight: 600; color: #111827; font-size: 14px; text-transform: uppercase; letter-spacing: 0.05em;">
                  Please verify your vendor account details:
                </p>
                <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="font-size: 14px; color: #374151;">
                  <tr>
                    <td style="padding: 4px 0; font-weight: 500; width: 140px;">Contact Name:</td>
                    <td style="padding: 4px 0;">{{recipientName}}</td>
                  </tr>
                  <tr>
                    <td style="padding: 4px 0; font-weight: 500;">Email Address:</td>
                    <td style="padding: 4px 0;">{{email}}</td>
                  </tr>
                  <tr>
                    <td style="padding: 4px 0; font-weight: 500;">Mobile Number:</td>
                    <td style="padding: 4px 0;">{{mobileNumber}}</td>
                  </tr>
                  <tr>
                    <td style="padding: 4px 0; font-weight: 500;">Client Organization:</td>
                    <td style="padding: 4px 0;">{{organizationName}}</td>
                  </tr>
                </table>
              </div>

              <p style="font-size: 13px; color: #6b7280; margin-bottom: 0;">
                If any of the above contact information is incorrect, please notify the property management team at <strong>{{organizationName}}</strong> to make corrections.
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding: 24px 40px; background-color: #f9fafb; border-top: 1px solid #f3f4f6; text-align: center; font-size: 12px; color: #9ca3af;">
              <p style="margin: 0;">
                This vendor invitation was issued on behalf of <strong>{{organizationName}}</strong>. If you believe you received this by mistake, please ignore this email.
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

export const TemplateOperatorOnboarding = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Vibhava Operator Access Granted</title>
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
              <h1 style="margin: 0; font-size: 24px; font-weight: 700; color: #111827; line-height: 1.3;">
                Platform Operator Privileges Granted
              </h1>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding: 0 40px 30px 40px; font-size: 15px; line-height: 1.6; color: #4b5563;">
              <p style="margin-top: 0;">Hi <strong>{{recipientName}}</strong>,</p>
              
              <p>Your internal administrative account for <strong>{{organizationName}}</strong> operations has been provisioned. As an Operator, you hold elevated management access across platform systems.</p>

              <p>Please log in immediately to complete your initial credential setup and reset your password before performing system operations.</p>

              <!-- Login Button -->
              <table role="presentation" border="0" cellpadding="0" cellspacing="0" style="margin: 28px 0;">
                <tr>
                  <td align="center" style="border-radius: 6px; background-color: #4f46e5;">
                    <a href="{{loginUrl}}" target="_blank" style="display: inline-block; padding: 12px 28px; font-size: 15px; font-weight: 600; color: #ffffff; text-decoration: none; border-radius: 6px;">
                      Log In & Set Password
                    </a>
                  </td>
                </tr>
              </table>

              <!-- Account Details Box for Verification -->
              <div style="background-color: #f9fafb; border: 1px solid #e5e7eb; border-radius: 6px; padding: 20px; margin: 24px 0;">
                <p style="margin: 0 0 12px 0; font-weight: 600; color: #111827; font-size: 14px; text-transform: uppercase; letter-spacing: 0.05em;">
                  Operator Credentials Details:
                </p>
                <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="font-size: 14px; color: #374151;">
                  <tr>
                    <td style="padding: 4px 0; font-weight: 500; width: 140px;">Operator Name:</td>
                    <td style="padding: 4px 0;">{{recipientName}}</td>
                  </tr>
                  <tr>
                    <td style="padding: 4px 0; font-weight: 500;">Email Address:</td>
                    <td style="padding: 4px 0;">{{email}}</td>
                  </tr>
                  <tr>
                    <td style="padding: 4px 0; font-weight: 500;">Mobile Number:</td>
                    <td style="padding: 4px 0;">{{mobileNumber}}</td>
                  </tr>
                  <tr>
                    <td style="padding: 4px 0; font-weight: 500;">Organization:</td>
                    <td style="padding: 4px 0;">{{organizationName}}</td>
                  </tr>
                </table>
              </div>

              <p style="font-size: 13px; color: #6b7280; margin-bottom: 0;">
                If any details above are inaccurate, please notify the Vibhava Platform Security team immediately.
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding: 24px 40px; background-color: #f9fafb; border-top: 1px solid #f3f4f6; text-align: center; font-size: 12px; color: #9ca3af;">
              <p style="margin: 0;">
                This automated security email was dispatched by <strong>{{organizationName}} Core Platform</strong>.
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

export const TemplateTenantOnboarding = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Welcome to Your Tenant Portal - {{organizationName}}</title>
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
              <h1 style="margin: 0; font-size: 24px; font-weight: 700; color: #111827; line-height: 1.3;">
                Welcome to Your Tenant Portal
              </h1>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding: 0 40px 30px 40px; font-size: 15px; line-height: 1.6; color: #4b5563;">
              <p style="margin-top: 0;">Hi <strong>{{recipientName}}</strong>,</p>
              
              <p>Your tenant account managed by <strong>{{organizationName}}</strong> is now active. Through your portal, you can view your lease details, submit maintenance requests, and track payments seamlessly.</p>

              <p>Please click below to log in and set up your initial password to access your account.</p>

              <!-- Login Button -->
              <table role="presentation" border="0" cellpadding="0" cellspacing="0" style="margin: 28px 0;">
                <tr>
                  <td align="center" style="border-radius: 6px; background-color: #059669;">
                    <a href="{{loginUrl}}" target="_blank" style="display: inline-block; padding: 12px 28px; font-size: 15px; font-weight: 600; color: #ffffff; text-decoration: none; border-radius: 6px;">
                      Log In & Set Password
                    </a>
                  </td>
                </tr>
              </table>

              <!-- Account Details Box for Verification -->
              <div style="background-color: #f9fafb; border: 1px solid #e5e7eb; border-radius: 6px; padding: 20px; margin: 24px 0;">
                <p style="margin: 0 0 12px 0; font-weight: 600; color: #111827; font-size: 14px; text-transform: uppercase; letter-spacing: 0.05em;">
                  Please verify your contact details:
                </p>
                <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="font-size: 14px; color: #374151;">
                  <tr>
                    <td style="padding: 4px 0; font-weight: 500; width: 140px;">Tenant Name:</td>
                    <td style="padding: 4px 0;">{{recipientName}}</td>
                  </tr>
                  <tr>
                    <td style="padding: 4px 0; font-weight: 500;">Email Address:</td>
                    <td style="padding: 4px 0;">{{email}}</td>
                  </tr>
                  <tr>
                    <td style="padding: 4px 0; font-weight: 500;">Mobile Number:</td>
                    <td style="padding: 4px 0;">{{mobileNumber}}</td>
                  </tr>
                  <tr>
                    <td style="padding: 4px 0; font-weight: 500;">Property Manager:</td>
                    <td style="padding: 4px 0;">{{organizationName}}</td>
                  </tr>
                </table>
              </div>

              <p style="font-size: 13px; color: #6b7280; margin-bottom: 0;">
                If any of the information above is incorrect, please contact your property manager at <strong>{{organizationName}}</strong> to update your record.
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding: 24px 40px; background-color: #f9fafb; border-top: 1px solid #f3f4f6; text-align: center; font-size: 12px; color: #9ca3af;">
              <p style="margin: 0;">
                This invitation was sent on behalf of <strong>{{organizationName}}</strong>. If you did not expect this message, please ignore this email.
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