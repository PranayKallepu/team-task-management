import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import RecentTaskItem from "@/features/projects/RecentTaskItem";
import StatCard from "@/features/projects/StatCard";
import { CheckCircle2, Clock, ListTodo, Users } from "lucide-react";

export default function ProjectOverview({ project }) {
  const stats = [
    {
      title: "Total Tasks",
      value: "24",
      icon: ListTodo,
      color: "text-blue-500",
      bg: "bg-blue-500/10",
    },
    {
      title: "In Progress",
      value: "8",
      icon: Clock,
      color: "text-amber-500",
      bg: "bg-amber-500/10",
    },
    {
      title: "Completed",
      value: "14",
      icon: CheckCircle2,
      color: "text-emerald-500",
      bg: "bg-emerald-500/10",
    },
    {
      title: "Team Members",
      value: "6",
      icon: Users,
      color: "text-purple-500",
      bg: "bg-purple-500/10",
    },
  ];

  const recentTasks = [
    {
      id: "TASK-101",
      title: "Design user authentication flow",
      priority: "High",
      status: "In Progress",
    },
    {
      id: "TASK-102",
      title: "Integrate team invitation API",
      priority: "Medium",
      status: "Pending",
    },
    {
      id: "TASK-103",
      title: "Configure base layout and navigation",
      priority: "High",
      status: "Completed",
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-foreground text-2xl font-bold tracking-tight sm:text-3xl">
            {project} Project&apos;s Overview
          </h1>
          <p className="text-muted-foreground mt-1 text-sm">
            Welcome back! Here is a summary of {project} project&apos;s current tasks.
          </p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <StatCard key={stat.title} stat={stat} />
        ))}
      </div>

      {/* Recent Tasks Card */}
      <Card className="border-border/70 shadow-xs">
        <CardHeader className="mb-4">
          <CardTitle className="text-lg font-semibold">Recent Tasks</CardTitle>
          <CardDescription>Your most recently updated tasks and deliverables</CardDescription>
        </CardHeader>

        <CardContent>
          <div className="divide-border/60 divide-y">
            {recentTasks.map((task) => (
              <RecentTaskItem key={task.id} task={task} />
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
