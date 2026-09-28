import Footer from "@/components/Footer";
import { buttonVariants } from "@/components/ui/button";
import ProjectCard from "@/features/dashboard/ProjectCard";
import { API_URL } from "@/lib/apiClient";
import { Plus } from "lucide-react";
import { cookies } from "next/headers";
import Link from "next/link";

// const dummyProjects = [
//   {
//     id: "1",
//     name: "Task App",
//     slug: "task-app",
//     description: "Core team task and workflow collaboration platform with real-time updates.",
//     category: "Software",
//     status: "Active",
//     statusVariant: "default",
//     completedTasks: 18,
//     totalTasks: 24,
//     membersCount: 6,
//     dueDate: "Oct 15, 2026",
//     color: "bg-blue-500/10 text-blue-600 dark:text-blue-400",
//   },
//   {
//     id: "2",
//     name: "Website Redesign",
//     slug: "website-redesign",
//     description: "Overhaul of the marketing landing page, design tokens, and user onboarding.",
//     category: "Design",
//     status: "In Progress",
//     statusVariant: "secondary",
//     completedTasks: 8,
//     totalTasks: 15,
//     membersCount: 4,
//     dueDate: "Nov 02, 2026",
//     color: "bg-purple-500/10 text-purple-600 dark:text-purple-400",
//   },
//   {
//     id: "3",
//     name: "Mobile App v2",
//     slug: "mobile-app",
//     description: "Cross-platform mobile application companion for iOS and Android.",
//     category: "Mobile",
//     status: "Planning",
//     statusVariant: "outline",
//     completedTasks: 3,
//     totalTasks: 20,
//     membersCount: 5,
//     dueDate: "Dec 10, 2026",
//     color: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
//   },
//   {
//     id: "4",
//     name: "Cloud Migration",
//     slug: "cloud-migration",
//     description:
//       "Transitioning relational databases and persistent assets to high-availability AWS nodes.",
//     category: "DevOps",
//     status: "Active",
//     statusVariant: "default",
//     completedTasks: 14,
//     totalTasks: 16,
//     membersCount: 3,
//     dueDate: "Oct 30, 2026",
//     color: "bg-amber-500/10 text-amber-600 dark:text-amber-400",
//   },
//   {
//     id: "5",
//     name: "Design System",
//     slug: "design-system",
//     description: "Comprehensive UI component library, accessibility guidelines, and Figma tokens.",
//     category: "Design",
//     status: "In Progress",
//     statusVariant: "secondary",
//     completedTasks: 22,
//     totalTasks: 30,
//     membersCount: 4,
//     dueDate: "Nov 18, 2026",
//     color: "bg-pink-500/10 text-pink-600 dark:text-pink-400",
//   },
//   {
//     id: "6",
//     name: "Analytics Engine",
//     slug: "analytics-engine",
//     description: "Real-time task velocity metrics, team telemetry, and executive reports.",
//     category: "Data",
//     status: "Active",
//     statusVariant: "default",
//     completedTasks: 9,
//     totalTasks: 12,
//     membersCount: 3,
//     dueDate: "Dec 05, 2026",
//     color: "bg-cyan-500/10 text-cyan-600 dark:text-cyan-400",
//   },
// ];

export default async function Dashboard() {
  const cookieStore = await cookies();
  const jwt = cookieStore.get("jwt")?.value;
  const response = await fetch(`${API_URL}/projects`, {
    headers: {
      Cookie: `jwt=${jwt}`,
    },
  });
  const data = await response.json();
  const projects = data.data.projects;

  return (
    <div className="flex flex-1 flex-col overflow-y-auto">
      <main className="container mx-auto max-w-7xl flex-1 p-6">
        <div className="border-border/60 flex flex-col gap-4 border-b pb-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-foreground text-2xl font-bold tracking-tight sm:text-3xl">
              Projects
            </h1>
            <p className="text-muted-foreground mt-1 text-sm">
              Select a project to view its overview, sprint boards, and team deliverables.
            </p>
          </div>

          <Link
            href="/project/new"
            className={buttonVariants({
              variant: "default",
              size: "lg",
              className: "gap-2 self-start font-medium shadow-xs sm:self-auto",
            })}
          >
            <Plus className="size-4" />
            New Project
          </Link>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {projects?.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}
