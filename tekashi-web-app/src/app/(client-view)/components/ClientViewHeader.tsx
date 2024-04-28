import MainButton from '@/app/components/MainButton'
import UserCart from '@/app/components/UserCart'
import UserNotify from '@/app/components/UserNotify'
import UserProfile from '@/app/components/UserProfile'
import { type User } from '@/app/types'
import Link from 'next/link'
import Image from 'next/image'
import { useContext } from 'react'
import { CartContext } from '../CartContext'

export default function ClientViewHeader ({ className, user }: { className?: string, user?: User }): JSX.Element {
  return (
    <header className={`relative bg-page-black bg-header-image bg-right bg-no-repeat bg-[length:12%] h-[72px] ${className}`}>
        <nav>
            <ul className="flex w-full justify-around items-center content-center p-3 h-[72px]">
                <li className={`${user ? 'flex' : 'w-12'} content-center items-center`}>
                    <Link href="/"><Image src="/brand-logo.jpeg" alt="Tekashi-Roll logo" width={51} height={51} className="rounded-full"/></Link>
                    {user && <Link href={`/user/${user.id}`} className="px-4 text-white">{user.name + user.lastName}</Link>}
                </li>
                <li>
                    <ul className="flex h-full text-white">
                        <li className="flex justify-center hover:bg-page-black-hover hover:rounded-sm"><Link className="p-2" href={'/'}>Inicio</Link></li>
                        <li className="flex justify-center hover:bg-page-black-hover hover:rounded-sm"><Link className="p-2" href={'/menu'}>Menu</Link></li>
                        <li className="flex justify-center hover:bg-page-black-hover hover:rounded-sm"><Link className="p-2" href={'/about-us'}>Nosotros</Link></li>
                    </ul>
                </li>
                {!user
                  ? <MainButton content={'Login'} className={'w-1/12 '} />
                  : (
                    <li className='flex justify-center items-center'>
                        <UserProfile user={user}/>
                        <UserNotify user={user}/>
                        <UserCart user={user}/>
                    </li>
                    )
                }
            </ul>

        </nav>
    </header>
  )
}
