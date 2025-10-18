import nodemailer from 'nodemailer';

interface EmailOptions {
  to: string;
  subject: string;
  htmlBody: string;
  attachments?: {
    filename: string;
    content: Buffer;
    contentType: string;
  }[];
}

export async function sendEmail(options: EmailOptions): Promise<void> {
  const port = parseInt(process.env.SMTP_PORT || '587');
  const secure = port === 465;
  
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port,
    secure,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  await transporter.sendMail({
    from: process.env.SMTP_FROM || process.env.SMTP_USER,
    to: options.to,
    subject: options.subject,
    html: options.htmlBody,
    attachments: options.attachments,
  });
}

export function generatePrenupEmail(partyAName: string, partyBName: string): string {
  return `
<!DOCTYPE html>
<html>
<head>
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
      line-height: 1.6;
      color: #333;
      max-width: 600px;
      margin: 0 auto;
      padding: 20px;
    }
    .header {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      padding: 30px;
      border-radius: 8px 8px 0 0;
      text-align: center;
    }
    .content {
      background: #f9fafb;
      padding: 30px;
      border-radius: 0 0 8px 8px;
    }
    .warning {
      background: #fef3c7;
      border-left: 4px solid #f59e0b;
      padding: 15px;
      margin: 20px 0;
    }
    .next-steps {
      background: white;
      padding: 20px;
      border-radius: 8px;
      margin: 20px 0;
    }
    .next-steps h3 {
      margin-top: 0;
      color: #667eea;
    }
    .next-steps ol {
      padding-left: 20px;
    }
    .footer {
      text-align: center;
      color: #6b7280;
      font-size: 12px;
      margin-top: 30px;
      padding-top: 20px;
      border-top: 1px solid #e5e7eb;
    }
  </style>
</head>
<body>
  <div class="header">
    <h1>Your Prenuptial Agreement is Ready</h1>
  </div>
  <div class="content">
    <p>Dear ${partyAName} and ${partyBName},</p>
    
    <p>Thank you for using Drafter to create your prenuptial agreement. Your AI-generated document is attached to this email.</p>
    
    <div class="warning">
      <strong>⚠️ Important Legal Notice</strong>
      <p style="margin: 10px 0 0 0;">This document was generated using AI technology and does NOT constitute legal advice. It is provided for informational purposes only.</p>
    </div>
    
    <div class="next-steps">
      <h3>Next Steps (Required)</h3>
      <ol>
        <li><strong>Consult Independent Legal Counsel:</strong> Each party MUST retain their own attorney to review this agreement.</li>
        <li><strong>Allow Adequate Review Time:</strong> California law requires a minimum of 7 days between presenting this agreement and your wedding date.</li>
        <li><strong>Verify Financial Disclosures:</strong> Ensure all assets, debts, and income are accurately disclosed.</li>
        <li><strong>Schedule Notarization:</strong> Both parties must sign in the presence of a notary public.</li>
        <li><strong>Obtain Witnesses:</strong> Have the signing witnessed as required by California law.</li>
      </ol>
    </div>
    
    <p><strong>Privacy & Security:</strong> All your personal information was encrypted and protected during processing. We used advanced PII masking to ensure your sensitive data remained secure throughout the AI generation process.</p>
    
    <p>If you have any questions about using this document or need to generate a revised version, please visit our website.</p>
    
    <p>Best regards,<br>The Drafter Team</p>
  </div>
  
  <div class="footer">
    <p>This email was sent from Drafter, an AI-powered legal document platform.</p>
    <p>© ${new Date().getFullYear()} Drafter. All rights reserved.</p>
  </div>
</body>
</html>
  `.trim();
}
