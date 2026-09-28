import { AUTH_LOG } from "#src/constants/logActions.js";
import {
  authenticateUser,
  generateAuthToken,
  registerUser,
} from "#src/features/auth/auth.service.js";

const createSendToken = (user, statusCode, req, res) => {
  const token = generateAuthToken(user.id);

  const cookieOptions = {
    expires: new Date(
      Date.now() + (parseInt(process.env.JWT_COOKIE_EXPIRES_IN, 10) || 7) * 24 * 60 * 60 * 1000,
    ),
    httpOnly: true,
    secure: req.secure || req.headers["x-forwarded-proto"] === "https",
    sameSite: "lax",
  };

  res.cookie("jwt", token, cookieOptions);

  user.password = undefined;

  res.status(statusCode).json({
    status: "success",
    token,
    data: {
      user,
    },
  });
};

// Sign Up
export const signup = async (req, res, next) => {
  const { fullName, userName, email, password } = req.body;

  const newUser = await registerUser(fullName, userName, email, password);

  req.log.info(`New user registered: ${newUser.email}`, {
    userId: newUser.id,
    action: AUTH_LOG.SIGNUP_SUCCESS,
  });

  createSendToken(newUser, 201, req, res);
};

// Log In
export const login = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const user = await authenticateUser(email, password);

    req.log.info(`User logged in successfully: ${user.email}`, {
      userId: user.id,
      action: AUTH_LOG.LOGIN_SUCCESS,
    });

    createSendToken(user, 200, req, res);
  } catch (err) {
    if (err.statusCode === 401) {
      req.log.warn(`Failed login attempt for email: ${email}`, {
        action: AUTH_LOG.LOGIN_FAILED,
      });
    }
    throw err;
  }
};

// Log Out
export const logout = (req, res) => {
  res.cookie("jwt", "loggedout", {
    expires: new Date(Date.now() + 5 * 1000),
    httpOnly: true,
  });

  req.log.info("User logged out successfully", {
    action: AUTH_LOG.LOGOUT,
  });

  res.status(200).json({
    status: "success",
    message: "Logged out successfully",
  });
};
