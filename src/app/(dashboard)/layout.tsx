import { Navbar } from "@/components/navbar";
import { Sidebar } from "../../components/dashboard-sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-black font-sans">
      <Navbar />
      <div className="flex pt-[73px] min-h-screen">
        <Sidebar />
        <main className="flex-1 flex flex-col md:pl-64 transition-all duration-300">
            <div className="flex-1 p-6 md:p-8">
               {children}
            </div>
        </main>
      </div>
    </div>
  );
}
