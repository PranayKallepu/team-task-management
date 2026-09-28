/**
 * Log action constants used across controllers and middlewares.
 * These are used as structured `action` fields in logger calls
 * to make log entries filterable, searchable, and consistent.
 */

// ==============================================================================
// AUTH LOG ACTIONS
// ==============================================================================
export const AUTH_LOG = {
  SIGNUP_SUCCESS: "AUTH_SIGNUP_SUCCESS",
  LOGIN_SUCCESS: "AUTH_LOGIN_SUCCESS",
  LOGIN_FAILED: "AUTH_LOGIN_FAILED",
  LOGOUT: "AUTH_LOGOUT",
  AUTHENTICATE_NO_TOKEN: "AUTH_AUTHENTICATE_NO_TOKEN",
  AUTHENTICATE_USER_DELETED: "AUTH_AUTHENTICATE_USER_DELETED",
};

// ==============================================================================
// USER LOG ACTIONS
// ==============================================================================
export const USER_LOG = {
  FETCH_ME: "USER_FETCH_ME",
  UPDATE_ME: "USER_UPDATE_ME",
  UPDATE_ME_UNAUTHORIZED: "USER_UPDATE_ME_UNAUTHORIZED",
  FETCH_ALL: "USER_FETCH_ALL",
  FETCH_ONE: "USER_FETCH_ONE",
  NOT_FOUND: "USER_NOT_FOUND",
};

// ==============================================================================
// PROJECT LOG ACTIONS
// ==============================================================================
export const PROJECT_LOG = {
  FETCH_ALL: "PROJECT_FETCH_ALL",
  FETCH_ONE: "PROJECT_FETCH_ONE",
  CREATE: "PROJECT_CREATE",
  UPDATE: "PROJECT_UPDATE",
  DELETE: "PROJECT_DELETE",
  NOT_FOUND: "PROJECT_NOT_FOUND",
};
