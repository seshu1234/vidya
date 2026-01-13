"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect } from "react";
import { getCourseBySlug } from "@/lib/course-data";
import { slugify } from "@/components/learning-sidebar";
import { Navbar } from "@/components/navbar";

export default function LearnCourseIndex() {
    const params = useParams();
    const router = useRouter();
    const courseSlug = params.courseSlug as string;

    useEffect(() => {
        const course = getCourseBySlug(courseSlug);
        if (course && course.syllabus.length > 0 && course.syllabus[0].topics.length > 0) {
            // Redirect to first topic
            const firstTopic = course.syllabus[0].topics[0];
            router.replace(`/learn/${courseSlug}/${slugify(firstTopic)}`);
        }
    }, [courseSlug, router]);

    return (
        <>
        <Navbar />
        <div className="flex h-screen items-center justify-center">
            <div className="animate-pulse flex items-center gap-2 text-sm text-muted-foreground">
                Loading course content...
            </div>
        </div>
        </>
    );
}
