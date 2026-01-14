'use server'

import { createAdminClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export async function getCourses(search?: string) {
  const supabase = await createAdminClient()
  let query = supabase.schema('vidya').from('courses').select('*, type').order('created_at', { ascending: false })

  if (search) {
    query = query.or(`title.ilike.%${search}%,slug.ilike.%${search}%`)
  }

  const { data, error } = await query

  if (error) throw new Error(error.message)
  return data
}

export async function getCourse(id: string) {
  const supabase = await createAdminClient()
  const { data, error } = await supabase.schema('vidya').from('courses').select('*').eq('id', id).single()

  if (error) return null
  return data
}

export async function createCourse(formData: FormData) {
  const supabase = await createAdminClient()
  
  const title = formData.get('title') as string
  const type = (formData.get('type') as string) || 'course'
  const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')

  const { data, error } = await supabase
    .schema('vidya')
    .from('courses')
    .insert({ 
        title, 
        slug,
        type,
        is_published: false 
    })
    .select()
    .single()

  if (error) {
      if(error.code === '23505') { // Unique violation for slug
           return { error: 'A course with this title already exists.' }
      }
      return { error: error.message }
  }

  revalidatePath('/admin/courses')
  redirect(`/admin/courses/${data.id}`)
}

export async function deleteCourse(courseId: string) {
    const supabase = await createAdminClient()
    const { error } = await supabase
        .schema('vidya')
        .from('courses')
        .delete()
        .eq('id', courseId)
    
    if (error) throw new Error(error.message)
    revalidatePath('/admin/courses')
}

export async function togglePublishStatus(courseId: string, currentStatus: boolean) {
    const supabase = await createAdminClient()
    const { error } = await supabase
        .schema('vidya')
        .from('courses')
        .update({ is_published: !currentStatus })
        .eq('id', courseId)

    if (error) throw new Error(error.message)
    revalidatePath('/admin/courses')
}

// Chapter Actions

export async function createChapter(courseId: string, title: string) {
    const supabase = await createAdminClient()

  // Get max position
  const { data: maxPosData } = await supabase
      .schema('vidya')
      .from('chapters')
      .select('position')
      .eq('course_id', courseId)
      .order('position', { ascending: false })
      .limit(1)
      .single()

  const newPosition = (maxPosData?.position || 0) + 1;
  const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') + '-' + Math.random().toString(36).substring(7);

  const { data, error } = await supabase
      .schema('vidya')
      .from('chapters')
      .insert({
          course_id: courseId,
          title,
          slug,
          position: newPosition,
          is_published: false,
          is_free: false
      })
      .select()
      .single()

  if (error) throw new Error(error.message)
  revalidatePath(`/admin/courses/${courseId}`)
  return data
}

export async function reorderChapters(list: { id: string; position: number }[], courseId: string) {
  const supabase = await createAdminClient()

  const promises = list.map(item => 
       supabase.schema('vidya').from('chapters').update({ position: item.position }).eq('id', item.id)
  )

  await Promise.all(promises);

  revalidatePath(`/admin/courses/${courseId}`)
}

export async function deleteChapter(chapterId: string, courseId: string) {
  const supabase = await createAdminClient()
  const { error } = await supabase
      .schema('vidya')
      .from('chapters')
      .delete()
      .eq('id', chapterId)

  if (error) throw new Error(error.message)
  revalidatePath(`/admin/courses/${courseId}`)
}

export async function getChapters(courseId: string) {
  const supabase = await createAdminClient()
  const { data, error } = await supabase
      .schema('vidya')
      .from('chapters')
      .select('*')
      .eq('course_id', courseId)
      .order('position', { ascending: true })

  if (error) throw new Error(error.message)
  return data
}

export async function updateCourse(courseId: string, data: Record<string, unknown>) {
    const supabase = await createAdminClient()
    const { error } = await supabase
        .schema('vidya')
        .from('courses')
        .update(data)
        .eq('id', courseId)

    if (error) throw new Error(error.message)
    revalidatePath('/admin/courses')
    revalidatePath(`/admin/courses/${courseId}`)
}
