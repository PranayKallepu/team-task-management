import StatCard from "@/features/projects/StatCard";
import { API_URL, apiClient } from "@/lib/apiClient";
import { formatProjectName } from "@/lib/utils";
import { CheckCircle2, Clock, ListTodo, Users } from "lucide-react";
import { cookies } from "next/headers";

export default async function ProjectOverview({ projectSlug }) {
  const projectName = formatProjectName(projectSlug);
  const cookieStore = await cookies();
  const res = await fetch(`${API_URL}/projects/${projectSlug}`, {
    method: "GET",
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  const data = await res.json();
  const project = data.data.project;
  const stats = [
    {
      title: "Total Tasks",
      value: "0",
      icon: ListTodo,
      color: "text-blue-500",
      bg: "bg-blue-500/10",
    },
    {
      title: "In Progress",
      value: "0",
      icon: Clock,
      color: "text-amber-500",
      bg: "bg-amber-500/10",
    },
    {
      title: "Completed",
      value: "0",
      icon: CheckCircle2,
      color: "text-emerald-500",
      bg: "bg-emerald-500/10",
    },
    {
      title: "Team Members",
      value: project.projectMembers.length,
      icon: Users,
      color: "text-purple-500",
      bg: "bg-purple-500/10",
    },
  ];
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-foreground text-2xl font-bold tracking-tight sm:text-3xl">
            {projectName} Project&apos;s Overview
          </h1>
          <p className="text-muted-foreground mt-1 text-sm">
            Welcome back! Here is a summary of {projectName} project&apos;s current tasks.
          </p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <StatCard key={stat.title} stat={stat} />
        ))}
      </div>
    </div>
  );
}
