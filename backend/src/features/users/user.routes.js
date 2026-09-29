import express from "express";

import { getAllUsers, getMe, getUser, updateMe } from "#src/features/users/user.controller.js";
import { updateUserSchema } from "#src/features/users/user.schema.js";
import { validate } from "#src/middlewares/validate.js";
import { authenticate } from "#src/features/auth/auth.middleware.js";

const router = express.Router();

router.get("/me", getMe);
router.get("/", getAllUsers);
router.get("/:id", getUser);
router.patch("/me", validate(updateUserSchema), authenticate, updateMe);

export default router;
