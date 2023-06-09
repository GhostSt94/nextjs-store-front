import './globals.css'
import Navbar from '@/components/header/Navbar'
import Footer from '@/components/Footer'
import { Montserrat } from 'next/font/google'
import { CartProvider } from '@/components/context/CartContext'
import OffCanvaCart from '@/components/cart/OffCanvaCart'
import Provider from '@/components/Provider'

export const metadata = {
  title: 'Shopability',
  description: 'Online store',
}

const montserrat = Montserrat({
  subsets: ['latin'],
  display: 'swap'
})

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  return (
    <Provider>
      <CartProvider>
        <html lang="en" className={montserrat.className}>
          <body suppressHydrationWarning={true} >
            <Navbar></Navbar>
            <OffCanvaCart></OffCanvaCart>
            {children}
            <Footer></Footer>
          </body>
        </html>
      </CartProvider>
    </Provider>
  )
}