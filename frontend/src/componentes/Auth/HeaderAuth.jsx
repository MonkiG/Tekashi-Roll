import { Link } from 'react-router-dom'
export default function HeaderAuth () {
  return (
    <header className="fixed w-full bg-page-black bg-header-image bg-right bg-no-repeat bg-[length:12%] h-[72px] flex items-center">
        <img src="/brand-logo.jpeg" alt="Tekashi roll logo" className='w-12 rounded-full mx-5' />
        <h1 className='text-white text-xl uppercase'><Link to="/">Tekashi Roll</Link></h1>
    </header>
  )
}
