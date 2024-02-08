import Header from '@/app/components/Header'
import Footer from '@/app/components/Footer'
import { getUserBySession } from '../services/authServices'
import { redirect } from 'next/navigation'

export default async function AuthLayout ({ children }: { children: React.ReactNode }): Promise<JSX.Element> {
  /** Agregar OAuth al login y signup */

  const user = await getUserBySession()
  if (user) redirect(`/user/${user.id}`)

  return (
        <section className="flex flex-col justify-between h-screen">
            <Header path='/auth' className="relative"/>
            <main className="flex flex-col justify-center items-center border-solid border-red-700 border-2 w-1/4 m-auto my-10 rounded-lg">
                {children}
            </main>
            <Footer className="p-3"/>
        </section>
  )
}
