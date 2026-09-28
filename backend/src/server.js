// ==============================================================================
// 1. UNCAUGHT EXCEPTIONS (MUST BE AT THE VERY TOP OF THE ENTRY FILE)
// ==============================================================================
// All bugs that occur in synchronous code but are NOT caught by try/catch
// are caught here.
process.on("uncaughtException", (err) => {
  console.error("💥 UNCAUGHT EXCEPTION! Shutting down immediately...");
  console.error(err.name, err.message);
  console.error(err.stack);
  process.exit(1);
});

// ==============================================================================
// 2. ENVIRONMENT VARIABLES CONFIGURATION
// ==============================================================================
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, "../.env") });

// ==============================================================================
// 3. APPLICATION & DATABASE IMPORTS
// ==============================================================================
import app from "#src/app.js";
import { sequelize, testConnection } from "#src/config/database.js";
import logger from "#src/utils/logger.js";

// Ensure models and associations are registered
import "#src/features/users/user.model.js";
import "#src/features/projects/project.model.js";
import "#src/features/project-users/projectUser.model.js";

const PORT = process.env.PORT || 5000;
let server;

// ==============================================================================
// 4. DATABASE INITIALIZATION & SERVER STARTUP
// ==============================================================================
const startServer = async () => {
  // Test connection to PostgreSQL
  const isDbConnected = await testConnection();

  if (!isDbConnected)
    logger.warn("⚠️  Server starting in standalone mode without active DB connection.");

  server = app.listen(PORT, () => {
    logger.info(
      `🚀 TaskFlow Backend (Express 5 + ESM) running on port ${PORT} [${process.env.NODE_ENV || "development"}]`,
    );
    logger.info(`   Health check: http://localhost:${PORT}/health`);
    logger.info(`   API Endpoint: http://localhost:${PORT}/api/v1`);
  });
};

startServer();

// ==============================================================================
// 5. UNHANDLED PROMISE REJECTIONS
// ==============================================================================
process.on("unhandledRejection", (err) => {
  logger.error("💥 UNHANDLED REJECTION! Shutting down server gracefully...", {
    name: err.name,
    message: err.message,
    stack: err.stack,
  });

  if (server) {
    server.close(() => {
      logger.info("💥 Server closed. Process terminated.");
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
});

// ==============================================================================
// 6. SYSTEM SIGNALS (SIGTERM & SIGINT FOR GRACEFUL SHUTDOWN)
// ==============================================================================
const handleGracefulShutdown = (signal) => {
  logger.info(`👋 ${signal} RECEIVED. Commencing graceful shutdown...`);

  if (server) {
    server.close(async () => {
      logger.info("🛑 Closed out remaining active HTTP connections.");

      try {
        await sequelize.close();
        logger.info("🔒 Database connection pool closed.");
      } catch (dbErr) {
        logger.error("Error closing database connections:", { error: dbErr.message });
      }

      logger.info("✅ Graceful shutdown completed. Exiting process.");
      process.exit(0);
    });

    // Force shutdown if connections do not close within 10 seconds
    setTimeout(() => {
      logger.error("⚠️ Forcefully shutting down due to timeout on active connections.");
      process.exit(1);
    }, 10000);
  } else {
    process.exit(0);
  }
};

process.on("SIGTERM", () => handleGracefulShutdown("SIGTERM"));
process.on("SIGINT", () => handleGracefulShutdown("SIGINT"));
