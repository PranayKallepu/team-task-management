import { PROJECT_ROLE } from "#src/features/project-users/projectUser.constants.js";
import ProjectUser from "#src/features/project-users/projectUser.model.js";
import Project from "#src/features/projects/project.model.js";
import User from "#src/features/users/user.model.js";
import AppError from "#src/utils/appError.js";

const isUuid = (val) => /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(val);

const findProject = async (projectSlug) => {
  const whereClause = isUuid(projectSlug) ? { id: projectSlug } : { slug: projectSlug };
  const project = await Project.findOne({ where: whereClause });

  if (!project) throw new AppError(`No project found with identifier: ${projectSlug}`, 404);

  return project;
};

export const fetchProjectMembers = async (projectSlug) => {
  const project = await findProject(projectSlug);

  return await ProjectUser.findAll({
    where: { projectId: project.id },
    include: [
      {
        model: User,
        as: "user",
        attributes: ["id", "fullName", "userName", "email", "avatarUrl", "isActive"],
      },
    ],
    order: [["joined_at", "ASC"]],
  });
};

export const createProjectMember = async (projectSlug, userId, projectRole) => {
  const project = await findProject(projectSlug);

  const targetUser = await User.findByPk(userId);
  if (!targetUser) throw new AppError("No user found with that ID.", 404);

  const existingMember = await ProjectUser.findOne({
    where: { projectId: project.id, userId },
  });

  if (existingMember) throw new AppError("This user is already a member of this project.", 409);

  return await ProjectUser.create({
    projectId: project.id,
    userId,
    projectRole,
  });
};

export const modifyMemberRole = async (projectSlug, userId, projectRole) => {
  const project = await findProject(projectSlug);

  const member = await ProjectUser.findOne({
    where: { projectId: project.id, userId },
  });

  if (!member) throw new AppError("This user is not a member of this project.", 404);

  if (member.projectRole === PROJECT_ROLE.OWNER)
    throw new AppError("Cannot change the project owner's role directly.", 403);

  return await member.update({ projectRole });
};

export const deleteProjectMember = async (projectSlug, userId) => {
  const project = await findProject(projectSlug);

  const member = await ProjectUser.findOne({
    where: { projectId: project.id, userId },
  });

  if (!member) throw new AppError("This user is not a member of this project.", 404);

  if (member.projectRole === PROJECT_ROLE.OWNER)
    throw new AppError("The project owner cannot be removed. Transfer ownership first.", 403);

  await member.destroy();
};
