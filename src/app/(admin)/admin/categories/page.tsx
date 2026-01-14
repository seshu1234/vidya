import { CategoriesTable } from "./_components/categories-table";

export default function AdminCategoriesPage() {
    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold font-display text-navy-900 dark:text-white">Categories</h1>
                    <p className="text-slate-500 dark:text-slate-400">Manage course categories.</p>
                </div>
            </div>

            <CategoriesTable />
        </div>
    );
}
