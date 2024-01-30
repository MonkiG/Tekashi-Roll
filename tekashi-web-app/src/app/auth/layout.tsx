import Header from '../components/Header'
import Footer from '../components/Footer'
export default function AuthLayout ({ children }: { children: React.ReactNode }): JSX.Element {
  /** Agregar OAuth al login y signup */
  return (
        <section className="flex flex-col justify-between h-screen">
            <Header headerType="Auth" className="relative"/>
            <main className="flex flex-col justify-center items-center border-solid border-red-700 border-2 w-1/4 m-auto my-10 rounded-lg">
                {children}
            </main>
            <Footer className="p-3"/>
        </section>
  )
}
