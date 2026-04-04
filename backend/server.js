

import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import bodyParser from 'body-parser';
import { google } from 'googleapis';
import nodemailer from 'nodemailer';
import feedbackRoutes from './feedbackRoutes.js';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(cors());
app.use(bodyParser.json());

/* ================================
   GOOGLE AUTH SETUP
================================ */
let auth = null;

try {
  const credentials = JSON.parse(process.env.GOOGLE_CREDENTIALS);

  auth = new google.auth.JWT({
    email: credentials.client_email,
    key: credentials.private_key.replace(/\\n/g, '\n'),
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  });

  console.log('✅ Google Auth initialized');
} catch (err) {
  console.error('❌ Google Auth init failed:', err.message);
}

/* ================================
   HEALTH CHECK
================================ */
app.get('/', (req, res) => {
  res.status(200).send('✅ Portfolio backend is running!');
});

/* ================================
   CONTACT API
================================ */
app.post('/api/contact', (req, res) => {
  const { name, email, phone, comment } = req.body;

  if (!name || !email || !phone || !comment) {
    return res.status(400).json({
      success: false,
      message: '❌ All fields required',
    });
  }

  // Instant frontend response
  res.status(200).json({
    success: true,
    message: '✅ Message received successfully',
  });

  // Background processing (non-blocking)
  processContactInBackground({ name, email, phone, comment });
});

/* ================================
   HELPER: sleep
================================ */
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/* ================================
   HELPER: sendMailWithRetry
================================ */
async function sendMailWithRetry(transporter, mailOptions, retries = 2, delayMs = 1000) {
  for (let i = 0; i < retries; i++) {
    try {
      await transporter.sendMail(mailOptions);
      console.log(`📨 Email sent to ${mailOptions.to}`);
      return true;
    } catch (err) {
      console.warn(`⚠️ Email attempt ${i + 1} failed: ${err.message}`);
      if (i < retries - 1) {
        console.log(`⏳ Retrying in ${delayMs / 1000}s...`);
        await sleep(delayMs);
      } else {
        console.error(`❌ All email attempts failed for ${mailOptions.to}`);
      }
    }
  }
  return false;
}

