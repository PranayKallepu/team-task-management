import logger from "#src/utils/logger.js";
import { Sequelize } from "sequelize";

export const sequelize = new Sequelize(
  process.env.DB_NAME || "taskflow_db",
  process.env.DB_USER || "postgres",
  process.env.DB_PASSWORD || "postgres",
  {
    host: process.env.DB_HOST || "localhost",
    port: parseInt(process.env.DB_PORT || "5432", 10),
    dialect: "postgres",
    logging: process.env.DB_LOGGING === "true" ? (msg) => logger.debug(msg) : false,
    pool: {
      max: 10,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
    define: {
      timestamps: true,
      underscored: true,
    },
  },
);

export const testConnection = async () => {
  try {
    await sequelize.authenticate();
    logger.info("✅ PostgreSQL Database connection established successfully.");
    return true;
  } catch (error) {
    logger.error("❌ Unable to connect to the PostgreSQL database:", {
      error: error.message,
      tip: "Ensure PostgreSQL is installed and running on port 5432, and the database exists.",
    });
    return false;
  }
};
