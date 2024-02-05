import { type UserSignUp, type UserLoginWithPasswordData, type AuthType } from '@/app/types'
import { type SupabaseClient } from '@supabase/supabase-js'

export async function logInUser (formData: UserLoginWithPasswordData, supabase: SupabaseClient): Promise<void> {
  if (!formData.email || !formData.password) throw new Error('No email or password supplied')

  const { data, error } = await supabase.auth.signInWithPassword({
    email: formData.email,
    password: formData.password
  })

  console.log('Log in data: ', data)
  console.log('Log in error: ', error)
}

export async function signUpUser (formData: UserSignUp, supabase: SupabaseClient): Promise<void> {
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
  console.log('Signup data: ', data)
  console.log('Signup error: ', error)
}

export default async function authHandlers (type: AuthType, formData: UserLoginWithPasswordData | UserSignUp, supabase: SupabaseClient): Promise<void> {
  if (type === 'login') { await logInUser(formData, supabase); return }
  if (type === 'signup') { await signUpUser(formData as UserSignUp, supabase); return }

  throw new Error("Auth type don't allowed")
}
