import { UsersTable } from "./users-table";

export default function AdminUsersPage() {
    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold font-display text-navy-900 dark:text-white">Users</h1>
                    <p className="text-slate-500 dark:text-slate-400">Manage students and instructors.</p>
                </div>
                {/* <Button>Add User</Button> */}
            </div>

            <UsersTable />
        </div>
    );
}
