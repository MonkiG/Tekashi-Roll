export default function QuestionMark ({
  width = 25,
  height = 25,
  fill = 'none',
  strokeWidth = 2,
  stroke = '#fff'
}): JSX.Element {
  return (
        <svg viewBox="0 0 24 24" width={width} height={height} fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke={stroke}strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path> <path d="M9 9C9 5.49997 14.5 5.5 14.5 9C14.5 11.5 12 10.9999 12 13.9999" stroke={stroke} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path> <path d="M12 18.01L12.01 17.9989" stroke={stroke}strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path> </g></svg>
  )
}
