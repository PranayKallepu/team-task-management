import { Arimo } from "next/font/google";
import "@/app/globals.css";
import { cn } from "@/lib/utils";

const arimo = Arimo({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata = {
  title: "Team Task Management",
  description: "Team task management application",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={cn("h-full antialiased", arimo.variable, "font-sans")}>
      <body className={cn(arimo.className, "flex min-h-full flex-col")}>{children}</body>
    </html>
  );
}
