import Header from '../components/Header'
import Footer from '../components/Footer'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'

export default async function MainRouteLayout ({ children }: { children: React.ReactDOM }): Promise<JSX.Element> {
  const supabase = createServerComponentClient({ cookies })
  const {
    data: { session }
  } = await supabase.auth.getSession()

  const userData = session?.user?.user_metadata
  return (
        <>
            <Header path='/' userData={userData && { userName: `${userData.name} ${userData.lastName}`, userId: session?.user.id }}/>
                {children}
            <Footer />
        </>
  )
}
