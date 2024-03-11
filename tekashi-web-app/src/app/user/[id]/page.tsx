import Footer from '@/app/components/Footer'
import Header from '@/app/components/Header'
import { getUserBySession } from '@/app/services/authServices'
import { getUserRoleBySession } from '@/app/services/userServices'
import { redirect } from 'next/navigation'

export default async function UserId ({ params }: { params: { id: string } }): Promise<JSX.Element> {
  const user = await getUserBySession()
  let userData

  /* hacer un getUserCredentials */

  if (!user) redirect('/')
  if (user) {
    const userRole = await getUserRoleBySession(user)
    userData = user.user_metadata
    userData.userId = user.id
    userData.userRole = userRole
  }

  return (
    <>
      <Header
      path='/'
      userData={
          (userData) &&
        {
          userName: `${userData.name} ${userData.lastName}`,
          userId: userData.id,
          userRole: userData.userRole
        }
      }/>
        <h2 className='uppercase'>
          informacion de cuenta
        </h2>

      <Footer />
    </>
  )
}
