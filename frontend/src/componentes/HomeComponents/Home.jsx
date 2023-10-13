import Header from '../Header'
import Hero from './Hero'
import MainCategories from './MainCategories'
import Categories from './Categories.json'
import Footer from '../Footer'

export default function Home () {
  return (
    <>
        <Header isLogged={false} userName='Ramón Hernández'/>
        <Hero/>
        <section className='flex justify-around my-10'>
        {
            Categories.map(element => (
                <MainCategories imgSrc={element.url} categorie={element.name} key={element.name} alt={`${element.name} image`}/>
            ))
        }
        </section>
        <Footer/>
    </>
  )
}
