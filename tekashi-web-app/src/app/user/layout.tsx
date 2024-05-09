import ClientViewHeader from '../(client-view)/components/ClientViewHeader'
import Footer from '../components/Footer'
import { getUserBySession } from '@/app/services/authServices'
import { getUserRoleBySession } from '@/app/services/userServices'
import { type User } from '@/app/types'
import { redirect } from 'next/navigation'
import { type ReactNode } from 'react'
import { CartProvider } from '../(client-view)/CartContext'

export default async function UserLayout ({ children }: { children: ReactNode }): Promise<JSX.Element> {
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
    <CartProvider>
      <div className='min-h-screen flex flex-col md:justify-between'>
        <ClientViewHeader user={user as User | undefined}/>
            {children}
        <Footer/>
    </div>
    </CartProvider>
  )
}
