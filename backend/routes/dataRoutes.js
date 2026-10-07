import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import Project from '../models/Project.js';
import TrustedPartner from '../models/TrustedPartner.js';
import Service from '../models/Service.js';
import Review from '../models/Review.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = express.Router();

// ----------------------------------------------------
// PROJECT ROUTES
// ----------------------------------------------------
router.route('/projects')
  .get(async (req, res) => {
    try {
      const projects = await Project.find({});
      res.json(projects);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  })
  .post(async (req, res) => {
    try {
      const project = new Project(req.body);
      const createdProject = await project.save();
      res.status(201).json(createdProject);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });

// ----------------------------------------------------
// TRUSTED PARTNER ROUTES
// ----------------------------------------------------
router.route('/partners')
  .get(async (req, res) => {
    try {
      const partners = await TrustedPartner.find({});
      res.json(partners);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  })
  .post(async (req, res) => {
    try {
      const partner = new TrustedPartner(req.body);
      const createdPartner = await partner.save();
      res.status(201).json(createdPartner);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });

// ----------------------------------------------------
// SERVICE ROUTES
// ----------------------------------------------------
router.route('/services')
  .get(async (req, res) => {
    try {
      const services = await Service.find({});
      res.json(services);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  })
  .post(async (req, res) => {
    try {
      const service = new Service(req.body);
      const createdService = await service.save();
      res.status(201).json(createdService);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });

// ----------------------------------------------------
// REVIEW ROUTES
// ----------------------------------------------------
router.route('/reviews')
  .get(async (req, res) => {
    try {
      if (process.env.MONGODB_URI) {
        const dbReviews = await Review.find({});
        if (dbReviews && dbReviews.length > 0) {
          return res.json({ reviews: dbReviews });
        }
      }
      
      const localPath = path.join(__dirname, '..', 'data', 'reviews.json');
      if (fs.existsSync(localPath)) {
        const raw = fs.readFileSync(localPath, 'utf-8');
        return res.json({ reviews: JSON.parse(raw) });
      }

      const seedPath = path.join(__dirname, '..', 'reviews_seed.json');
      if (fs.existsSync(seedPath)) {
        const raw = fs.readFileSync(seedPath, 'utf-8');
        return res.json({ reviews: JSON.parse(raw) });
      }

      res.json({ reviews: [] });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  })
  .post(async (req, res) => {
    try {
      let createdReview;
      if (process.env.MONGODB_URI) {
        const review = new Review(req.body);
        createdReview = await review.save();
      } else {
        createdReview = { id: Date.now(), ...req.body };
      }

      const localPath = path.join(__dirname, '..', 'data', 'reviews.json');
      let existing = [];
      if (fs.existsSync(localPath)) {
        existing = JSON.parse(fs.readFileSync(localPath, 'utf-8'));
      }
      existing.unshift(req.body);
      fs.writeFileSync(localPath, JSON.stringify(existing, null, 2), 'utf-8');

      res.status(201).json(createdReview);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });

// ----------------------------------------------------
// SEED GOOGLE REVIEWS INTO DB
// ----------------------------------------------------
router.post('/reviews/seed', async (req, res) => {
  try {
    const seedPath = path.join(__dirname, '..', 'reviews_seed.json');
    if (!fs.existsSync(seedPath)) {
      return res.status(404).json({ success: false, message: 'reviews_seed.json not found' });
    }

    const raw = fs.readFileSync(seedPath, 'utf-8');
    const reviewsData = JSON.parse(raw);

    // Save to local JSON file
    const dataDir = path.join(__dirname, '..', 'data');
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }
    fs.writeFileSync(path.join(dataDir, 'reviews.json'), JSON.stringify(reviewsData, null, 2), 'utf-8');

    let insertedCount = 0;
    if (process.env.MONGODB_URI) {
      await Review.deleteMany({});
      const inserted = await Review.insertMany(reviewsData);
      insertedCount = inserted.length;
    }

    res.json({
      success: true,
      message: `✅ Successfully stored ${reviewsData.length} Google Reviews into database and local file!`,
      count: insertedCount || reviewsData.length,
      mongoConnected: !!process.env.MONGODB_URI,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

export default router;
