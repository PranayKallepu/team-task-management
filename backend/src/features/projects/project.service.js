import { PROJECT_ROLE } from "#src/features/project-users/projectUser.constants.js";
import ProjectUser from "#src/features/project-users/projectUser.model.js";
import Project from "#src/features/projects/project.model.js";
import User from "#src/features/users/user.model.js";
import AppError from "#src/utils/appError.js";

// Helper to create URL-friendly slug
const generateSlug = (name) => {
  return name
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
};

const isUuid = (val) => /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(val);

export const getProjectsForUser = async (userId) => {
  return await Project.findAll({
    include: [
      {
        model: ProjectUser,
        as: "projectMembers",
        where: { userId },
        attributes: ["projectRole", "joinedAt"],
      },
    ],
    order: [["created_at", "DESC"]],
  });
};

export const getProjectDetails = async (projectSlug, userId) => {
  const whereClause = isUuid(projectSlug) ? { id: projectSlug } : { slug: projectSlug };

  const project = await Project.findOne({
    where: whereClause,
    include: [
      {
        model: ProjectUser,
        as: "projectMembers",
        include: [
          { model: User, as: "user", attributes: ["id", "fullName", "email", "avatarUrl"] },
        ],
      },
    ],
  });

  if (!project) throw new AppError(`No project found with identifier: ${projectSlug}`, 404);

  // Check if the user is a member of this project
  const isMember = project.projectMembers.some((member) => member.userId === userId);
  if (!isMember) throw new AppError("You do not have access to this project.", 403);

  return project;
};

export const createNewProject = async (name, description, creatorId) => {
  let slug = generateSlug(name);

  // Check for duplicate slug
  const existingProject = await Project.findOne({ where: { slug } });
  if (existingProject) slug = `${slug}-${Date.now().toString().slice(-4)}`;

  const newProject = await Project.create({
    name,
    slug,
    description,
  });

  // Automatically assign the creator as the project owner
  await ProjectUser.create({
    projectId: newProject.id,
    userId: creatorId,
    projectRole: PROJECT_ROLE.OWNER,
  });

  return newProject;
};

export const modifyProject = async (projectSlug, updates) => {
  const whereClause = isUuid(projectSlug) ? { id: projectSlug } : { slug: projectSlug };
  const project = await Project.findOne({ where: whereClause });

  if (!project) throw new AppError(`No project found with identifier: ${projectSlug}`, 404);

  return await project.update(updates);
};

export const removeProject = async (projectSlug) => {
  const whereClause = isUuid(projectSlug) ? { id: projectSlug } : { slug: projectSlug };
  const project = await Project.findOne({ where: whereClause });

  if (!project) throw new AppError(`No project found with identifier: ${projectSlug}`, 404);

  await project.destroy();
};
