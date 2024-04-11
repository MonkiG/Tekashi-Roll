import ClientViewHeader from '@/app/(client-view)/components/ClientViewHeader'
import Footer from '@/app/components/Footer'
import { getUserBySession } from '@/app/services/authServices'
import { getUserRoleBySession } from '@/app/services/userServices'
import { type User } from '@/app/types'
import { redirect } from 'next/navigation'
import Form from '../form.client'

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
    user.email = userQuery.email
  }

  return (
    <>
      <ClientViewHeader user={user as User | undefined}/>
       <section className='flex flex-col items-center'>
          <h2 className='uppercase text-center my-5'>
            informacion de cuenta
          </h2>
          <Form user={user}/>
       </section>
      <Footer/>
    </>
  )
}
