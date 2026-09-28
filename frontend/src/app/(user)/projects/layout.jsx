import Footer from "@/components/Footer";
import SideNavbar from "@/components/SideNavbar";

export default function ProjectLayout({ children }) {
  return (
    <div className="flex flex-1 overflow-hidden">
      <SideNavbar />

      {/* Content wrapper */}
      <div className="flex flex-1 flex-col overflow-y-auto">
        <main className="flex-1 p-6">{children}</main>
        <Footer />
      </div>
    </div>
  );
}
