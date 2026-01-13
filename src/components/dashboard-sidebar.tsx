"use client";
// forcing re-index

import Link from "next/link";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import { LayoutDashboard, BookOpen, Trophy, Settings, LogOut, User } from "lucide-react";
import { Button } from "@/components/ui/button";

const sidebarItems = [
    { name: "Overview", href: "/dashboard", icon: LayoutDashboard },
    { name: "My Learning", href: "/dashboard/my-learning", icon: BookOpen },
    { name: "Certificates", href: "/dashboard/certificates", icon: Trophy },
    { name: "Profile", href: "/dashboard/profile", icon: User },
    { name: "Settings", href: "/dashboard/settings", icon: Settings },
];

interface SidebarProps {
    className?: string;
}

export function Sidebar({ className }: SidebarProps) {
    const pathname = usePathname();

    return (
        <aside className={cn("hidden md:flex flex-col border-r border-slate-200 dark:border-slate-800 bg-white dark:bg-black fixed bottom-0 left-0 top-0 z-30 w-64", className)}>
            <div className="p-4 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-black">
                <div>
                    <p className="text-lg font-bold">Vidy AI</p>
                </div>
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
                                        ? "bg-black text-white dark:bg-white dark:text-black" 
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
                     <div className="bg-slate-50 dark:bg-slate-900 rounded-xl p-4 border border-slate-200 dark:border-slate-800">
                        <div className="flex items-center gap-3 mb-2">
                            <div className="h-8 w-8 rounded-full bg-slate-200 dark:bg-slate-800 flex items-center justify-center">
                                👨‍🎓
                            </div>
                            <div>
                                <p className="text-sm font-bold text-navy-900 dark:text-white">Rahul S.</p>
                                <p className="text-xs text-muted-foreground">Free Plan</p>
                            </div>
                        </div>
                        <Button size="sm" variant="outline" className="w-full text-xs h-8">
                             Upgrade to Pro
                        </Button>
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
