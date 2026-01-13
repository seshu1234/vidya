"use client";

import React, { use } from "react";
import { notFound, useRouter } from "next/navigation";
import { getCourseBySlug } from "@/lib/course-data";
import { slugify } from "@/components/learning-sidebar";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Button } from "@/components/ui/button";
import { ChevronRight, ArrowLeft } from "lucide-react";
import { CodePlayground } from "@/components/code-playground";
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";

export default function ChapterPage({ params }: { params: Promise<{ courseSlug: string; chapterId: string }> }) {
    const { courseSlug, chapterId } = use(params);
    const router = useRouter();

    const course = getCourseBySlug(courseSlug);
    if (!course) return notFound();

    // Find the current content
    let content = "";
    let activeTopic = "";
    let nextTopic: string | null = null;
    let prevTopic: string | null = null;

    // Flatten topics to find current, prev, and next
    const allTopics: { title: string; slug: string }[] = [];
    course.syllabus.forEach(week => {
        week.topics.forEach(topic => {
            allTopics.push({ title: topic, slug: slugify(topic) });
        });
    });

    const currentIndex = allTopics.findIndex(t => t.slug === chapterId);
    
    if (currentIndex !== -1) {
        activeTopic = allTopics[currentIndex].title;
        
        // Find content in syllabus structure
        const week = course.syllabus.find(w => w.topics.includes(activeTopic));
        if (week && week.content && week.content[activeTopic]) {
            content = week.content[activeTopic];
        } else {
            content = `# ${activeTopic}\n\nContent coming soon...`;
        }

        // Set Next/Prev for navigation
        if (currentIndex < allTopics.length - 1) {
            nextTopic = allTopics[currentIndex + 1].slug;
        }
        if (currentIndex > 0) {
            prevTopic = allTopics[currentIndex - 1].slug;
        }
    } else {
        return notFound();
    }



// ... inside the component return ...

    return (
        <div className="h-[calc(100vh)] overflow-hidden flex flex-col">
             {/* Main Split View */}
             <ResizablePanelGroup direction="horizontal" className="h-full items-stretch">
                
                {/* Left Panel: Content */}
                <ResizablePanel defaultSize={45} minSize={30} className="bg-white dark:bg-black">
                    <div className="h-full overflow-y-auto">
                        <div className="max-w-3xl mx-auto px-6 py-12 lg:py-16 w-full">
                            <div className="prose prose-slate dark:prose-invert prose-lg max-w-none 
                                prose-headings:font-bold prose-headings:tracking-tight 
                                prose-h1:text-4xl prose-h2:text-2xl prose-h2:mt-8 prose-h2:mb-4
                                prose-p:leading-relaxed prose-p:text-slate-600 dark:prose-p:text-slate-300
                                prose-code:text-rose-600 dark:prose-code:text-rose-400 prose-code:bg-rose-50 dark:prose-code:bg-rose-950/30 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded-md prose-code:before:content-none prose-code:after:content-none
                                prose-pre:bg-slate-900 prose-pre:text-slate-50 prose-pre:shadow-lg prose-pre:rounded-xl
                                prose-img:rounded-xl prose-img:shadow-md
                                prose-blockquote:border-l-4 prose-blockquote:border-indigo-500 prose-blockquote:bg-indigo-50 dark:prose-blockquote:bg-indigo-950/20 prose-blockquote:py-2 prose-blockquote:px-4 prose-blockquote:ml-0 prose-blockquote:rounded-r-lg
                            ">
                                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                                    {content}
                                </ReactMarkdown>
                            </div>

                            {/* Navigation Footer */}
                            <div className="mt-16 flex items-center justify-between border-t border-slate-200 dark:border-slate-800 pt-8 pb-10">
                                <Button 
                                    variant="ghost" 
                                    disabled={!prevTopic}
                                    onClick={() => {
                                        if (prevTopic) {
                                            router.push(`/learn/${courseSlug}/${prevTopic}`);
                                        }
                                    }}
                                    className="gap-2"
                                >
                                    <ArrowLeft className="h-4 w-4" /> Previous
                                </Button>

                                {nextTopic ? (
                                    <Button 
                                        onClick={() => router.push(`/learn/${courseSlug}/${nextTopic}`)}
                                        className="gap-2 shadow-indigo-500/20 hover:shadow-indigo-500/30 font-semibold"
                                    >
                                        Next Lesson <ChevronRight className="h-4 w-4" />
                                    </Button>
                                ) : (
                                    <Button className="bg-green-600 hover:bg-green-700 text-white font-bold">
                                        Finish Course
                                    </Button>
                                )}
                            </div>
                        </div>
                    </div>
                </ResizablePanel>

                <ResizableHandle withHandle />

                {/* Right Panel: IDE (Desktop Only) */}
                <ResizablePanel defaultSize={55} minSize={30} className="hidden lg:block bg-[#1e1e1e]">
                    <div className="h-full">
                        <CodePlayground 
                            defaultLanguage="c" 
                            defaultValue={`#include <stdio.h>\n\nint main() {\n    printf("Hello from Vidya LMS!\\n");\n    return 0;\n}`} 
                        />
                    </div>
                </ResizablePanel>
             </ResizablePanelGroup>
        </div>
    );
}

// Import helper (Add to top)

