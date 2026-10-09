import express from 'express';
import SystemLog from '../models/SystemLog.js';
import { sendTelegramAlert } from '../utils/telegramAlert.js';

const router = express.Router();

// Ingest remote log from ANY deployed project or frontend
router.post('/ingest', async (req, res) => {
  try {
    const {
      projectName = 'Unknown Project',
      environment = 'production',
      level = 'info',
      type = 'GENERAL_LOG',
      message = 'No message provided',
      details = {},
      statusCode,
      latencyMs,
    } = req.body;

    let telegramSent = false;

    // Send immediate Telegram alert for critical errors, quota limits, or uncaught exceptions
    if (level === 'critical' || level === 'error' || type === 'EMAIL_QUOTA_EXCEEDED' || type === 'EMAIL_FAILURE') {
      telegramSent = await sendTelegramAlert({
        title: `${projectName} - ${type.replace(/_/g, ' ')}`,
        level,
        details: {
          'Project': projectName,
          'Environment': environment,
          'Message': message,
          ...(statusCode ? { 'Status Code': statusCode } : {}),
          ...details,
        },
        footer: 'Received via Central Remote Log Ingestion API',
      });
    }

    const newLog = await SystemLog.create({
      projectName,
      environment,
      level,
      type,
      message,
      details,
      statusCode,
      latencyMs,
      telegramSent,
    });

    res.status(201).json({ success: true, logId: newLog._id, telegramSent });
  } catch (error) {
    console.error('Log ingestion error:', error.message);
    res.status(500).json({ success: false, message: error.message });
  }
});

// GET logs for Admin Dashboard
router.get('/', async (req, res) => {
  try {
    const { project, level, type, search, limit = 100 } = req.query;
    const filter = {};

    if (project && project !== 'ALL') {
      filter.projectName = project;
    }
    if (level && level !== 'ALL') {
      filter.level = level;
    }
    if (type && type !== 'ALL') {
      filter.type = type;
    }
    if (search) {
      filter.message = { $regex: search, $options: 'i' };
    }

    const logs = await SystemLog.find(filter)
      .sort({ createdAt: -1 })
      .limit(Number(limit));

    const totalCount = await SystemLog.countDocuments(filter);
    const criticalCount = await SystemLog.countDocuments({ level: 'critical' });
    const warnCount = await SystemLog.countDocuments({ level: 'warn' });

    res.json({
      success: true,
      logs,
      totalCount,
      criticalCount,
      warnCount,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// DELETE clear logs
router.delete('/clear', async (req, res) => {
  try {
    await SystemLog.deleteMany({});
    res.json({ success: true, message: 'All logs cleared successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

export default router;
