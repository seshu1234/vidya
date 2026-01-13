"use client";

import { notFound } from "next/navigation";
import { getCourseBySlug } from "@/lib/course-data";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { CheckCircle2, PlayCircle, Star, Users, Clock, Languages } from "lucide-react";

import React, { use } from "react";

export default function CourseDetailPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = use(params);
    const course = getCourseBySlug(slug);

    if (!course) {
        return notFound();
    }

    return (
        <div className="flex min-h-screen flex-col bg-white dark:bg-black font-sans">
            <Navbar />
            
            <main className="flex-1">
                {/* Udacity-Style Hero */}
                <div className="bg-black text-white pt-24 pb-20 relative overflow-hidden">
                    <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-3 gap-12 relative z-10">
                        <div className="lg:col-span-2 space-y-6">
                            <Badge className="bg-slate-800 text-slate-200 hover:bg-slate-700 px-3 py-1 text-sm font-bold uppercase tracking-wider w-fit border border-slate-700">
                                {course.category}
                            </Badge>
                            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight leading-tight">
                                {course.title}
                            </h1>
                            <p className="text-xl text-slate-400 max-w-2xl leading-relaxed">
                                {course.description || course.subtitle}
                            </p>
                            
                            <div className="flex flex-wrap gap-6 text-sm font-medium text-slate-400 pt-4">
                                <div className="flex items-center gap-2">
                                    <Star className="h-5 w-5 text-yellow-500 fill-yellow-500" />
                                    <span className="text-white text-base">{course.rating}</span> (2,400 reviews)
                                </div>
                                <div className="flex items-center gap-2">
                                    <Users className="h-5 w-5 text-slate-500" />
                                    <span>{course.students.toLocaleString()} Enrolled</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Clock className="h-5 w-5 text-slate-500" />
                                    <span>{course.duration}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Languages className="h-5 w-5 text-slate-500" />
                                    <span>Hinglish</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="max-w-7xl mx-auto px-6 py-12 grid lg:grid-cols-3 gap-12 relative">
                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-16">
                        
                        {/* What you'll learn */}
                        <section>
                            <h2 className="text-2xl font-bold text-navy-900 dark:text-white mb-6">What you will master</h2>
                            <div className="grid sm:grid-cols-2 gap-4">
                                {course.features.length > 0 ? course.features.map((feature, idx) => (
                                    <div key={idx} className="flex gap-3 items-start p-4 rounded-lg bg-slate-50 dark:bg-navy-900/50 border border-slate-100 dark:border-navy-800">
                                        <CheckCircle2 className="h-5 w-5 text-black dark:text-white shrink-0 mt-0.5" />
                                        <span className="text-sm font-medium text-slate-700 dark:text-slate-300">{feature}</span>
                                    </div>
                                )) : (
                                    <p className="text-muted-foreground italic">Course outcomes detailed in syllabus.</p>
                                )}
                            </div>
                        </section>

                        {/* Syllabus Accordion */}
                        <section>
                            <h2 className="text-2xl font-bold text-navy-900 dark:text-white mb-6">Syllabus</h2>
                            {course.syllabus.length > 0 ? (
                                <Accordion type="single" collapsible className="w-full space-y-4">
                                    {course.syllabus.map((module, idx) => (
                                        <AccordionItem key={idx} value={`week-${module.week}`} className="border-b-0">
                                            <div className="border border-slate-200 dark:border-navy-800 rounded-lg overflow-hidden">
                                                 <AccordionTrigger className="px-6 py-4 hover:bg-slate-50 dark:hover:bg-navy-900 transition-colors [&[data-state=open]]:bg-slate-50 dark:[&[data-state=open]]:bg-navy-900">
                                                    <div className="flex text-left gap-4">
                                                        <span className="text-muted-foreground font-mono text-sm pt-1 uppercase">Week {module.week}</span>
                                                        <span className="font-semibold text-lg">{module.title}</span>
                                                    </div>
                                                </AccordionTrigger>
                                                <AccordionContent className="px-6 py-4 bg-white dark:bg-black">
                                                    <ul className="space-y-3">
                                                        {module.topics.map((topic, i) => (
                                                            <li key={i} className="flex items-center gap-3 text-sm text-slate-600 dark:text-slate-400">
                                                                <PlayCircle className="h-4 w-4 text-black dark:text-white" />
                                                                {topic}
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </AccordionContent>
                                            </div>
                                        </AccordionItem>
                                    ))}
                                </Accordion>
                            ) : (
                                <div className="p-8 border border-dashed rounded-xl text-center text-muted-foreground bg-slate-50 dark:bg-navy-900/10">
                                    <p>Full syllabus curriculum coming soon.</p>
                                </div>
                            )}
                        </section>

                        {/* Instructor */}
                        <section>
                             <h2 className="text-2xl font-bold text-navy-900 dark:text-white mb-6">Meet your Instructor</h2>
                             <div className="flex items-center gap-6 p-6 rounded-2xl bg-white dark:bg-navy-900 border border-slate-100 dark:border-navy-800 shadow-sm">
                                <div className="h-20 w-20 rounded-full bg-slate-200 flex items-center justify-center text-2xl">👨‍🏫</div>
                                <div>
                                    <h3 className="text-xl font-bold">Rahul Sharma</h3>
                                    <p className="text-slate-600 dark:text-slate-400 font-medium">Senior Architect @ Google</p>
                                    <p className="text-sm text-muted-foreground mt-2">10+ years of experience in distributed systems. Teaching coding in simple Hinglish since 2018.</p>
                                </div>
                             </div>
                        </section>
                    </div>

                    {/* Sticky Sidebar (Right) */}
                    <div className="lg:col-span-1">
                        <div className="sticky top-24 space-y-6">
                            <div className="p-6 rounded-2xl border border-slate-200 dark:border-navy-800 bg-white dark:bg-navy-900 shadow-xl">
                                <div className="aspect-video w-full bg-slate-100 rounded-lg mb-6 flex items-center justify-center relative cursor-pointer group overflow-hidden">
                                     <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors"></div>
                                     <PlayCircle className="h-16 w-16 text-white relative z-10 group-hover:scale-110 transition-transform" />
                                </div>
                                
                                <div className="mb-6">
                                    <span className="text-3xl font-extrabold text-navy-900 dark:text-white">Free</span>
                                    <span className="text-muted-foreground ml-2 line-through text-sm">₹4999</span>
                                    <Badge className="ml-3 bg-green-100 text-green-700 hover:bg-green-200">100% OFF</Badge>
                                </div>

                                <Button size="lg" className="w-full h-14 text-lg font-bold bg-black text-white hover:bg-slate-800 shadow-lg">
                                    Start Learning Now
                                </Button>
                                
                                <p className="text-center text-xs text-muted-foreground mt-4">
                                    30-Day Money-Back Guarantee (Full Access)
                                </p>

                                <div className="mt-8 space-y-4 pt-8 border-t border-slate-100 dark:border-navy-800">
                                    <div className="flex justify-between text-sm">
                                        <span className="text-muted-foreground">Skill Level</span>
                                        <span className="font-semibold">{course.level}</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-muted-foreground">Language</span>
                                        <span className="font-semibold">Hinglish</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-muted-foreground">Certificate</span>
                                        <span className="font-semibold">Yes, included</span>
                                    </div>
                                      <div className="flex justify-between text-sm">
                                        <span className="text-muted-foreground">Access</span>
                                        <span className="font-semibold">Lifetime</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}
