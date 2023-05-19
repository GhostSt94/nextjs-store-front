import './globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { Montserrat } from 'next/font/google'
import { CartProvider } from '@/components/context/CartContext'
import OffCanvaCart from '@/components/cart/OffCanvaCart'

export const metadata = {
  title: 'Shopability',
  description: 'Online store',
}

const montserrat = Montserrat({
  subsets: ['latin'],
  display: 'swap'
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <CartProvider>
      <html lang="en" className={montserrat.className}>
        <body>
          <Navbar></Navbar>
          <OffCanvaCart></OffCanvaCart>
          {children}
          <Footer></Footer>
        </body>
      </html>
    </CartProvider>
  )
}
