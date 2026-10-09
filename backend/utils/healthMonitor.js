import MonitoredService from '../models/MonitoredService.js';
import SystemLog from '../models/SystemLog.js';
import { sendTelegramAlert } from './telegramAlert.js';

// Default initial services to monitor (All 5 Render Deployed Backends)
const DEFAULT_SERVICES = [
  {
    name: 'Sakthi Frozen Foods E-Commerce',
    url: process.env.URL_SAKTHI_FROZEN_FOODS || 'https://sakthi-frozen-foods-e-commerce.onrender.com',
    healthPath: '/api/health',
    checkIntervalMinutes: 10,
    isActive: true,
  },
  {
    name: 'Chocolate Mine Client Project',
    url: process.env.URL_CHOCOLATE_MINE || 'https://chocolate-mine-client-project-mc7x.onrender.com',
    healthPath: '/health',
    checkIntervalMinutes: 10,
    isActive: true,
  },
  {
    name: 'Memories Platform Holidays Backend',
    url: process.env.URL_MEMORIES_PLATFORM || 'https://memories-platform-holidays-backend.onrender.com',
    healthPath: '/',
    checkIntervalMinutes: 10,
    isActive: true,
  },
  {
    name: 'Crazy Capture Studio Backend',
    url: process.env.URL_CRAZY_CAPTURE_STUDIO || 'https://crazy-capture-studio-backend.onrender.com',
    healthPath: '/',
    checkIntervalMinutes: 10,
    isActive: true,
  },
  {
    name: 'AK Webflair Portfolio Backend',
    url: process.env.URL_PORTFOLIO_BACKEND || 'https://portfolio-316h.onrender.com',
    healthPath: '/',
    checkIntervalMinutes: 10,
    isActive: true,
  },
];

/**
 * Initializes default services in the database if they don't exist
 */
export async function seedMonitoredServices() {
  try {
    for (const service of DEFAULT_SERVICES) {
      const exists = await MonitoredService.findOne({ name: service.name });
      if (!exists) {
        await MonitoredService.create(service);
        console.log(`📦 Seeded default service to monitor: ${service.name}`);
      } else {
        // Ensure URL and health path are updated
        exists.url = service.url;
        exists.healthPath = service.healthPath;
        await exists.save();
      }
    }
  } catch (error) {
    console.error('⚠️ Could not seed monitored services:', error.message);
  }
}


/**
 * Pings a single service, measures latency, detects cold boots & downtime, and triggers alerts
 */
