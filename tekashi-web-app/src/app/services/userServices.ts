import { getServerComponentClient } from '../helpers/supabaseHelpers'
import { getUserBySession } from './authServices'
import { type RoleData } from '../types'
import { type User } from '@supabase/supabase-js'
import { type AppRoles } from '../helpers/AppRoles'

export async function getUserRoleBySession (user?: User): Promise<AppRoles> {
  const supabase = getServerComponentClient()
  const userBySession = user ?? await getUserBySession(supabase)

  if (!userBySession) throw new Error('No user')
  const {
    data
  } = await supabase.from('users').select('role_id, roles(role_name)').eq('id', userBySession.id).single<RoleData>()

  return data?.roles.role_name as AppRoles
}
