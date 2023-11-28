import MainButton from './MainButton'
import { Link } from 'react-router-dom'
import Cart from './Icons/Cart'

export default function Header ({ isLogged, userName }) {
  return (
        <header className="bg-page-black bg-header-image bg-right bg-no-repeat bg-[length:12%] h-[72px]">
            <nav>
                <ul className="flex w-full justify-around items-center content-center p-3 h-[72px]">
                    <li className={`${isLogged ? 'flex' : 'w-12'} content-center items-center`}>
                        <Link to="/"><img src="/brand-logo.jpeg" alt="Tekashi-Roll logo" className="rounded-full w-[51.44px] h-[51.44px]"/> </Link>
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

/** <img src="./header-image.png" alt="" className="absolute right-0 top-[-25px] w-32 z-0"/> */
// <div className="absolute right-0 top-[-60px] bg-cover w-48 h-48 bg-header-image bg-center" />
