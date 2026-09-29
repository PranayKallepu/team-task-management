"use client";

import { Button, buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, FolderPlus, Sparkles } from "lucide-react";
import Link from "next/link";
import { useActionState, useState } from "react";
import { createProjectAction } from "./projectAction";

export default function CreateProjectForm() {
  const [name, setName] = useState("");
  const [key, setKey] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("Software");
  const [priority, setPriority] = useState("Medium");
  const [startDate, setStartDate] = useState("");
  const [dueDate, setDueDate] = useState("");

  const [state, formAction, isPending] = useActionState(createProjectAction, null);
  console.log("state ", state);
  // Auto-generate key from project name
  const handleNameChange = (e) => {
    const val = e.target.value;
    setName(val);
    if (!key || key.length <= 4) {
      const generated = val
        .split(" ")
        .map((w) => w[0])
        .join("")
        .toUpperCase()
        .slice(0, 4);
      setKey(generated);
    }
  };

  const categories = ["Software", "Design", "Marketing", "DevOps", "Operations"];
  const priorities = ["Low", "Medium", "High", "Urgent"];

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      {/* Main Card */}
      <Card className="border-border/70 shadow-sm">
        <CardHeader className="border-border/60 space-y-1 border-b pb-6">
          <div className="flex items-center gap-3">
            <div className="bg-primary/10 text-primary flex size-10 items-center justify-center rounded-xl">
              <FolderPlus className="size-5" />
            </div>
            <div>
              <CardTitle className="text-xl font-bold tracking-tight">Create New Project</CardTitle>
              <CardDescription className="text-muted-foreground text-xs">
                Set up a new workspace for team tasks, sprints, and deliverables.
              </CardDescription>
            </div>
          </div>
        </CardHeader>

        <form action={formAction}>
          <CardContent className="space-y-6 pt-6">
            {/* Project Name and Key */}
            <div className="space-y-2">
              <Label htmlFor="project-name">
                Project Name <span className="text-destructive">*</span>
              </Label>
              <Input
                id="project-name"
                placeholder="e.g., Mobile App v2"
                value={name}
                onChange={handleNameChange}
                required
                name="name"
              />
            </div>

            {/* Description */}
            <div className="space-y-2">
              <Label htmlFor="project-desc">Description</Label>
              <textarea
                id="project-desc"
                rows={3}
                placeholder="Brief summary of project goals, deliverables, and scope..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                name="description"
                className="placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 w-full rounded-lg border bg-transparent p-2.5 text-sm transition-colors outline-none focus-visible:ring-3"
              />
            </div>
          </CardContent>

          <CardFooter className="border-border/60 bg-muted/20 flex items-center justify-end gap-3 border-t py-4">
            <Link href="/dashboard">
              <Button variant="outline">Cancel</Button>
            </Link>

            <Button type="submit" size="default" disabled={isPending} className="gap-2 shadow-xs">
              {isPending ? "Saving..." : "Create Project"}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
