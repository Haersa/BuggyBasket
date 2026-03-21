import type { Metadata } from "next";
import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const metadata: Metadata = {
  title: "Buggy Basket",
  description: "Buggy Basket's website",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        {children}
        <ToastContainer
          position="bottom-right"
          autoClose={2000}
          hideProgressBar={false}
          closeOnClick
          theme="light"
        />
        <Footer />
      </body>
    </html>
  );
}