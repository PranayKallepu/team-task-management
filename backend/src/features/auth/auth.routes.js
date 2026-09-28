import express from "express";

import { login, logout, signup } from "#src/features/auth/auth.controller.js";
import { loginSchema, signupSchema } from "#src/features/auth/auth.schema.js";
import { validate } from "#src/middlewares/validate.js";

const router = express.Router();

router.post("/signup", validate(signupSchema), signup);
router.post("/login", validate(loginSchema), login);
router.get("/logout", logout);

export default router;
