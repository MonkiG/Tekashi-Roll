import { type UserSignUp, type UserLoginWithPasswordData, type AuthType } from '@/app/types'
import { type SupabaseClient } from '@supabase/supabase-js'

export async function logInUser (formData: UserLoginWithPasswordData, supabase: SupabaseClient): Promise<{ error: any, userId: string | undefined }> {
  if (!formData.email || !formData.password) throw new Error('No email or password supplied')

  const { data, error } = await supabase.auth.signInWithPassword({
    email: formData.email,
    password: formData.password

  })

  return {
    error,
    userId: data.user?.id
  }
}

export async function signUpUser (formData: UserSignUp, supabase: SupabaseClient): Promise<{ error: any, userId: string | undefined }> {
  const { email, password, ...restFormData } = formData
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: 'http://localhost:3000/auth/callback',
      data: {
        ...restFormData
      }
    }
  })

  return {
    error,
    userId: data.user?.id
  }
}
/* eslint-disable-next-line */
export default async function authHandlers (type: AuthType, formData: UserLoginWithPasswordData | UserSignUp, supabase: SupabaseClient): Promise<void | { error: any, userId: string | undefined }> {
  if (type === 'login') {
    const { userId, error } = await logInUser(formData, supabase)
    return {
      error,
      userId
    }
  }
  if (type === 'signup') { await signUpUser(formData as UserSignUp, supabase); return }

  throw new Error("Auth type don't allowed")
}
