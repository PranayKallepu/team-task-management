import express from "express";

import { authenticate } from "#src/features/auth/auth.middleware.js";
import projectMemberRouter from "#src/features/project-users/projectUser.routes.js";
import {
  createProject,
  deleteProject,
  getAllProjects,
  getProject,
  updateProject,
} from "#src/features/projects/project.controller.js";
import { checkProjectAccess } from "#src/features/projects/project.middleware.js";
import { createProjectSchema, updateProjectSchema } from "#src/features/projects/project.schema.js";
import { validate } from "#src/middlewares/validate.js";

const router = express.Router();

// All project routes require authentication
router.use(authenticate);

// Enforce project-level access control (only super-admin or project members)
router.use("/:projectSlug", checkProjectAccess);

// Nest project member routes under /:projectSlug/members
router.use("/:projectSlug/members", projectMemberRouter);

router.route("/").get(getAllProjects).post(validate(createProjectSchema), createProject);

router
  .route("/:projectSlug")
  .get(getProject)
  .patch(validate(updateProjectSchema), updateProject)
  .delete(deleteProject);

export default router;
