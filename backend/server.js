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

// 🛠 Google Auth Setup (Crash-proof)
let auth;
try {
  const credentials = JSON.parse(process.env.GOOGLE_CREDENTIALS);
  auth = new google.auth.JWT({
    email: credentials.client_email,
    key: credentials.private_key.replace(/\\n/g, '\n'),
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  });
} catch (err) {
  console.error('❌ Failed to initialize Google Auth:', err.message);
}

// ✅ Health Check Route
app.get('/', (req, res) => {
  res.status(200).send('✅ Portfolio backend is running!');
});

// 📩 Contact Form
app.post('/api/contact', async (req, res) => {
  const { name, email, phone, comment } = req.body;
  if (!name || !email || !phone || !comment) {
    return res.status(400).json({ success: false, message: '❌ All fields required' });
  }

  const timestamp = new Date().toISOString();

  // Write to Google Sheet
  try {
    const sheets = google.sheets({ version: 'v4', auth });
    await sheets.spreadsheets.values.append({
      spreadsheetId: process.env.GOOGLE_SHEET_ID,
      range: 'Contact!A1:E1',
      valueInputOption: 'RAW',
      insertDataOption: 'INSERT_ROWS',
      requestBody: {
        values: [[name, email, phone, comment, timestamp]],
      },
    });
    console.log('✅ Contact data saved to Google Sheets');
  } catch (err) {
    console.error('❌ Google Sheets error:', err.message);
    return res.status(500).json({ success: false, message: 'Failed to save contact data' });
  }

  // Email Setup
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  // Send Admin Email
  try {
    await transporter.sendMail({
      from: `"Portfolio Contact" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER,
      subject: `📬 New Contact Message from ${name}`,
      html: `
        <h2>New Contact Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Comment:</strong> ${comment}</p>
        <p><em>Submitted at: ${new Date().toLocaleString()}</em></p>
      `,
    });
    console.log('📨 Admin email sent');
  } catch (err) {
    console.error('❌ Failed to send admin email:', err.message);
  }

  // Send Auto-reply
  try {
    await transporter.sendMail({
      from: `"Development Team" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: '✅ Thanks for contacting us!',
      html: `
        <p>Hi <strong>${name}</strong>,</p>
        <p>Thank you for contacting us! We’ve received your message and will get back to you soon.</p>
        <br />
        <p>Regards,<br/>Development Team</p>
      `,
    });
    console.log('📨 Auto-reply email sent');
  } catch (err) {
    console.error('❌ Failed to send auto-reply:', err.message);
  }

  res.status(200).json({ success: true, message: '✅ Message saved and emails sent!' });
});

// 🧾 Feedback route
app.use('/api/feedback', feedbackRoutes);

// 🧠 Timeout Middleware
app.use((req, res, next) => {
  res.setTimeout(15000, () => {
    console.warn('⚠️ Request timed out');
    res.status(504).json({ message: 'Request timed out' });
  });
  next();
});

// ❌ Fallback for invalid routes
app.use((req, res) => {
  res.status(404).json({ message: '❌ Route not found' });
});

// 🚨 Global Error Handlers
process.on('unhandledRejection', (err) => {
  console.error('❌ Unhandled Rejection:', err);
});
process.on('uncaughtException', (err) => {
  console.error('❌ Uncaught Exception:', err);
});

// ✅ Start server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`✅ Server is running at http://localhost:${PORT}`);
});
