import Header from '@/components/Header'
import './globals.css'
import type { Metadata } from 'next'


export const metadata: Metadata = {
  title: 'Preo',
  description: 'Preo is Your Home To Post',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="--bg-color">
        <Header/>
        {children}
        </body>
    </html>
  )
}
