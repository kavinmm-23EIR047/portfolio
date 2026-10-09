/**
 * Universal Remote Logger for AK Webflair Ecosystem
 * Call this function from any React / Node / Python project to send logs
 * to your central backend and trigger Telegram alerts on critical errors.
 */

const CENTRAL_BACKEND_URL = import.meta.env?.VITE_BACKEND_URL || 'http://localhost:5001';

export async function sendRemoteLog({
  projectName = 'AK Webflair App',
  environment = 'production',
  level = 'info', // 'info' | 'warn' | 'error' | 'critical'
  type = 'GENERAL_LOG',
  message,
  details = {},
}) {
  try {
    const response = await fetch(`${CENTRAL_BACKEND_URL}/api/logs/ingest`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        projectName,
        environment,
        level,
        type,
        message,
        details,
      }),
    });

    return await response.json();
  } catch (err) {
    console.warn('⚠️ Remote logging failed:', err.message);
    return { success: false, error: err.message };
  }
}

export default sendRemoteLog;
