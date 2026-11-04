import SystemLog from '../models/SystemLog.js';
import { sendTelegramAlert } from './telegramAlert.js';

// Previous status tracking for alert deduplication
const statusHistory = {
  sakthiBrevo: 'unknown',
  sakthiTelegram: 'unknown',
  chocolateMineBrevo: 'unknown',
  chocolateMineTelegram: 'unknown',
};

// In-memory cache for ultra-fast dashboard queries
let cachedClientServices = null;
let lastCheckedTimestamp = null;

/**
 * Generic Brevo Account API and Daily Quota Health Check
 */
async function checkBrevoAccount({
  id,
  projectName,
  serviceType = 'Email (Brevo API)',
  apiKey,
  envKeyName,
  statusKey,
}) {
  const startTime = Date.now();

  if (!apiKey) {
    return {
      id,
      projectName,
      serviceType,
      status: 'error',
      statusCode: null,
      latencyMs: 0,
      details: { error: `${envKeyName} is not configured in backend .env` },
      lastChecked: new Date(),
    };
  }

  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 12000);

    const response = await fetch('https://api.brevo.com/v3/account', {
      method: 'GET',
      headers: {
        'accept': 'application/json',
        'api-key': apiKey,
      },
      signal: controller.signal,
    });

    clearTimeout(timeout);
    const latencyMs = Date.now() - startTime;

    if (!response.ok) {
      const errData = await response.json().catch(() => ({}));
      const errorMsg = errData.message || `HTTP ${response.status} ${response.statusText}`;

      // Status changed to error -> Alert!
      if (statusHistory[statusKey] !== 'error') {
        statusHistory[statusKey] = 'error';

        await SystemLog.create({
          projectName,
          level: 'critical',
          type: 'EMAIL_FAILURE',
          message: `Brevo Email API failed: ${errorMsg}`,
          statusCode: response.status,
          latencyMs,
          details: { error: errorMsg },
          telegramSent: true,
        });

        await sendTelegramAlert({
          title: `${projectName} - Brevo Email Failed`,
          level: 'critical',
          details: {
            'Project': projectName,
            'Service': 'Brevo Email API',
            'Status': `HTTP ${response.status} Failed`,
            'Error Reason': errorMsg,
          },
          footer: 'Action Required: Check Brevo API Key or account standing.',
        });
      }

      return {
        id,
        projectName,
        serviceType,
        status: 'error',
        statusCode: response.status,
        latencyMs,
        details: { error: errorMsg },
        lastChecked: new Date(),
      };
    }

    const data = await response.json();
    const plan = data.plan?.[0] || {};
    const remainingCredits = plan.credits ?? 'Unknown';
    const planType = plan.type || 'Free';
    const relayEnabled = data.relay?.enabled ?? false;

    // Check if credits are low / depleted (< 15 emails remaining)
    const isQuotaExceeded = typeof remainingCredits === 'number' && remainingCredits <= 0;
    const isQuotaWarning = typeof remainingCredits === 'number' && remainingCredits <= 15 && remainingCredits > 0;

    let currentStatus = 'healthy';
    if (isQuotaExceeded) currentStatus = 'quota_exceeded';
    else if (isQuotaWarning) currentStatus = 'quota_warning';

    // Trigger quota alert if state transitioned
    if (isQuotaExceeded && statusHistory[statusKey] !== 'quota_exceeded') {
      statusHistory[statusKey] = 'quota_exceeded';

      await SystemLog.create({
        projectName,
        level: 'critical',
        type: 'EMAIL_QUOTA_EXCEEDED',
        message: `Brevo Daily Email Limit Exceeded! 0 credits remaining.`,
        statusCode: 200,
        latencyMs,
        details: { credits: remainingCredits, plan: planType },
        telegramSent: true,
      });

      await sendTelegramAlert({
        title: `${projectName} - Email Limit Exceeded`,
        level: 'critical',
        details: {
          'Project': projectName,
          'Service': 'Brevo Transactional Email',
          'Credits Remaining': `${remainingCredits} / 300 daily limit`,
          'Status': 'OUT OF CREDITS ❌',
        },
        footer: 'Customer notifications will NOT send until midnight reset or quota upgrade.',
      });
    } else if (isQuotaWarning && statusHistory[statusKey] !== 'quota_warning') {
      statusHistory[statusKey] = 'quota_warning';

      await sendTelegramAlert({
        title: `${projectName} - Email Quota Warning`,
        level: 'warn',
        details: {
          'Project': projectName,
          'Service': 'Brevo Transactional Email',
          'Remaining Credits': `${remainingCredits} emails left`,
          'Warning': 'Approaching daily 300 free limit',
        },
        footer: 'Monitor enquiries/orders or upgrade Brevo credits.',
      });
    } else if (currentStatus === 'healthy' && statusHistory[statusKey] !== 'healthy' && statusHistory[statusKey] !== 'unknown') {
      // Recovery Alert
      statusHistory[statusKey] = 'healthy';
      await sendTelegramAlert({
        title: `${projectName} - Email Restored`,
        level: 'info',
        details: {
          'Project': projectName,
          'Service': 'Brevo Email API',
          'Credits Available': `${remainingCredits}`,
          'Status': 'Active & Ready ✅',
        },
        footer: 'Email dispatch is operating normally.',
      });
    } else {
      statusHistory[statusKey] = currentStatus;
    }

    return {
      id,
      projectName,
      serviceType,
      status: currentStatus,
      statusCode: 200,
      latencyMs,
      details: {
        plan: planType,
        credits: remainingCredits,
        creditsType: plan.creditsType || 'daily send limit',
        relayActive: relayEnabled,
        accountEmail: data.email,
        companyName: data.companyName,
      },
      lastChecked: new Date(),
    };
  } catch (error) {
    const latencyMs = Date.now() - startTime;
    const errorMsg = error.name === 'AbortError' ? 'Brevo API Timed Out (12s limit)' : error.message;

    if (statusHistory[statusKey] !== 'error') {
      statusHistory[statusKey] = 'error';

      await sendTelegramAlert({
        title: `${projectName} - Brevo API Unreachable`,
        level: 'critical',
        details: {
          'Project': projectName,
          'Service': 'Brevo Email API',
          'Error Reason': errorMsg,
        },
        footer: 'Check internet connectivity or Brevo server status.',
      });
    }

    return {
      id,
      projectName,
      serviceType,
      status: 'error',
      statusCode: 0,
      latencyMs,
      details: { error: errorMsg },
      lastChecked: new Date(),
    };
  }
}

