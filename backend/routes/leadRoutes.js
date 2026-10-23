import express from 'express';
import Lead from '../models/Lead.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const router = express.Router();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const LEADS_FILE = path.join(__dirname, '..', 'data', 'leads.json');

// Ensure data directory exists
const dataDir = path.join(__dirname, '..', 'data');
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}
if (!fs.existsSync(LEADS_FILE)) {
  fs.writeFileSync(LEADS_FILE, JSON.stringify([]), 'utf-8');
}

// Helper to read JSON leads
const getJsonLeads = () => {
  try {
    const data = fs.readFileSync(LEADS_FILE, 'utf-8');
    return JSON.parse(data || '[]');
  } catch {
    return [];
  }
};

// Helper to write JSON leads
const saveJsonLeads = (leads) => {
  try {
    fs.writeFileSync(LEADS_FILE, JSON.stringify(leads, null, 2), 'utf-8');
    return true;
  } catch (err) {
    console.error('Failed to write leads.json:', err.message);
    return false;
  }
};

// GET all leads
router.get('/', async (req, res) => {
  try {
    let mongoLeads = [];
    if (Lead.db && Lead.db.readyState === 1) {
      mongoLeads = await Lead.find({}).sort({ createdAt: -1 });
    }
    const jsonLeads = getJsonLeads();
    
    // Combine & remove duplicate IDs
    const leadMap = new Map();
    [...mongoLeads, ...jsonLeads].forEach((item) => {
      const id = item._id || item.id;
      if (id && !leadMap.has(id)) {
        leadMap.set(id, item);
      }
    });

    const allLeads = Array.from(leadMap.values()).sort(
      (a, b) => new Date(b.createdAt || b.timestamp || 0) - new Date(a.createdAt || a.timestamp || 0)
    );

    res.json(allLeads);
  } catch (err) {
    res.json(getJsonLeads());
  }
});

// POST new lead
router.post('/', async (req, res) => {
  try {
    const { name, phone, email, service, budget, comment, mindsetIntent, suggestedStack, source, language } = req.body;

    if (!name || !phone) {
      return res.status(400).json({ success: false, message: 'Name and Phone are required' });
    }

    const newLeadData = {
      id: `lead_${Date.now()}`,
      name,
      phone,
      email: email || '',
      language: language || '',
      service: service || 'CRM & UI Dashboards',
      budget: budget || 'Standard',
      comment: comment || '',
      mindsetIntent: mindsetIntent || 'High Intent',
      suggestedStack: suggestedStack || 'React, Node.js, PostgreSQL',
      status: 'New',
      source: source || 'Naukri-Style AI Agent',
      createdAt: new Date().toISOString(),
    };

    // Save to Mongo if available
    let createdLead = newLeadData;
    if (Lead.db && Lead.db.readyState === 1) {
      try {
        const leadDoc = new Lead(newLeadData);
        createdLead = await leadDoc.save();
      } catch (mErr) {
        console.warn('Mongo lead save fallback:', mErr.message);
      }
    }

    // Always save to JSON file fallback
    const existing = getJsonLeads();
    existing.unshift(newLeadData);
    if (!saveJsonLeads(existing) && createdLead === newLeadData) {
      return res.status(500).json({ success: false, message: 'Failed to save lead to the configured storage' });
    }

    res.status(201).json({ success: true, message: 'Lead recorded successfully', lead: createdLead });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// PUT update lead status
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { status, callResult } = req.body;
  const updates = {};

  if (status !== undefined) {
    if (!['New', 'Contacted', 'In Discussion', 'Closed'].includes(status)) {
      return res.status(400).json({ success: false, message: 'Invalid lead status' });
    }
    updates.status = status;
  }

  if (callResult !== undefined) {
    if (!callResult || typeof callResult !== 'object' || Array.isArray(callResult)) {
      return res.status(400).json({ success: false, message: 'Call result must be an object' });
    }
    updates.callResult = callResult;
  }

  if (Object.keys(updates).length === 0) {
    return res.status(400).json({ success: false, message: 'No lead updates provided' });
  }

  try {
    if (Lead.db && Lead.db.readyState === 1 && Lead.db.base.isValidObjectId(id)) {
      await Lead.findByIdAndUpdate(id, updates, { runValidators: true });
    }
    const leads = getJsonLeads();
    const updated = leads.map((l) => (l._id === id || l.id === id ? { ...l, ...updates } : l));
    if (!saveJsonLeads(updated)) {
      return res.status(500).json({ success: false, message: 'Failed to save lead updates' });
    }

    res.json({ success: true, message: 'Lead updated successfully' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// DELETE lead
router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    if (Lead.db && Lead.db.readyState === 1) {
      await Lead.findByIdAndDelete(id);
    }
    const leads = getJsonLeads();
    const filtered = leads.filter((l) => l._id !== id && l.id !== id);
    saveJsonLeads(filtered);

    res.json({ success: true, message: 'Lead deleted' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

export default router;
