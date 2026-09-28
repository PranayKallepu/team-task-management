import { z } from "zod";
import { PROJECT_STATUSES } from "#src/features/projects/project.constants.js";

export const createProjectSchema = z.object({
  body: z.object({
    name: z.string().min(2, "Project name must be at least 2 characters long"),
    description: z.string().optional(),
  }),
});

export const updateProjectSchema = z.object({
  body: z.object({
    name: z.string().min(2, "Project name must be at least 2 characters long").optional(),
    description: z.string().optional(),
    status: z.enum(PROJECT_STATUSES).optional(),
  }),
});
