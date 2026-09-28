import { formatProjectName } from "@/lib/utils";

export async function generateMetadata({ params }) {
  const { project } = await params;
  const formattedProject = formatProjectName(project);

  return {
    title: `${formattedProject} - Tickets | Team Task Management`,
    description: `Track, prioritize, and manage tickets and issues for the ${formattedProject} project.`,
  };
}

export default async function ProjectTicketsPage({ params }) {
  const { project } = await params;
  const formattedProject = formatProjectName(project);

  return <div>{formattedProject} Tickets</div>;
}
