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

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   setIsSubmitting(true);
  //   // Placeholder notification before backend integration
  //   const newProject = {
  //     name,
  //     key,
  //     description,
  //     category,
  //     priority,
  //     startDate,
  //     dueDate,
  //   };
  //   const cookieStore = await cookies();
  //   const jwt = cookieStore.get("jwt")?.value;
  //   const response = await fetch(`${API_URL}/projects`, {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //       Cookie: `jwt=${jwt}`,
  //     },
  //     body: JSON.stringify(newProject),
  //   });
  //   const data = await response.json();
  //   console.log("API Response:", data);
  //   setShowNotice(true);
  //   setTimeout(() => {
  //     setIsSubmitting(false);
  //   }, 1000);
  // };

  const categories = ["Software", "Design", "Marketing", "DevOps", "Operations"];
  const priorities = ["Low", "Medium", "High", "Urgent"];

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      {/* Top Breadcrumb / Back Link */}
      <div className="flex items-center gap-2">
        <Link
          href="/dashboard"
          className="text-muted-foreground hover:text-foreground flex items-center gap-1.5 text-xs font-medium transition-colors"
        >
          <ArrowLeft className="size-3.5" />
          Back to Projects
        </Link>
      </div>

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
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              <div className="space-y-2 sm:col-span-2">
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

              <div className="space-y-2">
                <Label htmlFor="project-key">
                  Key / Identifier <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="project-key"
                  placeholder="e.g., MOB"
                  value={key}
                  onChange={(e) => setKey(e.target.value.toUpperCase())}
                  maxLength={6}
                  required
                />
              </div>
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

            {/* Category selection */}
            <div className="space-y-2">
              <Label>Category</Label>
              <div className="flex flex-wrap gap-2">
                {categories.map((cat) => (
                  <button
                    type="button"
                    key={cat}
                    onClick={() => setCategory(cat)}
                    className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-all ${
                      category === cat
                        ? "bg-primary text-primary-foreground shadow-xs"
                        : "bg-muted/70 text-muted-foreground hover:bg-muted hover:text-foreground"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Priority selection */}
            <div className="space-y-2">
              <Label>Priority</Label>
              <div className="flex flex-wrap gap-2">
                {priorities.map((p) => (
                  <button
                    type="button"
                    key={p}
                    onClick={() => setPriority(p)}
                    className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-all ${
                      priority === p
                        ? "bg-foreground text-background font-semibold shadow-xs"
                        : "border-border/80 text-muted-foreground hover:bg-muted/50 hover:text-foreground border"
                    }`}
                  >
                    {p}
                  </button>
                ))}
              </div>
            </div>

            {/* Dates */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="start-date">Start Date</Label>
                <Input
                  id="start-date"
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="due-date">Target Due Date</Label>
                <Input
                  id="due-date"
                  type="date"
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                />
              </div>
            </div>
          </CardContent>

          <CardFooter className="border-border/60 bg-muted/20 flex items-center justify-between border-t py-4">
            <Link href="/dashboard" className={buttonVariants({ variant: "ghost", size: "sm" })}>
              Cancel
            </Link>

            <Button type="submit" size="default" disabled={isPending} className="gap-2 shadow-xs">
              <Sparkles className="size-4" />
              {isPending ? "Saving..." : "Create Project"}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
