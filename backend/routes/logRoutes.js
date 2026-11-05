import express from 'express';
import SystemLog from '../models/SystemLog.js';
import { sendTelegramAlert } from '../utils/telegramAlert.js';
import { getHttpErrorInfo, HTTP_ERROR_CATALOG } from '../utils/httpErrorGuide.js';

const router = express.Router();

// GET HTTP Error Catalog for reference & Admin Dashboard
router.get('/catalog', (req, res) => {
  res.json({ success: true, catalog: HTTP_ERROR_CATALOG });
});

// Ingest remote log from ANY deployed project or frontend
router.post('/ingest', async (req, res) => {
  try {
    const {
      projectName = 'Unknown Project',
      environment = 'production',
      level: inputLevel,
      type = 'GENERAL_LOG',
      message = 'No message provided',
      details = {},
      statusCode,
      latencyMs,
    } = req.body;

    const numericStatus = statusCode ? parseInt(statusCode, 10) : null;
    const isStatusError = numericStatus && numericStatus >= 400;

    // Retrieve rich error guidance if status code exists
    const errorGuide = numericStatus ? getHttpErrorInfo(numericStatus, message) : null;

    // Determine severity level automatically if not explicitly provided
    let level = inputLevel;
    if (!level) {
      if (numericStatus >= 500) {
        level = 'critical';
      } else if (numericStatus >= 400) {
        level = 'warn';
      } else {
        level = 'info';
      }
    }

    // Enrich log details with actionable resolution and explanation
    const enrichedDetails = {
      ...details,
      ...(errorGuide?.issue && !details.issue ? { issue: errorGuide.issue } : {}),
      ...(errorGuide?.whatHappened && !details.whatHappened ? { whatHappened: errorGuide.whatHappened } : {}),
      ...(errorGuide?.resolution && !details.resolution ? { resolution: errorGuide.resolution } : {}),
    };

    let telegramSent = false;

    // Trigger Telegram alert for critical/error logs, status errors (401, 403, 429, 500 etc), or quota issues
    const shouldAlert =
      level === 'critical' ||
      level === 'error' ||
      isStatusError ||
      type === 'EMAIL_QUOTA_EXCEEDED' ||
      type === 'EMAIL_FAILURE' ||
      type === 'STATUS_ERROR';

    if (shouldAlert) {
      const alertTitle = errorGuide
        ? `${projectName} - ${errorGuide.status} ${errorGuide.name}`
        : `${projectName} - ${type.replace(/_/g, ' ')}`;

      const alertDetails = {
        'Project': projectName,
        'Environment': environment,
        ...(numericStatus ? { 'Status Code': `${numericStatus} (${errorGuide?.name || 'Error'})` } : {}),
        ...(enrichedDetails.issue ? { 'Issue': enrichedDetails.issue } : {}),
        ...(enrichedDetails.whatHappened ? { 'What Happened': enrichedDetails.whatHappened } : {}),
        ...(enrichedDetails.resolution ? { 'How to Resolve': enrichedDetails.resolution } : {}),
        ...(details.endpoint ? { 'Endpoint': details.endpoint } : {}),
        ...(details.method ? { 'Method': details.method } : {}),
        'Message': message,
      };

      telegramSent = await sendTelegramAlert({
        title: alertTitle,
        level: level === 'critical' ? 'critical' : 'warn',
        details: alertDetails,
        footer: 'Dispatched via Central Project Remote Log Ingestion API',
      });
    }

    const newLog = await SystemLog.create({
      projectName,
      environment,
      level,
      type: isStatusError && type === 'GENERAL_LOG' ? 'STATUS_ERROR' : type,
      message,
      details: enrichedDetails,
      statusCode: numericStatus,
      latencyMs,
      telegramSent,
    });

    res.status(201).json({
      success: true,
      logId: newLog._id,
      telegramSent,
      errorInfo: errorGuide || null,
    });
  } catch (error) {
    console.error('Log ingestion error:', error.message);
    res.status(500).json({ success: false, message: error.message });
  }
});

// GET logs for Admin Dashboard with pagination and filtering
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
