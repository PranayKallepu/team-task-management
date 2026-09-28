import Header from "@/components/Header";

export default function UserLayout({ children }) {
  return (
    <div className="bg-background flex h-screen flex-col overflow-hidden">
      <Header />

      {children}
    </div>
  );
}