export async function pingService(service) {
  const targetUrl = service.url.replace(/\/$/, '') + (service.healthPath.startsWith('/') ? service.healthPath : '/' + service.healthPath);
  const startTime = Date.now();
  let status = 'offline';
  let statusCode = null;
  let latencyMs = 0;
  let errorMessage = '';
  let telegramSent = false;

  const previousStatus = service.lastStatus || 'unknown';

  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 35000); // 35 seconds max timeout for cold boots

    const response = await fetch(targetUrl, {
      method: 'GET',
      signal: controller.signal,
      headers: {
        'User-Agent': 'AKWebflair-Uptime-Bot/1.0',
      },
    });

    clearTimeout(timeout);
    latencyMs = Date.now() - startTime;
    statusCode = response.status;

    if (response.ok || response.status === 304 || response.status === 200 || response.status === 401) {
      // Considered alive
      if (latencyMs > 12000) {
        // Cold start detection (woke up after sleep)
        status = 'cold_boot';
        console.log(`❄️ [COLD START] ${service.name} took ${(latencyMs / 1000).toFixed(1)}s to wake up.`);

        // Log cold start
        await SystemLog.create({
          projectName: service.name,
          level: 'warn',
          type: 'COLD_START',
          message: `Render free tier cold start detected (${(latencyMs / 1000).toFixed(1)}s response time). Server is now awake.`,
          statusCode,
          latencyMs,
          details: { url: targetUrl, responseTimeSec: (latencyMs / 1000).toFixed(1) },
          telegramSent: true,
        });

        telegramSent = await sendTelegramAlert({
          title: 'Render Free Tier Cold Start',
          level: 'warn',
          details: {
            'Project': service.name,
            'URL': targetUrl,
            'Wake-up Time': `${(latencyMs / 1000).toFixed(1)} seconds`,
            'Status': 'Awake & Active Now ✅',
          },
          footer: 'Keep-alive ping will now prevent server from sleeping.',
        });
      } else {
        status = 'online';
      }

      // If it was offline and is now back online, send recovery alert!
      if (previousStatus === 'offline') {
        await sendTelegramAlert({
          title: 'Service Recovered (Back Online)',
          level: 'info',
          details: {
            'Project': service.name,
            'URL': targetUrl,
            'Status Code': statusCode,
            'Latency': `${latencyMs}ms`,
          },
          footer: 'The service is responding normally again.',
        });
      }

      service.consecutiveFailures = 0;
      service.lastError = '';
    } else {
      // Server returned HTTP 500, 502, 503, 504 etc.
      status = 'offline';
      errorMessage = `HTTP ${response.status} ${response.statusText}`;
      service.consecutiveFailures = (service.consecutiveFailures || 0) + 1;
      service.lastError = errorMessage;

      await SystemLog.create({
        projectName: service.name,
        level: 'critical',
        type: 'SERVER_DOWN',
        message: `Server returned error status: ${errorMessage}`,
        statusCode,
        latencyMs,
        details: { url: targetUrl, error: errorMessage },
        telegramSent: true,
      });

      telegramSent = await sendTelegramAlert({
        title: 'Critical: Server Error Status',
        level: 'critical',
        details: {
          'Project': service.name,
          'URL': targetUrl,
          'Status Code': `${statusCode} (${response.statusText})`,
          'Consecutive Failures': service.consecutiveFailures,
        },
        footer: 'Check deployment logs on Render/Server immediately!',
      });
    }
  } catch (error) {
    latencyMs = Date.now() - startTime;
    status = 'offline';
    errorMessage = error.name === 'AbortError' ? 'Request Timed Out (35s Limit)' : error.message;
    service.consecutiveFailures = (service.consecutiveFailures || 0) + 1;
    service.lastError = errorMessage;

    // Only alert if it's the first failure or every 3rd failure to prevent spam
    if (service.consecutiveFailures === 1 || service.consecutiveFailures % 3 === 0) {
      await SystemLog.create({
        projectName: service.name,
        level: 'critical',
        type: 'SERVER_DOWN',
        message: `Service unreachable or crashed: ${errorMessage}`,
        statusCode: 0,
        latencyMs,
        details: { url: targetUrl, error: errorMessage },
        telegramSent: true,
      });

      telegramSent = await sendTelegramAlert({
        title: 'Critical: Server Down / Unreachable',
        level: 'critical',
        details: {
          'Project': service.name,
          'URL': targetUrl,
          'Error Reason': errorMessage,
          'Consecutive Failures': service.consecutiveFailures,
        },
        footer: 'Server did not respond. Check hosting provider.',
      });
    }
  }

  // Update service state in database
  service.lastStatus = status;
  service.lastStatusCode = statusCode;
  service.lastLatencyMs = latencyMs;
  service.lastChecked = new Date();

  await service.save();

  return {
    name: service.name,
    status,
    statusCode,
    latencyMs,
    errorMessage,
    lastChecked: service.lastChecked,
  };
}

/**
 * Pings all active monitored services
 */
export async function checkAllServices() {
  try {
    const services = await MonitoredService.find({ isActive: true });
    if (!services || services.length === 0) {
      await seedMonitoredServices();
      return;
    }

    console.log(`🔍 [HEALTH MONITOR] Checking ${services.length} services...`);
    for (const service of services) {
      // Don't alert if local backend is testing localhost and offline in non-dev
      if (service.url.includes('localhost') && process.env.NODE_ENV === 'production') {
        continue;
      }
      await pingService(service);
    }
  } catch (error) {
    console.error('❌ Error during health check cycle:', error.message);
  }
}

/**
 * Starts the recurring health check & Render Keep-Alive worker (every 10 minutes)
 */
export function startHealthMonitor(intervalMinutes = 10) {
  console.log(`⏰ Starting Health Monitor & Render Keep-Alive (every ${intervalMinutes} mins)...`);
  
  // Seed first
  seedMonitoredServices().then(() => {
    // Initial run after 5 seconds
    setTimeout(() => {
      checkAllServices();
    }, 5000);
  });

  // Recurring loop
  const intervalMs = intervalMinutes * 60 * 1000;
  setInterval(() => {
    checkAllServices();
  }, intervalMs);
}
