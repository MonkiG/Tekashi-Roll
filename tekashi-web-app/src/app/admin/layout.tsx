import AdminHeader from './AdminHeader'

import { redirect } from 'next/navigation'
import { AppRoles } from '../helpers/AppRoles'
import { getUserRoleBySession } from '../services/userServices'

export default async function AdminLayout ({ children }: { children: React.ReactNode }): Promise<JSX.Element> {
  const userRole = await getUserRoleBySession()

  if (!userRole) redirect('/auth/login')

  if (userRole !== AppRoles.app_admin) {
    redirect('/')
  }

  return (
        <>
          <AdminHeader />
          <main className="h-full my-10 mx-14">
            {children}
          </main>
        </>
  )
}
