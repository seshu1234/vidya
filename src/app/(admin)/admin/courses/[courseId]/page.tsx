import { getCourse, getChapters } from "../actions";
import { CourseEditForm } from "../_components/course-edit-form";
import { ChapterList } from "../_components/chapters-list";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

interface CourseEditPageProps {
    params: Promise<{
        courseId: string
    }>
}

export default async function CourseEditPage({ params }: CourseEditPageProps) {
    const { courseId } = await params
    const course = await getCourse(courseId);
    const chapters = await getChapters(courseId);

    if (!course) {
        notFound();
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center gap-4">
                <Button variant="ghost" size="icon" asChild>
                    <Link href="/admin/courses">
                        <ArrowLeft className="h-4 w-4" />
                    </Link>
                </Button>
                <div>
                    <h1 className="text-2xl font-bold font-display text-navy-900 dark:text-white">
                        Edit Course
                    </h1>
                    <p className="text-slate-500 text-sm">
                        {course.title}
                    </p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="space-y-6">
                    <CourseEditForm course={course} />
                </div>
                <div className="space-y-6">
                     <ChapterList courseId={course.id} chapters={chapters} />
                </div>
            </div>
        </div>
    );
}
