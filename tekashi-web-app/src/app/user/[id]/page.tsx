import { getUserBySession } from '@/app/services/authServices'
import Form from '../form.client'
import { redirect } from 'next/navigation'
import { getUserRoleBySession } from '@/app/services/userServices'

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
    user.email = userQuery.email
  }
  return (
    <section className='flex flex-col items-center'>
      <h2 className='uppercase text-center my-5'>
        informacion de cuenta
      </h2>
      <Form user={user}/>
    </section>
  )
}
