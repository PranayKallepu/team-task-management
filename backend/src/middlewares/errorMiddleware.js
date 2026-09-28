import AppError from "#src/utils/appError.js";
import logger from "#src/utils/logger.js";

// Handle Sequelize Unique Constraint Error (e.g. duplicate email)
const handleSequelizeUniqueConstraintError = (err) => {
  const field = err.errors && err.errors[0] ? err.errors[0].path : "field";
  const message = `Duplicate value for ${field}. Please use another value.`;
  return new AppError(message, 400);
};

// Handle Sequelize Model Validation Error
const handleSequelizeValidationError = (err) => {
  const errors = err.errors ? err.errors.map((el) => el.message) : [];
  const message = `Invalid input data: ${errors.join(". ")}`;
  return new AppError(message, 400, errors);
};

// Handle Database Connection Errors
const handleSequelizeConnectionError = () => {
  return new AppError("Database connection unavailable. Please try again later.", 503);
};

// Handle JWT Invalid Token Error
const handleJWTError = () => {
  return new AppError("Invalid authentication token. Please log in again.", 401);
};

// Handle JWT Expired Token Error
const handleJWTExpiredError = () => {
  return new AppError("Your session has expired. Please log in again.", 401);
};

// Send detailed error in Development
const sendErrorDev = (err, req, res) => {
  const message =
    err.message ||
    (err.original && err.original.message) ||
    (err.parent && err.parent.message) ||
    "An error occurred";

  logger.error(`[Dev Error] ${err.statusCode || 500} - ${message}`, {
    stack: err.stack,
    errors: err.errors,
  });

  return res.status(err.statusCode).json({
    status: err.status,
    message,
    errors: err.errors || null,
    name: err.name,
    stack: err.stack,
  });
};

// Send clean, secure error in Production
const sendErrorProd = (err, req, res) => {
  // Operational, trusted error: send message to client
  if (err.isOperational) {
    logger.warn(`Operational Error: ${err.message}`, {
      statusCode: err.statusCode,
      errors: err.errors,
    });

    return res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
      ...(err.errors && { errors: err.errors }),
    });
  }

  // Programming or unknown bug: do NOT leak technical details to users
  logger.error("Production Unhandled Bug / System Error 💥", {
    message: err.message,
    stack: err.stack,
  });

  return res.status(500).json({
    status: "error",
    message: "Something went wrong on the server!",
  });
};

// Main Global Error Handling Middleware
export default (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";

  if (process.env.NODE_ENV === "development") {
    sendErrorDev(err, req, res);
  } else {
    let error = { ...err, message: err.message, name: err.name };

    if (error.name === "SequelizeUniqueConstraintError")
      error = handleSequelizeUniqueConstraintError(error);

    if (
      error.name === "SequelizeConnectionRefusedError" ||
      error.name === "SequelizeConnectionError"
    )
      error = handleSequelizeConnectionError();

    if (error.name === "SequelizeValidationError") error = handleSequelizeValidationError(error);
    if (error.name === "JsonWebTokenError") error = handleJWTError();
    if (error.name === "TokenExpiredError") error = handleJWTExpiredError();

    sendErrorProd(error, req, res);
  }
};
