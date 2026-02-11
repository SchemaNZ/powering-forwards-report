import type { Metadata } from 'next'
import { Rubik } from 'next/font/google'
import './globals.css'

const rubik = Rubik({
  subsets: ['latin'],
  variable: '--font-rubik',
  weight: ['400', '500', '600', '700'],
})

export const metadata: Metadata = {
  title: 'Powering Forwards Report',
  description: 'Farm Energy Calculator & Analysis - Learn about solar + battery storage vs diesel backup',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={rubik.variable}>
        {children}
      </body>
    </html>
  )
}
