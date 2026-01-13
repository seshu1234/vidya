"use client";

import { notFound } from "next/navigation";
import { getCourseBySlug } from "@/lib/course-data";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// ScrollArea removed
import { 
    Breadcrumb, 
    BreadcrumbItem, 
    BreadcrumbLink, 
    BreadcrumbList, 
    BreadcrumbPage,
    BreadcrumbSeparator
} from "@/components/ui/breadcrumb";
import { Star, Users, Clock, BookOpen, CheckCircle2, Globe, Linkedin, Twitter, AlertCircle, MessageSquare } from "lucide-react";
import React, { use } from "react";
import Link from "next/link";

export default function CourseDetailPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = use(params);
    const course = getCourseBySlug(slug);

    if (!course) {
        return notFound();
    }

    return (
        <div className="flex min-h-screen flex-col bg-background font-sans">
            <Navbar />
            
            <main className="flex-1 container max-w-7xl mx-auto px-4 py-6 md:py-10 pb-24 lg:pb-10">
                
                 {/* Mobile Breadcrumb (Visible on all, optimized for small) */}
                 <div className="mb-6">
                    <Breadcrumb>
                        <BreadcrumbList className="text-xs sm:text-sm">
                            <BreadcrumbItem>
                                <BreadcrumbLink href="/courses">Courses</BreadcrumbLink>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator />
                            <BreadcrumbItem>
                                <BreadcrumbLink href={`/courses/${course.category}`} className="capitalize">
                                    {course.category.replace("-", " ")}
                                </BreadcrumbLink>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator />
                            <BreadcrumbItem>
                                <BreadcrumbPage className="truncate max-w-[150px] sm:max-w-none">{course.title}</BreadcrumbPage>
                            </BreadcrumbItem>
                        </BreadcrumbList>
                    </Breadcrumb>
                 </div>

                <div className="grid lg:grid-cols-12 gap-8 lg:gap-12">
                    {/* Main Content (Left Col) */}
                    <div className="lg:col-span-8 space-y-8">
                        
                        {/* Course Header */}
                        <div className="space-y-4">
                            <div className="flex flex-wrap items-center gap-2">
                                <Badge variant="secondary" className="rounded-sm font-medium">
                                    {course.level}
                                </Badge>
                                <Badge className="rounded-sm bg-green-600 hover:bg-green-700 font-medium">
                                    Best Choice
                                </Badge>
                                <span className="text-xs text-muted-foreground ml-auto sm:ml-0">Last updated Jan 2026</span>
                            </div>
                            
                            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground leading-tight">
                                {course.title}
                            </h1>
                            <p className="text-lg text-muted-foreground leading-relaxed max-w-3xl">
                                {course.description || course.subtitle} Join the thousands of developers mastering this skill today.
                            </p>
                            
                            {/* Meta Stats */}
                            <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-sm text-muted-foreground pt-2">
                                <div className="flex items-center gap-1.5 text-amber-500 font-bold bg-amber-50 dark:bg-amber-950/30 px-2 py-1 rounded-md border border-amber-100 dark:border-amber-900/50">
                                    <span className="text-lg">{course.rating}</span>
                                    <div className="flex"><Star className="h-3.5 w-3.5 fill-current" /></div>
                                </div>
                                <div className="flex items-center gap-1.5">
                                    <Users className="h-4 w-4" />
                                    <span>{course.students.toLocaleString()} enrolled</span>
                                </div>
                                <div className="flex items-center gap-1.5">
                                    <Clock className="h-4 w-4" />
                                    <span>{course.duration}</span>
                                </div>
                                <div className="flex items-center gap-1.5">
                                    <Globe className="h-4 w-4" />
                                    <span>English, Hinglish</span>
                                </div>
                            </div>
                            
                            {/* Instructor Mini */}
                            <div className="flex items-center gap-3 pt-2 text-sm border-t border-dashed border-slate-200 dark:border-slate-800 mt-6 pt-6 w-full">
                                <Avatar className="h-10 w-10 border border-slate-200">
                                    <AvatarImage src="/placeholder-avatar.jpg" />
                                    <AvatarFallback className="bg-slate-100 text-slate-600 font-bold">RS</AvatarFallback>
                                </Avatar>
                                <div>
                                    <p className="text-muted-foreground text-xs">Created by</p>
                                    <Link href="#" className="font-semibold text-foreground hover:underline">Rahul Sharma</Link>
                                </div>
                            </div>
                        </div>

                        {/* Content Tabs */}
                        <Tabs defaultValue="overview" className="w-full">
                             <TabsList className="w-full justify-start h-auto p-1 bg-slate-100 dark:bg-slate-800 overflow-x-auto">
                                <TabsTrigger value="overview" className="flex-1 sm:flex-none">Overview</TabsTrigger>
                                <TabsTrigger value="curriculum" className="flex-1 sm:flex-none">Curriculum</TabsTrigger>
                                <TabsTrigger value="instructor" className="flex-1 sm:flex-none">Instructor</TabsTrigger>
                                <TabsTrigger value="reviews" className="flex-1 sm:flex-none">Reviews</TabsTrigger>
                             </TabsList>

                             {/* Overview Tab */}
                             <TabsContent value="overview" className="space-y-8 mt-6">
                                {/* What you'll learn */}
                                <Card className="rounded-lg shadow-sm border-slate-200 dark:border-slate-800">
                                    <CardHeader>
                                        <CardTitle className="text-lg flex items-center gap-2">
                                            <CheckCircle2 className="h-5 w-5 text-green-600" />
                                            What you&apos;ll learn
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="grid sm:grid-cols-2 gap-x-4 gap-y-3">
                                            {course.features.length > 0 ? course.features.map((feature, idx) => (
                                                <div key={idx} className="flex items-start gap-2.5 text-sm">
                                                    <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5 shrink-0" />
                                                    <span className="text-muted-foreground leading-snug">{feature}</span>
                                                </div>
                                            )) : (
                                                <p className="text-muted-foreground text-sm">Comprehensive coverage of {course.title} fundamentals and advanced topics.</p>
                                            )}
                                        </div>
                                    </CardContent>
                                </Card>
                                
                                {/* Description */}
                                <div className="prose dark:prose-invert max-w-none text-sm text-muted-foreground">
                                    <h3 className="text-foreground font-bold text-lg mb-3">Description</h3>
                                    <p className="mb-4">
                                        Welcome to the <strong>{course.title}</strong>, a comprehensive text-based interactive course designed to take you from beginner to advanced. Whether you are a student, a working professional, or a hobbyist, this course provides a structured learning path with real-world examples.
                                    </p>
                                    <p className="mb-4">
                                        Unlike traditional video courses, our text-based approach allows you to read at your own speed, copy-paste code snippets directly, and review complex concepts without scrubbing through hours of video.
                                    </p>
                                    <h3 className="text-foreground font-bold text-lg mb-3 mt-6">Who this course is for:</h3>
                                    <ul className="list-disc pl-5 space-y-1">
                                        <li>Beginners who have never coded before.</li>
                                        <li>Programmers switching languages.</li>
                                        <li>Computer Science students preparing for exams or placements.</li>
                                    </ul>
                                </div>
                                
                                {/* Requirements */}
                                 <div>
                                    <h3 className="text-foreground font-bold text-lg mb-3">Requirements</h3>
                                    <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground">
                                        <li>Access to a computer with an internet connection.</li>
                                        <li>Basic understanding of file systems.</li>
                                        <li>No prior programming experience needed.</li>
                                    </ul>
                                </div>
                             </TabsContent>

                             {/* Curriculum Tab */}
                             <TabsContent value="curriculum" className="space-y-6 mt-6">
                                <div className="flex items-center justify-between">
                                    <h3 className="text-lg font-bold">Course Content</h3>
                                    <div className="text-xs text-muted-foreground font-medium bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded">
                                        {course.lessons || 60} lessons • {course.duration} total
                                    </div>
                                </div>

                                <Accordion type="single" collapsible className="w-full border rounded-lg border-slate-200 dark:border-slate-800">
                                    {course.syllabus.map((module, idx) => (
                                        <AccordionItem key={idx} value={`week-${module.week}`} className="px-4 bg-white dark:bg-black">
                                            <AccordionTrigger className="hover:no-underline py-4 group">
                                                <div className="flex flex-col items-start text-left gap-1">
                                                    <span className="font-semibold text-sm group-hover:text-primary transition-colors">{module.title}</span>
                                                    <span className="text-xs text-muted-foreground font-normal">{module.topics.length} topics • 2 exercises</span>
                                                </div>
                                            </AccordionTrigger>
                                            <AccordionContent className="pb-4 pt-1">
                                                <ul className="space-y-3">
                                                    {module.topics.map((topic, i) => (
                                                        <li key={i} className="flex items-start justify-between text-sm text-muted-foreground pl-2 border-l-2 border-slate-100 dark:border-slate-800 hover:border-primary transition-colors cursor-pointer py-1">
                                                            <div className="flex items-center gap-2 pl-2">
                                                                <BookOpen className="h-3.5 w-3.5" />
                                                                <span>{topic}</span>
                                                            </div>
                                                            <Button variant="ghost" size="sm" className="h-6 text-xs text-primary opacity-0 group-hover:opacity-100">
                                                                Read
                                                            </Button>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </AccordionContent>
                                        </AccordionItem>
                                    ))}
                                    {course.syllabus.length === 0 && (
                                        <div className="p-12 text-center">
                                            <AlertCircle className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
                                            <p className="text-sm text-muted-foreground">Full detailed syllabus is being finalized.</p>
                                        </div>
                                    )}
                                </Accordion>
                             </TabsContent>

                             {/* Instructor Tab */}
                             <TabsContent value="instructor" className="mt-6">
                                <Card className="border-slate-200 dark:border-slate-800">
                                    <CardContent className="p-6 sm:p-8">
                                        <div className="flex flex-col sm:flex-row gap-6">
                                            <Avatar className="h-24 w-24 border-2 border-slate-100">
                                                <AvatarImage src="/placeholder-rahul.jpg" />
                                                <AvatarFallback className="text-2xl bg-slate-100 text-slate-700">RS</AvatarFallback>
                                            </Avatar>
                                            <div className="space-y-3 flex-1">
                                                <div className="space-y-1">
                                                    <h3 className="text-xl font-bold">Rahul Sharma</h3>
                                                    <p className="text-primary font-medium text-sm">Senior Architect, Ex-Google</p>
                                                </div>
                                                <p className="text-sm text-muted-foreground leading-relaxed">
                                                    I&apos;ve spent the last decade building distributed systems at scale. My teaching philosophy is simple: break down complex concepts into everyday analogies. I write to help you understand &quot;why&quot; things work, not just &quot;how&quot;.
                                                </p>
                                                
                                                <div className="flex gap-4 pt-2">
                                                    <div className="flex flex-col">
                                                        <span className="font-bold text-lg">4.8</span>
                                                        <span className="text-xs text-muted-foreground uppercase tracking-wider">Rating</span>
                                                    </div>
                                                    <div className="flex flex-col">
                                                        <span className="font-bold text-lg">50k+</span>
                                                        <span className="text-xs text-muted-foreground uppercase tracking-wider">Students</span>
                                                    </div>
                                                    <div className="flex flex-col">
                                                        <span className="font-bold text-lg">12</span>
                                                        <span className="text-xs text-muted-foreground uppercase tracking-wider">Courses</span>
                                                    </div>
                                                </div>
                                                
                                                <div className="flex gap-2 pt-2">
                                                    <Button variant="outline" size="sm" className="h-8 w-8 p-0 rounded-full"><Linkedin className="h-4 w-4" /></Button>
                                                    <Button variant="outline" size="sm" className="h-8 w-8 p-0 rounded-full"><Twitter className="h-4 w-4" /></Button>
                                                    <Button variant="outline" size="sm" className="h-8 w-8 p-0 rounded-full"><Globe className="h-4 w-4" /></Button>
                                                </div>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                             </TabsContent>
                             
                             {/* Reviews Tab */}
                             <TabsContent value="reviews" className="mt-6">
                                 <Card className="border-0 shadow-none bg-slate-50 dark:bg-slate-900/50">
                                     <CardContent className="p-8 text-center space-y-4">
                                         <div className="mx-auto bg-slate-100 dark:bg-slate-800 rounded-full h-16 w-16 flex items-center justify-center">
                                             <MessageSquare className="h-8 w-8 text-muted-foreground" />
                                         </div>
                                         <div>
                                            <h3 className="font-semibold">Student Reviews Coming Soon</h3>
                                            <p className="text-sm text-muted-foreground max-w-sm mx-auto mt-2">
                                                Be the first to review this updated text-based course format!
                                            </p>
                                         </div>
                                     </CardContent>
                                 </Card>
                             </TabsContent>
                        </Tabs>

                        {/* FAQ Section (Always visible below tabs) */}
                        <div className="pt-8 border-t border-slate-200 dark:border-slate-800">
                             <h3 className="text-xl font-bold mb-6">Frequently Asked Questions</h3>
                             <Accordion type="single" collapsible className="w-full">
                                <AccordionItem value="item-1">
                                    <AccordionTrigger className="text-sm">Is this course really free?</AccordionTrigger>
                                    <AccordionContent className="text-muted-foreground text-sm">
                                        Yes! We believe in democratizing education. The full content is available for free.
                                    </AccordionContent>
                                </AccordionItem>
                                <AccordionItem value="item-2">
                                    <AccordionTrigger className="text-sm">Do I get a certificate?</AccordionTrigger>
                                    <AccordionContent className="text-muted-foreground text-sm">
                                        Yes, upon completing all chapters and the final assessment, you will be able to download a verified certificate.
                                    </AccordionContent>
                                </AccordionItem>
                                <AccordionItem value="item-3">
                                    <AccordionTrigger className="text-sm">Is there any video content?</AccordionTrigger>
                                    <AccordionContent className="text-muted-foreground text-sm">
                                        No. This is a text-based interactive course designed for active learning. It mimics the experience of reading a high-quality technical book, but with interactive elements.
                                    </AccordionContent>
                                </AccordionItem>
                             </Accordion>
                        </div>
                    </div>

                    {/* Sidebar (Right Col) - Desktop Only Sticky */}
                    <div className="lg:col-span-4 hidden lg:block">
                        <div className="sticky top-24 space-y-6">
                            <Card className="border-slate-200 dark:border-slate-800 shadow-lg overflow-hidden rounded-xl sticky top-24">
                                <CardContent className="p-5">
                                    <Button size="lg" className="w-full font-bold h-11 text-base shadow-indigo-500/20 shadow-sm hover:shadow-indigo-500/30 transition-all mb-3">
                                        Start Reading Now
                                    </Button>
                                    <Button variant="outline" size="lg" className="w-full h-11 font-medium bg-transparent border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors">
                                        Add to Library
                                    </Button>
                                </CardContent>
                                <div className="bg-slate-50 dark:bg-slate-900/50 p-6 text-center border-b border-slate-200 dark:border-slate-800">
                                    <div className="mx-auto bg-white dark:bg-black rounded-xl h-12 w-12 flex items-center justify-center shadow-sm">
                                        <BookOpen className="h-5 w-5 text-primary" />
                                    </div>
                                    <h3 className="font-bold text-foreground text-base tracking-tight">Interactive Text Course</h3>
                                    <p className="text-[10px] font-bold text-muted-foreground mt-1 uppercase tracking-widest">Practice at your own pace</p>
                                </div>
                            </Card>
                        </div>
                    </div>
                </div>

                {/* Mobile Sticky Bar (Bottom) */}
                <div className="fixed bottom-0 left-0 right-0 p-4 bg-background border-t border-slate-200 dark:border-slate-800 z-50 lg:hidden shadow-[0_-5px_20px_-5px_rgba(0,0,0,0.1)]">
                    <div className="flex items-center gap-4 max-w-7xl mx-auto">
                        <div className="hidden sm:block">
                             {/* Pricing removed */}
                        </div>
                        <Button className="w-full h-12 font-bold text-base shadow-md">
                            Start Reading Now
                        </Button>
                    </div>
                </div>

            </main>
            <Footer />
        </div>
    );
}
