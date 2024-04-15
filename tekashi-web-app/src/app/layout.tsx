import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Tekashi Roll',
  description: "Tekashi Roll, Sushi's restaurant app"
}

export default async function RootLayout ({
  children
}: Readonly<{
  children: React.ReactNode
}>): Promise<JSX.Element> {
  return (
    <html lang="es-mx">
      <body className={`${inter.className} min-h-screen`}>
        {children}
      </body>
    </html>
  )
}
