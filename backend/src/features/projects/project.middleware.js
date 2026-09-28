import ProjectUser from "#src/features/project-users/projectUser.model.js";
import Project from "#src/features/projects/project.model.js";
import { USER_ROLE } from "#src/features/users/user.constants.js";
import AppError from "#src/utils/appError.js";

const isUuid = (val) => /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(val);

export const checkProjectAccess = async (req, res, next) => {
  const { projectSlug } = req.params;

  // If no project slug is in params, we cannot check project access. Move to next route.
  if (!projectSlug) return next();

  // 1. Platform Super Admins have universal access to all projects
  if (req.user.role === USER_ROLE.SUPER_ADMIN) return next();

  // 2. Find the project
  const whereClause = isUuid(projectSlug) ? { id: projectSlug } : { slug: projectSlug };
  const project = await Project.findOne({ where: whereClause });

  if (!project) throw new AppError(`No project found with identifier: ${projectSlug}`, 404);

  // 3. Verify the user is associated with this project
  const isMember = await ProjectUser.findOne({
    where: {
      projectId: project.id,
      userId: req.user.id,
    },
  });

  if (!isMember)
    throw new AppError("You do not have permission to access or modify this project.", 403);

  // Attach to req so subsequent middlewares can check specific project roles
  req.projectMember = isMember;

  next();
};

export const restrictToProjectRoles = (...roles) => {
  return (req, res, next) => {
    // 1. Platform Super Admins override all project-level restrictions
    if (req.user.role === USER_ROLE.SUPER_ADMIN) return next();

    // 2. Check if the user has the required project role
    if (!req.projectMember || !roles.includes(req.projectMember.projectRole))
      throw new AppError("You do not have the required project role to perform this action.", 403);

    next();
  };
};
