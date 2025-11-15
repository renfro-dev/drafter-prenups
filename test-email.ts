import 'dotenv/config';
import { sendEmail } from './server/utils/email-sender.js';

async function testSendEmail() {
  try {
    console.log('Sending test email...');
    console.log('From:', process.env.SENDGRID_FROM_EMAIL);
    console.log('To: joshua@renfro.dev');
    console.log('API Key (first 10 chars):', process.env.SENDGRID_API_KEY?.substring(0, 10));
    console.log('API Key length:', process.env.SENDGRID_API_KEY?.length);

    await sendEmail({
      to: 'joshua@renfro.dev',
      subject: 'SendGrid Test Email from Drafter',
      htmlBody: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; padding: 20px; }
            .container { max-width: 600px; margin: 0 auto; background: #f9fafb; padding: 30px; border-radius: 8px; }
            .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 20px; border-radius: 8px; text-align: center; }
            .content { background: white; padding: 20px; margin-top: 20px; border-radius: 8px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>✅ SendGrid Test Email</h1>
            </div>
            <div class="content">
              <p>This is a test email from Drafter.</p>
              <p><strong>Sent from:</strong> hello@drafter.legal</p>
              <p><strong>Sent to:</strong> joshua@renfro.dev</p>
              <p><strong>Time:</strong> ${new Date().toLocaleString()}</p>
              <p>If you're seeing this, SendGrid is configured correctly!</p>
            </div>
          </div>
        </body>
        </html>
      `
    });

    console.log('✅ Email sent successfully!');
  } catch (error: any) {
    console.error('❌ Error sending email:', error);
    if (error.response?.body?.errors) {
      console.error('SendGrid Error Details:', JSON.stringify(error.response.body.errors, null, 2));
    }
    process.exit(1);
  }
}

testSendEmail();
