/**
 * Comprehensive HTTP Error Status Catalog & Actionable Troubleshooting Guide
 * Used by Central Log Ingestion API, Telegram Alert Bot, and AK Webflair Admin
 */

export const HTTP_ERROR_CATALOG = {
  400: {
    status: 400,
    name: "Bad Request",
    issue: "Malformed Request or Missing Parameters",
    whatHappened: "The client sent invalid, malformed data, or omitted required payload fields.",
    resolution: "Inspect frontend request payload. Ensure all required JSON fields and data types match backend schema.",
    level: "warn",
  },
  401: {
    status: 401,
    name: "Unauthorized",
    issue: "Authentication Failed / Session Expired",
    whatHappened: "User attempted to access a protected route without a valid authorization token or session.",
    resolution: "Check JWT authorization header (Bearer token), verify token expiration, or prompt user to re-login.",
    level: "warn",
  },
  402: {
    status: 402,
    name: "Payment Required",
    issue: "Payment Incomplete or Awaiting Capture",
    whatHappened: "The requested transaction or feature requires successful payment capture or active subscription.",
    resolution: "Verify Razorpay payment capture status in dashboard or prompt user to retry payment.",
    level: "warn",
  },
  403: {
    status: 403,
    name: "Forbidden",
    issue: "Access Denied / Insufficient Role Permissions",
    whatHappened: "User is authenticated, but their account role lacks permission to access this resource.",
    resolution: "Verify user account role in database (e.g. admin role check) and review authorization middleware rules.",
    level: "warn",
  },
  404: {
    status: 404,
    name: "Not Found",
    issue: "API Endpoint or Resource Not Found",
    whatHappened: "The requested API route URL, database document ID, or asset does not exist on the server.",
    resolution: "Check endpoint URL spelling, verify route registration in backend server, or confirm database ID exists.",
    level: "warn",
  },
  405: {
    status: 405,
    name: "Method Not Allowed",
    issue: "HTTP Method Not Supported",
    whatHappened: "Request used an HTTP method (e.g. GET/POST) not allowed on this specific endpoint route.",
    resolution: "Align frontend fetch/axios HTTP method (GET, POST, PUT, DELETE) with backend route definition.",
    level: "warn",
  },
  408: {
    status: 408,
    name: "Request Timeout",
    issue: "Client Request Timed Out",
    whatHappened: "The server timed out waiting for the client request stream to complete transmission.",
    resolution: "Check client network latency, reduce request payload/image file size, or retry with backoff.",
    level: "warn",
  },
  409: {
    status: 409,
    name: "Conflict",
    issue: "State Conflict / Duplicate Entry",
    whatHappened: "Request conflicts with current database state (e.g. duplicate email registration or order state lock).",
    resolution: "Catch duplicate key error in frontend and notify user (e.g. 'Email already registered - please login').",
    level: "warn",
  },
  413: {
    status: 413,
    name: "Payload Too Large",
    issue: "Upload File Size Exceeded",
    whatHappened: "The uploaded file, image, or request body exceeds server upload limits.",
    resolution: "Increase express.json({ limit: '10mb' }) in server.js or compress files on frontend before upload.",
    level: "warn",
  },
  422: {
    status: 422,
    name: "Unprocessable Entity",
    issue: "Schema Validation Failed",
    whatHappened: "Request syntax is valid, but payload data failed schema validation rules (e.g. invalid phone/email format).",
    resolution: "Check validation schema (Joi/Zod/Mongoose) and display specific validation field errors to the user.",
    level: "warn",
  },
  429: {
    status: 429,
    name: "Too Many Requests",
    issue: "Rate Limit Exceeded",
    whatHappened: "Client or IP sent too many requests within the rate limiter window.",
    resolution: "Increase rate limits in express-rate-limit middleware or implement client request debounce and exponential backoff.",
    level: "warn",
  },
  500: {
    status: 500,
    name: "Internal Server Error",
    issue: "Backend Runtime Crash / Unhandled Exception",
    whatHappened: "Backend server encountered an unhandled exception or crash during business logic or DB query execution.",
    resolution: "Inspect Render deployment logs for exact stack trace; verify null/undefined checks and database connection.",
    level: "critical",
  },
  502: {
    status: 502,
    name: "Bad Gateway",
    issue: "Reverse Proxy Communication Failure / Boot Crash",
    whatHappened: "Render reverse proxy could not communicate with backend process (app crashed on startup, wrong port, or OOM).",
    resolution: "Check Render deploy logs for startup crashes; ensure app binds to process.env.PORT on host 0.0.0.0.",
    level: "critical",
  },
  503: {
    status: 503,
    name: "Service Unavailable",
    issue: "Server Sleeping, Overloaded, or Rebooting",
    whatHappened: "Server instance is temporarily unable to handle requests (e.g. Render free tier sleeping or deploying).",
    resolution: "Allow 30-50s for Render free tier cold-boot to finish, or keep instance awake with automated health pings.",
    level: "critical",
  },
  504: {
    status: 504,
    name: "Gateway Timeout",
    issue: "Upstream Execution Timeout",
    whatHappened: "Backend did not respond within Render gateway timeout period (exceeded 30-100s limit).",
    resolution: "Add indexes to MongoDB queries, optimize slow third-party API calls, or offload heavy processing to background tasks.",
    level: "critical",
  },
};

/**
 * Returns structured error info, explanation, and resolution for any HTTP status code
 * @param {number|string} code - HTTP status code
 * @param {string} [customMessage] - Optional custom error message
 */
export function getHttpErrorInfo(code, customMessage = "") {
  const numericCode = parseInt(code, 10);
  
  if (HTTP_ERROR_CATALOG[numericCode]) {
    return { ...HTTP_ERROR_CATALOG[numericCode] };
  }

  // Handle client error range (4xx)
  if (numericCode >= 400 && numericCode < 500) {
    return {
      status: numericCode,
      name: `HTTP ${numericCode}`,
      issue: "Client Request Error",
      whatHappened: customMessage || `Client sent a request that resulted in HTTP ${numericCode} status.`,
      resolution: "Inspect frontend request parameters, headers, and authentication tokens.",
      level: "warn",
    };
  }

  // Handle server error range (5xx)
  if (numericCode >= 500 && numericCode < 600) {
    return {
      status: numericCode,
      name: `HTTP ${numericCode}`,
      issue: "Server Error",
      whatHappened: customMessage || `Backend server failed to process request with HTTP ${numericCode}.`,
      resolution: "Inspect Render deployment logs immediately for stack traces and check server resource health.",
      level: "critical",
    };
  }

  // Fallback for network timeouts or unreachable servers (status 0)
  if (numericCode === 0) {
    return {
      status: 0,
      name: "Network / Unreachable Timeout",
      issue: "Service Unreachable or Connection Timed Out",
      whatHappened: customMessage || "The server failed to respond within the 35s connection timeout.",
      resolution: "Check if Render free tier is waking up or if service crashed. Ping again in 30 seconds.",
      level: "critical",
    };
  }

  return {
    status: numericCode || 200,
    name: `HTTP ${numericCode || 200}`,
    issue: "General Operation",
    whatHappened: customMessage || "Operation executed.",
    resolution: "No immediate action required.",
    level: "info",
  };
}

