import Cart from './icons/Cart'
import Image from 'next/image'
import MainButton from './MainButton'
import Link from 'next/link'

type HeaderTypes = "Main" | "Auth"

interface MainHeaderProps {
    isLogged: boolean,
    userName?: string
    className?: string
}

export default function Header({ headerType, mainHeaderProps, className }:{ headerType: HeaderTypes, mainHeaderProps?: MainHeaderProps, className?: string }){

    return (headerType === "Main" ? <MainHeader isLogged={mainHeaderProps!.isLogged} className={mainHeaderProps!.className} userName={mainHeaderProps!.userName}/> : <AuthHeader className={className}/>)
}

const AuthHeader = ({className}: {className?: string}) => {
    return ( 
        <header className={`fixed w-full bg-page-black bg-header-image bg-right bg-no-repeat bg-[length:12%] h-[72px] flex items-center ${className}`}>
            <Image src="/brand-logo.jpeg" alt="Tekashi roll logo" className='rounded-full mx-5' width={51} height={51} />
            <h1 className='text-white text-xl uppercase'><Link href="/">Tekashi Roll</Link></h1>
        </header>
    )
}
const MainHeader = ({ isLogged, userName, className }: MainHeaderProps) => {
  return (
        <header className={`bg-page-black bg-header-image bg-right bg-no-repeat bg-[length:12%] h-[72px] ${className}`}>
            <nav>
                <ul className="flex w-full justify-around items-center content-center p-3 h-[72px]">
                    <li className={`${isLogged ? 'flex' : 'w-12'} content-center items-center`}>
                        <Link href="/"><Image src="/brand-logo.jpeg" alt="Tekashi-Roll logo" width={51} height={51} className="rounded-full"/></Link>
                        {(isLogged && userName !== '') && <span className="px-4 text-white">{userName}</span>}
                    </li>
                    <li>
                        <ul className="flex h-full text-white">
                            <li className="flex justify-center hover:bg-page-black-hover hover:rounded-sm"><button className="p-2">Inicio</button></li>
                            <li className="flex justify-center hover:bg-page-black-hover hover:rounded-sm"><button className="p-2">Servicios</button></li>
                            <li className="flex justify-center hover:bg-page-black-hover hover:rounded-sm"><button className="p-2">Nosotros</button></li>
                        </ul>
                    </li>
                    {!isLogged
                      ? <MainButton content={'Login'} className={'w-1/12 '} />
                      : <button className='hover:bg-page-black-hover p-2'><Cart /></button>}
                </ul>

            </nav>
        </header>
  )
}

