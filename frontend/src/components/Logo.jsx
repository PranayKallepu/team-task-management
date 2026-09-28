import { CheckSquare } from "lucide-react";
import Link from "next/link";

export default function Logo({ className = "" }) {
  return (
    <Link
      href="/dashboard"
      className={`flex items-center gap-2.5 text-lg font-semibold tracking-tight transition-opacity hover:opacity-90 ${className}`}
    >
      <div className="bg-primary text-primary-foreground flex size-9 items-center justify-center rounded-lg shadow-sm">
        <CheckSquare className="size-5" />
      </div>
      <span className="text-foreground font-bold">TaskFlow</span>
    </Link>
  );
}
