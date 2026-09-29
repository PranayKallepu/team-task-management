import Logo from "@/components/Logo";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";

export default function Header({ user = { fullName: "John Doe", userName: "johndoe" } }) {
  const getInitials = (name) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <header className="border-border/60 bg-background/95 supports-backdrop-filter:bg-background/60 sticky top-0 z-30 flex h-16 w-full shrink-0 items-center justify-between border-b px-6 backdrop-blur">
      <div className="flex h-16 items-center px-6">
        <Logo />
      </div>

      <Link
        href="/me"
        className="hover:bg-muted/70 group flex items-center gap-3 rounded-lg px-2.5 py-1.5 transition-colors"
        title="View profile (/me)"
      >
        <div className="flex flex-col text-right">
          <span className="text-foreground group-hover:text-primary text-sm leading-tight font-semibold transition-colors">
            {user.fullName}
          </span>
          <span className="text-muted-foreground text-xs leading-tight">@{user.userName}</span>
        </div>

        <Avatar className="ring-border size-9 shadow-xs ring-1">
          <AvatarImage src={user.avatarUrl} alt={user.fullName} />
          <AvatarFallback className="bg-primary/10 text-primary text-xs font-medium">
            {getInitials(user.fullName)}
          </AvatarFallback>
        </Avatar>
      </Link>
    </header>
  );
}
