import { notFound } from "next/navigation";
import { getDBCourseBySlug } from "@/lib/course-service";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
    Breadcrumb, 
    BreadcrumbItem, 
    BreadcrumbLink, 
    BreadcrumbList, 
    BreadcrumbPage,
    BreadcrumbSeparator
} from "@/components/ui/breadcrumb";
import { Star, Users, Clock, BookOpen, CheckCircle2, Globe } from "lucide-react";
import Link from "next/link";

export default async function CourseDetailPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const course = await getDBCourseBySlug(slug);

    if (!course) {
        return notFound();
    }

    return (
        <div className="flex min-h-screen flex-col bg-background font-sans">
            <Navbar />
            
            <main className="flex-1 container max-w-7xl mx-auto px-4 py-6 md:py-10 pb-24 lg:pb-10">
                
                 {/* Mobile Breadcrumb */}
                 <div className="mb-6">
                    <Breadcrumb>
                        <BreadcrumbList className="text-xs sm:text-sm">
                            <BreadcrumbItem>
                                <BreadcrumbLink href="/courses">Courses</BreadcrumbLink>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator />
                            <BreadcrumbItem>
                                <BreadcrumbLink href={`/courses/${course.category?.toLowerCase()}`} className="capitalize">
                                    {course.category?.replace("-", " ")}
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
                                    <span>{course.students?.toLocaleString()} enrolled</span>
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

                            <div className="flex flex-col sm:flex-row gap-4 pt-6">
                                <Link href={`/learn/${course.slug}`}>
                                    <Button size="lg" className="w-full sm:w-auto font-bold px-8 h-12 text-base bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg shadow-indigo-500/20 transition-all">
                                        Start Learning Now
                                    </Button>
                                </Link>
                                <Button size="lg" variant="outline" className="w-full sm:w-auto font-bold px-8 h-12 text-base border-slate-200 dark:border-slate-800">
                                    Watch Trailer
                                </Button>
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
                                <Card className="rounded-lg shadow-sm border-slate-200 dark:border-slate-800">
                                    <CardHeader>
                                        <CardTitle className="text-lg flex items-center gap-2">
                                            <CheckCircle2 className="h-5 w-5 text-green-600" />
                                            What you&apos;ll learn
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="grid sm:grid-cols-2 gap-x-4 gap-y-3">
                                            {course.features?.length > 0 ? course.features.map((feature: string, idx: number) => (
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
                             </TabsContent>

                             {/* Curriculum Tab */}
                             <TabsContent value="curriculum" className="space-y-6 mt-6">
                                <Accordion type="single" collapsible className="w-full border rounded-lg border-slate-200 dark:border-slate-800">
                                    {course.syllabus?.map((module: { week: number; title: string; topics: string[] }, idx: number) => (
                                        <AccordionItem key={idx} value={`week-${module.week}`} className="px-4 bg-white dark:bg-black">
                                            <AccordionTrigger className="hover:no-underline py-4 group">
                                                <div className="flex flex-col items-start text-left gap-1">
                                                    <span className="font-semibold text-sm group-hover:text-primary transition-colors">{module.title}</span>
                                                    <span className="text-xs text-muted-foreground font-normal">{module.topics?.length} topics</span>
                                                </div>
                                            </AccordionTrigger>
                                            <AccordionContent className="pb-4 pt-1">
                                                <ul className="space-y-3">
                                                    {module.topics?.map((topic: string, i: number) => (
                                                        <li key={i} className="flex items-start justify-between text-sm text-muted-foreground pl-2 border-l-2 border-slate-100 dark:border-slate-800 hover:border-primary transition-colors cursor-pointer py-1">
                                                            <div className="flex items-center gap-2 pl-2">
                                                                <BookOpen className="h-3.5 w-3.5" />
                                                                <span>{topic}</span>
                                                            </div>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </AccordionContent>
                                        </AccordionItem>
                                    ))}
                                </Accordion>
                             </TabsContent>
                        </Tabs>
                    </div>

                    {/* Sidebar */}
                    <div className="lg:col-span-4 hidden lg:block">
                        <div className="sticky top-24 space-y-6">
                            <Card className="border-slate-200 dark:border-slate-800 shadow-lg overflow-hidden rounded-xl">
                                <CardContent className="p-5">
                                    <Link href={`/learn/${course.slug}`}>
                                        <Button size="lg" className="w-full font-bold h-11 text-base shadow-indigo-500/20 shadow-sm hover:shadow-indigo-500/30 transition-all mb-3">
                                            Start Reading Now
                                        </Button>
                                    </Link>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}
