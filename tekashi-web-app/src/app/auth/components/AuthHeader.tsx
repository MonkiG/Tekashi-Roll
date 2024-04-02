import Image from 'next/image'
import Link from 'next/link'
export default function AuthHeader ({ className }: { className?: string }): JSX.Element {
  return (
        <header className={`relative w-full bg-page-black bg-header-image bg-right bg-no-repeat bg-[length:12%] h-[72px] flex items-center ${className}`}>
            <Image src="/brand-logo.jpeg" alt="Tekashi roll logo" className='rounded-full mx-5' width={51} height={51} />
            <h1 className='text-white text-xl uppercase'><Link href="/">Tekashi Roll</Link></h1>
        </header>
  )
}
