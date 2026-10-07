import mongoose from 'mongoose';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import TrustedPartner from './models/TrustedPartner.js';
import connectDB from './config/db.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const seedPartners = async () => {
  try {
    if (!process.env.MONGODB_URI) {
      console.error('❌ MONGODB_URI is not defined in .env');
      process.exit(1);
    }

    await connectDB();

    const rawData = fs.readFileSync(path.join(__dirname, 'partners_seed.json'), 'utf-8');
    const partnersData = JSON.parse(rawData);

    await TrustedPartner.deleteMany({});
    console.log('🗑️ Cleared existing trusted partners from collection...');

    const inserted = await TrustedPartner.insertMany(partnersData);
    console.log(`✅ Successfully seeded ${inserted.length} trusted partners into MongoDB!`);

    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding partners:', error.message);
    process.exit(1);
  }
};

seedPartners();
