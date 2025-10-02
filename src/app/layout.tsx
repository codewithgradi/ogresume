import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import Footer from "@/components/Footer";

const robotSan = Roboto({
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
        className={`${robotSan.variable}  antialiased`}
      >
        <main>
        {children}
        </main>
        <Footer/>
      </body>
    </html>
  );
}
