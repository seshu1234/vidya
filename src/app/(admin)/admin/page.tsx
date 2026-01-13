"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, BookOpen, CreditCard, TrendingUp } from "lucide-react";

export default function AdminDashboardPage() {
    return (
        <div className="space-y-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold font-display text-navy-900 dark:text-white">Dashboard Overview</h1>
                    <p className="text-slate-500 dark:text-slate-400">Platform limits and usage summary.</p>
                </div>
            </div>

            {/* Stats Overview */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <StatsCard title="Total Students" value="12,345" icon={Users} color="text-blue-500" change="+12% from last month" />
                <StatsCard title="Total Courses" value="45" icon={BookOpen} color="text-orange-500" change="+2 new this week" />
                <StatsCard title="Revenue" value="₹24.5L" icon={CreditCard} color="text-green-500" change="+8% increase" />
                <StatsCard title="Active Learners" value="8,900" icon={TrendingUp} color="text-indigo-500" change="Currently online" />
            </div>

             <div className="grid lg:grid-cols-2 gap-8">
                 <div className="min-h-[300px] bg-white dark:bg-black rounded-xl border border-slate-200 dark:border-slate-800 p-6 flex items-center justify-center text-slate-400">
                    Chart: Revenue Growth (Placeholder)
                 </div>
                 <div className="min-h-[300px] bg-white dark:bg-black rounded-xl border border-slate-200 dark:border-slate-800 p-6 flex items-center justify-center text-slate-400">
                    Chart: User Acquisitions (Placeholder)
                 </div>
             </div>
        </div>
    );
}


interface StatsCardProps {
    title: string;
    value: string;
    icon: React.ElementType; // Better than any
    color: string;
    change: string;
}

function StatsCard({ title, value, icon: Icon, color, change }: StatsCardProps) {
    return (
        <Card className="border-slate-200 dark:border-slate-800 shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                    {title}
                </CardTitle>
                <Icon className={`h-4 w-4 ${color}`} />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold text-navy-900 dark:text-white">{value}</div>
                <p className="text-xs text-muted-foreground mt-1">{change}</p>
            </CardContent>
        </Card>
    );
}
