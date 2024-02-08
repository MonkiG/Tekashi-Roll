import { getServerComponentClient } from '../helpers/supabaseHelpers'
import { getUserBySession } from './authServices'
import { type RoleData } from '../types'

export async function getUserRoleBySession (): Promise<string | null> {
  const supabase = getServerComponentClient()
  const user = await getUserBySession()

  if (!user) return null

  const {
    data
  } = await supabase.from('users').select('role_id, roles(role_name)').eq('id', user.id).single<RoleData>()

  return data ? data.roles.role_name : null
}
