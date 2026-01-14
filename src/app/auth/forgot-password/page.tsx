"use client";

import { useActionState } from "react";
import { forgotPassword } from "../actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { ArrowLeft, Loader2 } from "lucide-react";

export default function ForgotPasswordPage() {
    const [state, formAction, isPending] = useActionState(forgotPassword, null);

    return (
        <>
            <div className="grid gap-2 text-center">
                <h1 className="text-3xl font-bold font-display">Forgot Password</h1>
                <p className="text-balance text-muted-foreground">
                    Enter your email to reset your password
                </p>
            </div>
            <div className="grid gap-4">
                <form action={formAction} className="grid gap-4">
                    <div className="grid gap-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                            id="email"
                            name="email"
                            type="email"
                            placeholder="m@example.com"
                            required
                            className="h-11"
                        />
                    </div>
                    {state?.error && (
                         <p className="text-sm text-red-500 font-medium">{state.error}</p>
                    )}
                     {state?.success && (
                         <p className="text-sm text-green-500 font-medium">{state.success}</p>
                    )}
                    <Button 
                        type="submit" 
                        className="w-full h-11 font-bold text-base bg-black text-white hover:bg-zinc-800 dark:bg-white dark:text-black"
                        disabled={isPending}
                    >
                         {isPending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                        Send Reset Link
                    </Button>
                </form>
                <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                        <span className="w-full border-t border-slate-200 dark:border-zinc-800" />
                    </div>
                </div>
                 <Button variant="ghost" asChild className="w-full h-11">
                    <Link href="/auth/login">
                         <ArrowLeft className="mr-2 h-4 w-4" /> Back to Login
                    </Link>
                </Button>
            </div>
        </>
    );
}
