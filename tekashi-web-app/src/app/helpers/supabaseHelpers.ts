import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { type SupabaseClient } from '@supabase/supabase-js'
import dotenvConfig from './dotenvConfig'

export function getServerComponentClient (): SupabaseClient {
  const supabase = createServerComponentClient({
    cookies
  }, {
    supabaseKey: dotenvConfig.SUPABASE_ANON_KEY,
    supabaseUrl: dotenvConfig.SUPABASE_URL
  })

  return supabase
}
