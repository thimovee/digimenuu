import Navbar from '@/components/Navbar'
import '@styles/globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {/* @ts-expect-error  Server Component */}
        <Navbar />
        <main>{children}</main>
      </body>
    </html>
  )
}
