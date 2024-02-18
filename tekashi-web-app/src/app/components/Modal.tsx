export default function Modal ({ children, className }: { children?: React.ReactNode, className?: string }): JSX.Element {
  return (
        <div className={`fixed w-full h-full top-0 left-0 bg-[rgba(0,0,0,0.6)] z-10 ${className}`}>
            {children}
        </div>
  )
}
