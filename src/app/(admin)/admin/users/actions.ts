
'use server'

import { createAdminClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'

const PAGE_SIZE_DEFAULT = 10;

export async function getUsers(
  search?: string,
  page: number = 1,
  pageSize: number = PAGE_SIZE_DEFAULT,
  sortColumn: string = 'created_at',
  sortDirection: 'asc' | 'desc' = 'desc',
  roleFilter?: string
) {
  const supabase = await createAdminClient()
  
  let query = supabase
    .schema('vidya')
    .from('profiles')
    .select('*', { count: 'exact' })

  if (search) {
    query = query.or(`full_name.ilike.%${search}%,email.ilike.%${search}%`)
  }

  if (roleFilter && roleFilter !== 'all') {
    query = query.contains('role', [roleFilter])
  }

  const from = (page - 1) * pageSize
  const to = from + pageSize - 1

  query = query
    .order(sortColumn, { ascending: sortDirection === 'asc' })
    .range(from, to)

  const { data, error, count } = await query
  console.log("getUsers result:", { dataLength: data?.length, count, error });

  if (error) throw new Error(error.message)
  
  return {
    data: data,
    total: count || 0
  }
}

export async function updateUserRole(userId: string, roles: string[]) {
  const supabase = await createAdminClient()

  // Verify current user is admin
  // (RLS policies should handle this, but good to check)
  
  const { error } = await supabase
    .schema('vidya')
    .from('profiles')
    .update({ role: roles })
    .eq('id', userId)

  if (error) throw new Error(error.message)
  revalidatePath('/admin/users')
}

export async function deleteUser(userId: string) {
  const supabase = await createAdminClient()
  
  const { error } = await supabase.rpc('delete_user_by_admin', { target_user_id: userId })

  if (error) throw new Error(error.message)
  revalidatePath('/admin/users')
}

export async function updateUserDetails(userId: string, data: { full_name?: string; email?: string }) {
  const supabase = await createAdminClient()
  
  const { error } = await supabase
    .schema('vidya')
    .from('profiles')
    .update(data)
    .eq('id', userId)

  if (error) throw new Error(error.message)
  revalidatePath('/admin/users')
}
