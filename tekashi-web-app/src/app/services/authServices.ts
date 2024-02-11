import { getServerComponentClient } from '../helpers/supabaseHelpers'
import { type SupabaseClient, type Session, type User } from '@supabase/supabase-js'

export async function getAuthSession (client?: SupabaseClient): Promise<Session | null> {
  const supabase = client ?? getServerComponentClient()

  const {
    data: { session }
  } = await supabase.auth.getSession()

  return session
}

export async function getUserBySession (client?: SupabaseClient): Promise<User | undefined> {
  const session = await getAuthSession(client)

  return session?.user
}
