import Image from 'next/image'
import Link from 'next/link'

export default function AdminHeader ({ className }: { className?: string }): JSX.Element {
  return (
        <header className={`relative grid grid-rows-1 grid-cols-12 items-center w-full bg-page-black bg-header-image bg-right bg-no-repeat bg-[length:12%] h-[72px] ${className}`}>
            <Link href={'/'}><Image src="/brand-logo.jpeg" alt="Tekashi roll logo" className='rounded-full mx-5' width={51} height={51} /></Link>
            <Link href={'/admin/orders'} className='text-white'>Pedidos</Link>
            <Link href={'/admin/stats'} className='text-white'>Estadisticas</Link>
            <h1 className='text-white text-xl uppercase col-start-6 col-span-3'><Link href="/admin">Tekashi Roll Admin</Link></h1>
        </header>
  )
}
