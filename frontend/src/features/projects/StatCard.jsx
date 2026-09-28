import { Card, CardAction, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function StatCard({ stat }) {
  const Icon = stat.icon;

  return (
    <Card className="border-border/70 justify-center p-4 py-3 shadow-xs">
      <CardHeader className="gap-0.5 p-0">
        <CardTitle className="text-muted-foreground text-sm font-medium">{stat.title}</CardTitle>

        <CardDescription className="text-foreground text-3xl font-semibold tracking-tight">
          {stat.value}
        </CardDescription>

        <CardAction className="self-center">
          <div
            className={`flex size-10 items-center justify-center rounded-xl ${stat.bg} ${stat.color}`}
          >
            <Icon className="h-4/5 w-4/5" />
          </div>
        </CardAction>
      </CardHeader>
    </Card>
  );
}
