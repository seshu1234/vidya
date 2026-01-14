"use client";

import { useActionState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { verifyOtp } from "../actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react";
import { useState } from "react";

function VerifyOtpForm() {
    const searchParams = useSearchParams();
    const emailFromParams = searchParams.get("email");
    const [state, formAction, isPending] = useActionState(verifyOtp, null);
    const [otp, setOtp] = useState(["", "", "", "", "", ""]);

    // Handle input change
    const handleChange = (index: number, value: string) => {
        if (value.length > 1) return; // Allow only one char
        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);

        // Auto focus next input
        if (value && index < 5) {
            const nextInput = document.getElementById(`otp-${index + 1}`);
            nextInput?.focus();
        }
    };
    
    // Handle backspace
    const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Backspace" && !otp[index] && index > 0) {
            const prevInput = document.getElementById(`otp-${index - 1}`);
            prevInput?.focus();
        }
    };

    // Combine OTP for hidden input
    const otpValue = otp.join("");

    return (
        <>
            <div className="grid gap-2 text-center">
                <h1 className="text-3xl font-bold font-display">Verify Email</h1>
                <p className="text-balance text-muted-foreground">
                    We&apos;ve sent a 6-digit code to {emailFromParams ? <span className="font-semibold">{emailFromParams}</span> : "your email"}.
                </p>
            </div>
            <div className="grid gap-6">
                 <form action={formAction} className="grid gap-6">
                    <input type="hidden" name="email" value={emailFromParams || ""} />
                    <input type="hidden" name="token" value={otpValue} />
                    <input type="hidden" name="type" value="signup" />

                    <div className="flex gap-2 justify-center">
                        {otp.map((digit, i) => (
                            <Input 
                                key={i} 
                                id={`otp-${i}`}
                                type="text" 
                                inputMode="numeric"
                                maxLength={1} 
                                value={digit}
                                onChange={(e) => handleChange(i, e.target.value)}
                                onKeyDown={(e) => handleKeyDown(i, e)}
                                className="w-12 h-14 text-center text-xl font-bold"
                                required={i === 0} // Only first is strictly required for HTML5 validation, but logic handles rest
                            />
                        ))}
                    </div>
                    
                     {state?.error && (
                        <p className="text-sm text-red-500 font-medium text-center">{state.error}</p>
                    )}

                    <Button 
                        type="submit" 
                        className="w-full h-11 font-bold text-base bg-black text-white hover:bg-zinc-800 dark:bg-white dark:text-black"
                         disabled={isPending || otpValue.length < 6}
                    >
                         {isPending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                        Verify Account
                    </Button>
                </form>

                <div className="text-center text-sm text-muted-foreground">
                    Didn&apos;t receive the code?{" "}
                    <button className="underline font-medium text-black dark:text-white hover:no-underline">
                        Resend
                    </button>
                    {/* Resend logic would need another server action or client-sidesupabase call */}
                </div>
            </div>
        </>
    );
}

export default function VerifyOtpPage() {
    return (
        <Suspense fallback={<div className="flex justify-center"><Loader2 className="animate-spin" /></div>}>
            <VerifyOtpForm />
        </Suspense>
    );
}
