import Image from 'next/image'
import Link from 'next/link'

export default function AdminHeader ({ className }: { className?: string }): JSX.Element {
  return (
        <header className={`relative grid grid-rows-1 grid-cols-12 items-center w-full bg-page-black bg-header-image bg-right bg-no-repeat bg-[length:12%] h-[72px] ${className}`}>
            <Link href={'/'}><Image src="/brand-logo.jpeg" alt="Tekashi roll logo" className='rounded-full mx-5' width={51} height={51} /></Link>
            <Link href={'/admin/products'} className='text-white hidden md:block hover:bg-page-black-hover text-center rounded-md p-2'>Productos</Link>
            <Link href={'/admin/orders'} className='text-white hidden md:block hover:bg-page-black-hover text-center rounded-md p-2'>Pedidos</Link>
            {/* <Link href={'/admin/stats'} className='text-white hover:bg-page-black-hover text-center rounded-md p-2'>Estadisticas</Link> */}
            <a href={'/admin'} className='text-white text-center text-xl uppercase col-start-6 col-span-3'>Tekashi Roll Admin</a>
        </header>
  )
}
