// import express from 'express';
// import { google } from 'googleapis';
// import dotenv from 'dotenv';

// dotenv.config();
// const router = express.Router();

// // 🔐 Google Auth Safe Init
// let auth;
// try {
//   const credentials = JSON.parse(process.env.GOOGLE_CREDENTIALS);
//   auth = new google.auth.JWT({
//     email: credentials.client_email,
//     key: credentials.private_key.replace(/\\n/g, '\n'),
//     scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
//   });
// } catch (err) {
//   console.error('❌ Google Auth Error in feedbackRoutes:', err.message);
// }

// router.get('/', async (req, res) => {
//   try {
//     const sheets = google.sheets({ version: 'v4', auth });
//     const response = await sheets.spreadsheets.values.get({
//       spreadsheetId: process.env.GOOGLE_SHEET_ID,
//       range: 'Feedback!A2:C',
//     });

//     const rows = response.data.values || [];

//     const reviews = rows.map((row, index) => ({
//       id: index,
//       name: row[0] || 'Anonymous',
//       comment: row[1] || '',
//       rating: row[2] || '',
//       date: new Date().toISOString(), // Or fetch actual date if available
//     }));

//     res.status(200).json({ reviews });
//   } catch (error) {
//     console.error('❌ Error fetching feedback:', error.message);
//     res.status(500).json({ message: 'Failed to fetch feedback' });
//   }
// });

// export default router;



import express from 'express';
import { google } from 'googleapis';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import Review from './models/Review.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = express.Router();

// 🔐 Google Auth Safe Init
let auth;
try {
  if (process.env.GOOGLE_CREDENTIALS) {
    const credentials = JSON.parse(process.env.GOOGLE_CREDENTIALS);
    auth = new google.auth.JWT({
      email: credentials.client_email,
      key: credentials.private_key.replace(/\\n/g, '\n'),
      scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
    });
  }
} catch (err) {
  console.error('❌ Google Auth Error:', err.message);
}

// Helper to load stored reviews from DB / JSON
async function getStoredReviews() {
  try {
    if (process.env.MONGODB_URI) {
      const dbReviews = await Review.find({});
      if (dbReviews && dbReviews.length > 0) return dbReviews;
    }

    const localPath = path.join(__dirname, 'data', 'reviews.json');
    if (fs.existsSync(localPath)) {
      return JSON.parse(fs.readFileSync(localPath, 'utf-8'));
    }

    const seedPath = path.join(__dirname, 'reviews_seed.json');
    if (fs.existsSync(seedPath)) {
      return JSON.parse(fs.readFileSync(seedPath, 'utf-8'));
    }
  } catch (err) {
    console.error('❌ Error getting stored reviews:', err.message);
  }
  return [];
}

// ✅ GET Reviews
router.get('/', async (req, res) => {
  try {
    const stored = await getStoredReviews();
    let sheetReviews = [];

    if (auth && process.env.GOOGLE_SHEET_ID) {
      try {
        const sheets = google.sheets({ version: 'v4', auth });
        const response = await sheets.spreadsheets.values.get({
          spreadsheetId: process.env.GOOGLE_SHEET_ID,
          range: 'Feedback!A2:E',
        });

        const rows = response.data.values || [];
        sheetReviews = rows.map((row, index) => ({
          id: `sheet-${index}`,
          name: row[0] || 'Anonymous',
          comment: row[1] || '',
          rating: Number(row[2]) || 5,
          photo: row[3] || null,
          date: row[4] ? (isNaN(Date.parse(row[4])) ? row[4] : new Date(row[4]).toISOString()) : 'Recent',
        }));
      } catch (sheetErr) {
        console.warn('⚠️ Google Sheets fetch failed, using stored DB reviews:', sheetErr.message);
      }
    }

    // Merge stored DB reviews and sheet reviews, eliminating duplicates by name
    const combined = [...stored];
    for (const sr of sheetReviews) {
      if (!combined.some(c => c.name.toLowerCase() === sr.name.toLowerCase())) {
        combined.push(sr);
      }
    }

    return res.status(200).json({ reviews: combined.length > 0 ? combined : stored });

  } catch (error) {
    console.warn('⚠️ Error in feedback endpoint, serving stored DB reviews:', error.message);
    const stored = await getStoredReviews();
    res.status(200).json({ reviews: stored });
  }
});

export default router;