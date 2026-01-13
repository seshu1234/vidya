import { notFound } from "next/navigation";
import { getCourseBySlug } from "@/lib/course-data";
import { LearningSidebar, LearningSidebarContent } from "@/components/learning-sidebar";
import React from "react";
import { Navbar } from "@/components/navbar";
import { Menu, FileText } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";


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
        return notFound();
    }

    return (
        <div>
            <Navbar />
        <div className="flex min-h-screen bg-background font-sans">
            {/* Desktop Sidebar */}
            <LearningSidebar course={course} />

            {/* Mobile Header & Content */}
            <div className="flex-1 lg:pl-80 min-w-0 transition-all duration-300 flex flex-col">
                 
                 {/* Mobile Header */}
                 <div className="lg:hidden sticky top-0 z-30 flex items-center justify-between p-4 border-b border-slate-200 dark:border-slate-800 bg-background/80 backdrop-blur-md">
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
                            {/* Accessible Title */}
                            <SheetTitle className="sr-only">Course Navigation</SheetTitle>
                            <LearningSidebarContent course={course} className="border-r-0" />
                        </SheetContent>
                    </Sheet>
                 </div>

                {/* Main Content */}
                <div className="flex-1">
                    {children}
                </div>
            </div>
        </div>
        </div>
    );
}
