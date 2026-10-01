import mongoose from 'mongoose';
import nodemailer from 'nodemailer';
import { Message } from '../models/Message.js';

/**
 * Send email notification to Ansh when someone submits the contact form.
 * Uses Gmail SMTP with Nodemailer and Google App Passwords.
 */
const sendEmailNotification = async ({ name, email, message }) => {
  const emailUser = process.env.EMAIL_USER || process.env.SMTP_USER;
  const rawPass = process.env.EMAIL_PASS || process.env.SMTP_PASS;
  const notificationReceiver = process.env.NOTIFICATION_RECEIVER || emailUser || 'anshmvm@gmail.com';

  // Check if credentials exist and are not placeholders
  const isPlaceholder =
    !rawPass ||
    rawPass.includes('your-16-character') ||
    rawPass.includes('your-app-password') ||
    rawPass.includes('your-google-app-password');

  if (!emailUser || isPlaceholder) {
    console.warn('\n⚠️  [Nodemailer Notice] Email notification was skipped:');
    if (!emailUser) {
      console.warn('   • EMAIL_USER is missing in server/.env');
    }
    if (isPlaceholder) {
      console.warn('   • EMAIL_PASS is not configured (or is using placeholder)');
    }
    console.warn(`   👉 To receive instant email alerts at ${notificationReceiver}:`);
    console.warn('      1. Enable 2-Step Verification on your Google Account');
    console.warn('      2. Generate a 16-character App Password at https://myaccount.google.com/apppasswords');
    console.warn('      3. Add EMAIL_USER=anshmvm@gmail.com and EMAIL_PASS=<your-app-password> to server/.env\n');

    return {
      sent: false,
      reason: 'EMAIL_USER or EMAIL_PASS not configured in .env (or is using placeholder)',
    };
  }

  // Strip inadvertent spaces from 16-character Google App Password (e.g. 'abcd efgh ijkl mnop')
  const cleanPass = rawPass.replace(/\s+/g, '');

  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: emailUser,
        pass: cleanPass,
      },
      connectionTimeout: 4000,
      greetingTimeout: 4000,
      socketTimeout: 4000,
    });

    const mailOptions = {
      from: `"Portfolio Contact Form" <${emailUser}>`,
      to: notificationReceiver,
      replyTo: email, // Directly reply to the sender
      subject: `New portfolio contact from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
      html: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; background-color: #0f1120; color: #f2f3f8; border-radius: 12px; border: 1px solid #1e233d;">
          <div style="border-bottom: 1px solid #2c3352; padding-bottom: 16px; margin-bottom: 20px;">
            <h2 style="color: #4fd1ff; margin: 0 0 6px 0; font-size: 20px; font-weight: 700;">⚡ New Portfolio Contact Message</h2>
            <p style="color: #a6adc8; margin: 0; font-size: 13px;">Received via Ansh Singh's MERN Portfolio</p>
          </div>
          
          <div style="margin-bottom: 16px;">
            <strong style="color: #a78bfa; font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px;">Sender Details:</strong>
            <p style="margin: 6px 0 0 0; font-size: 15px; color: #ffffff;">
              <strong>${name}</strong> &lt;<a href="mailto:${email}" style="color: #4fd1ff; text-decoration: none;">${email}</a>&gt;
            </p>
          </div>

          <div style="margin-bottom: 20px;">
            <strong style="color: #a78bfa; font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px;">Message Content:</strong>
            <div style="margin-top: 8px; padding: 16px; background-color: #14172a; border-left: 4px solid #4fd1ff; border-radius: 6px;">
              <p style="margin: 0; white-space: pre-wrap; font-size: 14px; line-height: 1.6; color: #f2f3f8;">${message}</p>
            </div>
          </div>

          <div style="border-top: 1px solid #2c3352; padding-top: 16px; font-size: 12px; color: #64748b;">
            <p style="margin: 0;">💡 Hit <strong>Reply</strong> in your email client to respond directly to <strong>${name}</strong> (${email}).</p>
          </div>
        </div>
      `,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log(`\n✅ [Nodemailer Success] Email notification delivered successfully!`);
    console.log(`   • To: ${notificationReceiver}`);
    console.log(`   • From: ${name} (${email})`);
    console.log(`   • Message ID: ${info.messageId}\n`);

    return {
      sent: true,
      messageId: info.messageId,
    };
  } catch (emailError) {
    console.error(`\n❌ [Nodemailer Error] Email dispatch failed: ${emailError.message}`);
    if (emailError.code === 'EAUTH') {
      console.error(
        '   👉 [Auth Failed] Gmail rejected credentials. Verify 2-Step Verification is enabled and generate a fresh 16-character App Password at https://myaccount.google.com/apppasswords'
      );
    }
    console.error('');

    return {
      sent: false,
      error: emailError.message,
    };
  }
};

