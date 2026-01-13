"use client";

import React, { use } from "react";
import { useRouter } from "next/navigation";
import { getCourseBySlug } from "@/lib/course-data";
import { slugify } from "@/components/learning-sidebar";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Button } from "@/components/ui/button";
import { ChevronRight, ArrowLeft, BookOpen, Play, Terminal, CheckCircle, Info, AlertTriangle, Lightbulb } from "lucide-react";
import { CodePlayground } from "@/components/code-playground";
import { cn } from "@/lib/utils";
import { useCourseProgress } from "@/components/course-progress-context";

interface CodeBlockProps {
    inline?: boolean;
    className?: string;
    children?: React.ReactNode;
}



// Interactive Component to toggle between View/Edit modes
const InteractiveCodeBlock = ({ className, children, codeString }: { className?: string; children: React.ReactNode; codeString: string }) => {
    const [isEditing, setIsEditing] = React.useState(false);
    const [code, setCode] = React.useState(codeString);

    if (isEditing) {
        return (
            <div className="my-8 rounded-xl overflow-hidden shadow-2xl ring-1 ring-slate-900/5 h-[500px] animate-in fade-in zoom-in-95 duration-200">
               <div className="bg-[#1e1e1e] border-b border-slate-800 px-4 py-2 flex items-center justify-between">
                   <div className="flex items-center gap-2">
                        <Terminal className="h-4 w-4 text-green-500" />
                        <span className="text-xs font-bold text-slate-300">Interactive Editor</span>
                   </div>
                   <Button 
                     variant="ghost" 
                     size="sm" 
                     className="h-7 text-xs text-slate-400 hover:text-white"
                     onClick={() => setIsEditing(false)}
                   >
                     Exit Mode
                   </Button>
               </div>
               <div className="h-[calc(100%-40px)]">
                    <CodePlayground 
                        defaultLanguage="c" 
                        value={code}
                        onChange={setCode}
                        theme="vs-dark"
                    />
               </div>
            </div>
        )
    }

    return (
        <div className="my-8 rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-xl ring-1 ring-slate-900/5 transition-all hover:shadow-2xl group">
            <div className="bg-slate-50 dark:bg-slate-900/50 px-4 py-3 flex items-center justify-between border-b border-slate-200 dark:border-slate-800 backdrop-blur-sm">
                <div className="flex items-center gap-2">
                    <div className="flex gap-1.5 opacity-60">
                        <div className="w-2.5 h-2.5 rounded-full bg-red-500"></div>
                        <div className="w-2.5 h-2.5 rounded-full bg-yellow-500"></div>
                        <div className="w-2.5 h-2.5 rounded-full bg-green-500"></div>
                    </div>
                    <span className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-2">C Example</span>
                </div>
                <Button 
                    size="sm" 
                    className="bg-indigo-600 hover:bg-indigo-700 text-white h-8 text-xs font-bold shadow-sm gap-1.5 transition-all active:scale-95 group-hover:scale-105"
                    onClick={() => setIsEditing(true)}
                >
                    <Play className="w-3 h-3 fill-current" /> Try it Yourself
                </Button>
            </div>
            <div className="bg-[#1e1e1e] p-5 overflow-x-auto text-[13px] leading-relaxed relative">
                <code className={className} style={{ color: '#d4d4d4', fontFamily: '"JetBrains Mono", monospace' }}>
                    {children}
                </code>
            </div>
        </div>
    )
}

