export const TemplateLedgerEntryCreated = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>New Ledger Entry Posted</title>
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
              <div style="display: inline-block; background-color: #eff6ff; color: #1e40af; font-size: 12px; font-weight: 700; padding: 4px 10px; border-radius: 9999px; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 12px;">
                Statement Update
              </div>
              <h1 style="margin: 0; font-size: 24px; font-weight: 700; color: #111827; line-height: 1.3;">
                New Ledger Entry Created
              </h1>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding: 0 40px 30px 40px; font-size: 15px; line-height: 1.6; color: #4b5563;">
              <p style="margin-top: 0;">Hi <strong>{{recipientName}}</strong>,</p>
              
              <p>A new ledger transaction has been posted to your account for <strong>{{propertyName}}</strong>, Unit <strong>{{unitNumber}}</strong>.</p>

              <!-- Entry Overview Box -->
              <div style="background-color: #f9fafb; border: 1px solid #e5e7eb; border-radius: 6px; padding: 20px; margin: 24px 0;">
                <p style="margin: 0 0 12px 0; font-weight: 600; color: #111827; font-size: 14px; text-transform: uppercase; letter-spacing: 0.05em;">
                  Transaction Details
                </p>
                <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="font-size: 14px; color: #374151;">
                  <tr>
                    <td style="padding: 4px 0; font-weight: 500; width: 160px;">Entry Type:</td>
                    <td style="padding: 4px 0; font-weight: 600; color: #111827;">{{entryType}}</td>
                  </tr>
                  <tr>
                    <td style="padding: 4px 0; font-weight: 500;">Status:</td>
                    <td style="padding: 4px 0;"><span style="color: #059669; font-weight: 600;">{{status}}</span></td>
                  </tr>
                  <tr>
                    <td style="padding: 4px 0; font-weight: 500;">Total Amount:</td>
                    <td style="padding: 4px 0; font-weight: 700; color: #111827;">{{currency}} {{totalAmount}}</td>
                  </tr>
                  {{periodBlock}}
                  {{memoBlock}}
                </table>
              </div>

              <!-- Transaction Line Items Breakdown -->
              <div style="background-color: #ffffff; border: 1px solid #e5e7eb; border-radius: 6px; padding: 20px; margin-bottom: 24px;">
                <p style="margin: 0 0 12px 0; font-weight: 600; color: #111827; font-size: 14px; text-transform: uppercase; letter-spacing: 0.05em;">
                  Line Items Breakdown
                </p>
                <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="font-size: 13px; color: #374151; border-collapse: collapse;">
                  <thead>
                    <tr style="border-bottom: 1px solid #e5e7eb; text-align: left;">
                      <th style="padding: 6px 0; font-weight: 600; color: #6b7280;">Account</th>
                      <th style="padding: 6px 0; font-weight: 600; color: #6b7280;">Type</th>
                      <th style="padding: 6px 0; font-weight: 600; color: #6b7280; text-align: right;">Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    {{transactionLinesRows}}
                  </tbody>
                </table>
              </div>

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