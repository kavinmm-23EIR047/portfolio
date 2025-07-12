import express from 'express';
import { google } from 'googleapis';
import dotenv from 'dotenv';

dotenv.config();
const router = express.Router();

// 🔐 Google Auth Safe Init
let auth;
try {
  const credentials = JSON.parse(process.env.GOOGLE_CREDENTIALS);
  auth = new google.auth.JWT({
    email: credentials.client_email,
    key: credentials.private_key.replace(/\\n/g, '\n'),
    scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
  });
} catch (err) {
  console.error('❌ Google Auth Error in feedbackRoutes:', err.message);
}

router.get('/', async (req, res) => {
  try {
    const sheets = google.sheets({ version: 'v4', auth });
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: process.env.GOOGLE_SHEET_ID,
      range: 'Feedback!A2:C',
    });

    const rows = response.data.values || [];

    const reviews = rows.map((row, index) => ({
      id: index,
      name: row[0] || 'Anonymous',
      comment: row[1] || '',
      rating: row[2] || '',
      date: new Date().toISOString(), // Or fetch actual date if available
    }));

    res.status(200).json({ reviews });
  } catch (error) {
    console.error('❌ Error fetching feedback:', error.message);
    res.status(500).json({ message: 'Failed to fetch feedback' });
  }
});

export default router;
