import Link from 'next/link'
import Orders from '../components/icons/Orders'
import Products from '../components/icons/Products'
import Stats from '../components/icons/Stats'
import Kitchen from '../components/icons/Kitchen'
export default async function MainAdmin (): Promise<JSX.Element> {
  return (
    <>
      <section className="h-[512px] w-[1029px] m-auto grid grid-cols-2 items-center">
        <Link
          href={'/admin/products'}
          className='bg-page-orange hover:bg-page-orange-hover p-8 w-40 h-40 place-self-center rounded-md flex items-center justify-center' title='Ver todos los productos'
        >
          <Products/>
        </Link>
        <Link
          href={'/admin/orders'}
          className='bg-page-orange hover:bg-page-orange-hover p-8 w-40 h-40 place-self-center rounded-md flex items-center justify-center' title='Ver panel de pedidos'
        >
          <Orders/>
        </Link>
        <Link
          href={'/admin/stats'}
          className='bg-page-orange hover:bg-page-orange-hover p-8 w-40 h-40 place-self-center rounded-md flex items-center justify-center' title='Ver estadisticas de la app'
        >
          <Stats />
        </Link>
        <Link
          href={'/admin/orders/kitchen'}
          className='bg-page-orange hover:bg-page-orange-hover p-8 w-40 h-40 place-self-center rounded-md flex items-center justify-center' title='Ver los pedidos encocina'
        >
          <Kitchen/>
        </Link>
      </section>
    </>
  )
}
