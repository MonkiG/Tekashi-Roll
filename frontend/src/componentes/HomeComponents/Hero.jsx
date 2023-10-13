import LocationIcon from '../Icons/Location'

export default function Hero () {
  return (
    <section className='bg-hero-wallpaper bg-cover h-[41rem] relative'>
      <div className='absolute flex flex-col items-center justify-center p-3 w-1/2 h-3/4'>
        <h2 className='text-5xl text-white text-center p-5'>El sushi en casa <br/> sabe mejor.</h2>
        <button className='bg-page-red text-page-orange p-2 rounded-md w-72 m-5'>Ordenar</button>
        <span className='inline-flex items-center bg-gray-500 rounded-md p-2 m-5'>
          <LocationIcon width={25} height={25} stroke='#d1d5db'/>
          <div className='flex flex-col ml-2 leading-4'>
            <small className='text-gray-300'>Tu ubicación</small>
            <strong className='text-gray-200'>Puerto Vallarta, Jal.</strong> {/* Obtener ubicacion mediante el navegador */}
          </div>
        </span>
      </div>
    </section>
  )
}
