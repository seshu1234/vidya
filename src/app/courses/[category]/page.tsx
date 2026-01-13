"use client";

import { courses } from "@/lib/course-data"; // Assuming these exist
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Card, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Clock } from "lucide-react";
import Link from "next/link";

import React, { use } from "react";
// ... imports

export default function CategoryPage({ params }: { params: Promise<{ category: string }> }) {
    const { category } = use(params);
    
    const categorySlug = category;
    const categoryName = categorySlug.replace(/-/g, " ");
    
    const filteredCourses = courses.filter(c => c.category.toLowerCase() === categoryName.toLowerCase());

    if (filteredCourses.length === 0) {
        // Optional: show empty state or redirect
        // return notFound();
    }

    return (
        <div className="flex min-h-screen flex-col bg-slate-50 dark:bg-black font-sans">
            <Navbar />
            <main className="flex-1 pb-24">
                <div className="relative bg-black text-white pt-32 pb-20 px-6 overflow-hidden">
                    <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-20"></div>
                    <div className="relative max-w-7xl mx-auto z-10 grid lg:grid-cols-2 gap-12 items-center">
                        <div className="space-y-8 text-center lg:text-left">
                            <div className="flex items-center justify-center lg:justify-start gap-2 text-sm text-slate-400">
                                <Link href="/courses" className="hover:text-white transition-colors">Courses</Link>
                                <span>/</span>
                                <span className="capitalize text-white font-medium">{categoryName}</span>
                            </div>
                            
                            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight capitalize bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">
                                {categoryName}
                            </h1>
                            
                            <p className="text-lg text-slate-400 leading-relaxed max-w-xl mx-auto lg:mx-0">
                                Master {categoryName} with our industry-aligned curriculum. <br className="hidden md:block"/>
                                <span className="text-white font-medium">{filteredCourses.length} specialised courses</span> designed for your career.
                            </p>

                            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4">
                                <div className="flex items-center gap-1 bg-white/10 px-3 py-1.5 rounded-full backdrop-blur-sm border border-white/10">
                                    <span className="text-yellow-400">★★★★★</span>
                                    <span className="text-xs font-medium ml-1">4.9/5 Rating</span>
                                </div>
                                <div className="flex items-center gap-1 bg-white/10 px-3 py-1.5 rounded-full backdrop-blur-sm border border-white/10">
                                    <Badge variant="secondary" className="bg-transparent text-white hover:bg-transparent p-0">job-ready</Badge>
                                </div>
                                <div className="flex items-center gap-1 bg-white/10 px-3 py-1.5 rounded-full backdrop-blur-sm border border-white/10">
                                    <Badge variant="secondary" className="bg-transparent text-white hover:bg-transparent p-0">practical</Badge>
                                </div>
                            </div>
                        </div>

                        {/* Right Side: Coding Example Visual */}
                        <div className="relative hidden lg:block">
                            <div className="absolute -inset-1 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 opacity-30 blur"></div>
                            <div className="relative rounded-xl bg-[#1e1e1e] border border-white/10 shadow-2xl overflow-hidden">
                                <div className="flex items-center gap-2 px-4 py-3 bg-[#252526] border-b border-white/5">
                                    <div className="flex gap-1.5">
                                        <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                                        <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                                        <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
                                    </div>
                                    <span className="ml-2 text-xs text-zinc-500 font-mono">learn_{categoryName.replace(/\s+/g, '_').toLowerCase()}.js</span>
                                </div>
                                <div className="p-6 font-mono text-sm leading-relaxed text-zinc-300">
                                    <div><span className="text-purple-400">const</span> <span className="text-blue-400">masterSkill</span> = <span className="text-purple-400">async</span> () ={">"} {"{"}</div>
                                    <div className="pl-4"><span className="text-purple-400">const</span> roadmap = <span className="text-yellow-300">[&quot;Learn&quot;, &quot;Build&quot;, &quot;Deploy&quot;]</span>;</div>
                                    <div className="pl-4"><span className="text-purple-400">await</span> <span className="text-blue-400">startLearning</span>(roadmap);</div>
                                    <br/>
                                    <div className="pl-4"><span className="text-green-400">{"//"} {categoryName} experts earn 50% more!</span></div>
                                    <div className="pl-4"><span className="text-blue-400">console</span>.<span className="text-yellow-300">log</span>(<span className="text-green-300">&quot;Career upgraded! 🚀&quot;</span>);</div>
                                    <div>{"}"}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="max-w-7xl mx-auto px-6">
                     {filteredCourses.length === 0 ? (
                        <div className="text-center py-20">
                            <h2 className="text-2xl font-bold">No courses found in this category.</h2>
                            <Link href="/courses" className="text-black dark:text-white underline mt-4 block font-medium">Back to All Courses</Link>
                        </div>
                     ) : (
                        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                            {filteredCourses.map((course) => (
                                <Link key={course.id} href={`/courses/${category}/${course.slug}`}>
                                     <Card className="h-full hover:shadow-xl transition-all hover:-translate-y-1 border-slate-200 dark:border-navy-800 flex flex-col overflow-hidden p-0 gap-0">
                                            <div className={`h-2 w-full ${
                                                course.level === 'Beginner' ? 'bg-green-500' : 
                                                course.level === 'Intermediate' ? 'bg-blue-500' : 'bg-purple-500'
                                            }`}></div>
                                            <div className="flex flex-col flex-1 p-6">
                                                <CardHeader className="p-0 mb-4">
                                                    <div className="flex justify-between items-start mb-2">
                                                        <Badge variant="secondary" className="text-[10px] uppercase font-bold tracking-wider">
                                                            {course.level}
                                                        </Badge>
                                                        <div className="flex items-center text-xs text-muted-foreground font-medium">
                                                            <span className="text-yellow-500 mr-1">★</span> {course.rating}
                                                        </div>
                                                    </div>
                                                    <CardTitle className="text-lg font-bold leading-tight line-clamp-2">
                                                        {course.title}
                                                    </CardTitle>
                                                    <CardDescription className="line-clamp-2 mt-2">
                                                        {course.subtitle}
                                                    </CardDescription>
                                                </CardHeader>
                                                <CardFooter className="mt-auto pt-0 p-0 text-xs font-medium text-muted-foreground flex items-center gap-4">
                                                    <span className="flex items-center gap-1"><BookOpen className="h-3 w-3" /> {course.lessons} Lessons</span>
                                                    <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> {course.duration}</span>
                                                </CardFooter>
                                            </div>
                                        </Card>
                                </Link>
                            ))}
                        </div>
                     )}
                </div>
            </main>
            <Footer />
        </div>
    );
}
