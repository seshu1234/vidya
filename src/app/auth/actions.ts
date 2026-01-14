
'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'


interface FormState {
  error?: string
  success?: string
  message?: string
}

export async function login(prevState: FormState | null, formData: FormData) {
  const supabase = await createClient()

  const email = formData.get('email') as string
  const password = formData.get('password') as string

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error) {
    return { error: error.message }
  }

  revalidatePath('/', 'layout')
  redirect('/dashboard') // Redirect to dashboard per requirements
}

export async function signup(prevState: FormState | null, formData: FormData) {
  const supabase = await createClient()

  const email = formData.get('email') as string
  const password = formData.get('password') as string
  const firstName = formData.get('first-name') as string
  const lastName = formData.get('last-name') as string

  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        first_name: firstName,
        last_name: lastName,
      },
    },
  })

  if (error) {
    return { error: error.message }
  }

  // Redirect to verify-otp or dashboard depending on config. 
  // For now, let's redirect to verify-otp with email as param
  revalidatePath('/', 'layout')
  redirect(`/auth/verify-otp?email=${encodeURIComponent(email)}`)
}

export async function loginWithProvider(provider: 'github' | 'google') {
    const supabase = await createClient()
    const { data } = await supabase.auth.signInWithOAuth({
        provider,
        options: {
            redirectTo: `${process.env.NEXT_PUBLIC_BASE_URL}/auth/callback`,
        },
    })
    
    if (data.url) {
        redirect(data.url)
    }
}


export async function verifyOtp(prevState: FormState | null, formData: FormData) {
  const supabase = await createClient()

  const email = formData.get('email') as string
  const token = formData.get('token') as string
  const type = (formData.get('type') as 'signup' | 'recovery' | 'magiclink') || 'signup'

  const { error } = await supabase.auth.verifyOtp({
    email,
    token,
    type,
  })

  if (error) {
    return { error: error.message }
  }

  revalidatePath('/', 'layout')
  redirect('/dashboard')
}

export async function forgotPassword(prevState: FormState | null, formData: FormData) {
  const supabase = await createClient()

  const email = formData.get('email') as string

  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${process.env.NEXT_PUBLIC_BASE_URL}/auth/callback?next=/account/reset-password`,
  })

  if (error) {
    return { error: error.message }
  }

  return { success: 'Check your email for the password reset link.' }
}


export async function logout() {
  const supabase = await createClient()
  await supabase.auth.signOut()
  revalidatePath('/', 'layout')
  redirect('/auth/login')
}
