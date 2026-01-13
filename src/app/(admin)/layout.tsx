import { Sidebar } from "../../components/admin-sidebar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-slate-50 dark:bg-black font-sans">
      <Sidebar />
      <div className="flex-1 flex flex-col md:pl-64">
        <main className="flex-1 p-6 md:p-8">
            {children}
        </main>
      </div>
    </div>
  );
}
