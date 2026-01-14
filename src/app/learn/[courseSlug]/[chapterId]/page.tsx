import { getDBCourseBySlug } from "@/lib/course-service";
import { ChapterClient } from "./_components/chapter-client";
import { notFound } from "next/navigation";

export default async function ChapterPage({ params }: { params: Promise<{ courseSlug: string; chapterId: string }> }) {
    const { courseSlug, chapterId } = await params;
    const course = await getDBCourseBySlug(courseSlug);

    if (!course) {
        return notFound();
    }

    return (
        <ChapterClient 
            course={course} 
            chapterId={chapterId} 
            courseSlug={courseSlug} 
        />
    );
}
