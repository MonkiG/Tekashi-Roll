import Link from 'next/link'

export default function MainButton ({ content, className, href = '/auth/login', ...rest }: {
  content: string
  className?: string
  href?: string
}): JSX.Element {
  return (
        <li className={`flex content-center text-page-orange ${className}`}>
            <Link href={href} className="p-1 w-full text-center bg-page-red hover:bg-page-red-hover rounded-sm">{content}</Link>
        </li>
  )
}
