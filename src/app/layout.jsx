import { Inter } from "next/font/google";

import Navbar from "./components/Navbar";

import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className}`}>
        <Navbar />
        <main className="mx-auto px-5 mt-4 md:max-w-[90%]">{children}</main>
        <ToastContainer />
      </body>
    </html>
  );
}

