import Header from './Header'
import Footer from './Footer'
import type { HeaderProps, BaseProps } from '../types'

export interface LayoutWrapperProps {
  headerProps: HeaderProps
  children: React.ReactNode
  footerProps: BaseProps
}
export default function LayoutWrapper ({ children, headerProps, footerProps }: LayoutWrapperProps): JSX.Element {
  return (
        <>
            <Header {...headerProps} />
            {children}
            <Footer {...footerProps}/>
        </>
  )
}
