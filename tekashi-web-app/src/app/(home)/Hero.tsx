import HeroLocation from './HeroLocation'

export default function Hero (): JSX.Element {
  return (
        <section className='bg-hero-wallpaper bg-cover h-[41rem] relative'>
            <div className='absolute flex flex-col items-center justify-center p-3 w-1/2 h-3/4'>
                <span className='text-5xl text-white text-center p-5'>
                    <h1 className='my-5'>Tekashi Roll</h1>
                    El sushi en casa <br/> sabe mejor.
                </span>
                <button className='bg-page-red text-page-orange p-2 rounded-md w-72 m-5'>Ordenar</button>
                <HeroLocation />
            </div>
        </section>
  )
}
