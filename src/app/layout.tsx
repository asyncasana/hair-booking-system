import "@/styles/globals.css";

import type { Metadata } from "next";
import { Geist } from "next/font/google";

import { SessionProvider } from "next-auth/react";

import Header from "./_components/Header";
import Footer from "./_components/Footer";

export const metadata: Metadata = {
  title: "Hair with Iryna",
  description: "Book your next hair appointment online",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${geist.variable}`}>
      <body>
        <SessionProvider>
            <Header />
            {children}
            <Footer />
        </SessionProvider>
      </body>
    </html>
  );
}