export default function ChapterPage({ params }: { params: Promise<{ courseSlug: string; chapterId: string }> }) {
    const { courseSlug, chapterId } = use(params);
    const router = useRouter();

    // Custom Markdown Components
    const MarkdownComponents = React.useMemo(() => ({
        h2: ({ children }: { children?: React.ReactNode }) => (
            <h2 className="text-2xl font-bold mt-12 mb-6 pb-2 border-b-2 border-slate-100 dark:border-slate-800 text-slate-900 dark:text-slate-100 flex items-center gap-2">
                <span className="w-1.5 h-6 bg-indigo-600 rounded-full inline-block"></span>
                {children}
            </h2>
        ),
        p: ({ children }: { children?: React.ReactNode }) => (
            <p className="text-base leading-7 text-slate-600 dark:text-slate-400 mb-6 font-medium font-sans">
                {children}
            </p>
        ),
        ul: ({ children }: { children?: React.ReactNode }) => (
            <ul className="grid sm:grid-cols-1 gap-3 mb-8">
                {children}
            </ul>
        ),
        li: ({ children }: { children?: React.ReactNode }) => (
            <li className="flex items-start gap-3 bg-white dark:bg-slate-900/50 p-4 rounded-xl border border-slate-100 dark:border-slate-800 shadow-sm transition-all hover:shadow-md hover:border-indigo-100 dark:hover:border-indigo-900 group">
                <div className="mt-1 h-5 w-5 rounded-full bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center shrink-0 group-hover:bg-indigo-600 transition-colors">
                    <CheckCircle className="h-3 w-3 text-indigo-600 dark:text-indigo-400 group-hover:text-white transition-colors" />
                </div>
                <div className="text-slate-700 dark:text-slate-300 font-medium">{children}</div>
            </li>
        ),
        code: ({ inline, className, children, ...props }: CodeBlockProps) => {
            const match = /language-(\w+)/.exec(className || '')
            const codeString = String(children).replace(/\n$/, '')
            
            if (!inline && match) {
                return (
                    <InteractiveCodeBlock className={className} codeString={codeString}>
                        {children}
                    </InteractiveCodeBlock>
                )
            }
            return <code className={cn("bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded text-sm text-pink-600 dark:text-pink-400 font-mono border border-slate-200 dark:border-slate-700", className)} {...props}>{children}</code>
        },
        blockquote: ({ children }: { children?: React.ReactNode }) => {
             // Basic implementation to detect alert types from text content usually found in children
             const content = React.Children.toArray(children);
             const firstChild = content[0] as React.ReactElement<{ children?: React.ReactNode[] }>;
             const text = firstChild?.props?.children?.[0] || "";
             
             if (typeof text === 'string') {
                 if (text.includes('[!INFO]')) {
                     return (
                        <div className="my-6 flex gap-4 rounded-xl bg-blue-50 dark:bg-blue-900/20 p-4 border border-blue-100 dark:border-blue-900 text-blue-900 dark:text-blue-100">
                             <Info className="h-5 w-5 shrink-0 text-blue-600 dark:text-blue-400 mt-0.5" />
                             <div className="prose-sm">{children}</div>
                        </div>
                     )
                 }
                 if (text.includes('[!TIP]')) {
                    return (
                       <div className="my-6 flex gap-4 rounded-xl bg-emerald-50 dark:bg-emerald-900/20 p-4 border border-emerald-100 dark:border-emerald-900 text-emerald-900 dark:text-emerald-100">
                            <Lightbulb className="h-5 w-5 shrink-0 text-emerald-600 dark:text-emerald-400 mt-0.5" />
                            <div className="prose-sm">{children}</div>
                       </div>
                    )
                }
                if (text.includes('[!WARNING]')) {
                    return (
                       <div className="my-6 flex gap-4 rounded-xl bg-amber-50 dark:bg-amber-900/20 p-4 border border-amber-100 dark:border-amber-900 text-amber-900 dark:text-amber-100">
                            <AlertTriangle className="h-5 w-5 shrink-0 text-amber-600 dark:text-amber-400 mt-0.5" />
                            <div className="prose-sm">{children}</div>
                       </div>
                    )
                }
             }
             
             return <blockquote className="border-l-4 border-indigo-500 pl-4 py-1 italic bg-slate-50 dark:bg-slate-900/50 rounded-r-lg my-6">{children}</blockquote>
        }
    }), []);

    const course = getCourseBySlug(courseSlug);

    // Find the current content
    let content = "";
    let activeTopic = "";
    let nextTopic: string | null = null;
    let prevTopic: string | null = null;
    let isValidChapter = false;

    if (course) {
        // Flatten topics to find current, prev, and next
        const allTopics: { title: string; slug: string }[] = [];
        course.syllabus.forEach(week => {
            week.topics.forEach(topic => {
                allTopics.push({ title: topic, slug: slugify(topic) });
            });
        });

        const currentIndex = allTopics.findIndex(t => t.slug === chapterId);
        
        if (currentIndex !== -1) {
            isValidChapter = true;
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
        }
    }

    if (!course) {
        return <div>Course not found</div>;
    }
    
    if (!isValidChapter) {
        return <div>Chapter not found</div>;
    }

    return (
        <div className="h-full relative bg-white dark:bg-black sm:bg-slate-100/50 sm:dark:bg-black overflow-y-auto custom-scrollbar">
            <div className="max-w-5xl mx-auto px-4 py-8 sm:px-6 sm:py-10 w-full">
                <div className="bg-transparent sm:bg-white sm:dark:bg-black/50 sm:rounded-3xl sm:shadow-xl sm:shadow-slate-200/50 sm:dark:shadow-none sm:border sm:border-slate-100 sm:dark:border-slate-800 p-0 sm:p-12">
                     {/* Topic Header */}
                     <div className="mb-6 pb-6 sm:mb-8 sm:pb-8 border-b border-slate-100 dark:border-slate-800">
                        <div className="text-xs sm:text-sm font-bold text-indigo-600 dark:text-indigo-400 mb-2 sm:mb-3 flex items-center gap-2 uppercase tracking-widest">
                            <BookOpen className="h-3 w-3 sm:h-4 sm:w-4" />
                            {course.title}
                        </div>
                        <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-slate-900 via-slate-800 to-indigo-900 dark:from-white dark:to-indigo-200 leading-[1.1] pb-1">{activeTopic}</h1>
                    </div>

                    {/* Markdown Content */}
                    <div className="max-w-none">
                        <ReactMarkdown remarkPlugins={[remarkGfm]} components={MarkdownComponents}>
                            {content}
                        </ReactMarkdown>
                    </div>

                    {/* Navigation Footer */}
                    <div className="mt-16 flex flex-col sm:flex-row items-center justify-between border-t border-slate-200 dark:border-slate-800 pt-8 sm:pt-10 pb-20 sm:pb-12 gap-4 sm:gap-6">
                        <Button 
                            variant="outline"
                            size="lg"
                            disabled={!prevTopic}
                            onClick={() => {
                                if (prevTopic) router.push(`/learn/${courseSlug}/${prevTopic}`);
                            }}
                            className="gap-2 w-full sm:w-auto h-12 text-base rounded-full border-slate-300 hover:border-slate-400 hover:bg-slate-50 order-2 sm:order-1"
                        >
                            <ArrowLeft className="h-5 w-5" /> Previous Lesson
                        </Button>

                        <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto order-1 sm:order-2">
                            <CompleteButton chapterId={chapterId} />
                            {nextTopic ? (
                                 <Button 
                                    size="lg"
                                    onClick={() => router.push(`/learn/${courseSlug}/${nextTopic}`)}
                                    className="gap-2 h-12 text-base shadow-xl hover:shadow-2xl hover:-translate-y-0.5 transition-all bg-indigo-600 hover:bg-indigo-700 text-white font-bold w-full sm:w-auto rounded-full px-8"
                                >
                                    Next Lesson <ChevronRight className="h-5 w-5" />
                                </Button>
                            ) : (
                                <Button size="lg" className="h-12 text-base bg-green-600 hover:bg-green-700 text-white font-bold shadow-lg w-full sm:w-auto rounded-full">
                                    Finish Course
                                </Button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

// Helper Component for Completion
// Helper Component for Completion
import { triggerConfetti } from "@/components/ui/confetti";

function CompleteButton({ chapterId }: { chapterId: string }) {
    const { isCompleted, markAsComplete } = useCourseProgress();
    const completed = isCompleted(chapterId);

    return (
        <Button
            variant={completed ? "outline" : "default"}
            className={completed ? "text-green-600 border-green-200 hover:bg-green-50" : ""}
            onClick={() => {
                if (!completed) {
                    triggerConfetti();
                    markAsComplete(chapterId);
                }
            }}
            disabled={completed}
        >
            {completed ? (
                <>
                    <CheckCircle className="mr-2 h-4 w-4" /> Completed
                </>
            ) : (
                "Mark as Complete"
            )}
        </Button>
    );
}
