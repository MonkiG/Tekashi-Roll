import { type UUID } from 'crypto'
import Footer from '../components/Footer'
import { getUserBySession } from '../services/authServices'
import { getUserRoleBySession } from '../services/userServices'
import { type User } from '../types'
import { CartProvider } from './CartContext'
import ClientViewHeader from './components/ClientViewHeader'

export default async function MainRouteLayout ({ children }: { children: React.ReactNode }): Promise<JSX.Element> {
  const userQuery = await getUserBySession()
  let user: User | undefined

  /* hacer un getUserCredentials */
  if (userQuery) {
    const userRole = await getUserRoleBySession(userQuery)
    user = userQuery.user_metadata as User
    user.id = userQuery.id as UUID
    user.role = userRole
  }
  return (
    <main className='min-h-screen flex flex-col md:justify-between'>
      <CartProvider>

         <ClientViewHeader user={user}/>
            {children}
          <Footer className='pb-0' />

      </CartProvider>
    </main>
  )
}
