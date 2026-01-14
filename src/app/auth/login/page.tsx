"use client";

import { useActionState } from "react";
import { login, loginWithProvider } from "../actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { Github, Loader2 } from "lucide-react";

export default function LoginPage() {
    const [state, formAction, isPending] = useActionState(login, null);

    return (
        <>
            <div className="grid gap-2 text-center">
                <h1 className="text-3xl font-bold font-display">Welcome back</h1>
                <p className="text-balance text-muted-foreground">
                    Enter your email to sign in to your account
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
                    <div className="grid gap-2">
                        <div className="flex items-center">
                            <Label htmlFor="password">Password</Label>
                            <Link
                                href="/auth/forgot-password"
                                className="ml-auto inline-block text-sm underline"
                            >
                                Forgot your password?
                            </Link>
                        </div>
                        <Input 
                            id="password" 
                            name="password"
                            type="password" 
                            required 
                            className="h-11" 
                        />
                    </div>
                    {state?.error && (
                        <p className="text-sm text-red-500 font-medium">{state.error}</p>
                    )}
                    <Button 
                        type="submit" 
                        className="w-full h-11 font-bold text-base bg-black text-white hover:bg-zinc-800 dark:bg-white dark:text-black"
                        disabled={isPending}
                    >
                        {isPending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                        Login
                    </Button>
                </form>

                <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                        <span className="w-full border-t border-slate-200 dark:border-zinc-800" />
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                        <span className="bg-white dark:bg-black px-2 text-muted-foreground">
                            Or continue with
                        </span>
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                     <Button 
                        variant="outline" 
                        className="h-11 border-slate-200 dark:border-zinc-800"
                        onClick={() => loginWithProvider('github')}
                    >
                        <Github className="mr-2 h-4 w-4" />
                        Github
                    </Button>
                    <Button 
                        variant="outline" 
                        className="h-11 border-slate-200 dark:border-zinc-800"
                        onClick={() => loginWithProvider('google')}
                    >
                         <div className="mr-2 h-4 w-4 bg-gradient-to-tr from-yellow-400 to-red-500 rounded-full flex items-center justify-center text-[10px] font-bold text-white">G</div>
                        Google
                    </Button>
                </div>
            </div>
            <div className="mt-4 text-center text-sm">
                Don&apos;t have an account?{" "}
                <Link href="/auth/register" className="underline font-medium">
                    Sign up
                </Link>
            </div>
        </>
    );
}
