import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

export default function AssignedProjectCard({ project, proj }) {
  const item = project || proj;
  if (!item) return null;

  const completed = item.completedTasks ?? 8;
  const total = item.totalTasks ?? 12;
  const progress = total > 0 ? Math.round((completed / total) * 100) : 0;

  const projectInitials = item.name
    ? item.name
        .split(" ")
        .map((w) => w[0])
        .join("")
        .toUpperCase()
        .slice(0, 2)
    : "PR";

  return (
    <div className="border-border/70 bg-card/60 hover:border-primary/40 hover:bg-muted/30 group relative rounded-xl border p-4 transition-all duration-150">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        {/* Left: Avatar & Info */}
        <div className="flex items-center gap-3.5">
          <div
            className={`size-10 rounded-xl bg-gradient-to-br ${item.accent || "from-blue-600 to-indigo-600"} flex shrink-0 items-center justify-center font-bold text-white shadow-xs`}
          >
            <span className="text-xs tracking-tight">{projectInitials}</span>
          </div>

          <div className="space-y-1">
            <div className="flex flex-wrap items-center gap-2">
              <Link
                href={`/projects/${item.slug}/overview`}
                className="text-foreground group-hover:text-primary text-sm font-semibold transition-colors"
              >
                {item.name}
              </Link>
              {item.role && (
                <Badge variant="secondary" className="border-border/60 text-[11px] font-normal">
                  {item.role}
                </Badge>
              )}
              {item.status && (
                <Badge variant={item.statusVariant || "outline"} className="text-[10px]">
                  {item.status}
                </Badge>
              )}
            </div>
            {item.tasksSummary && (
              <p className="text-muted-foreground text-xs">{item.tasksSummary}</p>
            )}
          </div>
        </div>

        {/* Right: Progress & Link */}
        <div className="flex items-center justify-between gap-4 sm:justify-end">
          <div className="w-28 space-y-1 text-right sm:w-32">
            <div className="text-muted-foreground flex justify-between text-[11px]">
              <span>Progress</span>
              <span className="text-foreground font-semibold">{progress}%</span>
            </div>
            <div className="bg-muted h-1.5 w-full overflow-hidden rounded-full">
              <div
                className="bg-primary h-full rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          <Link
            href={`/projects/${item.slug}/overview`}
            className={buttonVariants({
              variant: "outline",
              size: "sm",
              className:
                "border-border/60 group-hover:border-primary/50 shrink-0 gap-1 text-xs font-medium",
            })}
          >
            <span>Open</span>
            <ArrowUpRight className="size-3" />
          </Link>
        </div>
      </div>
    </div>
  );
}
