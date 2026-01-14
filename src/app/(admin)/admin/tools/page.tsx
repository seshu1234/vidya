import { ToolsTable } from "./tools-table";

export default function AdminToolsPage() {
    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold font-display text-navy-900 dark:text-white">Developer Tools</h1>
                <p className="text-slate-500 dark:text-slate-400">Manage the 100+ tools library shown on the landing page.</p>
            </div>

            <ToolsTable />
        </div>
    );
}
