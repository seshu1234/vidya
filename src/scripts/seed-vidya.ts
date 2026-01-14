
import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import path from 'path';
import { courses } from '../lib/course-data'; // Import real data

// Load env from .env.local
dotenv.config({ path: path.resolve(__dirname, '../../.env.local') });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
// Prefer Service Role Key for seeding to bypass RLS
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
    console.error("Missing Supabase URL or Key in .env.local");
    console.error("Ensure SUPABASE_SERVICE_ROLE_KEY is set for seeding!");
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey, {
    db: { schema: 'vidya' }
});

async function seed() {
    console.log("🌱 Starting Seed with Real Data...");

    if (!process.env.SUPABASE_SERVICE_ROLE_KEY) {
        console.warn("⚠️  WARNING: Using ANON KEY. This might fail if RLS policies block inserts. Please add SUPABASE_SERVICE_ROLE_KEY to .env.local");
    }

    for (const course of courses) {
        console.log(`Processing Course: ${course.title} (${course.slug})`);

        // 1. Upsert Course
        const { data: courseData, error: courseError } = await supabase
            .from('courses')
            .upsert({
                slug: course.slug,
                title: course.title,
                description: course.description,
                category: course.category,
                price: course.price === "Free" ? 0 : 99, // Simple parsing
                is_published: true,
                metadata: {
                    level: course.level,
                    duration: course.duration,
                    rating: course.rating,
                    features: course.features,
                    subtitle: course.subtitle
                }
            }, { onConflict: 'slug' })
            .select()
            .single();

        if (courseError) {
            console.error(`Error inserting course ${course.title}:`, courseError.message);
            continue;
        }

        const courseId = courseData.id;

        // 2. Upsert Chapters (Syllabus)
        if (course.syllabus) {
            for (const week of course.syllabus) {
                // Generate a slug if missing
                const chapterSlug = week.title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
                
                // Construct content from topic map or default
                let content = week.content 
                    ? Object.values(week.content).join("\n\n---\n\n")
                    : `# ${week.title}\n\nTopics:\n${week.topics.map(t => `- ${t}`).join('\n')}`;

                const { error: chapterError } = await supabase
                    .from('chapters')
                    .upsert({
                        course_id: courseId,
                        slug: chapterSlug,
                        title: week.title,
                        content: content,
                        order_index: week.week,
                        is_free: week.week === 1
                    }, { onConflict: 'course_id, slug' });

                if (chapterError) {
                    console.error(`Error inserting chapter ${week.title}:`, chapterError.message);
                }
            }
        }
    }

    console.log("✅ Seeding Complete!");
}

seed();
