export const TemplateRentPaymentSuccess = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Rent Payment Received</title>
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
              <div style="display: inline-block; background-color: #dcfce7; color: #15803d; font-size: 12px; font-weight: 700; padding: 4px 10px; border-radius: 9999px; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 12px;">
                Payment Successful
              </div>
              <h1 style="margin: 0; font-size: 24px; font-weight: 700; color: #111827; line-height: 1.3;">
                Rent Payment Confirmation
              </h1>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding: 0 40px 30px 40px; font-size: 15px; line-height: 1.6; color: #4b5563;">
              <p style="margin-top: 0;">Hi <strong>{{recipientName}}</strong>,</p>
              
              <p>We have successfully received your rent payment for <strong>{{propertyName}}</strong>, Unit <strong>{{unitNumber}}</strong>. Below is a summary of your payment and lease details.</p>

              <!-- Payment Summary Box -->
              <div style="background-color: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 6px; padding: 20px; margin: 24px 0;">
                <p style="margin: 0 0 12px 0; font-weight: 600; color: #166534; font-size: 14px; text-transform: uppercase; letter-spacing: 0.05em;">
                  Payment Summary
                </p>
                <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="font-size: 14px; color: #14532d;">
                  <tr>
                    <td style="padding: 4px 0; font-weight: 500; width: 160px;">Amount Paid:</td>
                    <td style="padding: 4px 0; font-weight: 700; font-size: 16px;">{{rentAmount}}</td>
                  </tr>
                  <tr>
                    <td style="padding: 4px 0; font-weight: 500;">Billing Cycle:</td>
                    <td style="padding: 4px 0;">{{billingCycle}} (Due on Day {{paymentDueDay}})</td>
                  </tr>
                </table>
              </div>

              <!-- Property & Unit Information -->
              <div style="background-color: #f9fafb; border: 1px solid #e5e7eb; border-radius: 6px; padding: 20px; margin-bottom: 16px;">
                <p style="margin: 0 0 12px 0; font-weight: 600; color: #111827; font-size: 14px; text-transform: uppercase; letter-spacing: 0.05em;">
                  Property & Unit Information
                </p>
                <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="font-size: 14px; color: #374151;">
                  <tr>
                    <td style="padding: 4px 0; font-weight: 500; width: 160px;">Property Name:</td>
                    <td style="padding: 4px 0;">{{propertyName}}</td>
                  </tr>
                  <tr>
                    <td style="padding: 4px 0; font-weight: 500;">Unit Number:</td>
                    <td style="padding: 4px 0;">{{unitNumber}} ({{unitType}})</td>
                  </tr>
                  <tr>
                    <td style="padding: 4px 0; font-weight: 500;">Address:</td>
                    <td style="padding: 4px 0;">{{propertyAddress}}</td>
                  </tr>
                  <tr>
                    <td style="padding: 4px 0; font-weight: 500;">Lease Type:</td>
                    <td style="padding: 4px 0;">{{leaseType}}</td>
                  </tr>
                  <tr>
                    <td style="padding: 4px 0; font-weight: 500;">Lease Duration:</td>
                    <td style="padding: 4px 0;">{{leasePeriod}}</td>
                  </tr>
                </table>
              </div>

              <!-- Occupants / Tenants Information -->
              <div style="background-color: #f9fafb; border: 1px solid #e5e7eb; border-radius: 6px; padding: 20px; margin-bottom: 24px;">
                <p style="margin: 0 0 12px 0; font-weight: 600; color: #111827; font-size: 14px; text-transform: uppercase; letter-spacing: 0.05em;">
                  Occupants Information
                </p>
                <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="font-size: 14px; color: #374151;">
                  <tr>
                    <td style="padding: 4px 0; font-weight: 500; width: 160px;">Primary Tenant:</td>
                    <td style="padding: 4px 0;">{{primaryTenantInfo}}</td>
                  </tr>
                  {{coTenantsBlock}}
                </table>
              </div>

              <p style="font-size: 13px; color: #6b7280; margin-bottom: 0;">
                Managed by <strong>{{organizationName}}</strong>. If you have any questions regarding this receipt, please reach out to your property management team.
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding: 24px 40px; background-color: #f9fafb; border-top: 1px solid #f3f4f6; text-align: center; font-size: 12px; color: #9ca3af;">
              <p style="margin: 0;">
                This is an automated payment confirmation receipt sent on behalf of <strong>{{organizationName}}</strong>.
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