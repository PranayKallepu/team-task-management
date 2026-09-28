import jwt from "jsonwebtoken";

import { AUTH_LOG } from "#src/constants/logActions.js";
import User from "#src/features/users/user.model.js";
import AppError from "#src/utils/appError.js";

// Authenticate middleware to guard routes
export const authenticate = async (req, res, next) => {
  let token;
  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer"))
    token = req.headers.authorization.split(" ")[1];
  else if (req.cookies && req.cookies.jwt) token = req.cookies.jwt;

  if (!token) {
    req.log.warn("Access denied: No authentication token provided", {
      path: req.originalUrl,
      action: AUTH_LOG.AUTHENTICATE_NO_TOKEN,
    });
    throw new AppError("You are not logged in! Please log in to get access.", 401);
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET || "default-secret-key");

  const currentUser = await User.findByPk(decoded.id);
  if (!currentUser) {
    req.log.warn(`Access denied: Token belongs to non-existent user (${decoded.id})`, {
      action: AUTH_LOG.AUTHENTICATE_USER_DELETED,
    });
    throw new AppError("The user belonging to this token no longer exists.", 401);
  }

  req.user = currentUser;

  req.log.debug(`Authenticated user session verified for ${currentUser.email}`, {
    userId: currentUser.id,
  });

  next();
};
