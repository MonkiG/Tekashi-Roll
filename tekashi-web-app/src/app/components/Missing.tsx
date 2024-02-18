import QuestionMark from './icons/QuestionMark'
export default function Missing ({ text, className }: { text: string, className?: string }): JSX.Element {
  return (
    <div className={`flex flex-col justify-center items-center gap-5 text-page-orange font-bold ${className}`}>
        <QuestionMark width={100} height={100} stroke='#FFB900' />
        <span className='uppercase'>{text}</span>
    </div>
  )
}
