"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PlayCircle, Clock, Award, TrendingUp } from "lucide-react";
import Link from "next/link";

export default function DashboardPage() {
    return (
        <div className="space-y-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold font-display text-navy-900 dark:text-white">Welcome back, Rahul!</h1>
                    <p className="text-slate-500 dark:text-slate-400">You&apos;ve completed 40% of your weekly goal. Keep it up!</p>
                </div>
                <div className="flex items-center gap-3">
                     <Button variant="outline">View Calendar</Button>
                     <Button className="bg-black text-white hover:bg-slate-800">Resume Learning</Button>
                </div>
            </div>

            {/* Stats Overview */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <StatsCard title="Courses in Progress" value="3" icon={PlayCircle} color="text-blue-500" />
                <StatsCard title="Hours Spent" value="12h" icon={Clock} color="text-orange-500" />
                <StatsCard title="Certificates" value="1" icon={Award} color="text-yellow-500" />
                 <StatsCard title="Current Streak" value="12 Days" icon={TrendingUp} color="text-green-500" />
            </div>

            {/* Continue Learning */}
            <section className="space-y-4">
                <div className="flex items-center justify-between">
                     <h2 className="text-xl font-bold text-navy-900 dark:text-white">Continue Learning</h2>
                     <Link href="/courses" className="text-sm font-medium text-blue-600 hover:underline">View All</Link>
                </div>

                <div className="bg-white dark:bg-navy-900 border border-slate-200 dark:border-navy-800 rounded-2xl p-6 flex flex-col md:flex-row gap-6 items-center shadow-sm hover:shadow-md transition-shadow">
                    <div className="h-32 w-full md:w-48 bg-slate-100 rounded-xl relative overflow-hidden flex-shrink-0">
                         <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-blue-500/20"></div>
                         <div className="absolute bottom-2 left-2">
                              <Badge className="bg-white/90 text-black shadow-sm">Web Dev</Badge>
                         </div>
                    </div>
                    
                    <div className="flex-1 space-y-4 w-full">
                        <div className="flex justify-between items-start">
                             <div>
                                <h3 className="text-xl font-bold text-navy-900 dark:text-white">Full Stack Master: React & Node</h3>
                                <p className="text-muted-foreground text-sm">Module 4: Advanced React Hooks</p>
                             </div>
                             <Badge variant="outline" className="hidden sm:inline-flex">In Progress</Badge>
                        </div>

                        <div className="space-y-2">
                             <div className="flex justify-between text-xs font-medium text-slate-500">
                                <span>65% Completed</span>
                                <span>2h 15m remaining</span>
                             </div>
                             <div className="h-2 w-full bg-slate-100 dark:bg-navy-950 rounded-full overflow-hidden">
                                <div className="h-full w-[65%] bg-green-500 rounded-full"></div>
                             </div>
                        </div>
                    </div>

                    <Button size="lg" className="shrink-0 w-full md:w-auto h-12 px-6 rounded-xl font-bold">
                        Continue
                    </Button>
                </div>
            </section>

             {/* Recommended for You */}
             <section className="space-y-4 pt-4">
                <h2 className="text-xl font-bold text-navy-900 dark:text-white">Recommended for you</h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                     <CourseCard 
                        title="AI Architect" 
                        category="Artificial Intelligence" 
                        rating="4.9"
                        gradient="from-pink-500/20 to-rose-500/20"
                    />
                     <CourseCard 
                        title="System Design" 
                        category="Architecture" 
                        rating="4.8"
                        gradient="from-blue-500/20 to-indigo-500/20"
                    />
                     <CourseCard 
                        title="Data Structures in C++" 
                        category="CS Fundamentals" 
                        rating="4.7"
                        gradient="from-green-500/20 to-emerald-500/20"
                    />
                </div>
            </section>
        </div>
    );
}


interface StatsCardProps {
    title: string;
    value: string;
    icon: React.ElementType;
    color: string;
}

function StatsCard({ title, value, icon: Icon, color }: StatsCardProps) {
    return (
        <Card className="border-slate-200 dark:border-navy-800 shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                    {title}
                </CardTitle>
                <Icon className={`h-4 w-4 ${color}`} />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold text-navy-900 dark:text-white">{value}</div>
            </CardContent>
        </Card>
    );
}


interface CourseCardProps {
    title: string;
    category: string;
    rating: string;
    gradient: string;
}

function CourseCard({ title, category, rating, gradient }: CourseCardProps) {
    return (
        <Card className="border-slate-200 dark:border-navy-800 shadow-sm hover:shadow-md transition-all cursor-pointer group">
            <div className={`h-32 bg-gradient-to-br ${gradient} rounded-t-xl relative`}>
                <Badge className="absolute top-4 left-4 bg-white/90 text-black shadow-sm group-hover:scale-105 transition-transform">{category}</Badge>
            </div>
            <CardContent className="p-5 space-y-3">
                 <h3 className="font-bold text-lg text-navy-900 dark:text-white group-hover:text-blue-600 transition-colors">{title}</h3>
                 <div className="flex items-center gap-1 text-yellow-500 text-sm font-medium">
                    <span className="text-black dark:text-white">{rating}</span> ★★★★★
                 </div>
                 <Button variant="outline" className="w-full mt-2 group-hover:bg-slate-50 dark:group-hover:bg-navy-900">View Details</Button>
            </CardContent>
        </Card>
    )
}
