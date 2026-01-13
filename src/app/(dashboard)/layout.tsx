import { Navbar } from "@/components/navbar";
import { Sidebar } from "../../components/dashboard-sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-slate-50 dark:bg-black font-sans">
      <Sidebar />
      <div className="flex-1 flex flex-col md:pl-64">
        <Navbar />
        <main className="flex-1 p-6 md:p-8 pt-24">
            {children}
        </main>
      </div>
    </div>
  );
}
