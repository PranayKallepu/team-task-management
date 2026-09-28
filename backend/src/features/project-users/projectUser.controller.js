import {
  createProjectMember,
  deleteProjectMember,
  fetchProjectMembers,
  modifyMemberRole,
} from "#src/features/project-users/projectUser.service.js";

// Get all members of a project
export const getProjectMembers = async (req, res, next) => {
  const members = await fetchProjectMembers(req.params.projectSlug);

  res.status(200).json({
    status: "success",
    results: members.length,
    data: { members },
  });
};

// Add a user to a project with a specific role
export const addProjectMember = async (req, res, next) => {
  const { userId, projectRole } = req.body;

  const newMember = await createProjectMember(req.params.projectSlug, userId, projectRole);

  res.status(201).json({
    status: "success",
    data: { member: newMember },
  });
};

// Update a member's role within a project
export const updateMemberRole = async (req, res, next) => {
  const { userId } = req.params;
  const { projectRole } = req.body;

  const updatedMember = await modifyMemberRole(req.params.projectSlug, userId, projectRole);

  res.status(200).json({
    status: "success",
    data: { member: updatedMember },
  });
};

// Remove a member from a project
export const removeProjectMember = async (req, res, next) => {
  const { userId } = req.params;

  await deleteProjectMember(req.params.projectSlug, userId);

  res.status(204).json({
    status: "success",
    data: null,
  });
};
