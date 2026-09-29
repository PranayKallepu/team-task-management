import Footer from "@/components/Footer";
import Header from "@/components/Header";
import UserProfile from "@/features/users/UserProfile";
import { API_URL } from "@/lib/apiClient";

export const metadata = {
  title: "Profile | TaskFlow",
  description: "User profile, active deliverables, and workspace statistics.",
};

export default async function MePage() {
  const response = await fetch(`${API_URL}/users/me`);
  const data = await response.json();
  const user = data.data.user;
  console.log(user);
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
