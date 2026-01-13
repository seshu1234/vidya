import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function CTA() {
    return (
        <section className="py-24 px-6">
            <div className="max-w-5xl mx-auto space-y-8 bg-black dark:bg-white/5 rounded-3xl p-8 md:p-16 relative overflow-hidden text-center">
                <div className="absolute top-0 right-0 w-64 h-64 bg-slate-800/50 rounded-full blur-3xl -mr-32 -mt-32"></div>
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-slate-800/50 rounded-full blur-3xl -ml-32 -mb-32"></div>
                
                <h2 className="relative z-10 text-3xl md:text-5xl font-extrabold tracking-tight text-white">
                    Start your coding journey today.
                </h2>
                <p className="relative z-10 text-lg md:text-xl text-slate-400 max-w-2xl mx-auto">
                    Join 10,000+ students learning to code the des way. No credit card required.
                </p>
                <div className="relative z-10 pt-4">
                     <Button asChild size="lg" className="bg-white hover:bg-slate-200 text-black font-bold h-14 px-10 text-lg shadow-xl">
                        <Link href="/signup">
                            Get Started Free <ArrowRight className="ml-2 h-5 w-5" />
                        </Link>
                    </Button>
                </div>
            </div>
        </section>
    )
}
