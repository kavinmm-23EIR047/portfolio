import mongoose from 'mongoose';

const monitoredServiceSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  url: {
    type: String,
    required: true,
  },
  healthPath: {
    type: String,
    default: '/',
  },
  checkIntervalMinutes: {
    type: Number,
    default: 10,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  lastChecked: {
    type: Date,
    default: null,
  },
  lastStatus: {
    type: String,
    enum: ['online', 'offline', 'cold_boot', 'unknown'],
    default: 'unknown',
  },
  lastStatusCode: {
    type: Number,
    default: null,
  },
  lastLatencyMs: {
    type: Number,
    default: null,
  },
  consecutiveFailures: {
    type: Number,
    default: 0,
  },
  lastError: {
    type: String,
    default: '',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model('MonitoredService', monitoredServiceSchema);
