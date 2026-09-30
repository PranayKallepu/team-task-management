import ProjectOverview from "@/features/projects/ProjectOverview";
import { formatProjectName } from "@/lib/utils";

export async function generateMetadata({ params }) {
  const { project } = await params;
  const formattedProject = formatProjectName(project);

  return {
    title: `${formattedProject} - Overview | Team Task Management`,
    description: `Track milestones, metrics, and deliverables for the ${formattedProject} project.`,
  };
}

export default async function ProjectOverviewPage({ params }) {
  const { project } = await params;
  return <ProjectOverview projectSlug={project} />;
}
