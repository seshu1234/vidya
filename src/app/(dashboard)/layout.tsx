import { Sidebar } from "../../components/dashboard-sidebar";
import { MobileSidebar } from "@/components/mobile-sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-black font-sans">
      <div className="flex min-h-screen">
        <Sidebar />
        <main className="flex-1 flex flex-col md:pl-64 transition-all duration-300 overflow-x-hidden w-full">
             {/* Mobile Sidebar Trigger & Header */}
             <div className="md:hidden flex items-center p-4 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-black sticky top-0 z-20">
                <MobileSidebar />
                <span className="font-bold text-lg">Dashboard</span>
             </div>

            <div className="flex-1 p-4 md:p-8 w-full max-w-full">
               {children}
            </div>
        </main>
      </div>
    </div>
  );
}
