import mongoose from 'mongoose';

const systemLogSchema = new mongoose.Schema({
  projectName: {
    type: String,
    required: true,
    index: true,
  },
  environment: {
    type: String,
    default: 'production',
  },
  level: {
    type: String,
    enum: ['info', 'warn', 'error', 'critical'],
    default: 'info',
    index: true,
  },
  type: {
    type: String,
    default: 'GENERAL_LOG',
    index: true,
  },
  message: {
    type: String,
    required: true,
  },
  details: {
    type: Object,
    default: {},
  },
  statusCode: {
    type: Number,
  },
  latencyMs: {
    type: Number,
  },
  telegramSent: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    index: true,
  },
});

export default mongoose.model('SystemLog', systemLogSchema);
