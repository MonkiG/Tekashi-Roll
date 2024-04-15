import Footer from '../components/Footer'
import { getUserBySession } from '../services/authServices'
import { getUserRoleBySession } from '../services/userServices'
import { type User } from '../types'
import { CartProvider } from './CartContext'
import ClientViewHeader from './components/ClientViewHeader'

export default async function MainRouteLayout ({ children }: { children: React.ReactNode }): Promise<JSX.Element> {
  const userQuery = await getUserBySession()
  let user

  /* hacer un getUserCredentials */
  if (userQuery) {
    const userRole = await getUserRoleBySession(userQuery)
    user = userQuery.user_metadata
    user.id = userQuery.id
    user.role = userRole
  }
  return (
    <main className='min-h-screen flex flex-col justify-between'>
      <CartProvider>

        <ClientViewHeader user={user as User | undefined} />
            {children}
          <Footer className='pb-0' />

      </CartProvider>
    </main>
  )
}
