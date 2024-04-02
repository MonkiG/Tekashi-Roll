import postgres from 'postgres'
import dotenvConfig from './dotenvConfig'
import { createClient } from '@supabase/supabase-js'

/* eslint-disable-next-line */
export const sql = postgres(dotenvConfig.DATABASE_CONNECTION_STRING!)
/* eslint-disable-next-line */
export const supabase = createClient(dotenvConfig.SUPABASE_URL!, dotenvConfig.SUPABASE_ANON_KEY!)
