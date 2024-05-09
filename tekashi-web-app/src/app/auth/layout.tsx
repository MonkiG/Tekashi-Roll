import Footer from '@/app/components/Footer'
import { getUserBySession } from '../services/authServices'
import { redirect } from 'next/navigation'
import AuthHeader from './components/AuthHeader'

export default async function AuthLayout ({ children }: { children: React.ReactNode }): Promise<JSX.Element> {
  /** Agregar OAuth al login y signup */

  const user = await getUserBySession()
  if (user) redirect(`/user/${user.id}`)

  return (
        <section className="flex flex-col justify-between items-center h-screen">
            <AuthHeader />
            <main className="flex flex-col justify-center items-center border-solid border-red-700 border-2 min-w-1/2  my-10 rounded-lg p-5">
                {children}
            </main>
            <Footer className="p-3"/>
        </section>
  )
}
