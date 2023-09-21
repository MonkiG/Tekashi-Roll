MainButton.propTypes = {
  content: String,
  className: String
}
export default function MainButton ({ content, className, ...rest }) {
  return (
        <li className={`flex content-center text-page-orange ${className}`}>
            <button className="p-2 w-full text-center bg-page-red hover:bg-page-red-hover rounded-sm">{content}</button>
        </li>
  )
}
