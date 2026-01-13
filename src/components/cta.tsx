import { Button } from "@/components/ui/button";
import Link from "next/link";

export function CTA() {
    return (
        <section className="max-w-7xl mx-auto py-24 px-6 text-center">
            <div className="max-w-5xl mx-auto space-y-8 bg-navy-950 dark:bg-saffron-500/10 rounded-3xl p-8 md:p-16 relative overflow-hidden text-center">
                <div className="absolute top-0 right-0 w-64 h-64 bg-saffron-500/10 rounded-full blur-3xl -mr-32 -mt-32"></div>
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl -ml-32 -mb-32"></div>
                
                <h2 className="relative scroll-m-20 text-3xl md:text-5xl font-extrabold tracking-tight text-white mb-6">
                    Ready to Start Your Coding Journey?
                </h2>
                <p className="relative text-lg md:text-xl text-slate-300 dark:text-slate-200 max-w-2xl mx-auto mb-8">
                    Join 50,000+ students learning tech skills in simple Hinglish. No prior experience needed!
                </p>
                <div className="relative pt-4 flex justify-center">
                     <Button asChild size="lg" className="bg-saffron-500 hover:bg-saffron-600 text-white dark:text-black font-bold h-14 px-10 text-lg shadow-xl shadow-saffron-500/20">
                        <Link href="/signup">
                             Start Free Today 🚀
                        </Link>
                    </Button>
                </div>
            </div>
        </section>
    )
}
