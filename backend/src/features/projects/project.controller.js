import {
  createNewProject,
  getProjectDetails,
  getProjectsForUser,
  modifyProject,
  removeProject,
} from "#src/features/projects/project.service.js";

// Get all projects the authenticated user is a member of
export const getAllProjects = async (req, res, next) => {
  const projects = await getProjectsForUser(req.user.id);

  res.status(200).json({
    status: "success",
    results: projects.length,
    data: { projects },
  });
};

// Get single project by slug or ID
export const getProject = async (req, res, next) => {
  const { projectSlug } = req.params;

  const project = await getProjectDetails(projectSlug, req.user.id);

  res.status(200).json({
    status: "success",
    data: { project },
  });
};

// Create new project (creator automatically becomes the owner)
export const createProject = async (req, res, next) => {
  const { name, description } = req.body;
  const creatorId = req.user.id;

  const newProject = await createNewProject(name, description, creatorId);

  res.status(201).json({
    status: "success",
    data: { project: newProject },
  });
};

// Update project
export const updateProject = async (req, res, next) => {
  const { projectSlug } = req.params;

  const updatedProject = await modifyProject(projectSlug, req.body);

  res.status(200).json({
    status: "success",
    data: { project: updatedProject },
  });
};

// Delete project
export const deleteProject = async (req, res, next) => {
  const { projectSlug } = req.params;

  await removeProject(projectSlug);

  res.status(204).json({
    status: "success",
    data: null,
  });
};
