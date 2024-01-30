import Image from 'next/image'
export default function MainCategories ({ categorie = 'Categories', imgSrc, alt }: {
  categorie: string
  imgSrc: string
  alt: string
}): JSX.Element {
  return (
      <section className="h-15 rounded-xl font-bold shadow-md hover:scale-110 transition hover:cursor-pointer">
          <Image src={imgSrc} alt={alt} height={205} width={205}/>
          <h2 className="text-center p-10 text-xl">{categorie}</h2>
      </section>
  )
}
