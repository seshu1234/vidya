import { Sidebar } from "../../components/admin-sidebar";
import { MobileAdminSidebar } from "@/components/mobile-admin-sidebar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-slate-50 dark:bg-black font-sans">
      <Sidebar />
      <div className="flex-1 flex flex-col md:pl-64 overflow-x-hidden w-full">
         {/* Mobile Sidebar Trigger & Header */}
         <div className="md:hidden flex items-center p-4 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-black sticky top-0 z-20">
            <MobileAdminSidebar />
            <span className="font-bold text-lg ml-2">Admin Panel</span>
         </div>

        <main className="flex-1 p-4 md:p-8">
            {children}
        </main>
      </div>
    </div>
  );
}
