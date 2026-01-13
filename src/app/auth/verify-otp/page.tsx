"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function VerifyOtpPage() {
    return (
        <>
             <div className="grid gap-2 text-center">
                <h1 className="text-3xl font-bold font-display">Verify Email</h1>
                <p className="text-balance text-muted-foreground">
                    We&apos;ve sent a 6-digit code to your email.
                </p>
            </div>
            <div className="grid gap-6">
                <div className="flex gap-2 justify-center">
                    {[1, 2, 3, 4, 5, 6].map((i) => (
                        <Input 
                            key={i} 
                            type="text" 
                            maxLength={1} 
                            className="w-12 h-14 text-center text-xl font-bold"
                        />
                    ))}
                </div>
                
                <Button type="submit" className="w-full h-11 font-bold text-base bg-black text-white hover:bg-zinc-800 dark:bg-white dark:text-black">
                    Verify Account
                </Button>

                <div className="text-center text-sm text-muted-foreground">
                    Didn&apos;t receive the code?{" "}
                    <button className="underline font-medium text-black dark:text-white hover:no-underline">
                        Resend
                    </button>
                </div>
            </div>
        </>
    );
}
