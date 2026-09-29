import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import StatCard from "@/features/projects/StatCard";
import AssignedProjectCard from "@/features/users/AssignedProjectCard";
import ProfileDetailItem from "@/features/users/ProfileDetailItem";
import { formatUserDate } from "@/lib/utils";
import {
  ArrowUpRight,
  Calendar,
  CheckCircle2,
  Clock,
  FolderKanban,
  Mail,
  MapPin,
  Sparkles,
  TrendingUp,
} from "lucide-react";
import Link from "next/link";

export default function UserProfile({ user }) {
  const initials = user.fullName
    ? user.fullName
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2)
    : "JD";

  const statItems = [
    {
      title: "Assigned Projects",
      value: user.stats?.projectsCount || 4,
      icon: FolderKanban,
      color: "text-blue-500",
      bg: "bg-blue-500/10",
    },
    {
      title: "Active Tasks",
      value: user.stats?.activeTasks || 8,
      icon: Clock,
      color: "text-amber-500",
      bg: "bg-amber-500/10",
    },
    {
      title: "Completed Tasks",
      value: user.stats?.completedTasks || 22,
      icon: CheckCircle2,
      color: "text-emerald-500",
      bg: "bg-emerald-500/10",
    },
    {
      title: "Velocity Rate",
      value: user.stats?.velocityRate || "94%",
      icon: TrendingUp,
      color: "text-purple-500",
      bg: "bg-purple-500/10",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Profile Header Hero Card */}
      <Card className="border-border/70 overflow-hidden shadow-xs">
        {/* Cover Banner */}
        <div className="border-border/50 relative flex h-2 w-full items-start justify-between border-b px-6 py-4">
          <Badge
            variant="secondary"
            className="bg-background/85 text-foreground border-border/50 border text-xs font-medium shadow-2xs backdrop-blur-md"
          >
            <Sparkles className="text-primary mr-1 inline size-3" />
            User Profile
          </Badge>
        </div>

        {/* Profile Details Bar */}
        <div className="px-6 pt-0 pb-6">
          <div className="-mt-14 mb-4 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end">
              {/* Avatar with gradient & online dot */}
              <div className="relative">
                <Avatar className="ring-card from-primary to-primary/80 size-24 rounded-2xl bg-gradient-to-tr shadow-lg ring-4">
                  <AvatarImage src={user.avatarUrl || ""} alt={user.fullName} />
                  <AvatarFallback className="rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-600 text-2xl font-bold tracking-tight text-white">
                    {initials}
                  </AvatarFallback>
                </Avatar>
                <span
                  title="Online and active"
                  className="ring-card absolute -right-0.5 -bottom-0.5 size-4 rounded-full bg-emerald-500 shadow-xs ring-3"
                />
              </div>

              {/* Identity & Role */}
              <div className="space-y-1">
                <div className="flex flex-wrap items-center gap-2.5">
                  <h1 className="text-foreground text-2xl font-bold tracking-tight sm:text-3xl">
                    {user.fullName}
                  </h1>
                </div>
                <p className="text-muted-foreground text-sm font-medium">@{user.userName}</p>
              </div>
            </div>
          </div>

          {/* Bio statement */}
          <p className="text-muted-foreground border-border/40 max-w-3xl border-t pt-3 text-sm leading-relaxed">
            {user.bio}
          </p>
        </div>
      </Card>

      {/* 4 Stat Cards */}
      {/* <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        {statItems.map((stat) => (
          <StatCard key={stat.title} stat={stat} />
        ))}
      </div> */}

      {/* 2-Column Details Grid */}
      <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-3">
        {/* Left Column: Contact & Skills & Preferences */}
        <div className="space-y-6 lg:col-span-1">
          {/* 1. Contact & Info Card */}
          <Card className="border-border/70 shadow-xs">
            <CardHeader className="pb-4">
              <CardTitle className="text-base font-semibold">Contact & Info</CardTitle>
              <CardDescription className="text-xs">Contact details</CardDescription>
            </CardHeader>

            <CardContent className="space-y-4">
              <ProfileDetailItem
                icon={Mail}
                iconBg="bg-blue-500/10"
                iconColor="text-blue-600 dark:text-blue-400"
                label="Email Address"
                value={user.email}
                href={`mailto:${user.email}`}
              />

              <ProfileDetailItem
                icon={Calendar}
                iconBg="bg-emerald-500/10"
                iconColor="text-emerald-600 dark:text-emerald-400"
                label="Member Since"
                value={formatUserDate(user.createdAt)}
              />
            </CardContent>
          </Card>
        </div>

        {/* Right Column: Workspaces & Recent Activity */}
        {/* <div className="space-y-6 lg:col-span-2">
          <Card className="border-border/70 shadow-xs">
            <CardHeader className="flex flex-row items-center justify-between pb-4">
              <div>
                <CardTitle className="text-base font-semibold">Assigned Projects</CardTitle>
                <CardDescription className="text-xs">
                  Active workspaces and deliverables you contribute to
                </CardDescription>
              </div>
              <Link
                href="/dashboard"
                className="text-primary hover:text-primary/80 flex items-center gap-1 text-xs font-medium transition-colors"
              >
                <span>View all projects</span>
                <ArrowUpRight className="size-3.5" />
              </Link>
            </CardHeader>

            <CardContent className="space-y-3">
              {user.projects?.map((proj) => (
                <AssignedProjectCard key={proj.slug} project={proj} />
              ))}
            </CardContent>
          </Card>
        </div> */}
      </div>
    </div>
  );
}
