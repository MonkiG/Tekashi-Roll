import Link from "next/link"

export default function MainButton ({ content, className, ...rest }: {
    content: string,
    className: string
}) {
  return (
        <li className={`flex content-center text-page-orange ${className}`}>
            <Link href="/auth/login" className="p-2 w-full text-center bg-page-red hover:bg-page-red-hover rounded-sm">{content}</Link>
        </li>
  )
}