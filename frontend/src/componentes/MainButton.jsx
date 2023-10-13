import { Link } from 'react-router-dom'

export default function MainButton ({ content, className, ...rest }) {
  return (
        <li className={`flex content-center text-page-orange ${className}`}>
            <Link to="/auth/login"className="p-2 w-full text-center bg-page-red hover:bg-page-red-hover rounded-sm">{content}</Link>
        </li>
  )
}
