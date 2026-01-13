"use client";

import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { paths } from "@/lib/path-data";
import { ChevronRight, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function PathsPage() {
    return (
        <div className="flex min-h-screen flex-col bg-slate-50 dark:bg-black font-sans">
            <Navbar />
            <main className="flex-1 pb-24">
                {/* Hero Section */}
                <div className="relative bg-black text-white pt-32 pb-24 px-6 overflow-hidden">
                     <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-20"></div>
                     <div className="relative max-w-7xl mx-auto text-center space-y-8 z-10">
                        <Badge variant="outline" className="text-slate-400 border-slate-700 uppercase tracking-widest px-4 py-1">
                            Career Tracks
                        </Badge>
                        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-white to-slate-400">
                            Masters Specializations
                        </h1>
                        <p className="text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed">
                            Don't just learn a language. Master a <span className="text-white font-medium">complete domain</span> with our university-aligned curriculums. From zero to job-ready.
                        </p>
                    </div>
                </div>

                {/* Paths Grid */}
                <div className="max-w-7xl mx-auto px-6 -mt-12 relative z-20">
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {paths.map((path) => (
                            <div key={path.id} className="group relative bg-white dark:bg-navy-900/50 border border-slate-200 dark:border-navy-800 rounded-3xl p-8 hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-300 hover:-translate-y-1 overflow-hidden">
                                <div className={`absolute top-0 right-0 p-4 rounded-bl-3xl bg-slate-100 dark:bg-navy-800 text-slate-600 dark:text-slate-300 group-hover:bg-slate-200 dark:group-hover:bg-navy-700 transition-colors`}>
                                    <path.icon className="h-6 w-6" />
                                </div>
                                
                                <div className="space-y-4 mb-8">
                                    <h3 className="text-2xl font-bold text-navy-900 dark:text-white pr-12 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                                        {path.title}
                                    </h3>
                                    <p className="text-muted-foreground leading-relaxed h-12 line-clamp-2">
                                        {path.description}
                                    </p>
                                    
                                    <div className="flex flex-wrap gap-2 pt-2">
                                        <Badge variant="secondary" className="bg-slate-100 dark:bg-navy-800 text-slate-700 dark:text-slate-300">
                                            {path.duration}
                                        </Badge>
                                        <Badge variant="secondary" className="bg-slate-100 dark:bg-navy-800 text-slate-700 dark:text-slate-300">
                                            {path.courses} Courses
                                        </Badge>
                                        <Badge variant="secondary" className="bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-400 border-green-200 dark:border-green-800/50">
                                            {path.salary}
                                        </Badge>
                                    </div>
                                </div>

                                <div className="space-y-3 relative mb-8">
                                    <div className="absolute left-[11px] top-2 bottom-4 w-0.5 bg-slate-200 dark:bg-navy-700"></div>
                                    {path.syllabus.slice(0, 3).map((step, i) => (
                                        <div key={i} className="relative flex items-center gap-4">
                                            <div className="h-6 w-6 rounded-full bg-white dark:bg-navy-900 border-2 border-slate-300 dark:border-navy-600 z-10 flex items-center justify-center text-[10px] font-bold text-muted-foreground group-hover:border-blue-500 group-hover:text-blue-500 transition-colors">
                                                {i + 1}
                                            </div>
                                            <span className="text-sm font-medium text-slate-700 dark:text-slate-300 w-full truncate">
                                                {step.title}
                                            </span>
                                        </div>
                                    ))}
                                    {path.syllabus.length > 3 && (
                                        <div className="relative flex items-center gap-4 pl-10">
                                            <span className="text-xs text-muted-foreground">+ {path.syllabus.length - 3} more modules</span>
                                        </div>
                                    )}
                                </div>

                                <Button asChild className="w-full bg-navy-900 hover:bg-black text-white dark:bg-white dark:text-navy-900 dark:hover:bg-slate-200 font-bold h-12 text-base shadow-lg group-hover:shadow-xl transition-all">
                                    <Link href={`/paths/${path.slug}`}>
                                        View Full Roadmap <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                                    </Link>
                                </Button>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Bottom CTA */}
                <div className="max-w-4xl mx-auto mt-24 text-center space-y-8 px-6">
                    <h2 className="text-3xl font-bold text-navy-900 dark:text-white">Not sure which path to choose?</h2>
                    <p className="text-lg text-slate-600 dark:text-slate-400">
                        Take our 2-minute aptitude test to find the perfect career track for you based on your interests and logic skills.
                    </p>
                    <Button variant="outline" size="lg" className="h-12 px-8 border-slate-300 dark:border-slate-700">
                        Take Career Quiz
                    </Button>
                </div>
            </main>
            <Footer />
        </div>
    );
}
