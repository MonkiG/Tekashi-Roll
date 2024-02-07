import { getServerComponentClient } from '../helpers/supabaseHelpers'
import { type Session, type User } from '@supabase/supabase-js'

export async function getAuthSession (): Promise<Session | null> {
  const supabase = getServerComponentClient()

  const {
    data: { session }
  } = await supabase.auth.getSession()

  return session
}

export async function getUserBySession (): Promise<User | undefined> {
  const session = await getAuthSession()

  return session?.user
}
