"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";

export default function AdminSettingsPage() {
    return (
        <div className="space-y-6 max-w-4xl">
            <div>
                <h1 className="text-3xl font-bold font-display text-navy-900 dark:text-white">Admin Settings</h1>
                <p className="text-slate-500 dark:text-slate-400">Configure platform-wide settings.</p>
            </div>

            <Card className="border-slate-200 dark:border-navy-800">
                <CardHeader>
                    <CardTitle>Platform Configuration</CardTitle>
                    <CardDescription>General settings for the learning platform.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="site-name">Site Name</Label>
                        <Input id="site-name" defaultValue="Vidya Learning" />
                    </div>
                    <div className="flex items-center justify-between">
                        <Label htmlFor="maintenance-mode" className="flex flex-col gap-1">
                            <span>Maintenance Mode</span>
                            <span className="font-normal text-xs text-muted-foreground">Disable student access temporarily.</span>
                        </Label>
                        <Switch id="maintenance-mode" />
                    </div>
                    <div className="flex items-center justify-between">
                        <Label htmlFor="registration" className="flex flex-col gap-1">
                            <span>User Registration</span>
                            <span className="font-normal text-xs text-muted-foreground">Allow new users to sign up.</span>
                        </Label>
                        <Switch id="registration" defaultChecked />
                    </div>
                     <div className="pt-4">
                        <Button>Save Configuration</Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
