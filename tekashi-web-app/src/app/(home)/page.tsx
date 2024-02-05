import Header from '../components/Header'
import Footer from '../components/Footer'
import Hero from './Hero'
import Categories from '../../helpers/Categories.json'
import MainCategories from './MainCategories'
import { cookies } from 'next/headers'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'

export default async function Page (): Promise<JSX.Element> {
  const supabase = createServerComponentClient({ cookies })
  const {
    data: { session }
  } = await supabase.auth.getSession()

  const userData = session?.user?.user_metadata

  return (
    <>
      <Header userData={userData && { userName: `${userData.name} ${userData.lastName}`, userId: session?.user.id }}/>
      <Hero isLogged={Boolean(userData)}/>
      <section className="flex justify-around my-10">
        {
          Categories.map(element => <MainCategories imgSrc={element.url} categorie={element.name} key={element.name} alt={`${element.name} image`}/>)
        }
      </section>
      <Footer />
    </>
  )
}
