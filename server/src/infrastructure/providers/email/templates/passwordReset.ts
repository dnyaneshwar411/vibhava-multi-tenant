export const TemplatePasswordReset = `
<!DOCTYPE html>
<html lang="en" xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="x-apple-disable-message-reformatting">
  <title>Password Reset Request</title>
  <style>
    /* Reset & Base Styles */
    html, body {
      margin: 0 !important;
      padding: 0 !important;
      height: 100% !important;
      width: 100% !important;
      background-color: #f4f6f8;
      font-family: Arial, sans-serif;
      -webkit-text-size-adjust: 100%;
      -ms-text-size-adjust: 100%;
    }

    table, td {
      mso-table-lspace: 0pt;
      mso-table-rspace: 0pt;
    }

    table {
      border-spacing: 0 !important;
      border-collapse: collapse !important;
      table-layout: fixed !important;
      margin: 0 auto !important;
    }

    /* Container & Layout */
    .wrapper {
      width: 100%;
      table-layout: fixed;
      background-color: #f4f6f8;
      padding: 20px 0;
    }

    .container {
      max-width: 600px;
      margin: 0 auto;
      background-color: #ffffff;
      border-radius: 8px;
      overflow: hidden;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }

    /* Email Sections */
    .header {
      background-color: #1a365d;
      color: #ffffff;
      padding: 24px 20px;
      text-align: center;
    }

    .header h1 {
      margin: 0;
      font-size: 22px;
      line-height: 28px;
      font-weight: 600;
      color: #ffffff;
    }

    .content {
      padding: 24px 20px;
    }

    .greeting {
      font-size: 16px;
      line-height: 24px;
      margin: 0 0 16px 0;
      color: #333333;
    }

    .body-text {
      font-size: 14px;
      line-height: 22px;
      margin: 0 0 20px 0;
      color: #4a5568;
    }

    /* OTP Display Box */
    .otp-container {
      text-align: center;
      margin: 28px 0;
      padding: 20px;
      background-color: #f7fafc;
      border: 1px dashed #cbd5e0;
      border-radius: 8px;
    }

    .otp-label {
      font-size: 12px;
      text-transform: uppercase;
      letter-spacing: 1px;
      color: #718096;
      font-weight: bold;
      margin-bottom: 8px;
    }

    .otp-code {
      font-size: 32px;
      font-weight: 800;
      letter-spacing: 8px;
      color: #1a365d;
      margin: 0;
    }

    .section-title {
      font-size: 14px;
      line-height: 20px;
      font-weight: bold;
      text-transform: uppercase;
      color: #4a5568;
      border-bottom: 2px solid #edf2f7;
      padding-bottom: 6px;
      margin-top: 24px;
      margin-bottom: 12px;
    }

    /* Details Table Styling */
    .details-table {
      width: 100%;
    }

    .details-table td {
      padding: 8px 0;
      font-size: 14px;
      line-height: 20px;
      vertical-align: top;
    }

    .details-table td.label {
      color: #718096;
      width: 35%;
      font-weight: normal;
    }

    .details-table td.value {
      color: #1a202c;
      width: 65%;
      font-weight: 500;
      word-break: break-word;
    }

    .warning-text {
      font-size: 13px;
      line-height: 20px;
      color: #e53e3e;
      background-color: #fff5f5;
      padding: 12px 16px;
      border-radius: 6px;
      border-left: 4px solid #e53e3e;
      margin-top: 24px;
    }

    .footer {
      background-color: #f7fafc;
      padding: 16px 20px;
      text-align: center;
      font-size: 12px;
      line-height: 18px;
      color: #a0aec0;
      border-top: 1px solid #edf2f7;
    }

    .footer p {
      margin: 0;
    }

    /* Mobile Responsive Breakpoints */
    @media screen and (max-width: 600px) {
      .wrapper {
        padding: 10px 0 !important;
      }
      .container {
        width: 100% !important;
        border-radius: 0 !important;
      }
      .content {
        padding: 20px 16px !important;
      }
      .header {
        padding: 20px 16px !important;
      }
      .header h1 {
        font-size: 18px !important;
        line-height: 24px !important;
      }
      .details-table td.label,
      .details-table td.value {
        display: block !important;
        width: 100% !important;
        padding-top: 2px !important;
        padding-bottom: 2px !important;
      }
      .details-table td.label {
        color: #718096 !important;
        font-size: 12px !important;
        text-transform: uppercase !important;
        padding-top: 8px !important;
      }
      .details-table td.value {
        padding-bottom: 8px !important;
      }
    }
  </style>
</head>
<body>
  <div class="wrapper">
    <!--[if mso]>
    <table align="center" border="0" cellspacing="0" cellpadding="0" width="600">
    <tr>
    <td>
    <![if !mso]><!-->
    <div class="container">
    <!--<![endif]-->
      <div class="header">
        <h1>Password Reset Request</h1>
      </div>

      <div class="content">
        <p class="greeting">Hello {{userName}},</p>
        <p class="body-text">We received a request to reset your account password. Use the verification code below to proceed with resetting your password.</p>

        <div class="otp-container">
          <div class="otp-label">Your One-Time Password (OTP)</div>
          <div class="otp-code">{{otp}}</div>
        </div>

        <div class="section-title">Account Details</div>
        <table class="details-table" role="presentation">
          <tr>
            <td class="label">Registered Name:</td>
            <td class="value">{{userName}}</td>
          </tr>
          {{#if mobileNumber}}
          <tr>
            <td class="label">Mobile Number:</td>
            <td class="value">{{mobileNumber}}</td>
          </tr>
          {{/if}}
        </table>

        <div class="warning-text">
          <strong>Security Note:</strong> Do not share this OTP with anyone, including support staff.
        </div>
      </div>

      <div class="footer">
        <p>If you didn't request a password reset, you can safely ignore this email. Your password will remain unchanged.</p>
      </div>
    <!--[if !mso]><!-->
    </div>
    <!--<![endif]-->
    <!--[if mso]>
    </td>
    </tr>
    </table>
    <![endif]-->
  </div>
</body>
</html>
`;