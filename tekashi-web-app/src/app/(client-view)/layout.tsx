import Header from '../components/Header'
import Footer from '../components/Footer'
import { getUserBySession } from '../services/authServices'
import { getUserRoleBySession } from '../services/userServices'

export default async function MainRouteLayout ({ children }: { children: React.ReactDOM }): Promise<JSX.Element> {
  const user = await getUserBySession()
  let userData

  /* hacer un getUserCredentials */
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
                {children}
            <Footer />
        </>
  )
}
