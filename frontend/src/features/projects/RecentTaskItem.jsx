import { Badge } from "@/components/ui/badge";

export default function RecentTaskItem({ task }) {
  return (
    <div className="flex items-center justify-between py-3 first:pt-0 last:pb-0">
      <div className="space-y-1">
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="text-muted-foreground font-mono text-xs font-normal">
            {task.id}
          </Badge>
          <span className="text-foreground text-sm font-medium">{task.title}</span>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <Badge variant={task.priority === "High" ? "destructive" : "secondary"}>
          {task.priority}
        </Badge>
        <Badge variant={task.status === "Completed" ? "default" : "outline"}>{task.status}</Badge>
      </div>
    </div>
  );
}
