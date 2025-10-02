import type { Metadata } from "next";
import { Geist, Geist_Mono, Roboto } from "next/font/google";
import "./globals.css";
import Footer from "@/components/Footer";

const geistSans = Geist({
  variable: "--font-roboto",
  subsets: ["latin"],
});


export const metadata: Metadata = {
  title: "Resume Builder",
  description: "This is the landing page",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable}  antialiased`}
      >
        <main>
        {children}
        </main>
        <Footer/>
      </body>
    </html>
  );
}
