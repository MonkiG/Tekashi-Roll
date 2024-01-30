'use server'
import { getSupabaseClient } from './getSupabaseClient'

export interface SignUpUserData {
  mail: string
  password: string
  name: string
  lastName: string
  phone: string
  [key: string]: string
}

export interface LogInUserData {
  password: string
  mail: string
  phone: string
}

export default async function signUpUser (sigUpUserData: SignUpUserData): Promise<void> {
  const supabase = getSupabaseClient()

  try {
    const data = await (await supabase).auth.signUp({ email: sigUpUserData.mail, password: sigUpUserData.password, phone: sigUpUserData.phone })
    console.log(data)
  } catch (e) {
    console.error(e)
  }
}

export async function loginUser (logInUserData: LogInUserData): Promise<void> {
  const supabase = getSupabaseClient()
  console.log(logInUserData)

  try {
    const data = await (await supabase).auth.signInWithPassword({ email: logInUserData.mail, password: logInUserData.password })
    console.log(data)
  } catch (error) {
    console.error(error)
  }
}
