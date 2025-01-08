import { Inter } from 'next/font/google'
import './globals.css'
import {Providers} from "@/src/app/providers";

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'NexBill - Sistema de Facturación Inteligente',
  description: 'Plataforma moderna de facturación electrónica',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body className={inter.className}>
      <Providers>
        {children}
      </Providers>
      </body>
    </html>
  )
}