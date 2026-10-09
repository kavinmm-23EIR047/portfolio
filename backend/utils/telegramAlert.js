import dotenv from 'dotenv';
dotenv.config();

/**
 * Dispatches rich alert notifications to your Telegram Bot
 * @param {Object} options
 * @param {string} options.title - Alert title header
 * @param {'info'|'warn'|'error'|'critical'} [options.level='info'] - Severity level
 * @param {Object} [options.details={}] - Key-value pair details for the alert
 * @param {string} [options.footer] - Optional extra footer note
 */
export async function sendTelegramAlert({ title, level = 'info', details = {}, footer = '' }) {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!token || !chatId) {
    console.warn('⚠️ Telegram Alert Skipped: TELEGRAM_BOT_TOKEN or TELEGRAM_CHAT_ID is missing in .env');
    return false;
  }

  const iconMap = {
    critical: '🚨🚨',
    error: '🔴',
    warn: '⚠️',
    info: 'ℹ️',
    success: '✅',
  };

  const icon = iconMap[level] || '🔔';
  const header = `${icon} <b>${title.toUpperCase()}</b>`;
  
  let body = '';
  for (const [key, val] of Object.entries(details)) {
    if (val !== undefined && val !== null && val !== '') {
      body += `\n• <b>${key}:</b> <code>${String(val).replace(/</g, '&lt;').replace(/>/g, '&gt;')}</code>`;
    }
  }

  const timestamp = new Date().toLocaleString('en-IN', {
    timeZone: 'Asia/Kolkata',
    dateStyle: 'medium',
    timeStyle: 'medium',
  });

  let message = `${header}\n━━━━━━━━━━━━━━━━━━${body}\n\n🕒 <b>Time:</b> <i>${timestamp} IST</i>`;
  if (footer) {
    message += `\n\n📌 <i>${footer}</i>`;
  }

  try {
    const response = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        chat_id: chatId,
        text: message,
        parse_mode: 'HTML',
        disable_web_page_preview: true,
      }),
    });

    const result = await response.json();
    if (result.ok) {
      console.log(`📲 Telegram alert sent: "${title}"`);
      return true;
    } else {
      console.error(`❌ Telegram API responded with error: ${result.description}`);
      return false;
    }
  } catch (error) {
    console.error('❌ Failed to dispatch Telegram alert:', error.message);
    return false;
  }
}

/**
 * Sends a test message to verify Telegram Bot configuration
 */
export async function testTelegramConnection() {
  return await sendTelegramAlert({
    title: 'Telegram Alert Bot Connected',
    level: 'success',
    details: {
      'Status': 'ACTIVE & MONITORING',
      'Environment': 'AK Webflair Central Ops',
      'Monitored Projects': '3 Active Backends',
      'Features': 'Keep-Alive, Cold Start Detection, Email Quota Alert, Error Logging',
    },
    footer: 'Everything is configured and functioning normally!',
  });
}
