import BackButton from "@/components/BackButton";
import Footer from "@/components/Footer";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { Compass, LayoutDashboard } from "lucide-react";
import Link from "next/link";

export const metadata = {
  title: "404 - Page Not Found | TaskFlow",
  description: "The page you are looking for does not exist or has been moved.",
};

export default function NotFounPage() {
  return (
    <div className="bg-background relative flex min-h-screen flex-col justify-between overflow-hidden">
      <div
        aria-hidden="true"
        className="bg-primary/10 pointer-events-none absolute -top-40 left-1/2 -z-10 h-125 w-150 -translate-x-1/2 rounded-full blur-3xl"
      />

      <main className="flex flex-1 items-center justify-center px-6 py-16">
        <div className="mx-auto flex max-w-lg flex-col items-center text-center">
          <Badge
            variant="outline"
            className="border-primary/30 bg-primary/5 text-primary mb-6 gap-1.5 px-3 py-1 text-xs font-semibold"
          >
            <Compass className="size-3.5" />
            404 Error
          </Badge>

          <h1 className="text-foreground text-7xl font-extrabold tracking-tight sm:text-8xl">
            404
          </h1>
          <h2 className="text-foreground mt-4 text-2xl font-bold tracking-tight sm:text-3xl">
            Page not found
          </h2>
          <p className="text-muted-foreground mt-3 max-w-md text-sm leading-relaxed sm:text-base">
            Sorry, we couldn&apos;t find the page you&apos;re looking for. It might have been moved,
            renamed, or the link may be broken.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <BackButton />
            <Link
              href="/dashboard"
              className={buttonVariants({
                variant: "default",
                size: "lg",
                className: "gap-2 font-medium shadow-sm",
              })}
            >
              <LayoutDashboard className="size-4" />
              Go to Dashboard
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
