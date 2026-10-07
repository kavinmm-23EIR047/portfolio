import mongoose from 'mongoose';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import Project from './models/Project.js';
import connectDB from './config/db.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const seedProjects = async () => {
  try {
    if (!process.env.MONGODB_URI) {
      console.error('❌ MONGODB_URI is not defined in .env');
      process.exit(1);
    }

    await connectDB();

    const rawData = fs.readFileSync(path.join(__dirname, 'projects_seed.json'), 'utf-8');
    const projectsData = JSON.parse(rawData);

    // Clear existing projects if desired or insert new
    await Project.deleteMany({});
    console.log('🗑️ Cleared existing projects from collection...');

    const inserted = await Project.insertMany(projectsData);
    console.log(`✅ Successfully seeded ${inserted.length} projects into MongoDB!`);

    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding projects:', error.message);
    process.exit(1);
  }
};

seedProjects();
