import Footer from "@/components/Footer";
import Header from "@/components/Header";
import UserProfile from "@/features/users/UserProfile";

export const metadata = {
  title: "Profile | TaskFlow",
  description: "User profile, active deliverables, and workspace statistics.",
};

// Server Component: Ready for async API calls or database queries
async function getUserProfile() {
  // Placeholder data simulating an API response
  // Replace this with actual backend fetch, e.g.:
  // const res = await fetch(`${process.env.API_URL}/api/users/me`, { cache: "no-store" });
  // return res.json();
  return {
    fullName: "John Doe",
    userName: "johndoe",
    email: "john.doe@taskflow.dev",
    role: "Senior Full Stack Engineer",
    department: "Product Engineering",
    location: "San Francisco, CA",
    timezone: "PST (UTC-7)",
    joinedDate: "January 2024",
    bio: "Passionate engineer focusing on team task automation, design systems, and real-time collaboration architecture.",
    avatarUrl: "",
    statusMessage: "Active in sprint planning & reviewing PRs",
    stats: {
      projectsCount: 4,
      activeTasks: 8,
      completedTasks: 22,
      velocityRate: "94%",
    },
    projects: [
      {
        name: "Task App",
        slug: "task-app",
        role: "Lead Maintainer",
        status: "Active",
        statusVariant: "default",
        completedTasks: 8,
        totalTasks: 12,
        tasksSummary: "4 active tasks • Due next week",
        accent: "from-blue-600 to-indigo-600",
        iconBg: "bg-blue-500/10 text-blue-600 dark:text-blue-400",
      },
      {
        name: "Website Redesign",
        slug: "website-redesign",
        role: "Frontend Contributor",
        status: "In Progress",
        statusVariant: "secondary",
        completedTasks: 6,
        totalTasks: 10,
        tasksSummary: "2 tasks under review • Staging preview live",
        accent: "from-purple-600 to-pink-600",
        iconBg: "bg-purple-500/10 text-purple-600 dark:text-purple-400",
      },
      {
        name: "Design System",
        slug: "design-system",
        role: "Component Author",
        status: "Review",
        statusVariant: "outline",
        completedTasks: 14,
        totalTasks: 16,
        tasksSummary: "Tokens and accessibility audits complete",
        accent: "from-emerald-600 to-teal-600",
        iconBg: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
      },
    ],
  };
}

export default async function MePage() {
  // Simulated server-side fetch
  const user = await getUserProfile();

  return (
    <div className="bg-background flex h-screen flex-col overflow-hidden">
      <Header user={user} />

      <div className="flex-1 overflow-y-auto">
        <main className="container mx-auto max-w-6xl p-6 pb-12">
          <UserProfile user={user} />
        </main>
        <Footer />
      </div>
    </div>
  );
}
