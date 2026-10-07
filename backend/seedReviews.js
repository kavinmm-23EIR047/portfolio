import mongoose from 'mongoose';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import Review from './models/Review.js';
import connectDB from './config/db.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const seedReviews = async () => {
  try {
    const seedPath = path.join(__dirname, 'reviews_seed.json');
    const rawData = fs.readFileSync(seedPath, 'utf-8');
    const reviewsData = JSON.parse(rawData);

    // Save locally to data/reviews.json as file-based storage fallback
    const dataDir = path.join(__dirname, 'data');
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }
    fs.writeFileSync(path.join(dataDir, 'reviews.json'), JSON.stringify(reviewsData, null, 2), 'utf-8');
    console.log('✅ Google Reviews saved to backend/data/reviews.json');

    if (process.env.MONGODB_URI) {
      await connectDB();
      await Review.deleteMany({});
      console.log('🗑️ Cleared existing reviews from collection...');

      const inserted = await Review.insertMany(reviewsData);
      console.log(`✅ Successfully seeded ${inserted.length} Google Reviews into MongoDB!`);
    } else {
      console.log('⚠️ MONGODB_URI not provided. Skipping MongoDB insert, stored in reviews.json.');
    }

    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding reviews:', error.message);
    process.exit(1);
  }
};

seedReviews();
