"use client";

import React from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { ChevronLeft, CheckCircle2, Circle } from "lucide-react";
import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Course } from "@/types/course";

// Helper to slugify topics for URL
export const slugify = (text: string) => {
    return text.toLowerCase().replace(/[^\w ]+/g, '').replace(/ +/g, '-');
};

interface LearningSidebarProps {
    course: Course;
}

// Reusable Content Component
export function LearningSidebarContent({ course, className }: { course: Course, className?: string }) {
    const params = useParams();
    const currentChapterSlug = params.chapterId as string;
    
    // Calculate progress (mock for now)
    const progress = 15;

    return (
        <div className={cn("flex flex-col h-full bg-slate-50/50 dark:bg-black", className)}>
             {/* Header */}
             <div className="flex flex-col border-b border-slate-200 dark:border-slate-800 p-4">
                <Link 
                    href="/dashboard" 
                    className="flex items-center gap-2 text-xs font-medium text-muted-foreground hover:text-foreground mb-4 transition-colors"
                >
                    <ChevronLeft className="h-3.5 w-3.5" /> Back to Dashboard
                </Link>
                <h2 className="text-lg font-bold leading-tight tracking-tight px-1 text-foreground">
                    {course.title}
                </h2>
                <div className="mt-4 px-1">
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-1.5 text-xs font-bold text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-900/20 px-2.5 py-1 rounded-full border border-amber-200 dark:border-amber-800">
                             <div className="h-3 w-3 bg-amber-500 rounded-full animate-pulse" />
                             3 Day Streak
                        </div>
                        <div className="flex items-center gap-1.5 text-xs font-bold text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-900/20 px-2.5 py-1 rounded-full border border-indigo-200 dark:border-indigo-800">
                             <div className="h-3 w-3 bg-indigo-500 rounded-full" />
                             1,250 XP
                        </div>
                    </div>
                    <div className="flex items-center justify-between text-xs mb-1.5">
                        <span className="font-medium text-muted-foreground">{progress}% Completed</span>
                        <span className="text-muted-foreground">8/60</span>
                    </div>
                    <div className="h-2 w-full bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
                        <div 
                            className="h-full bg-green-500 rounded-full transition-all duration-500" 
                            style={{ width: `${progress}%` }} 
                        />
                    </div>
                </div>
            </div>

            {/* Scrollable Syllabus */}
            <ScrollArea className="flex-1">
                <div className="p-4">
                    <Accordion type="multiple" defaultValue={["week-1"]} className="space-y-4">
                        {course.syllabus.map((module, idx) => (
                            <AccordionItem key={idx} value={`week-${module.week}`} className="border-0">
                                <AccordionTrigger className="hover:no-underline py-2 text-sm font-semibold text-muted-foreground data-[state=open]:text-foreground">
                                    <div className="flex items-center gap-2 text-left">
                                        <div className="flex items-center justify-center h-6 w-6 rounded-md bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-medium">
                                            {module.week}
                                        </div>
                                        <span>{module.title}</span>
                                    </div>
                                </AccordionTrigger>
                                <AccordionContent className="pt-1 pb-2">
                                    <div className="space-y-0.5 relative pl-3 ml-3 border-l border-slate-200 dark:border-slate-800">
                                        {module.topics.map((topic, i) => {
                                            const topicSlug = slugify(topic);
                                            const isActive = currentChapterSlug === topicSlug;
                                            const isCompleted = idx === 0 && i < 2; // Mock completion
                                            
                                            return (
                                                <Link
                                                    key={i}
                                                    href={`/learn/${course.slug}/${topicSlug}`}
                                                    className={cn(
                                                        "group flex items-start gap-3 py-2 px-3 rounded-md text-sm transition-colors relative",
                                                        isActive 
                                                            ? "bg-indigo-50 dark:bg-indigo-950/30 text-indigo-700 dark:text-indigo-400 font-medium" 
                                                            : "text-muted-foreground hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-foreground"
                                                    )}
                                                >
                                                    <div className="mt-0.5 shrink-0">
                                                        {isCompleted ? (
                                                            <CheckCircle2 className="h-4 w-4 text-green-600" />
                                                        ) : isActive ? (
                                                            <div className="h-4 w-4 rounded-full border-[1.5px] border-indigo-600 flex items-center justify-center">
                                                                <div className="h-1.5 w-1.5 rounded-full bg-indigo-600" />
                                                            </div>
                                                        ) : (
                                                            <Circle className="h-4 w-4 text-slate-300 dark:text-slate-600" />
                                                        )}
                                                    </div>
                                                    <span className="leading-snug">{topic}</span>
                                                </Link>
                                            )
                                        })}
                                    </div>
                                </AccordionContent>
                            </AccordionItem>
                        ))}
                    </Accordion>
                </div>
            </ScrollArea>
        </div>
    );
}

export function LearningSidebar({ course }: LearningSidebarProps) {
    return (
        <div className="flex h-screen flex-col border-r border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-black w-80 shrink-0 fixed left-0 top-0 z-40 hidden lg:flex">
           <LearningSidebarContent course={course} />
        </div>
    );
}
