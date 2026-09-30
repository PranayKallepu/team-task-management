import Footer from "@/components/Footer";
import CreateProjectForm from "@/features/projects/CreateProjectForm";

export const metadata = {
  title: "New Project | Team Task Management",
  description: "Create a new project workspace for your team",
};

export default function NewProjectPage() {
  console.log("hello world");

  return (
    <div className="flex flex-1 flex-col overflow-y-auto">
      <main className="container mx-auto max-w-7xl flex-1 p-6">
        <CreateProjectForm />
      </main>
      <Footer />
    </div>
  );
}