/**
 * Generic Telegram Bot Health Check
 */
async function checkTelegramBot({
  id,
  projectName,
  serviceType = 'Telegram Notification Bot',
  token,
  chatId,
  envTokenName,
  statusKey,
}) {
  const startTime = Date.now();

  if (!token) {
    return {
      id,
      projectName,
      serviceType,
      status: 'error',
      statusCode: null,
      latencyMs: 0,
      details: { error: `${envTokenName} not configured in backend .env` },
      lastChecked: new Date(),
    };
  }

  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 10000);

    const response = await fetch(`https://api.telegram.org/bot${token}/getMe`, {
      method: 'GET',
      signal: controller.signal,
    });

    clearTimeout(timeout);
    const latencyMs = Date.now() - startTime;
    const data = await response.json();

    if (!response.ok || !data.ok) {
      const errorMsg = data.description || `HTTP ${response.status} ${response.statusText}`;

      if (statusHistory[statusKey] !== 'error') {
        statusHistory[statusKey] = 'error';

        await SystemLog.create({
          projectName,
          level: 'critical',
          type: 'SERVER_DOWN',
          message: `Telegram Bot getMe failed: ${errorMsg}`,
          statusCode: response.status,
          latencyMs,
          details: { error: errorMsg },
          telegramSent: true,
        });

        await sendTelegramAlert({
          title: `${projectName} - Telegram Bot Failure`,
          level: 'critical',
          details: {
            'Project': projectName,
            'Service': serviceType,
            'Error Reason': errorMsg,
          },
          footer: 'Action Required: Check bot token with @BotFather.',
        });
      }

      return {
        id,
        projectName,
        serviceType,
        status: 'error',
        statusCode: response.status,
        latencyMs,
        details: { error: errorMsg },
        lastChecked: new Date(),
      };
    }

    const bot = data.result;

    // Recovery Alert if was down
    if (statusHistory[statusKey] === 'error') {
      await sendTelegramAlert({
        title: `${projectName} - Telegram Bot Restored`,
        level: 'info',
        details: {
          'Project': projectName,
          'Bot Name': bot.first_name,
          'Username': `@${bot.username}`,
          'Status': 'Bot Alive & Online ✅',
        },
        footer: 'Client notification alerts are functional.',
      });
    }
    statusHistory[statusKey] = 'healthy';

    return {
      id,
      projectName,
      serviceType,
      status: 'healthy',
      statusCode: 200,
      latencyMs,
      details: {
        botName: bot.first_name,
        botUsername: `@${bot.username}`,
        botId: bot.id,
        connectedGroup: chatId || 'Configured in client .env',
        canJoinGroups: bot.can_join_groups,
      },
      lastChecked: new Date(),
    };
  } catch (error) {
    const latencyMs = Date.now() - startTime;
    const errorMsg = error.name === 'AbortError' ? 'Telegram API Timed Out' : error.message;

    if (statusHistory[statusKey] !== 'error') {
      statusHistory[statusKey] = 'error';

      await sendTelegramAlert({
        title: `${projectName} - Telegram Bot Unreachable`,
        level: 'critical',
        details: {
          'Project': projectName,
          'Service': 'Telegram Bot API',
          'Error Reason': errorMsg,
        },
        footer: 'Check Telegram network or proxy availability.',
      });
    }

    return {
      id,
      projectName,
      serviceType,
      status: 'error',
      statusCode: 0,
      latencyMs,
      details: { error: errorMsg },
      lastChecked: new Date(),
    };
  }
}

