import Header from "../components/Header";
import Footer from "../components/Footer";
import Hero from "./Hero";
import Categories from "../../helpers/Categories.json"
import MainCategories from "./MainCategories";

export default function Page() {
  return (
    <>
      <Header headerType="Main" mainHeaderProps={{isLogged: false, userName:"Ramón Hernández"}}/>
      <Hero />
      <section className="flex justify-around my-10">
        {
          Categories.map(element => <MainCategories imgSrc={element.url} categorie={element.name} key={element.name} alt={`${element.name} image`}/>)
        }
      </section>
      <Footer />
    </>
  );
}

