import nodemailer from 'nodemailer';
import SystemLog from '../models/SystemLog.js';
import { sendTelegramAlert } from './telegramAlert.js';

// Previous status tracking for alert deduplication
const statusHistory = {
  sakthiBrevo: 'unknown',
  chocolateMineSmtp: 'unknown',
  chocolateMineTelegram: 'unknown',
};

// In-memory cache for ultra-fast dashboard queries
let cachedClientServices = null;
let lastCheckedTimestamp = null;

/**
 * 1. Check Sakthi Frozen Foods Brevo Email API & Quota
 */
export async function checkSakthiBrevoEmail() {
  const apiKey = process.env.SAKTHI_BREVO_API_KEY;
  const startTime = Date.now();

  if (!apiKey) {
    return {
      id: 'sakthi-brevo',
      projectName: 'Sakthi Frozen Foods',
      serviceType: 'Email (Brevo API)',
      status: 'error',
      statusCode: null,
      latencyMs: 0,
      details: { error: 'SAKTHI_BREVO_API_KEY is not configured in backend .env' },
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
      if (statusHistory.sakthiBrevo !== 'error') {
        statusHistory.sakthiBrevo = 'error';

        await SystemLog.create({
          projectName: 'Sakthi Frozen Foods',
          level: 'critical',
          type: 'EMAIL_FAILURE',
          message: `Brevo Email API failed: ${errorMsg}`,
          statusCode: response.status,
          latencyMs,
          details: { error: errorMsg },
          telegramSent: true,
        });

        await sendTelegramAlert({
          title: 'Sakthi Frozen Foods - Brevo Email Failed',
          level: 'critical',
          details: {
            'Project': 'Sakthi Frozen Foods',
            'Service': 'Brevo Email API',
            'Status': `HTTP ${response.status} Failed`,
            'Error Reason': errorMsg,
          },
          footer: 'Action Required: Check Brevo API Key or account standing.',
        });
      }

      return {
        id: 'sakthi-brevo',
        projectName: 'Sakthi Frozen Foods',
        serviceType: 'Email (Brevo API)',
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
    if (isQuotaExceeded && statusHistory.sakthiBrevo !== 'quota_exceeded') {
      statusHistory.sakthiBrevo = 'quota_exceeded';

      await SystemLog.create({
        projectName: 'Sakthi Frozen Foods',
        level: 'critical',
        type: 'EMAIL_QUOTA_EXCEEDED',
        message: `Brevo Daily Email Limit Exceeded! 0 credits remaining.`,
        statusCode: 200,
        latencyMs,
        details: { credits: remainingCredits, plan: planType },
        telegramSent: true,
      });

      await sendTelegramAlert({
        title: 'Sakthi Frozen Foods - Email Limit Exceeded',
        level: 'critical',
        details: {
          'Project': 'Sakthi Frozen Foods',
          'Service': 'Brevo Transactional Email',
          'Credits Remaining': `${remainingCredits} / 300 daily limit`,
          'Status': 'OUT OF CREDITS ❌',
        },
        footer: 'Customer enquiries will NOT receive emails until midnight reset or quota upgrade.',
      });
    } else if (isQuotaWarning && statusHistory.sakthiBrevo !== 'quota_warning') {
      statusHistory.sakthiBrevo = 'quota_warning';

      await sendTelegramAlert({
        title: 'Sakthi Frozen Foods - Email Quota Warning',
        level: 'warn',
        details: {
          'Project': 'Sakthi Frozen Foods',
          'Service': 'Brevo Transactional Email',
          'Remaining Credits': `${remainingCredits} emails left`,
          'Warning': 'Approaching daily 300 free limit',
        },
        footer: 'Monitor enquiries or upgrade Brevo credits.',
      });
    } else if (currentStatus === 'healthy' && statusHistory.sakthiBrevo !== 'healthy' && statusHistory.sakthiBrevo !== 'unknown') {
      // Recovery Alert
      statusHistory.sakthiBrevo = 'healthy';
      await sendTelegramAlert({
        title: 'Sakthi Frozen Foods - Email Restored',
        level: 'info',
        details: {
          'Project': 'Sakthi Frozen Foods',
          'Service': 'Brevo Email API',
          'Credits Available': `${remainingCredits}`,
          'Status': 'Active & Ready ✅',
        },
        footer: 'Email dispatch is operating normally.',
      });
    } else {
      statusHistory.sakthiBrevo = currentStatus;
    }

    return {
      id: 'sakthi-brevo',
      projectName: 'Sakthi Frozen Foods',
      serviceType: 'Email (Brevo API)',
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

    if (statusHistory.sakthiBrevo !== 'error') {
      statusHistory.sakthiBrevo = 'error';

      await sendTelegramAlert({
        title: 'Sakthi Frozen Foods - Brevo API Unreachable',
        level: 'critical',
        details: {
          'Project': 'Sakthi Frozen Foods',
          'Service': 'Brevo Email API',
          'Error Reason': errorMsg,
        },
        footer: 'Check internet connectivity or Brevo server status.',
      });
    }

    return {
      id: 'sakthi-brevo',
      projectName: 'Sakthi Frozen Foods',
      serviceType: 'Email (Brevo API)',
      status: 'error',
      statusCode: 0,
      latencyMs,
      details: { error: errorMsg },
      lastChecked: new Date(),
    };
  }
}

/**
 * 2. Check Chocolate Mine Gmail SMTP Email Connection
 */
export async function checkChocolateMineSmtp() {
  const host = process.env.CHOCOLATE_MINE_SMTP_HOST || 'smtp.gmail.com';
  const port = Number(process.env.CHOCOLATE_MINE_SMTP_PORT) || 587;
  const user = process.env.CHOCOLATE_MINE_SMTP_USER;
  const pass = process.env.CHOCOLATE_MINE_SMTP_PASS;
  const startTime = Date.now();

  if (!user || !pass) {
    return {
      id: 'chocolate-mine-smtp',
      projectName: 'The Chocolate Mine',
      serviceType: 'Email (Gmail SMTP)',
      status: 'error',
      statusCode: null,
      latencyMs: 0,
      details: { error: 'CHOCOLATE_MINE_SMTP_USER or PASS not configured in backend .env' },
      lastChecked: new Date(),
    };
  }

  const transporter = nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: { user, pass },
    connectionTimeout: 12000,
    greetingTimeout: 10000,
  });

  return new Promise((resolve) => {
    transporter.verify(async (error, success) => {
      const latencyMs = Date.now() - startTime;

      if (error) {
        const errorMsg = error.message;
        const isAuth = /535|auth|credentials|invalid|password|username/i.test(errorMsg);
        const isQuota = /limit|quota|exceeded|credit|429|550|max/i.test(errorMsg);

        if (statusHistory.chocolateMineSmtp !== 'error') {
          statusHistory.chocolateMineSmtp = 'error';

          await SystemLog.create({
            projectName: 'The Chocolate Mine',
            level: 'critical',
            type: isQuota ? 'EMAIL_QUOTA_EXCEEDED' : 'EMAIL_FAILURE',
            message: `SMTP Connection Failed: ${errorMsg}`,
            statusCode: 500,
            latencyMs,
            details: {
              host,
              port,
              user,
              issue: isAuth ? 'Invalid Gmail App Password' : isQuota ? 'Daily 500-send limit exceeded' : 'SMTP Error',
              error: errorMsg,
            },
            telegramSent: true,
          });

          await sendTelegramAlert({
            title: isQuota ? 'Chocolate Mine - Email Limit Exceeded' : 'Chocolate Mine - SMTP Email Error',
            level: 'critical',
            details: {
              'Project': 'The Chocolate Mine',
              'Service': `Gmail SMTP (${host}:${port})`,
              'Account': user,
              'Error Reason': errorMsg,
              'Suspected Issue': isAuth ? 'Gmail App Password invalid or revoked' : isQuota ? 'Daily 500 Gmail limit reached' : 'Connection Refused',
            },
            footer: 'Action Required: Verify Gmail App Password in Google Account settings.',
          });
        }

        resolve({
          id: 'chocolate-mine-smtp',
          projectName: 'The Chocolate Mine',
          serviceType: 'Email (Gmail SMTP)',
          status: 'error',
          statusCode: 500,
          latencyMs,
          details: {
            host,
            port,
            user,
            error: errorMsg,
            issue: isAuth ? 'Invalid App Password' : isQuota ? 'Daily Gmail Limit Reached' : 'Connection Failed',
          },
          lastChecked: new Date(),
        });
      } else {
        // Recovery Alert if was down
        if (statusHistory.chocolateMineSmtp === 'error') {
          await sendTelegramAlert({
            title: 'Chocolate Mine - Email SMTP Restored',
            level: 'info',
            details: {
              'Project': 'The Chocolate Mine',
              'Service': `Gmail SMTP (${host}:${port})`,
              'Account': user,
              'Status': 'Server Ready & Authenticated ✅',
            },
            footer: 'Order confirmations and invoices can now send normally.',
          });
        }
        statusHistory.chocolateMineSmtp = 'healthy';

        resolve({
          id: 'chocolate-mine-smtp',
          projectName: 'The Chocolate Mine',
          serviceType: 'Email (Gmail SMTP)',
          status: 'healthy',
          statusCode: 200,
          latencyMs,
          details: {
            host,
            port,
            account: user,
            message: 'SMTP handshake and authentication verified successfully',
          },
          lastChecked: new Date(),
        });
      }
    });
  });
}

/**
 * 3. Check Chocolate Mine Telegram Alert Bot
 */
export async function checkChocolateMineTelegram() {
  const token = process.env.CHOCOLATE_MINE_TELEGRAM_BOT_TOKEN;
  const chatId = process.env.CHOCOLATE_MINE_TELEGRAM_CHAT_ID;
  const startTime = Date.now();

  if (!token) {
    return {
      id: 'chocolate-mine-telegram',
      projectName: 'The Chocolate Mine',
      serviceType: 'Telegram Notification Bot',
      status: 'error',
      statusCode: null,
      latencyMs: 0,
      details: { error: 'CHOCOLATE_MINE_TELEGRAM_BOT_TOKEN not configured in backend .env' },
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

      if (statusHistory.chocolateMineTelegram !== 'error') {
        statusHistory.chocolateMineTelegram = 'error';

        await SystemLog.create({
          projectName: 'The Chocolate Mine',
          level: 'critical',
          type: 'SERVER_DOWN',
          message: `Telegram Bot getMe failed: ${errorMsg}`,
          statusCode: response.status,
          latencyMs,
          details: { error: errorMsg },
          telegramSent: true,
        });

        await sendTelegramAlert({
          title: 'Chocolate Mine - Telegram Bot Failure',
          level: 'critical',
          details: {
            'Project': 'The Chocolate Mine',
            'Service': 'Telegram Alert Bot',
            'Error Reason': errorMsg,
          },
          footer: 'Action Required: Check bot token with @BotFather.',
        });
      }

      return {
        id: 'chocolate-mine-telegram',
        projectName: 'The Chocolate Mine',
        serviceType: 'Telegram Notification Bot',
        status: 'error',
        statusCode: response.status,
        latencyMs,
        details: { error: errorMsg },
        lastChecked: new Date(),
      };
    }

    const bot = data.result;

    // Recovery Alert if was down
    if (statusHistory.chocolateMineTelegram === 'error') {
      await sendTelegramAlert({
        title: 'Chocolate Mine - Telegram Bot Restored',
        level: 'info',
        details: {
          'Project': 'The Chocolate Mine',
          'Bot Name': bot.first_name,
          'Username': `@${bot.username}`,
          'Status': 'Bot Alive & Online ✅',
        },
        footer: 'Kitchen and order dispatch alerts are functional.',
      });
    }
    statusHistory.chocolateMineTelegram = 'healthy';

    return {
      id: 'chocolate-mine-telegram',
      projectName: 'The Chocolate Mine',
      serviceType: 'Telegram Notification Bot',
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

    if (statusHistory.chocolateMineTelegram !== 'error') {
      statusHistory.chocolateMineTelegram = 'error';

      await sendTelegramAlert({
        title: 'Chocolate Mine - Telegram Bot Unreachable',
        level: 'critical',
        details: {
          'Project': 'The Chocolate Mine',
          'Service': 'Telegram Bot API',
          'Error Reason': errorMsg,
        },
        footer: 'Check Telegram network or proxy availability.',
      });
    }

    return {
      id: 'chocolate-mine-telegram',
      projectName: 'The Chocolate Mine',
      serviceType: 'Telegram Notification Bot',
      status: 'error',
      statusCode: 0,
      latencyMs,
      details: { error: errorMsg },
      lastChecked: new Date(),
    };
  }
}

/**
 * 4. Run All Client Service Checks
 * @param {boolean} [forceTelegramSummary=false]
 */
export async function checkAllClientServices(forceTelegramSummary = false) {
  console.log('🔍 [CLIENT SERVICES MONITOR] Checking Sakthi Brevo, Chocolate Mine SMTP & Telegram...');

  const [sakthiRes, chocSmtpRes, chocTgRes] = await Promise.allSettled([
    checkSakthiBrevoEmail(),
    checkChocolateMineSmtp(),
    checkChocolateMineTelegram(),
  ]);

  const services = [
    sakthiRes.status === 'fulfilled' ? sakthiRes.value : { id: 'sakthi-brevo', status: 'error', error: sakthiRes.reason },
    chocSmtpRes.status === 'fulfilled' ? chocSmtpRes.value : { id: 'chocolate-mine-smtp', status: 'error', error: chocSmtpRes.reason },
    chocTgRes.status === 'fulfilled' ? chocTgRes.value : { id: 'chocolate-mine-telegram', status: 'error', error: chocTgRes.reason },
  ];

  cachedClientServices = services;
  lastCheckedTimestamp = new Date();

  // If user requested manual test from admin dashboard, send summary to Telegram
  if (forceTelegramSummary) {
    const sakthiStatus = services[0].status === 'healthy' ? `✅ Healthy (${services[0].details?.credits ?? 0} Brevo credits)` : `❌ ${services[0].status}`;
    const chocSmtpStatus = services[1].status === 'healthy' ? '✅ Ready (smtp.gmail.com:587)' : `❌ ${services[1].details?.error || services[1].status}`;
    const chocTgStatus = services[2].status === 'healthy' ? `✅ Active (${services[2].details?.botUsername})` : `❌ ${services[2].details?.error || services[2].status}`;

    await sendTelegramAlert({
      title: 'Manual Client Services Audit',
      level: services.some(s => s.status !== 'healthy') ? 'warn' : 'success',
      details: {
        'Sakthi Frozen Foods Email': sakthiStatus,
        'Chocolate Mine Email': chocSmtpStatus,
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

