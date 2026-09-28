"use client";

import { cn } from "@/lib/utils";
import { CheckSquare, Kanban, LayoutDashboard, Users } from "lucide-react";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";

export default function SideNavbar() {
  const pathname = usePathname();
  const params = useParams();
  const project = params?.project;

  const navLinks = [
    { name: "Project Overview", href: `/projects/${project}/overview`, icon: LayoutDashboard },
    { name: "Board", href: `/projects/${project}/board`, icon: Kanban },
    { name: "Tickets", href: `/projects/${project}/tickets`, icon: CheckSquare },
    { name: "Team", href: `/projects/${project}/team`, icon: Users },
  ];

  return (
    <aside className="border-border/60 bg-card text-card-foreground flex h-full w-64 shrink-0 flex-col border-r">
      {/* Navigation Links with Active Highlighting */}
      <div className="flex-1 overflow-y-auto px-3 py-4">
        <nav className="mt-3 space-y-1">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const isActive = pathname === link.href || pathname?.startsWith(`${link.href}/`);

            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors",
                  isActive
                    ? "bg-primary text-primary-foreground font-medium shadow-xs"
                    : "text-muted-foreground hover:bg-muted/80 hover:text-foreground",
                )}
              >
                <Icon
                  className={cn(
                    "size-4 shrink-0",
                    isActive ? "text-primary-foreground" : "text-muted-foreground",
                  )}
                />
                <span>{link.name}</span>
              </Link>
            );
          })}
        </nav>
      </div>
    </aside>
  );
}
