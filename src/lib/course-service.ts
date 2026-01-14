
import { createAdminClient } from '@/lib/supabase/server';
import { Course } from '@/types/course';

export async function getDBCourses(includeHidden = false) {
    const supabase = await createAdminClient();
    let query = supabase
        .schema('vidya')
        .from('courses')
        .select('*')
        .order('id');
    
    if (!includeHidden) {
        query = query.neq('type', 'tool');
    }

    const { data, error } = await query;
    
    if (error) throw error;
    
    // Map DB fields to the expected Course type if necessary
    return (data || []).map(course => ({
        ...course,
        syllabus: course.metadata?.syllabus || [],
        features: course.metadata?.features || [],
        level: course.metadata?.level || 'Beginner',
        duration: course.metadata?.duration || '0 Weeks',
        lessons: course.metadata?.lessons || 0,
        rating: course.metadata?.rating || 4.5,
        students: course.metadata?.students || 0,
        subtitle: course.metadata?.subtitle || '',
        price: course.price > 0 ? `₹${course.price}` : 'Free'
    })) as Course[];
}

export async function getDBCourseBySlug(slug: string) {
    const supabase = await createAdminClient();
    const { data, error } = await supabase
        .schema('vidya')
        .from('courses')
        .select(`
            *,
            chapters (*)
        `)
        .eq('slug', slug)
        .single();
    
    if (error) return null;

    // Construct syllabus from chapters or metadata
    const syllabus = data.metadata?.syllabus || [];

    return {
        ...data,
        syllabus: syllabus,
        chaptersByPosition: data.chapters?.sort((a: { position: number }, b: { position: number }) => a.position - b.position),
        features: data.metadata?.features || [],
        level: data.metadata?.level || 'Beginner',
        duration: data.metadata?.duration || '0 Weeks',
        lessons: data.metadata?.lessons || 0,
        rating: data.metadata?.rating || 4.5,
        students: data.metadata?.students || 0,
        subtitle: data.metadata?.subtitle || '',
        price: data.price > 0 ? `₹${data.price}` : 'Free'
    };
}

export async function getDBCategories() {
    const supabase = await createAdminClient();
    const { data, error } = await supabase
        .schema('vidya')
        .from('categories')
        .select('*')
        .order('name');
    
    if (error) throw error;
    return data;
}

export async function getDBCoursesByCategory(categoryName: string) {
    const courses = await getDBCourses();
    return courses.filter(c => c.category.toLowerCase() === categoryName.toLowerCase());
}

export async function getDBTools() {
    const supabase = await createAdminClient();
    const { data, error } = await supabase
        .schema('vidya')
        .from('tools')
        .select(`
            *,
            course:courses (
                slug
            )
        `)
        .order('name');

    if (error) {
        console.error("Error fetching tools:", error);
        return [];
    }

    return data;
}
