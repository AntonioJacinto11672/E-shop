import './globals.css'
import type { Metadata } from 'next'
import { Poppins } from 'next/font/google'
import Footer from './components/footer/Footer';
import NavBar from './components/navBar/NavBar';
import CartProvider from '@/providers/CartProvider';
import { Toaster } from 'react-hot-toast';
import  getCurrentUser  from '@/actions/getCurrentUser';

const poppins = Poppins({ subsets: ['latin'], weight: ['400', '700'] })

export const metadata: Metadata = {
  title: 'E-Shop',
  description: 'Create a app E-commerce',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {


  return (
    <html lang="en">
      <body className={`${poppins.className} text-slate-700`}>
        <Toaster toastOptions={{
          style: {
            backgroundColor: 'rgb(51, 65, 85)',
            color: '#fff'
          }
        }} />
        <CartProvider>
          <div className="flex flex-col min-h-screen">
            <NavBar />
            <main className='flex-grow'>{children}</main>
            <Footer />
          </div>
        </CartProvider>
      </body>
    </html>
  )
}
