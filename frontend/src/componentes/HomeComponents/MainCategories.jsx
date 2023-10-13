export default function MainCategories ({ categorie = 'Categories', imgSrc, alt }) {
  return (
    <section className="h-15 rounded-xl font-bold shadow-md hover:scale-110 transition hover:cursor-pointer">
        <img src={imgSrc} alt={alt} />
        <h2 className="text-center p-10 text-xl">{categorie}</h2>
    </section>
  )
}
