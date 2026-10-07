import mongoose from 'mongoose';

const leadSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String, default: '' },
    service: { type: String, default: 'CRM & UI Dashboards' },
    budget: { type: String, default: 'Standard' },
    comment: { type: String, default: '' },
    mindsetIntent: { type: String, default: 'High Intent' },
    suggestedStack: { type: String, default: 'React, Node.js, PostgreSQL' },
    status: { type: String, default: 'New' }, // New, Contacted, In Discussion, Closed
    source: { type: String, default: 'Naukri-Style AI Agent' }, // Chatbot, Contact Form, Python Agent
  },
  { timestamps: true }
);

const Lead = mongoose.model('Lead', leadSchema);
export default Lead;
