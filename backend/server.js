import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import bodyParser from 'body-parser';
import { google } from 'googleapis';
import nodemailer from 'nodemailer';
import feedbackRoutes from './feedbackRoutes.js';

dotenv.config();

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
        pass: process.env.EMAIL_PASS, // Gmail App Password
      },
      pool: true, // Use connection pooling
      maxConnections: 1,
      maxMessages: 3,
    });

    // Admin email
    const adminMail = {
      from: `"Project Contact" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER,
      subject: `📬 New Contact Message from ${name}`,
      html: `
        <h3>New Contact Submission</h3>
        <p><b>Name:</b> ${name}</p>
        <p><b>Email:</b> ${email}</p>
        <p><b>Phone:</b> ${phone}</p>
        <p><b>Comment:</b> ${comment}</p>
        <p><i>${timestamp}</i></p>
      `,
    };

    // Auto-reply email
    const autoReplyMail = {
      from: `"Development Team" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: '✅ Thanks for contacting us!',
      html: `
        <p>Hi <strong>${name}</strong>,</p>
        <p>Thanks for reaching out! We have received your message and will get back to you soon.</p>
        <br/>
        <p>Regards,<br/>Development Team</p>
      `,
    };

    // Send both emails in parallel (faster!)
    const [adminResult, autoReplyResult] = await Promise.allSettled([
      sendMailWithRetry(transporter, adminMail, 2, 1000),
      sendMailWithRetry(transporter, autoReplyMail, 2, 1000),
    ]);

    // Log results
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

    // Close transporter
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