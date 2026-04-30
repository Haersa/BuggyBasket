import type { Metadata } from 'next';
import './globals.css';
import Shell from './components/Shell';
import { BasketProvider } from './context/BasketContext';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import BackToTop from './components/BackToTop';
import CookieBanner from './components/CookieBanner';

export const metadata: Metadata = {
  title: 'Buggy Basket',
  description: 'The smarter way to shop.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <BasketProvider>
          <Shell>
            {children}
          </Shell>
          <BackToTop />
          <CookieBanner />
          <ToastContainer
            position="top-center"
            autoClose={3000}
            hideProgressBar={false}
            closeOnClick
            pauseOnHover
            draggable
            theme="light"
          />
        </BasketProvider>
      </body>
    </html>
  );
}