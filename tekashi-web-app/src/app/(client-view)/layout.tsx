import Header from '../components/Header'
import Footer from '../components/Footer'
import { getUserBySession } from '../services/authServices'

export default async function MainRouteLayout ({ children }: { children: React.ReactDOM }): Promise<JSX.Element> {
  const user = await getUserBySession()

  const userData = user?.user_metadata
  return (
        <>
            <Header
              path='/'
              userData={
                  userData &&
                 {
                   userName: `${userData.name} ${userData.lastName}`,
                   userId: userData.id
                 }
            }/>
                {children}
            <Footer />
        </>
  )
}
