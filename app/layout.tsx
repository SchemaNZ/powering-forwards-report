import type { Metadata } from 'next'
import './globals.css'

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
      <body>
        {children}
      </body>
    </html>
  )
}
