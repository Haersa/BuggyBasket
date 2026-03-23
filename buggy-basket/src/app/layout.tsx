import type { Metadata } from "next";
import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BasketProvider } from './context/BasketContext';
import BasketModal from './components/BasketModal';

export const metadata: Metadata = {
  title: "Buggy Basket",
  description: "Buggy Basket's website",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <BasketProvider>
          <Navbar />
          {children}
          <BasketModal />
          <Footer />
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