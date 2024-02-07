import Hero from './Hero'
import Categories from '../../helpers/Categories.json'
import MainCategories from './MainCategories'

export default async function Page (): Promise<JSX.Element> {
  return (
    <>
      <Hero/>
      <section className="flex justify-around my-10">
        {
          Categories.map(element => <MainCategories imgSrc={element.url} categorie={element.name} key={element.name} alt={`${element.name} image`}/>)
        }
      </section>
    </>
  )
}
