import Footer from "@/components/Footer";
import { buttonVariants } from "@/components/ui/button";
import ProjectCard from "@/features/dashboard/ProjectCard";
import { API_URL } from "@/lib/apiClient";
import { Plus } from "lucide-react";
import { cookies } from "next/headers";
import Link from "next/link";

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
