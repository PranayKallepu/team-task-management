import { formatProjectName } from "@/lib/utils";

export async function generateMetadata({ params }) {
  const { project } = await params;
  const formattedProject = formatProjectName(project);

  return {
    title: `${formattedProject} - Team | Team Task Management`,
    description: `Collaborators, roles, and team assignments for the ${formattedProject} project.`,
  };
}

export default async function ProjectTeamPage({ params }) {
  const { project } = await params;
  const formattedProject = formatProjectName(project);

  return <div>{formattedProject} Team</div>;
}
