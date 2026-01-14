
import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value)
          )
          supabaseResponse = NextResponse.next({
            request,
          })
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          )
        },
      },
    }
  )

  // refreshing the auth token
  const {
    data: { user },
  } = await supabase.auth.getUser()

  const url = request.nextUrl.clone()

  // Protected Routes
  if (url.pathname.startsWith('/dashboard')) {
      if (!user) {
          url.pathname = '/auth/login'
          return NextResponse.redirect(url)
      }
      
      const roles = user.app_metadata?.roles || []
      // Allow if 'user' role is present (or admin/super admin implicitly? User request said /dashboard only for "user" role)
      // Usually admins can also access dashboard, but let's stick to strict requirement first or assume "user" is a base role everyone has.
      // Migration sets default to ['user'], so admins should also have ['user', 'admin'] ideally.
      // But if we have separate roles, we check specific inclusion.
      if (!roles.includes('user') && !roles.includes('admin') && !roles.includes('super_admin')) {
          // If they don't have the role, maybe redirect to home or unauthorized
          url.pathname = '/' // or /unauthorized
          return NextResponse.redirect(url)
      }
  }

  if (url.pathname.startsWith('/admin')) {
      if (!user) {
          url.pathname = '/auth/login'
          return NextResponse.redirect(url)
      }
      
      const roles = user.app_metadata?.roles || []
      const hasAdminAccess = roles.includes('admin') || roles.includes('super_admin')
      
      if (!hasAdminAccess) {
          url.pathname = '/dashboard' // Redirect regular users to dashboard
          return NextResponse.redirect(url)
      }
  }

  // Auth Routes (Redirect logged in users away from login/register)
  if (url.pathname.startsWith('/auth')) {
      if (user) {
          // If user is already logged in, redirect to dashboard or home
          // But allow /auth/logout or /auth/callback
          if (!url.pathname.includes('/logout') && !url.pathname.includes('/callback')) {
               url.pathname = '/dashboard'
               return NextResponse.redirect(url)
          }
      }
  }

  return supabaseResponse
}