/**
 * @route   POST /api/contact
 * @desc    Submit a contact message, save to MongoDB, and dispatch email notification
 * @access  Public
 */
export const submitContactMessage = async (req, res) => {
  try {
    const { name, email, message } = req.body;

    // Basic validation
    if (!name || typeof name !== 'string' || !name.trim()) {
      return res.status(400).json({
        success: false,
        message: 'Please provide a valid name.',
      });
    }

    if (!email || typeof email !== 'string' || !email.trim()) {
      return res.status(400).json({
        success: false,
        message: 'Please provide a valid email address.',
      });
    }

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email.trim())) {
      return res.status(400).json({
        success: false,
        message: 'Please provide a valid email format (e.g., yourname@domain.com).',
      });
    }

    if (!message || typeof message !== 'string' || message.trim().length < 5) {
      return res.status(400).json({
        success: false,
        message: 'Message must be at least 5 characters long.',
      });
    }

    const ipAddress = req.ip || req.headers['x-forwarded-for'] || req.socket.remoteAddress;
    const userAgent = req.headers['user-agent'];

    let savedRecord = null;
    const isDbConnected = mongoose.connection.readyState === 1;

    if (isDbConnected) {
      savedRecord = await Message.create({
        name: name.trim(),
        email: email.trim().toLowerCase(),
        message: message.trim(),
        ipAddress,
        userAgent,
      });
      console.log(`[Contact] New message saved to MongoDB (ID: ${savedRecord._id}) from ${name}`);
    } else {
      console.warn(
        `[Contact Resilient Mode] MongoDB not connected yet. Message received from ${name} (${email}): "${message}"`
      );
    }

    // Trigger email notification with strict timeout so user response is never blocked or delayed
    let emailResult = { sent: false, reason: 'Pending dispatch' };
    try {
      const emailPromise = sendEmailNotification({
        name: name.trim(),
        email: email.trim().toLowerCase(),
        message: message.trim(),
      });
      const timeoutPromise = new Promise((resolve) =>
        setTimeout(() => resolve({ sent: false, reason: 'Email dispatch timed out on cloud network' }), 3500)
      );
      emailResult = await Promise.race([emailPromise, timeoutPromise]);
    } catch (e) {
      console.warn('[Contact Email Dispatch Error]:', e.message);
    }

    // Always return 201 success so user experience on frontend is seamless
    return res.status(201).json({
      success: true,
      message: 'Thank you! Your message has been received. Ansh will get back to you soon.',
      emailSent: emailResult.sent,
      emailStatus: emailResult.sent
        ? 'Notification email delivered to inbox'
        : emailResult.reason || emailResult.error || 'Email dispatch skipped or failed',
      data: savedRecord
        ? {
            id: savedRecord._id,
            name: savedRecord.name,
            createdAt: savedRecord.createdAt,
          }
        : {
            name: name.trim(),
            createdAt: new Date().toISOString(),
          },
    });
  } catch (error) {
    console.error('[Contact Controller Error]:', error);
    return res.status(500).json({
      success: false,
      message: error.message || 'Server error while processing your message. Please try again.',
    });
  }
};

/**
 * @route   GET /api/contact/messages
 * @desc    Get all contact messages (for dev verification / admin view)
 * @access  Public (or protected in production)
 */
export const getAllMessages = async (req, res) => {
  try {
    if (mongoose.connection.readyState !== 1) {
      return res.status(200).json({
        success: true,
        count: 0,
        messages: [],
        note: 'MongoDB is currently in offline/disconnected state.',
      });
    }

    const messages = await Message.find().sort({ createdAt: -1 }).limit(100);
    return res.status(200).json({
      success: true,
      count: messages.length,
      messages,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || 'Unable to retrieve messages.',
    });
  }
};
