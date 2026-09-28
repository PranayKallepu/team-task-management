import morgan from "morgan";
import logger from "#src/utils/logger.js";

/**
 * Extract accurate client IP (handling reverse proxies & load balancers)
 */
export const getClientIp = (req) => {
  const forwarded = req.headers["x-forwarded-for"];
  if (forwarded) return forwarded.split(",")[0].trim();
  return req.socket?.remoteAddress || req.ip || "unknown";
};

// 1. Custom Morgan tokens
morgan.token("client-ip", (req) => getClientIp(req));
morgan.token("user-id", (req) => (req.user ? req.user.id : "anonymous"));

// Format for HTTP request logging
const morganFormat =
  ":client-ip [User: :user-id] :method :url :status :res[content-length] - :response-time ms";

// 2. Stream Morgan HTTP logs into Winston
export const httpLogger = morgan(morganFormat, {
  stream: {
    write: (message) => logger.http(message.trim()),
  },
  // Skip healthcheck logs in development if desired (optional)
  skip: (req) => req.url === "/health" && process.env.NODE_ENV === "test",
});

/**
 * 3. Middleware to attach a contextual logger to `req.log`
 * Automatically injects the caller's IP address and userId into all log entries
 */
export const requestContext = (req, res, next) => {
  const ip = getClientIp(req);

  req.log = {
    info: (msg, meta = {}) =>
      logger.info(msg, { ip, userId: req.user?.id || "anonymous", ...meta }),
    warn: (msg, meta = {}) =>
      logger.warn(msg, { ip, userId: req.user?.id || "anonymous", ...meta }),
    error: (msg, meta = {}) =>
      logger.error(msg, { ip, userId: req.user?.id || "anonymous", ...meta }),
    debug: (msg, meta = {}) =>
      logger.debug(msg, { ip, userId: req.user?.id || "anonymous", ...meta }),
    http: (msg, meta = {}) =>
      logger.http(msg, { ip, userId: req.user?.id || "anonymous", ...meta }),
  };

  next();
};

/**
 * 4. Dedicated middleware function to explicitly log the user & IP in the request lifecycle
 */
export const logUserRequest = (req, res, next) => {
  const ip = getClientIp(req);
  const userId = req.user?.id || "anonymous";

  logger.info(`Request Initiated: ${req.method} ${req.originalUrl}`, {
    ip,
    userId,
    userAgent: req.headers["user-agent"],
  });

  next();
};
