import { getDBCourses, getDBCategories } from "@/lib/course-service";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { CourseGridContainer } from "./_components/course-grid-container";

export default async function CoursesPage() {
    const courses = await getDBCourses();
    const dbCategories = await getDBCategories();
    const categories = dbCategories.map(c => c.name);

    return (
        <div className="flex min-h-screen flex-col bg-slate-50 dark:bg-black">
            <Navbar />
            
            <main className="flex-1 pb-24">
                {/* Header */}
                <div className="bg-black text-white py-16 px-6 pt-24">
                    <div className="max-w-7xl mx-auto text-center space-y-6">
                        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">
                            Explore Our Catalog
                        </h1>
                        <p className="text-lg text-slate-400 max-w-2xl mx-auto">
                           Master the skills of tomorrow. From AI to Full Stack Development, find the perfect course for your career.
                        </p>
                    </div>
                </div>

                <div className="max-w-7xl mx-auto px-6 mt-12">
                    <CourseGridContainer initialCourses={courses} categories={categories} />
                </div>
            </main>
            <Footer />
        </div>
    );
}
