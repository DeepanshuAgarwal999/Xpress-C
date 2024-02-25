import './globals.css';
import { Figtree } from 'next/font/google';
import Navbar from './components/navbar/Navbar';
import RegisterModal from './components/modals/RegisterModal';
import ClientOnly from './ClientOnly';
import ToasterProvider from './providers/ToasterProvider';
import LoginModal from './components/modals/LoginModal';
import getCurrentUser from './actions/getCurrentUser';
import BusinessModal from './components/modals/BusinessModal';
import SearchModal from './components/modals/SearchModal';
import Script from "next/script";
import Footer from './components/Footer';
const inter = Figtree({ subsets: ['latin'] });

export const metadata = {
  title: 'Xpress',
  description: 'Generated by create next app',
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const currentUser = await getCurrentUser();
  return (
    <>
    <html lang="en">
      <body className={inter.className}>
        <>
          <ClientOnly>
            <ToasterProvider />
            <BusinessModal />
            <SearchModal />
            <LoginModal />
            <RegisterModal />
            <Navbar currentUser={currentUser} />
            <div className="pb-20 pt-[4.5rem]">{children}</div>
          </ClientOnly>
            <Footer />
        </>
      </body>
    </html>
    <Script src="https://checkout.razorpay.com/v1/checkout.js" />
    </>
  );
}