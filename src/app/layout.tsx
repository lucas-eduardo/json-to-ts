'use client'

import './styles/globals.css'
import 'react-toastify/dist/ReactToastify.css'

import clsx from 'clsx'
import { Roboto } from 'next/font/google'
import { ReactNode } from 'react'
import { ToastContainer } from 'react-toastify'

const roboto = Roboto({ weight: ['400', '500', '700'], subsets: ['latin'] })

interface IRootLayoutProps {
  children: ReactNode
}

export default function RootLayout({ children }: IRootLayoutProps) {
  return (
    <html lang="en" className="antialiased">
      <body
        className={clsx('w-screen h-screen bg-[#1e1e1e]', roboto.className)}
      >
        {children}
      </body>
      <ToastContainer theme="dark" position="top-center" />
    </html>
  )
}
