import mongoose from 'mongoose';

const businessProspectSchema = new mongoose.Schema(
  {
    // Retained as legacy identity fields so an existing MongoDB unique index stays compatible.
    osmType: { type: String, default: 'overture' },
    osmId: { type: String, default: '' },
    sourceType: { type: String, default: 'overture_places' },
    sourceId: { type: String, default: '' },
    name: { type: String, required: true, trim: true },
    category: { type: String, default: '' },
    phone: { type: String, default: '', trim: true },
    normalizedPhone: { type: String, default: '' },
    email: { type: String, default: '' },
    city: { type: String, default: '' },
    postalCode: { type: String, default: '' },
    websiteUrl: { type: String, default: '' },
    websiteStatus: { type: String, default: 'no_website_listed' },
    websiteHttpStatus: { type: Number, default: null },
    websiteFinalUrl: { type: String, default: '' },
    websiteCheckedAt: { type: Date, default: null },
    rating: { type: Number, default: null },
    reviewCount: { type: Number, default: null },
    ratingVerified: { type: Boolean, default: false },
    leadScore: { type: Number, default: 0 },
    leadPriority: { type: String, default: 'Low' },
    leadStatus: { type: String, default: 'New' },
    notes: { type: String, default: '' },
    address: { type: String, default: '' },
    district: { type: String, required: true },
    state: { type: String, required: true },
    latitude: { type: Number, default: null },
    longitude: { type: Number, default: null },
    sourceUrl: { type: String, required: true },
    source: { type: String, default: 'Overture Maps Places' },
  },
  { timestamps: true }
);

businessProspectSchema.index({ osmType: 1, osmId: 1 }, { unique: true });
businessProspectSchema.index({ sourceType: 1, sourceId: 1 }, { unique: true, sparse: true });
businessProspectSchema.index({ district: 1, state: 1, leadStatus: 1 });
businessProspectSchema.index({ name: 'text', category: 'text' });

const BusinessProspect = mongoose.model('BusinessProspect', businessProspectSchema);
export default BusinessProspect;
