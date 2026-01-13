"use client";
// forcing re-index

import Link from "next/link";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Users, BookOpen, Settings, BarChart3, LogOut, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";

const sidebarItems = [
    { name: "Overview", href: "/admin", icon: LayoutDashboard },
    { name: "Users", href: "/admin/users", icon: Users },
    { name: "Courses", href: "/admin/courses", icon: BookOpen },
    { name: "Analytics", href: "/admin/analytics", icon: BarChart3 },
    { name: "Settings", href: "/admin/settings", icon: Settings },
];

export function Sidebar() {
    const pathname = usePathname();

    return (
        <aside className="fixed inset-y-0 left-0 z-30 hidden w-64 flex-col border-r border-slate-200 dark:border-slate-800 bg-white dark:bg-black md:flex">
             <div className="flex h-16 shrink-0 items-center px-6 border-b border-slate-200 dark:border-slate-800">
                <Link href="/admin" className="flex items-center gap-2 font-bold text-xl text-navy-900 dark:text-white">
                    <div className="h-8 w-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-display font-bold text-lg">
                        A
                    </div>
                    Vidya Admin
                </Link>
            </div>
            
            <div className="flex flex-1 flex-col justify-between px-4 py-6">
                <nav className="space-y-1">
                    {sidebarItems.map((item) => {
                        const Icon = item.icon;
                        const isActive = pathname === item.href;
                        
                        return (
                            <Link
                                key={item.name}
                                href={item.href}
                                className={cn(
                                    "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                                    isActive 
                                        ? "bg-indigo-600 text-white" 
                                        : "text-slate-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-900"
                                )}
                            >
                                <Icon className="h-5 w-5" />
                                {item.name}
                            </Link>
                        );
                    })}
                </nav>

                <div className="space-y-4">
                     <div className="bg-indigo-50 dark:bg-indigo-900/20 rounded-xl p-4 border border-indigo-100 dark:border-indigo-800/10">
                        <div className="flex items-center gap-3 mb-2">
                            <Shield className="h-5 w-5 text-indigo-600" />
                            <div>
                                <p className="text-sm font-bold text-navy-900 dark:text-white">Super Admin</p>
                                <p className="text-xs text-muted-foreground">Full Access</p>
                            </div>
                        </div>
                     </div>

                     <Button variant="ghost" className="w-full justify-start gap-3 text-red-500 hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-950/30">
                        <LogOut className="h-5 w-5" />
                        Log Out
                    </Button>
                </div>
            </div>
        </aside>
    );
}
