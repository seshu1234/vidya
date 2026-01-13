import { getCourseBySlug } from "@/lib/course-data";
import React from "react";
import { LearningSidebar, LearningSidebarContent } from "@/components/learning-sidebar";
import { Menu, FileText } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";


import { CourseProgressProvider } from "@/components/course-progress-context";

export default async function LearningLayout({
    children,
    params,
}: {
    children: React.ReactNode;
    params: Promise<{ courseSlug: string }>;
}) {
    const { courseSlug } = await params;
    const course = getCourseBySlug(courseSlug);

    if (!course) {
        return <div>Course not found</div>;
    }

    return (
        <CourseProgressProvider>
            <div className="h-screen overflow-hidden flex flex-col bg-background font-sans">
               
                <div className="flex flex-1 overflow-hidden">
                    {/* Desktop Sidebar */}
                    <LearningSidebar course={course} />

                    {/* Main Content Area */}
                    <div className="flex-1 lg:pl-80 min-w-0 transition-all duration-300 flex flex-col h-full bg-slate-50 dark:bg-black">
                        
                        {/* Mobile Header */}
                        <div className="lg:hidden flex-none sticky top-0 z-30 flex items-center justify-between p-4 border-b border-slate-200 dark:border-slate-800 bg-background/80 backdrop-blur-md">
                            <div className="flex items-center gap-2">
                                <div className="h-8 w-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white">
                                    <FileText className="h-4 w-4" />
                                </div>
                                <span className="font-bold text-sm tracking-tight truncate max-w-[200px]">{course.title}</span>
                            </div>

                            <Sheet>
                                <SheetTrigger asChild>
                                    <Button variant="ghost" size="icon" className="h-9 w-9">
                                        <Menu className="h-5 w-5" />
                                    </Button>
                                </SheetTrigger>
                                <SheetContent side="left" className="p-0 w-80">
                                    <SheetTitle className="sr-only">Course Navigation</SheetTitle>
                                    <LearningSidebarContent course={course} className="border-r-0" />
                                </SheetContent>
                            </Sheet>
                        </div>

                        {/* Page Content */}
                        <div className="flex-1 overflow-hidden relative">
                            {children}
                        </div>
                    </div>
                </div>
            </div>
        </CourseProgressProvider>
    );
}
