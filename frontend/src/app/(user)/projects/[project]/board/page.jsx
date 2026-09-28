import { formatProjectName } from "@/lib/utils";

export async function generateMetadata({ params }) {
  const { project } = await params;
  const formattedProject = formatProjectName(project);

  return {
    title: `${formattedProject} - Board | Team Task Management`,
    description: `Board and sprint task tracking for the ${formattedProject} project.`,
  };
}

export default async function ProjectBoardPage({ params }) {
  const { project } = await params;
  const formattedProject = formatProjectName(project);

  return <div>{formattedProject} Board</div>;
}
