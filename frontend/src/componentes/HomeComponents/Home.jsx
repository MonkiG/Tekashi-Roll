import Header from '../Header'
import Hero from './Hero'
import MainCategories from './MainCategories'
import Categories from './Categories.json'
import Footer from '../Footer'
import { useAuthProvider } from '../../contexts/AuthProvider'

export default function Home () {
  const { userToken } = useAuthProvider()
  console.log(userToken)
  return (
    <>
        <Header isLogged={Boolean(userToken)} userName={'Ramon Hernandez'}/>
        <Hero/>
        <section className='flex justify-around my-10'>
        {
          Categories.map(element => <MainCategories imgSrc={element.url} categorie={element.name} key={element.name} alt={`${element.name} image`}/>)
        }
        </section>
        <Footer/>
    </>
  )
}
