import { CoursesTable } from "./courses-table";

export default function AdminCoursesPage() {
    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold font-display text-navy-900 dark:text-white">Courses</h1>
                    <p className="text-slate-500 dark:text-slate-400">Manage your course catalog.</p>
                </div>
            </div>

            <CoursesTable />
        </div>
    );
}
