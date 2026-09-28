import "dotenv/config";
import winston from "winston";

const { combine, timestamp, printf, colorize, errors, json } = winston.format;

// Custom console print format
const consoleFormat = printf(({ level, message, timestamp, stack, ip, userId, ...meta }) => {
  const context = [];
  if (ip) context.push(`ip: ${ip}`);
  if (userId) context.push(`user: ${userId}`);
  const contextStr = context.length ? ` [${context.join(", ")}]` : "";

  // Strip internal winston properties from meta
  const cleanMeta = { ...meta };
  delete cleanMeta.service;

  const metaStr = Object.keys(cleanMeta).length ? ` ${JSON.stringify(cleanMeta)}` : "";
  return `[${timestamp}] [${level}]${contextStr}: ${stack || message}${metaStr}`;
});

// Configure Winston logger instance
export const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || (process.env.NODE_ENV === "production" ? "http" : "debug"),
  defaultMeta: { service: "task-flow-backend" },
  format: combine(timestamp({ format: "YYYY-MM-DD HH:mm:ss" }), errors({ stack: true }), json()),
  transports: [
    new winston.transports.Console({
      format: combine(
        colorize({ all: true }),
        timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
        errors({ stack: true }),
        consoleFormat,
      ),
    }),
  ],
});

// Add file transports in production environment
if (process.env.NODE_ENV === "production") {
  logger.add(
    new winston.transports.File({
      filename: "logs/error.log",
      level: "error",
      maxsize: 5 * 1024 * 1024, // 5MB
      maxFiles: 5,
    }),
  );
  logger.add(
    new winston.transports.File({
      filename: "logs/combined.log",
      maxsize: 10 * 1024 * 1024, // 10MB
      maxFiles: 5,
    }),
  );
}

export default logger;
