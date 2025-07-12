import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import bodyParser from 'body-parser';
import { google } from 'googleapis';
import nodemailer from 'nodemailer';
import feedbackRoutes from './feedbackRoutes.js'; // ✅ corrected path

dotenv.config();
const app = express();
app.use(cors());
app.use(bodyParser.json());

// 🔐 Google Sheets Authentication
const credentials = JSON.parse(process.env.GOOGLE_CREDENTIALS);
const auth = new google.auth.JWT({
  email: credentials.client_email,
  key: credentials.private_key.replace(/\\n/g, '\n'),
  scopes: ['https://www.googleapis.com/auth/spreadsheets'],
});

// ✉️ Nodemailer setup
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// 📩 Contact form route
app.post('/api/contact', async (req, res) => {
  try {
    const { name, email, phone, comment } = req.body;
    const timestamp = new Date().toISOString();

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

    // Email to admin
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

    // Auto-reply to user
    await transporter.sendMail({
      from: `"Portfolio Team" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: '✅ Thanks for contacting us!',
      html: `
        <p>Hi <strong>${name}</strong>,</p>
        <p>Thank you for contacting us! We’ve received your message and will get back to you soon.</p>
        <br />
        <p>Regards,<br/>Portfolio Team</p>
      `,
    });

    res.status(200).json({ success: true, message: '✅ Message saved and emails sent!' });
  } catch (error) {
    console.error('❌ Error:', error);
    res.status(500).json({ success: false, message: '❌ Failed to process contact form' });
  }
});

// 🧾 Feedback route (for reviews)
app.use('/api/feedback', feedbackRoutes);

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`✅ Server is running at http://localhost:${PORT}`);
});
