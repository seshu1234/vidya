
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { VernacularToggle } from "@/components/vernacular-toggle";
import { VerifiedCompanies } from "@/components/verified-companies";
import { ArrowRight, CheckCircle } from "lucide-react";

export function Hero() {
    return (
        <section className="relative overflow-hidden pt-12 md:pt-32 pb-16 lg:pb-32">
             {/* Background Effects */}
            <div className="absolute top-0 left-0 right-0 h-[800px] overflow-hidden -z-20 pointer-events-none">
                 <div className="absolute top-[-20%] left-1/2 -translate-x-1/2 w-[80%] h-[80%] bg-slate-100/40 dark:bg-slate-900/20 blur-[150px] rounded-full"></div>
            </div>
             <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-slate-200 dark:via-slate-800 to-transparent"></div>

            <div className="max-w-7xl mx-auto px-6 relative z-10 grid lg:grid-cols-2 gap-12 sm:gap-16 items-center">
                
                {/* Left Column: Content */}
                <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
                    <div className="inline-flex items-center justify-center lg:justify-start mb-8">
                        <div className="rounded-full bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 px-4 py-1.5 text-sm font-medium text-slate-600 dark:text-slate-400 mb-6 font-sans flex items-center gap-2">
                           <span className="relative flex h-2 w-2">
                              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                            </span>
                           New: Full Stack AI Engineer Course
                        </div>
                    </div>
                    
                    <h1 className="scroll-m-20 text-5xl font-extrabold tracking-tight lg:text-7xl mb-6 bg-gradient-to-b from-black to-slate-600 dark:from-white dark:to-slate-400 bg-clip-text text-transparent pb-2 font-display leading-tight">
                        Coding ab <br />
                        <span className="relative whitespace-nowrap px-4 lg:px-0">
                            <span className="relative z-10 text-black dark:text-white">seekhein simple</span>
                            <span className="absolute bottom-2 left-0 w-full h-3 bg-slate-200/50 dark:bg-slate-700/50 -rotate-1 rounded-full -z-0"></span>
                        </span> <br />
                        <span className="text-slate-700 dark:text-slate-300">Hinglish mein.</span>
                    </h1>

                    <p className="leading-relaxed text-xl text-slate-500 dark:text-slate-400 max-w-2xl lg:max-w-xl font-sans mb-10">
                        India&apos;s most loved coding platform. Learn specific skills like React, Next.js, and GenAI with 
                        interactive lessons and <span className="font-semibold text-black dark:text-white">desi analogies</span> that make sense.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start items-center w-full lg:w-auto">
                        <Button 
                            asChild 
                            size="lg" 
                            className="px-8 h-12 w-full sm:w-auto text-base font-semibold bg-black hover:bg-slate-800 text-white dark:bg-white dark:text-black dark:hover:bg-slate-200 shadow-xl font-sans"
                        >
                            <Link href="/courses">
                                Start Learning Free
                                <ArrowRight className="ml-2 h-4 w-4" />
                            </Link>
                        </Button>
                         <Button 
                            asChild 
                            variant="outline" 
                            size="lg"
                            className="px-8 h-12 w-full sm:w-auto text-base font-semibold border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-900 font-sans"
                        >
                            <Link href="/paths">
                                View Learning Paths
                            </Link>
                        </Button>
                    </div>

                    <div className="mt-12 flex flex-wrap items-center justify-center lg:justify-start gap-x-8 gap-y-4 text-sm text-slate-500 font-medium font-sans">
                        <div className="flex items-center gap-2">
                             <CheckCircle className="h-4 w-4 text-green-500" />
                             <span>Free for Students</span>
                        </div>
                        <div className="flex items-center gap-2">
                             <CheckCircle className="h-4 w-4 text-green-500" />
                             <span>Hinglish Content</span>
                        </div>
                         <div className="flex items-center gap-2">
                             <CheckCircle className="h-4 w-4 text-green-500" />
                             <span>100k+ Learners</span>
                        </div>
                    </div>
                </div>

                {/* Right Column: Coding Example (Vernacular Toggle) */}
                <div className="hidden lg:block relative -mr-20 xl:mr-0 transform scale-90 xl:scale-100 origin-top-left z-20">
                     <div className="absolute -inset-4 bg-gradient-to-r from-blue-500 to-purple-500 rounded-[2rem] opacity-20 blur-2xl"></div>
                     <VernacularToggle minimal={true} />
                </div>
            </div>

            <section className="bg-background/50 backdrop-blur-sm pb-12 mt-20 border-t border-slate-100 dark:border-slate-900/50">
               <VerifiedCompanies />
            </section>
        </section>
    );
}
