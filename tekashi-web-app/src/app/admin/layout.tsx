import AdminHeader from './AdminHeader'

import { redirect } from 'next/navigation'
import { AppRoles } from '../helpers/AppRoles'
import { getServerComponentClient } from '../helpers/supabaseHelpers'
import { type UUID } from 'crypto'

interface RoleData {
  role_id: UUID
  roles: {
    role_name: string
  }
}

export default async function AdminLayout ({ children }: { children: React.ReactDOM }): Promise<JSX.Element> {
  const supabase = getServerComponentClient()

  const {
    data
  } = await supabase.from('users').select('role_id, roles(role_name)').single<RoleData>()

  if (!data) redirect('/auth/login')

  if (data.roles.role_name !== AppRoles.app_admin) {
    redirect('/')
  }
  return (
        <>
            <AdminHeader />
                {children}
        </>
  )
}