/**
 * 1. Check Sakthi Frozen Foods Brevo Email API & Quota
 */
export async function checkSakthiBrevoEmail() {
  return checkBrevoAccount({
    id: 'sakthi-brevo',
    projectName: 'Sakthi Frozen Foods',
    serviceType: 'Email (Brevo API)',
    apiKey: process.env.SAKTHI_BREVO_API_KEY,
    envKeyName: 'SAKTHI_BREVO_API_KEY',
    statusKey: 'sakthiBrevo',
  });
}

/**
 * 2. Check Sakthi Frozen Foods Telegram Order Bot
 */
export async function checkSakthiTelegram() {
  return checkTelegramBot({
    id: 'sakthi-telegram',
    projectName: 'Sakthi Frozen Foods',
    serviceType: 'Telegram Notification Bot',
    token: process.env.SAKTHI_TELEGRAM_BOT_TOKEN,
    chatId: process.env.SAKTHI_TELEGRAM_CHAT_ID,
    envTokenName: 'SAKTHI_TELEGRAM_BOT_TOKEN',
    statusKey: 'sakthiTelegram',
  });
}

/**
 * 3. Check The Chocolate Mine Brevo Email API & Quota
 */
export async function checkChocolateMineBrevoEmail() {
  return checkBrevoAccount({
    id: 'chocolate-mine-brevo',
    projectName: 'The Chocolate Mine',
    serviceType: 'Email (Brevo API)',
    apiKey: process.env.CHOCOLATE_MINE_BREVO_API_KEY || process.env.BREVO_API_KEY,
    envKeyName: 'CHOCOLATE_MINE_BREVO_API_KEY',
    statusKey: 'chocolateMineBrevo',
  });
}

/**
 * Backward compatibility alias for Chocolate Mine email check
 */
export const checkChocolateMineSmtp = checkChocolateMineBrevoEmail;