/* ================================
   BACKGROUND WORKER
================================ */
async function processContactInBackground({ name, email, phone, comment }) {
  try {
    const timestamp = new Date().toISOString();

    /* ---------- GOOGLE SHEETS ---------- */
    if (auth) {
      const sheets = google.sheets({ version: 'v4', auth });
      await sheets.spreadsheets.values.append({
        spreadsheetId: process.env.GOOGLE_SHEET_ID,
        range: 'Contact!A1:E1',
        valueInputOption: 'RAW',
        insertDataOption: 'INSERT_ROWS',
        requestBody: { values: [[name, email, phone, comment, timestamp]] },
      });
      console.log('✅ Data saved to Google Sheets');
    }

    /* ---------- EMAIL SETUP (GMAIL) ---------- */
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
      pool: true,
      maxConnections: 1,
      maxMessages: 3,
    });

    // Logo path: backend is sibling of portfolio, so go up one level
    const logoPath = path.join(__dirname, '..', 'portfolio', 'public', 'images', 'logo.jpg');

    /* ---------- ADMIN EMAIL ---------- */
    const adminMail = {
      from: `"AK Webflair Technologies" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER,
      subject: `📬 New Contact Message from ${name}`,
      html: `
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8"/>
          <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
          <title>New Contact - AK Webflair Technologies</title>
        </head>
        <body style="margin:0;padding:0;background-color:#f1f5f9;font-family:'Segoe UI',Arial,sans-serif;">
          <table width="100%" cellpadding="0" cellspacing="0" style="background:#f1f5f9;padding:40px 0;">
            <tr>
              <td align="center">
                <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 4px 24px rgba(14,165,233,0.10);">

                  <!-- HEADER -->
                  <tr>
                    <td style="background:linear-gradient(135deg,#0ea5e9 0%,#6366f1 100%);padding:32px 40px;text-align:center;">
                      <img src="cid:akwlogo" alt="AK Webflair Technologies" style="height:56px;max-width:220px;object-fit:contain;margin-bottom:14px;display:block;margin-left:auto;margin-right:auto;" />
                      <h1 style="margin:0;color:#ffffff;font-size:20px;font-weight:700;letter-spacing:0.5px;">New Contact Message</h1>
                      <p style="margin:6px 0 0;color:#bae6fd;font-size:13px;">AK Webflair Technologies — Admin Notification</p>
                    </td>
                  </tr>

                  <!-- BODY -->
                  <tr>
                    <td style="padding:36px 40px;">
                      <p style="margin:0 0 24px;color:#475569;font-size:15px;">You have received a new contact form submission. Here are the details:</p>

                      <table width="100%" cellpadding="0" cellspacing="0">
                        <tr>
                          <td style="padding:12px 16px;background:#f8fafc;border-left:4px solid #0ea5e9;border-radius:4px;margin-bottom:10px;">
                            <span style="font-size:12px;color:#94a3b8;text-transform:uppercase;letter-spacing:1px;">Name</span><br/>
                            <span style="font-size:16px;color:#0f172a;font-weight:600;">${name}</span>
                          </td>
                        </tr>
                        <tr><td style="height:10px;"></td></tr>
                        <tr>
                          <td style="padding:12px 16px;background:#f8fafc;border-left:4px solid #6366f1;border-radius:4px;">
                            <span style="font-size:12px;color:#94a3b8;text-transform:uppercase;letter-spacing:1px;">Email</span><br/>
                            <span style="font-size:16px;color:#0f172a;font-weight:600;">${email}</span>
                          </td>
                        </tr>
                        <tr><td style="height:10px;"></td></tr>
                        <tr>
                          <td style="padding:12px 16px;background:#f8fafc;border-left:4px solid #38bdf8;border-radius:4px;">
                            <span style="font-size:12px;color:#94a3b8;text-transform:uppercase;letter-spacing:1px;">Phone</span><br/>
                            <span style="font-size:16px;color:#0f172a;font-weight:600;">${phone}</span>
                          </td>
                        </tr>
                        <tr><td style="height:10px;"></td></tr>
                        <tr>
                          <td style="padding:14px 16px;background:#f8fafc;border-left:4px solid #0ea5e9;border-radius:4px;">
                            <span style="font-size:12px;color:#94a3b8;text-transform:uppercase;letter-spacing:1px;">Message</span><br/>
                            <span style="font-size:15px;color:#334155;line-height:1.6;">${comment}</span>
                          </td>
                        </tr>
                      </table>

                      <p style="margin:28px 0 0;font-size:12px;color:#94a3b8;">Submitted at: ${timestamp}</p>
                    </td>
                  </tr>

                  <!-- FOOTER -->
                  <tr>
                    <td style="background:#0f172a;padding:24px 40px;text-align:center;">
                      <p style="margin:0;color:#38bdf8;font-size:13px;font-weight:600;">AK Webflair Technologies</p>
                      <p style="margin:4px 0 0;color:#64748b;font-size:12px;">Founder & CEO — Kavin M</p>
                      <p style="margin:8px 0 0;color:#334155;font-size:11px;">This is an automated admin notification.</p>
                    </td>
                  </tr>

                </table>
              </td>
            </tr>
          </table>
        </body>
        </html>
      `,
      attachments: [
        {
          filename: 'logo.jpg',
          path: logoPath,
          cid: 'akwlogo',
        },
      ],
    };

    /* ---------- AUTO-REPLY EMAIL ---------- */
    const autoReplyMail = {
      from: `"AK Webflair Technologies" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: '✅ Thanks for contacting AK Webflair Technologies!',
      html: `
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8"/>
          <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
          <title>Thank You - AK Webflair Technologies</title>
        </head>
        <body style="margin:0;padding:0;background-color:#f1f5f9;font-family:'Segoe UI',Arial,sans-serif;">
          <table width="100%" cellpadding="0" cellspacing="0" style="background:#f1f5f9;padding:40px 0;">
            <tr>
              <td align="center">
                <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 4px 24px rgba(14,165,233,0.10);">

                  <!-- HEADER -->
                  <tr>
                    <td style="background:linear-gradient(135deg,#0ea5e9 0%,#6366f1 100%);padding:32px 40px;text-align:center;">
                      <img src="cid:akwlogo" alt="AK Webflair Technologies" style="height:56px;max-width:220px;object-fit:contain;margin-bottom:14px;display:block;margin-left:auto;margin-right:auto;" />
                      <h1 style="margin:0;color:#ffffff;font-size:22px;font-weight:700;letter-spacing:0.5px;">Thank You for Reaching Out!</h1>
                      <p style="margin:6px 0 0;color:#bae6fd;font-size:13px;">We've received your message and will be in touch soon.</p>
                    </td>
                  </tr>

                  <!-- BODY -->
                  <tr>
                    <td style="padding:36px 40px;">
                      <p style="margin:0 0 16px;color:#0f172a;font-size:16px;">Hi <strong>${name}</strong>,</p>
                      <p style="margin:0 0 20px;color:#475569;font-size:15px;line-height:1.7;">
                        Thank you for contacting <strong style="color:#0ea5e9;">AK Webflair Technologies</strong>. We have successfully received your message and our team will review it shortly.
                      </p>
                      <p style="margin:0 0 28px;color:#475569;font-size:15px;line-height:1.7;">
                        We typically respond within <strong>24–48 business hours</strong>. If your query is urgent, feel free to reply directly to this email.
                      </p>

                      <!-- Divider -->
                      <hr style="border:none;border-top:1px solid #e2e8f0;margin:0 0 24px;" />

                      <p style="margin:0;color:#64748b;font-size:13px;line-height:1.6;">
                        Warm regards,<br/>
                        <strong style="color:#0f172a;font-size:14px;">Kavin M M</strong><br/>
                        <span style="color:#0ea5e9;">Founder & CEO, AK Webflair Technologies</span>
                      </p>
                    </td>
                  </tr>

                  <!-- FOOTER -->
                  <tr>
                    <td style="background:#0f172a;padding:24px 40px;text-align:center;">
                      <p style="margin:0;color:#38bdf8;font-size:13px;font-weight:600;">AK Webflair Technologies</p>
                      <p style="margin:4px 0 0;color:#64748b;font-size:12px;">Founder & CEO — Kavin M</p>
                      <p style="margin:10px 0 0;color:#334155;font-size:11px;">You are receiving this because you submitted a contact form on our website.</p>
                    </td>
                  </tr>

                </table>
              </td>
            </tr>
          </table>
        </body>
        </html>
      `,
      attachments: [
        {
          filename: 'logo.jpg',
          path: logoPath,
          cid: 'akwlogo',
        },
      ],
    };

    // Send both emails in parallel (faster!)
    const [adminResult, autoReplyResult] = await Promise.allSettled([
      sendMailWithRetry(transporter, adminMail, 2, 1000),
      sendMailWithRetry(transporter, autoReplyMail, 2, 1000),
    ]);

    if (adminResult.status === 'fulfilled' && adminResult.value) {
      console.log('✅ Admin email sent successfully');
    } else {
      console.error('❌ Admin email failed');
    }

    if (autoReplyResult.status === 'fulfilled' && autoReplyResult.value) {
      console.log('✅ Auto-reply email sent successfully');
    } else {
      console.error('❌ Auto-reply email failed');
    }

    transporter.close();

  } catch (err) {
    console.error('❌ Background processing failed:', err.message);
    console.error('Stack trace:', err.stack);
  }
}

/* ================================
   FEEDBACK ROUTE
================================ */
app.use('/api/feedback', feedbackRoutes);

/* ================================
   TIMEOUT & 404
================================ */
app.use((req, res, next) => {
  res.setTimeout(15000, () => {
    console.warn('⚠️ Request timeout');
    res.status(504).json({ message: 'Request timed out' });
  });
  next();
});

app.use((req, res) => {
  res.status(404).json({ message: '❌ Route not found' });
});

/* ================================
   GLOBAL ERROR HANDLERS
================================ */
process.on('unhandledRejection', (err) => {
  console.error('❌ Unhandled Rejection:', err);
});
process.on('uncaughtException', (err) => {
  console.error('❌ Uncaught Exception:', err);
});

console.log('EMAIL_USER exists:', !!process.env.EMAIL_USER);
console.log('EMAIL_PASS exists:', !!process.env.EMAIL_PASS);
console.log('GOOGLE_SHEET_ID exists:', !!process.env.GOOGLE_SHEET_ID);

/* ================================
   SERVER START
================================ */
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});