"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RevenueChart } from "@/components/charts/revenue-chart";
import { CategoryDistributionChart } from "@/components/charts/category-distribution";
import { ActivityChart } from "@/components/charts/activity-chart";

export default function AdminAnalyticsPage() {
    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold font-display text-navy-900 dark:text-white">Analytics</h1>
                <p className="text-slate-500 dark:text-slate-400">Deep dive into platform performance.</p>
            </div>

            <div className="grid lg:grid-cols-2 gap-6">
                <Card className="col-span-1 lg:col-span-2 border-slate-200 dark:border-navy-800">
                    <CardHeader>
                        <CardTitle>Total Revenue</CardTitle>
                    </CardHeader>
                    <CardContent className="pl-2">
                        <RevenueChart />
                    </CardContent>
                </Card>

                <Card className="col-span-1 border-slate-200 dark:border-navy-800">
                    <CardHeader>
                        <CardTitle>Course Categories</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <CategoryDistributionChart />
                    </CardContent>
                </Card>

                <Card className="col-span-1 border-slate-200 dark:border-navy-800">
                    <CardHeader>
                        <CardTitle>User Activity (Last 7 Days)</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ActivityChart />
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
