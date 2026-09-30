import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import nodemailer from 'nodemailer';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '.env') });

const emailUser = process.env.EMAIL_USER;
const rawPass = process.env.EMAIL_PASS;
const receiver = process.env.NOTIFICATION_RECEIVER || emailUser || 'anshmvm@gmail.com';

console.log('\n======================================================');
console.log('📬  NODEMAILER GMAIL SMTP DIAGNOSTIC TEST');
console.log('======================================================');
console.log(`Configured Email Account: ${emailUser || '(not set)'}`);
console.log(`Destination Inbox:        ${receiver}`);

const isPlaceholder =
  !rawPass ||
  rawPass.includes('your-16-character') ||
  rawPass.includes('your-app-password') ||
  rawPass.includes('your-google-app-password');

if (!emailUser || isPlaceholder) {
  console.log('\n⚠️  STATUS: EMAIL_PASS is currently unset or using the placeholder.');
  console.log('\n👉 HOW TO SET IT UP:');
  console.log('   1. Open Google Security: https://myaccount.google.com/security');
  console.log('   2. Ensure "2-Step Verification" is turned ON');
  console.log('   3. Go to App Passwords:  https://myaccount.google.com/apppasswords');
  console.log('   4. Create an app named "Portfolio" and copy the 16-character code (e.g. abcd efgh ijkl mnop)');
  console.log('   5. Open server/.env and set:');
  console.log('      EMAIL_PASS=your-16-character-code');
  console.log('   6. Re-run: npm run test:email');
  console.log('======================================================\n');
  process.exit(0);
}

const cleanPass = rawPass.replace(/\s+/g, '');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: emailUser,
    pass: cleanPass,
  },
});

console.log('\n⏳ Step 1: Connecting to Gmail SMTP servers...');

try {
  await transporter.verify();
  console.log('✅ Connection to Gmail SMTP verified successfully!');

  console.log('\n⏳ Step 2: Dispatching test email...');
  const info = await transporter.sendMail({
    from: `"Portfolio Test Bot" <${emailUser}>`,
    to: receiver,
    subject: `🚀 Portfolio Nodemailer Test — ${new Date().toLocaleTimeString()}`,
    text: `Hello Ansh!\n\nThis is a test notification confirming that your Nodemailer configuration with Gmail App Password is functioning perfectly.\n\nTimestamp: ${new Date().toISOString()}`,
    html: `
      <div style="font-family: Arial, sans-serif; padding: 20px; background-color: #0f1120; color: #f2f3f8; border-radius: 12px; border: 1px solid #1e233d;">
        <h2 style="color: #4fd1ff; margin-top: 0;">🚀 Test Notification Delivered!</h2>
        <p style="color: #e6e6f0;">Your Nodemailer setup on Ansh Singh's portfolio is working with Gmail SMTP.</p>
        <p><strong>Configured Sender:</strong> ${emailUser}</p>
        <p><strong>Delivered To:</strong> ${receiver}</p>
        <p><strong>Timestamp:</strong> ${new Date().toLocaleString()}</p>
        <div style="margin-top: 16px; padding: 12px; background-color: #14172a; border-left: 4px solid #4fd1ff; border-radius: 4px;">
          <p style="margin: 0; color: #a6adc8; font-size: 13px;">You are all set! New messages submitted on the portfolio contact form will arrive in this inbox.</p>
        </div>
      </div>
    `,
  });

  console.log('\n🎉 SUCCESS! Test email was accepted by Gmail:');
  console.log(`   • Message ID: ${info.messageId}`);
  console.log(`   • Recipient:  ${receiver}`);
  console.log('\n💡 Please check your Gmail inbox (and Spam/Junk folder if not in Primary inbox).');
  console.log('======================================================\n');
} catch (error) {
  console.error('\n❌ FAILED TO DISPATCH EMAIL:');
  console.error(`   • Error: ${error.message}`);
  if (error.code === 'EAUTH') {
    console.error('\n👉 Authentication Failed (EAUTH):');
    console.error('   1. Make sure 2-Step Verification is turned ON for your Google account.');
    console.error('   2. Verify you generated a 16-character "App Password", not your regular Gmail account password.');
    console.error('   3. Generate a fresh one at https://myaccount.google.com/apppasswords');
  }
  console.log('======================================================\n');
}

