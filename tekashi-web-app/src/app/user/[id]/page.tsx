import ClientViewHeader from '@/app/(client-view)/components/ClientViewHeader'
import Footer from '@/app/components/Footer'
import { getUserBySession } from '@/app/services/authServices'
import { getUserRoleBySession } from '@/app/services/userServices'
import { type User } from '@/app/types'
import { redirect } from 'next/navigation'

export default async function UserId ({ params }: { params: { id: string } }): Promise<JSX.Element> {
  const userQuery = await getUserBySession()
  let user

  /* hacer un getUserCredentials */

  if (!userQuery) redirect('/')
  if (userQuery) {
    const userRole = await getUserRoleBySession(userQuery)
    user = userQuery.user_metadata
    user.id = userQuery.id
    user.role = userRole
  }

  return (
    <>
      <ClientViewHeader user={user as User | undefined}/>
        <h2 className='uppercase'>
          informacion de cuenta
        </h2>

      <Footer />
    </>
  )
}
