import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";
import { BookOpen } from "lucide-react";
import { getDBCourses, getDBCategories } from "@/lib/course-service";

export async function CourseGrid() {
  const allCourses = await getDBCourses();
  const dbCategories = await getDBCategories();
  
  const categories = dbCategories.map(c => c.name);

  // Group courses by category for tabs
  const getCourses = (category: string) => {
    return allCourses.filter((c) => c.category === category);
  };

  return (
    <section className="max-w-7xl mx-auto py-12 lg:py-24 bg-slate-50 dark:bg-black/20" id="courses">
      <div className="mx-auto flex flex-col items-center justify-center gap-4 text-center">
        <h2 className="scroll-m-20 text-3xl font-extrabold tracking-tight md:text-4xl lg:text-5xl text-navy-900 dark:text-white">
          University Course Catalog
        </h2>
        <p className="max-w-[85%] leading-7 [&:not(:first-child)]:mt-6 text-muted-foreground text-base sm:text-lg mb-8">
          A comprehensive library of 50+ courses. From Programming Fundamentals to Advanced AI.
          <br className="hidden sm:block"/>
          Everything you need to master Computer Science.
        </p>

        <Tabs defaultValue={categories[0]} className="w-full">
                <TabsList className="flex flex-wrap h-auto gap-2 bg-transparent p-0 mb-12 justify-center">
                    {categories.map((category) => (
                        <TabsTrigger 
                            key={category} 
                            value={category}
                            className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 px-6 py-2.5 rounded-full data-[state=active]:bg-black data-[state=active]:text-white 
                            data-[state=active]:border-black dark:data-[state=active]:bg-white dark:data-[state=active]:text-black transition-all shadow-sm text-slate-600 dark:text-slate-400"
                        >
                            {category}
                        </TabsTrigger>
                    ))}
                </TabsList>

                {categories.map((category) => (
                    <TabsContent key={category} value={category}>
                         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                            {getCourses(category).map((course, index) => (
                                <Link href={`/courses/${course.category.toLowerCase().replace(/ & /g, '-').replace(/ /g, '-')}/${course.slug}`} key={index}>
                                    <div className="group relative h-full bg-white dark:bg-black border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                                        <div className="p-6 flex flex-col h-full">
                                            <div className="flex justify-between items-start mb-4">
                                                <Badge variant="secondary" className="bg-slate-100 text-slate-700 dark:bg-slate-900 dark:text-slate-300 font-medium text-xs">
                                                    {course.category}
                                                </Badge>
                                                <span className="text-xs font-semibold text-slate-400 border border-slate-200 dark:border-slate-800 px-2 py-0.5 rounded">
                                                    {course.level}
                                                </span>
                                            </div>
                                            
                                            <h3 className="text-lg font-bold text-black dark:text-white line-clamp-2 leading-tight group-hover:text-slate-600 dark:group-hover:text-slate-300 transition-colors">
                                                {course.title}
                                            </h3>
                                            <p className="text-sm text-slate-500 mt-2 mb-4 line-clamp-2">
                                                {course.subtitle}
                                            </p>
                                            
                                            <div className="mt-auto pt-4 border-t border-slate-100 dark:border-slate-900">
                                               <div className="flex items-center justify-between text-xs text-slate-500 font-medium mb-4">
                                                    <span className="flex items-center gap-1"><BookOpen className="h-3.5 w-3.5" /> {course.lessons} Lessons</span>
                                                </div>
                                                <Button className="w-full h-10 bg-black hover:bg-slate-800 text-white dark:bg-white dark:text-black dark:hover:bg-slate-200 border border-transparent font-semibold transition-all duration-300">
                                                    View Course
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                         {getCourses(category).length === 0 && (
                            <div className="text-center py-12 text-muted-foreground">
                                No courses found in this category.
                            </div>
                        )}
                         <div className="mt-16 text-center">
                            <Button variant="outline" size="lg" className="h-12 px-8 border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-900">
                                <Link href="/courses">View Full Catalog</Link>
                            </Button>
                        </div>
                    </TabsContent>
                ))}
        </Tabs>
      </div>
    </section>
  );
}
