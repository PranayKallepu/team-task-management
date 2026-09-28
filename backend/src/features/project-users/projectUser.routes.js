import express from "express";

import { PROJECT_ROLE } from "#src/features/project-users/projectUser.constants.js";
import {
  addProjectMember,
  getProjectMembers,
  removeProjectMember,
  updateMemberRole,
} from "#src/features/project-users/projectUser.controller.js";
import { restrictToProjectRoles } from "#src/features/projects/project.middleware.js";

// mergeParams: true allows this router to access :projectSlug from the parent router
const router = express.Router({ mergeParams: true });

router
  .route("/")
  .get(getProjectMembers)
  .post(restrictToProjectRoles(PROJECT_ROLE.OWNER, PROJECT_ROLE.MANAGER), addProjectMember);

router
  .route("/:userId")
  .patch(restrictToProjectRoles(PROJECT_ROLE.OWNER, PROJECT_ROLE.MANAGER), updateMemberRole)
  .delete(restrictToProjectRoles(PROJECT_ROLE.OWNER, PROJECT_ROLE.MANAGER), removeProjectMember);

export default router;
