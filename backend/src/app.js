import globalErrorHandler from "#src/middlewares/errorMiddleware.js";
import { httpLogger, logUserRequest, requestContext } from "#src/middlewares/loggerMiddleware.js";
import AppError from "#src/utils/appError.js";
import compression from "compression";
import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import { rateLimit } from "express-rate-limit";
import helmet from "helmet";

// Feature Routers
import authRouter from "#src/features/auth/auth.routes.js";
import projectRouter from "#src/features/projects/project.routes.js";
import userRouter from "#src/features/users/user.routes.js";
import ticketRouter from "#src/features/tickets/ticket.routes.js";

const app = express();

// 1) GLOBAL MIDDLEWARES

// Enable CORS for frontend application with credentials support
app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:3000",
    credentials: true,
  }),
);

// Set security HTTP headers
app.use(helmet());

// Combined Morgan + Winston HTTP request logger
app.use(httpLogger);

// Contextual logger middleware: attaches `req.log` with IP and userId auto-injected
app.use(requestContext);

// Request tracking middleware: logs incoming requests with client IP and userId
app.use("/api", logUserRequest);

// Rate limiting to prevent brute force / DDoS on API routes
const limiter = rateLimit({
  max: 200, // 200 requests per 15 min
  windowMs: 15 * 60 * 1000,
  message: {
    status: "fail",
    message: "Too many requests from this IP, please try again in 15 minutes!",
  },
  standardHeaders: true,
  legacyHeaders: false,
});
app.use("/api", limiter);

// Body parser, reading JSON payloads into req.body (max 10kb to prevent payload attacks)
app.use(express.json({ limit: "10kb" }));

// URL-encoded parser for form submissions
app.use(express.urlencoded({ extended: true, limit: "10kb" }));

// Cookie parser for reading JWT auth cookies
app.use(cookieParser());

// Compress text/json responses
app.use(compression());

// 2) API ROUTES
app.get("/health", (req, res) => {
  res.status(200).json({
    status: "success",
    message: "TaskFlow API server is up and healthy 🚀",
    timestamp: req.requestTime,
  });
});

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/projects", projectRouter);
app.use("/api/v1/tickets", ticketRouter);

// 3) UNHANDLED ROUTES HANDLER (Express 5 compatible catch-all)
app.use((req, res, next) => {
  throw new AppError(`Can't find ${req.method} ${req.originalUrl} on this server!`, 404);
});

// 4) GLOBAL ERROR HANDLING MIDDLEWARE
app.use(globalErrorHandler);

export default app;
