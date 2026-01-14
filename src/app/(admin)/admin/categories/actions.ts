'use server'

import { createAdminClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'

export async function getCategories(search?: string) {
  const supabase = await createAdminClient()
  let query = supabase.schema('vidya').from('categories').select('*').order('name', { ascending: true })

  if (search) {
    query = query.or(`name.ilike.%${search}%,slug.ilike.%${search}%`)
  }

  const { data, error } = await query

  if (error) throw new Error(error.message)
  return data
}

export async function createCategory(data: { name: string; slug: string; description?: string }) {
  const supabase = await createAdminClient()
  
  const { data: category, error } = await supabase
    .schema('vidya')
    .from('categories')
    .insert([data])
    .select()
    .single()

  if (error) {
    if (error.code === '23505') {
       return { error: 'A category with this name or slug already exists.' }
    }
    return { error: error.message }
  }

  revalidatePath('/admin/categories')
  return { data: category }
}

export async function updateCategory(id: string, data: Record<string, unknown>) {
  const supabase = await createAdminClient()
  
  const { error } = await supabase
    .schema('vidya')
    .from('categories')
    .update(data)
    .eq('id', id)

  if (error) throw new Error(error.message)
  
  revalidatePath('/admin/categories')
}

export async function deleteCategory(id: string) {
  const supabase = await createAdminClient()
  
  const { error } = await supabase
    .schema('vidya')
    .from('categories')
    .delete()
    .eq('id', id)

  if (error) throw new Error(error.message)
  
  revalidatePath('/admin/categories')
}
