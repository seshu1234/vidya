import { redirect } from "next/navigation";
import { getDBCourseBySlug } from "@/lib/course-service";
import { slugify } from "@/components/learning-sidebar";
import { Navbar } from "@/components/navbar";

export default async function LearnCourseIndex({ params }: { params: Promise<{ courseSlug: string }> }) {
    const { courseSlug } = await params;
    const course = await getDBCourseBySlug(courseSlug);
    
    if (course && course.syllabus?.length > 0 && course.syllabus[0].topics?.length > 0) {
        // Redirect to first topic
        const firstTopic = course.syllabus[0].topics[0];
        redirect(`/learn/${courseSlug}/${slugify(firstTopic)}`);
    }

    return (
        <>
            <Navbar />
            <div className="flex h-screen items-center justify-center">
                <div className="flex flex-col items-center gap-4">
                    <div className="animate-pulse flex items-center gap-2 text-sm text-muted-foreground">
                        Loading course content...
                    </div>
                </div>
            </div>
        </>
    );
}
