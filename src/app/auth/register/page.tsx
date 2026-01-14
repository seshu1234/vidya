"use client";

import { useActionState } from "react";
import { signup } from "../actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { Loader2 } from "lucide-react";

export default function RegisterPage() {
    const [state, formAction, isPending] = useActionState(signup, null);

    return (
        <>
            <div className="grid gap-2 text-center">
                <h1 className="text-3xl font-bold font-display">Create an account</h1>
                <p className="text-balance text-muted-foreground">
                    Enter your information to get started
                </p>
            </div>
            <div className="grid gap-4">
                <form action={formAction} className="grid gap-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="grid gap-2">
                            <Label htmlFor="first-name">First name</Label>
                            <Input 
                                id="first-name" 
                                name="first-name" 
                                placeholder="Rahul" 
                                required 
                                className="h-11" 
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="last-name">Last name</Label>
                            <Input 
                                id="last-name" 
                                name="last-name"
                                placeholder="Sharma" 
                                required 
                                className="h-11" 
                            />
                        </div>
                    </div>
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
                        <Label htmlFor="password">Password</Label>
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
                        Create Account
                    </Button>
                </form>
            </div>
            <div className="mt-4 text-center text-sm">
                Already have an account?{" "}
                <Link href="/auth/login" className="underline font-medium">
                    Sign in
                </Link>
            </div>
        </>
    );
}
