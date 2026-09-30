import express from "express";

import {
  getAllUsers,
  getMe,
  getUser,
  updateMe,
  updatePassword,
} from "#src/features/users/user.controller.js";
import { updatePasswordSchema, updateUserSchema } from "#src/features/users/user.schema.js";
import { validate } from "#src/middlewares/validate.js";
import { authenticate } from "#src/features/auth/auth.middleware.js";

const router = express.Router();

router.get("/me", getMe);
router.get("/", getAllUsers);
router.get("/:id", getUser);
router.patch("/me", validate(updateUserSchema), authenticate, updateMe);
router.patch("/me/password", validate(updatePasswordSchema), authenticate, updatePassword);

export default router;
