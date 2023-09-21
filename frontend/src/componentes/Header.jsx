import MainButton from './MainButton'

Header.propTypes = {
  isLogged: Boolean,
  userName: String
}

export default function Header ({ isLogged = true, userName = 'Ramón Hernández' }) {
  return (
        <header className="bg-page-black bg-header-image bg-right bg-no-repeat bg-[length:12%] h-[72px]">
            <nav>
                <ul className="flex w-full justify-around content-center p-3">
                    <li className={`${isLogged ? 'flex w-40' : 'w-12'} content-center`}>
                        <a href="/"><img src="./brand-logo.jpeg" alt="Tekashi-Roll logo" className="rounded-full"/></a>
                        {isLogged && <span className="px-4 text-white">{userName}</span>}
                    </li>
                    <li>
                        <ul className="flex h-full text-white">
                            <li className="flex justify-center hover:bg-page-black-hover hover: rounded-sm"><button className="p-2">Inicio</button></li>
                            <li className="flex justify-center hover:bg-page-black-hover hover: rounded-sm"><button className="p-2">Servicios</button></li>
                            <li className="flex justify-center hover:bg-page-black-hover hover: rounded-sm"><button className="p-2">Nosotros</button></li>
                        </ul>
                    </li>
                    {!isLogged
                      ? <MainButton content={'Login'} className={'w-1/12 '} />
                      : <MainButton content={'carrito'}/>}
                </ul>

            </nav>
        </header>
  )
}

/** <img src="./header-image.png" alt="" className="absolute right-0 top-[-25px] w-32 z-0"/> */
// <div className="absolute right-0 top-[-60px] bg-cover w-48 h-48 bg-header-image bg-center" />
