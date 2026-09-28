import express from "express";

import { getAllUsers, getMe, getUser, updateMe } from "#src/features/users/user.controller.js";
import { updateUserSchema } from "#src/features/users/user.schema.js";
import { validate } from "#src/middlewares/validate.js";

const router = express.Router();

router.get("/me", getMe);
router.patch("/me", validate(updateUserSchema), updateMe);
router.get("/", getAllUsers);
router.get("/:id", getUser);

export default router;
