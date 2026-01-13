"use client";

import { notFound } from "next/navigation";
import { getPathBySlug } from "@/lib/path-data";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { CheckCircle2, PlayCircle, Star, Briefcase, TrendingUp, Award, ArrowRight } from "lucide-react";
import React, { use } from "react";
import Link from "next/link";

export default function PathDetailPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = use(params);
    const path = getPathBySlug(slug);

    if (!path) {
        return notFound();
    }

    return (
        <div className="flex min-h-screen flex-col bg-white dark:bg-black font-sans">
            <Navbar />
            
            <main className="flex-1">
                {/* Hero Section */}
                <div className="bg-black text-white pt-24 pb-20 relative overflow-hidden">
                     <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-20"></div>
                     
                    <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 relative z-10 items-center">
                        <div className="space-y-6">
                            <div className="flex items-center gap-2 text-slate-400 text-sm mb-2">
                                <Link href="/paths" className="hover:text-white transition-colors">Paths</Link>
                                <span>/</span>
                                <span className="text-white capitalize">{path.role}</span>
                            </div>
                            
                            <Badge className={`${path.color} text-white hover:${path.color} px-3 py-1 text-sm font-bold uppercase tracking-wider w-fit border-none`}>
                                Career Track
                            </Badge>
                            
                            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight leading-tight">
                                Become a <br/>
                                <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">
                                    {path.role}
                                </span>
                            </h1>
                            <p className="text-xl text-slate-400 max-w-xl leading-relaxed">
                                {path.description} Follow this step-by-step roadmap to land a high-paying job in top tech companies.
                            </p>
                            
                            <div className="flex flex-wrap gap-4 pt-4">
                                <Button size="lg" className="h-14 px-8 text-lg font-bold bg-white text-black hover:bg-slate-200 border-none">
                                    Start This Path
                                </Button>
                                <Button size="lg" variant="outline" className="h-14 px-8 text-lg font-bold border-slate-700 text-white hover:bg-slate-800 hover:text-white">
                                    Download Syllabus
                                </Button>
                            </div>
                        </div>

                        {/* Career Stats Card */}
                        <div className="lg:pl-12">
                            <div className="bg-[#1e1e1e] border border-white/10 rounded-2xl p-8 shadow-2xl space-y-8 backdrop-blur-sm">
                                <div className="space-y-2">
                                    <h3 className="text-slate-400 text-sm font-medium uppercase tracking-wider">Estimated Salary</h3>
                                    <div className="flex items-baseline gap-2">
                                        <span className="text-4xl font-bold text-green-400">{path.salary}</span>
                                        <span className="text-slate-500">per annum</span>
                                    </div>
                                    <p className="text-xs text-slate-500">Based on industry average for 0-2 yrs exp.</p>
                                </div>

                                <div className="grid grid-cols-2 gap-6">
                                    <div className="space-y-1">
                                        <h3 className="text-slate-400 text-sm font-medium">Duration</h3>
                                        <p className="text-xl font-bold text-white">{path.duration}</p>
                                        <p className="text-xs text-slate-500">@ 10hrs/week</p>
                                    </div>
                                    <div className="space-y-1">
                                        <h3 className="text-slate-400 text-sm font-medium">Courses</h3>
                                        <p className="text-xl font-bold text-white">{path.courses} Included</p>
                                        <p className="text-xs text-slate-500">Full Access</p>
                                    </div>
                                </div>

                                <div className="space-y-3 pt-4 border-t border-white/10">
                                    <h3 className="text-slate-400 text-sm font-medium">Hiring Partners</h3>
                                    <div className="flex flex-wrap gap-2">
                                        {path.companies.map((company, i) => (
                                            <span key={i} className="px-3 py-1 bg-white/5 rounded-full text-xs font-medium text-slate-300 border border-white/10">
                                                {company}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="max-w-7xl mx-auto px-6 py-16 grid lg:grid-cols-3 gap-16">
                    {/* Main Content: Roadmap */}
                    <div className="lg:col-span-2 space-y-12">
                        
                        <section>
                            <div className="flex items-center gap-3 mb-8">
                                <MapIcon className="h-8 w-8 text-black dark:text-white" />
                                <h2 className="text-3xl font-bold text-navy-900 dark:text-white">Your Learning Journey</h2>
                            </div>
                            
                            <div className="relative space-y-12 pl-8 border-l-2 border-slate-200 dark:border-navy-800 ml-4">
                                {path.syllabus.map((module, idx) => (
                                    <div key={idx} className="relative group">
                                         {/* Connector Dot */}
                                        <div className={`absolute -left-[41px] top-1 h-6 w-6 rounded-full border-4 border-white dark:border-black ${
                                            idx === 0 ? "bg-green-500" : "bg-slate-300 dark:bg-slate-700"
                                        } z-10 box-content`}></div>
                                        
                                        <div className="bg-slate-50 dark:bg-navy-900/30 border border-slate-100 dark:border-navy-800 rounded-xl p-6 hover:shadow-lg transition-all hover:border-slate-300 dark:hover:border-slate-700">
                                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                                                <div>
                                                    <span className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-1 block">Step {idx + 1}</span>
                                                    <h3 className="text-xl font-bold text-navy-900 dark:text-white">{module.title}</h3>
                                                </div>
                                                <Badge variant="outline" className="w-fit">4 Weeks</Badge>
                                            </div>
                                            <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
                                                {module.description} Master the core concepts and build real-world projects to validate your skills.
                                            </p>
                                            <ul className="space-y-2 mb-6">
                                                <li className="flex items-center gap-2 text-sm text-slate-700 dark:text-slate-300">
                                                    <CheckCircle2 className="h-4 w-4 text-green-500" />
                                                    <span>Core Concepts & Theory</span>
                                                </li>
                                                 <li className="flex items-center gap-2 text-sm text-slate-700 dark:text-slate-300">
                                                    <CheckCircle2 className="h-4 w-4 text-green-500" />
                                                    <span>2 Real-world Projects</span>
                                                </li>
                                            </ul>
                                            <Button variant="secondary" size="sm" className="w-full md:w-auto">
                                                View Module Details
                                            </Button>
                                        </div>
                                    </div>
                                ))}
                                
                                <div className="relative">
                                     <div className="absolute -left-[41px] top-0 h-6 w-6 rounded-full bg-black dark:bg-white z-10 flex items-center justify-center">
                                         <Award className="h-3 w-3 text-white dark:text-black" />
                                     </div>
                                     <div className="pl-4 pt-1">
                                         <h3 className="text-xl font-bold text-navy-900 dark:text-white">Professional Certificate</h3>
                                         <p className="text-slate-600 dark:text-slate-400">Upon completion, receive an industry-recognized certificate.</p>
                                     </div>
                                </div>
                            </div>
                        </section>

                    </div>

                    {/* Sidebar: Benefits */}
                    <div className="lg:col-span-1 space-y-8">
                         <div className="bg-blue-50 dark:bg-blue-900/10 p-6 rounded-2xl border border-blue-100 dark:border-blue-900/50">
                            <h3 className="text-lg font-bold text-navy-900 dark:text-white mb-4 flex items-center gap-2">
                                <TrendingUp className="h-5 w-5 text-blue-600" />
                                Why this path?
                            </h3>
                            <ul className="space-y-4">
                                <li className="flex gap-3 text-sm text-slate-700 dark:text-slate-300">
                                    <div className="h-1.5 w-1.5 rounded-full bg-blue-500 mt-2 shrink-0"></div>
                                    <p><strong>High Demand:</strong> {path.role}s are among the top 3 most hired roles in 2024.</p>
                                </li>
                                <li className="flex gap-3 text-sm text-slate-700 dark:text-slate-300">
                                    <div className="h-1.5 w-1.5 rounded-full bg-blue-500 mt-2 shrink-0"></div>
                                    <p><strong>Future Proof:</strong> Includes latest AI and Cloud tools used by top tech companies.</p>
                                </li>
                                <li className="flex gap-3 text-sm text-slate-700 dark:text-slate-300">
                                    <div className="h-1.5 w-1.5 rounded-full bg-blue-500 mt-2 shrink-0"></div>
                                    <p><strong>Practical:</strong> 60% of the course is focused on building projects.</p>
                                </li>
                            </ul>
                        </div>

                        <div className="bg-slate-50 dark:bg-navy-900/30 p-6 rounded-2xl border border-slate-100 dark:border-navy-800">
                            <h3 className="text-lg font-bold text-navy-900 dark:text-white mb-4 flex items-center gap-2">
                                <Briefcase className="h-5 w-5 text-slate-600 dark:text-slate-400" />
                                Job Roles
                            </h3>
                            <div className="flex flex-wrap gap-2">
                                <Badge variant="outline">{path.role}</Badge>
                                <Badge variant="outline">Consultant</Badge>
                                <Badge variant="outline">Freelancer</Badge>
                                <Badge variant="outline">Senior Engineer</Badge>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}

function MapIcon({ className }: { className?: string }) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
            <polygon points="3 6 9 3 15 6 21 3 21 21 15 18 9 21 3 18" />
            <line x1="9" x2="9" y1="3" y2="21" />
            <line x1="15" x2="15" y1="3" y2="21" />
        </svg>
    )
}
