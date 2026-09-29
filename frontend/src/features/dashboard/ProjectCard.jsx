import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ArrowUpRight, Calendar, FolderKanban, Users } from "lucide-react";
import Link from "next/link";

export default function ProjectCard({ project }) {
  const progress = Math.round((project.completedTasks / project.totalTasks) * 100);

  return (
    <Link href={`/projects/${project.slug}/overview`} className="group block focus:outline-none">
      <Card className="border-border/70 group-hover:border-primary/50 bg-card flex h-full flex-col justify-between overflow-hidden transition-all duration-200 group-hover:shadow-md hover:-translate-y-0.5">
        <CardHeader className="space-y-3 pb-3">
          <div className="flex items-center justify-between">
            <div
              className={`flex size-10 items-center justify-center rounded-xl font-bold ${project.color}`}
            >
              <FolderKanban className="size-5" />
            </div>
            <div className="flex items-center gap-2">
              <Badge variant={project.statusVariant} className="text-xs">
                {project.status}
              </Badge>
              <ArrowUpRight className="text-muted-foreground group-hover:text-primary size-4 opacity-0 transition-colors group-hover:opacity-100" />
            </div>
          </div>

          <div>
            <CardTitle className="group-hover:text-primary text-lg font-bold transition-colors">
              {project.name}
            </CardTitle>
            <CardDescription className="text-muted-foreground mt-1.5 line-clamp-2 text-xs leading-relaxed">
              {project.description}
            </CardDescription>
          </div>
        </CardHeader>

        <CardFooter className="border-border/50 bg-muted/20 text-muted-foreground flex items-center justify-between border-t py-3 text-xs">
          <div className="flex items-center gap-1.5">
            <Users className="size-3.5" />
            <span>{project.projectMembers.length} members</span>
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
}
