"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Bell, Shield } from "lucide-react";

export default function SettingsPage() {
    return (
        <div className="space-y-6 max-w-4xl">
            <div>
                <h1 className="text-3xl font-bold font-display text-navy-900 dark:text-white">Settings</h1>
                <p className="text-slate-500 dark:text-slate-400">Manage your account preferences.</p>
            </div>

            <div className="grid gap-6">
                <Card className="border-slate-200 dark:border-navy-800">
                    <CardHeader>
                        <div className="flex items-center gap-3">
                             <Bell className="h-5 w-5 text-indigo-500" />
                             <div>
                                <CardTitle>Notifications</CardTitle>
                                <CardDescription>Configure how you receive alerts.</CardDescription>
                             </div>
                        </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex items-center justify-between">
                            <Label htmlFor="email-notifs" className="flex flex-col gap-1">
                                <span>Email Notifications</span>
                                <span className="font-normal text-xs text-muted-foreground">Receive daily summaries and updates.</span>
                            </Label>
                            <Switch id="email-notifs" defaultChecked />
                        </div>
                        <div className="flex items-center justify-between">
                            <Label htmlFor="marketing-emails" className="flex flex-col gap-1">
                                <span>Marketing Emails</span>
                                <span className="font-normal text-xs text-muted-foreground">Receive offers and new course alerts.</span>
                            </Label>
                            <Switch id="marketing-emails" />
                        </div>
                    </CardContent>
                </Card>

                <Card className="border-slate-200 dark:border-navy-800">
                    <CardHeader>
                        <div className="flex items-center gap-3">
                             <Shield className="h-5 w-5 text-green-500" />
                             <div>
                                <CardTitle>Privacy & Security</CardTitle>
                                <CardDescription>Manage your data and security.</CardDescription>
                             </div>
                        </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex items-center justify-between">
                            <Label htmlFor="public-profile" className="flex flex-col gap-1">
                                <span>Public Profile</span>
                                <span className="font-normal text-xs text-muted-foreground">Allow others to see your courses and certificates.</span>
                            </Label>
                            <Switch id="public-profile" defaultChecked />
                        </div>
                         <div className="pt-2">
                            <Button variant="outline" className="text-red-500 hover:text-red-600 hover:bg-red-50 border-red-200">
                                Delete Account
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
