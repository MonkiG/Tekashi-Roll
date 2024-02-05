import { type MainHeaderProps } from '../types'
import Link from 'next/link'
import Image from 'next/image'
import MainButton from './MainButton'
import UserCart from './UserCart'
import UserNotify from './UserNotify'

export default function MainHeader ({ userData, className }: { userData: MainHeaderProps, className?: string }): JSX.Element {
  return (
        <header className={`relative bg-page-black bg-header-image bg-right bg-no-repeat bg-[length:12%] h-[72px] ${className}`}>
            <nav>
                <ul className="flex w-full justify-around items-center content-center p-3 h-[72px]">
                    <li className={`${userData ? 'flex' : 'w-12'} content-center items-center`}>
                        <Link href="/"><Image src="/brand-logo.jpeg" alt="Tekashi-Roll logo" width={51} height={51} className="rounded-full"/></Link>
                        {(userData && userData.userName !== '') && <Link href={`/user/${userData.userId}`} className="px-4 text-white">{userData.userName}</Link>}
                    </li>
                    <li>
                        <ul className="flex h-full text-white">
                            <li className="flex justify-center hover:bg-page-black-hover hover:rounded-sm"><Link className="p-2" href={'/'}>Inicio</Link></li>
                            <li className="flex justify-center hover:bg-page-black-hover hover:rounded-sm"><Link className="p-2" href={'/menu'}>Menu</Link></li>
                            <li className="flex justify-center hover:bg-page-black-hover hover:rounded-sm"><Link className="p-2" href={'/about-us'}>Nosotros</Link></li>
                        </ul>
                    </li>
                    {!userData
                      ? <MainButton content={'Login'} className={'w-1/12 '} />
                      : (
                          <li className='flex justify-center items-center'>
                            <UserNotify userId={userData.userId}/>
                            <UserCart userId={userData.userId}/>
                          </li>
                        )
                    }
                </ul>

            </nav>
        </header>
  )
}