/**
 * 4. Check The Chocolate Mine Telegram Alert Bot
 */
export async function checkChocolateMineTelegram() {
  return checkTelegramBot({
    id: 'chocolate-mine-telegram',
    projectName: 'The Chocolate Mine',
    serviceType: 'Telegram Notification Bot',
    token: process.env.CHOCOLATE_MINE_TELEGRAM_BOT_TOKEN,
    chatId: process.env.CHOCOLATE_MINE_TELEGRAM_CHAT_ID,
    envTokenName: 'CHOCOLATE_MINE_TELEGRAM_BOT_TOKEN',
    statusKey: 'chocolateMineTelegram',
  });
}

/**
 * 5. Run All Client Service Checks
 * @param {boolean} [forceTelegramSummary=false]
 */
export async function checkAllClientServices(forceTelegramSummary = false) {
  console.log('🔍 [CLIENT SERVICES MONITOR] Checking Sakthi Brevo & Telegram, Chocolate Mine Brevo & Telegram...');

  const [sakthiBrevoRes, sakthiTgRes, chocBrevoRes, chocTgRes] = await Promise.allSettled([
    checkSakthiBrevoEmail(),
    checkSakthiTelegram(),
    checkChocolateMineBrevoEmail(),
    checkChocolateMineTelegram(),
  ]);

  const services = [
    sakthiBrevoRes.status === 'fulfilled' ? sakthiBrevoRes.value : { id: 'sakthi-brevo', status: 'error', error: sakthiBrevoRes.reason },
    sakthiTgRes.status === 'fulfilled' ? sakthiTgRes.value : { id: 'sakthi-telegram', status: 'error', error: sakthiTgRes.reason },
    chocBrevoRes.status === 'fulfilled' ? chocBrevoRes.value : { id: 'chocolate-mine-brevo', status: 'error', error: chocBrevoRes.reason },
    chocTgRes.status === 'fulfilled' ? chocTgRes.value : { id: 'chocolate-mine-telegram', status: 'error', error: chocTgRes.reason },
  ];

  cachedClientServices = services;
  lastCheckedTimestamp = new Date();

  // If user requested manual test from admin dashboard, send summary to Telegram
  if (forceTelegramSummary) {
    const sakthiBrevoStatus = services[0].status === 'healthy' ? `✅ Healthy (${services[0].details?.credits ?? 0} Brevo credits)` : `❌ ${services[0].status}`;
    const sakthiTgStatus = services[1].status === 'healthy' ? `✅ Active (${services[1].details?.botUsername})` : `❌ ${services[1].details?.error || services[1].status}`;
    const chocBrevoStatus = services[2].status === 'healthy' ? `✅ Healthy (${services[2].details?.credits ?? 0} Brevo credits)` : `❌ ${services[2].status}`;
    const chocTgStatus = services[3].status === 'healthy' ? `✅ Active (${services[3].details?.botUsername})` : `❌ ${services[3].details?.error || services[3].status}`;

    await sendTelegramAlert({
      title: 'Manual Client Services Audit',
      level: services.some(s => s.status !== 'healthy') ? 'warn' : 'success',
      details: {
        'Sakthi Frozen Foods Email': sakthiBrevoStatus,
        'Sakthi Frozen Foods Telegram': sakthiTgStatus,
        'Chocolate Mine Email': chocBrevoStatus,
        'Chocolate Mine Telegram': chocTgStatus,
        'Audited By': 'AK Webflair Admin Control Center',
      },
      footer: 'Client project monitoring is operating strictly from central admin.',
    });
  }

  return {
    success: true,
    lastChecked: lastCheckedTimestamp,
    services,
  };
}

/**
 * Returns latest cached results or checks fresh if never run
 */
export async function getClientServicesStatus() {
  if (!cachedClientServices) {
    return await checkAllClientServices(false);
  }
  return {
    success: true,
    lastChecked: lastCheckedTimestamp,
    services: cachedClientServices,
  };
}
